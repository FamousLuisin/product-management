package com.management.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import com.management.entity.manufacturing.ManufacturingEntity;
import com.management.entity.manufacturing.dto.ProductManufacturing;
import com.management.entity.manufacturing.dto.ProductProduced;
import com.management.entity.manufacturing.dto.QuantityProductProduced;
import com.management.entity.material.MaterialEntity;
import com.management.entity.product.ProductEntity;
import com.management.entity.product.dto.ProductRequest;
import com.management.entity.product.dto.ProductResponse;

import io.netty.handler.codec.http.HttpResponseStatus;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.WebApplicationException;

@ApplicationScoped
public class ProductService {
    
    public ProductResponse createProduct(ProductRequest product) {
        ProductEntity entity = new ProductEntity();

        if (product.getName() == null || product.getName().trim().isEmpty() || product.getPrice() <= 0) {
            throw new WebApplicationException("Invalid product data", HttpResponseStatus.BAD_REQUEST.code());
        }

        entity.name = product.getName();
        entity.price = product.getPrice();
        entity.code = String.format("PR%06d", ThreadLocalRandom.current().nextInt(0, 1000000));
        entity.persist();

        if (product.getManufacturing() == null || product.getManufacturing().isEmpty()) {
            return new ProductResponse(entity.name, entity.price, entity.code);  
        }

        this.addManufacturing(entity, product.getManufacturing());

        return new ProductResponse(entity.name, entity.price, entity.code); 
    }

    public void updateManufacturing(String code, List<ProductManufacturing> manufacturing) {
        ProductEntity entity = ProductEntity.find("code", code).firstResult();

        System.out.println("teste 1");
        
        if (entity == null) {
            throw new WebApplicationException("Product not found", HttpResponseStatus.NOT_FOUND.code());
        }

        if (manufacturing == null) {
            throw new WebApplicationException("Manufacturing data is required", HttpResponseStatus.BAD_REQUEST.code());
        }

        System.out.println("teste 2");

        ManufacturingEntity.delete("product", entity);
        this.addManufacturing(entity, manufacturing);
    }

    public ProductProduced productProduction(){
        List<ProductEntity> products = ProductEntity.findProductsWithManufacturingOrderByPriceDesc();
        List<MaterialEntity> materials = MaterialEntity.findMaterialWithManufacturing();
        List<ManufacturingEntity> manufacturings = ManufacturingEntity.findManufacturingOrderByPriceProduct();

        products = this.addManufacturingInProducts(products, manufacturings);
        HashMap<UUID, Integer> materialStock = materials.stream().collect(Collectors.toMap(m -> m.id, m -> m.quantity, (a, b) -> a, HashMap::new));

        ProductProduced productProduced = new ProductProduced();

        for (ProductEntity product : products) {
            QuantityProductProduced gain = this.tryToManufactureProduct(product, materialStock);
            
            if (gain != null) {
                productProduced.setPrice(productProduced.getPrice() + gain.getAgain());
                productProduced.addProduct(product, gain.getQuantity());
            }
        }

        return productProduced;
    }

    private QuantityProductProduced tryToManufactureProduct(ProductEntity product, HashMap<UUID, Integer> materialStock) {
        int maxToProduce = Integer.MAX_VALUE;

        for (ManufacturingEntity m : product.manufacturing) {
            int stock = materialStock.getOrDefault(m.material.id, 0);

            if (stock < m.quantity) {
                return null;
            }

            maxToProduce = Math.min(maxToProduce, stock / m.quantity);
        }

        for (ManufacturingEntity m : product.manufacturing) {
            int stock = materialStock.get(m.material.id);
            materialStock.put(
                m.material.id,
                stock - (maxToProduce * m.quantity)
            );
        }

        return new QuantityProductProduced(maxToProduce * product.price, maxToProduce);
    }

    private List<ProductEntity> addManufacturingInProducts(List<ProductEntity> products, List<ManufacturingEntity> manufacturings) {
        Map<UUID, List<ManufacturingEntity>> byProductId = manufacturings.stream().collect(Collectors.groupingBy(m -> m.product.id));

        products.forEach(product ->
            product.manufacturing = byProductId.getOrDefault(product.id, List.of())
        );

        return products;
    }

    private void addManufacturing(ProductEntity product, List<ProductManufacturing> manufacturing) {
        List<ManufacturingEntity> manufacturings = new ArrayList<>();
        
        System.out.println("teste 3");

        MaterialEntity.findByCodes(
            manufacturing.stream()
                .map(m -> m.getMaterialCode())
                .toList()
        ).forEach(material -> {
            ManufacturingEntity manufacturingEntity = new ManufacturingEntity();
            manufacturingEntity.product = product;
            manufacturingEntity.material = material;
            manufacturingEntity.quantity = manufacturing.stream()
                .filter(m -> m.getMaterialCode().equals(material.code))
                .findFirst()
                .map(m -> m.getQuantity())
                .orElse(0);
            manufacturings.add(manufacturingEntity);
        });

        ManufacturingEntity.persist(manufacturings);
        System.out.println("teste 4");
    }

    public List<ProductResponse> getProducts(Integer page, Integer size) {
        List<ProductEntity> entities = ProductEntity.findAll().page(page, size).list();
        
        return entities.stream()
            .map(entity -> new ProductResponse(entity.name, entity.price, entity.code)).toList();
    }

    public ProductResponse getProductsByCode(String code) {
        ProductEntity entity = ProductEntity.find("code", code).firstResult();

        if (entity == null) {
            throw new WebApplicationException("Product not found", HttpResponseStatus.NOT_FOUND.code());
        }

        return new ProductResponse(entity.name, entity.price, entity.code);
    }

    public void updateProduct(String code, ProductRequest product) {
        ProductEntity entity = ProductEntity.find("code", code).firstResult();
        
        if (entity == null) {
            throw new WebApplicationException("Product not found", HttpResponseStatus.NOT_FOUND.code());
        }

        if (product.getName().length() < 0 || product.getPrice() <= 0) {
            throw new WebApplicationException("Invalid product data", HttpResponseStatus.BAD_REQUEST.code());
        }

        entity.name = product.getName();
        entity.price = product.getPrice();
        entity.persist();
    }

    public void deleteProduct(String code) {
        ProductEntity entity = ProductEntity.find("code", code).firstResult();
        if (entity == null) {
            throw new WebApplicationException("Product not found", HttpResponseStatus.NOT_FOUND.code());
        }

        entity.delete();
    }
}
