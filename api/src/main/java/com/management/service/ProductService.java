package com.management.service;

import java.util.List;

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

        if (product.getName().length() < 2 || product.getPrice() < 0) {
            throw new WebApplicationException("Invalid product data", HttpResponseStatus.BAD_REQUEST.code());
        }

        entity.name = product.getName();
        entity.price = product.getPrice();
        entity.code = String.format("PR%04d", ProductEntity.count() + 1);
        entity.persist();

        return new ProductResponse(entity.name, entity.price, entity.code);
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
