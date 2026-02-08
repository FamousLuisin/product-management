package com.management.service;

import java.util.ArrayList;
import java.util.List;

import com.management.entity.manufacturing.ManufacturingEntity;
import com.management.entity.manufacturing.dto.ProductManufacturing;
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
        entity.code = String.format("PR%06d", ProductEntity.count() + 1);
        entity.persist();

        if (product.getManufacturing() == null || product.getManufacturing().isEmpty()) {
            return new ProductResponse(entity.name, entity.price, entity.code);  
        }

        this.addManufacturing(entity, product.getManufacturing());

        return new ProductResponse(entity.name, entity.price, entity.code); 
    }

    public void updateManufacturing(String code, List<ProductManufacturing> manufacturing) {
        ProductEntity entity = ProductEntity.find("code", code).firstResult();
        
        if (entity == null) {
            throw new WebApplicationException("Product not found", HttpResponseStatus.NOT_FOUND.code());
        }

        if (manufacturing == null) {
            throw new WebApplicationException("Manufacturing data is required", HttpResponseStatus.BAD_REQUEST.code());
        }

        ManufacturingEntity.delete("product", entity);
        this.addManufacturing(entity, manufacturing);
    }

    private void addManufacturing(ProductEntity product, List<ProductManufacturing> manufacturing) {
        List<ManufacturingEntity> manufacturings = new ArrayList<>();
        
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
