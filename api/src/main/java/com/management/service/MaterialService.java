package com.management.service;

import java.util.List;

import com.management.entity.material.MaterialEntity;
import com.management.entity.material.dto.MaterialRequest;
import com.management.entity.material.dto.MaterialResponse;

import io.netty.handler.codec.http.HttpResponseStatus;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.WebApplicationException;

@ApplicationScoped
public class MaterialService {
    
    public MaterialResponse createMaterial(MaterialRequest request) {
        MaterialEntity material = new MaterialEntity();

        if (request.getName().length() < 3 || request.getQuantity() <= 0) {
            throw new WebApplicationException("Invalid material data", HttpResponseStatus.BAD_REQUEST.code());
        }
        
        material.name = request.getName();
        material.quantity = request.getQuantity();
        material.code = String.format("MA%04d", MaterialEntity.count() + 1);
        material.persist();

        return new MaterialResponse(material.code, material.name, material.quantity);
    }

    public List<MaterialResponse> getMaterials() {
        List<MaterialEntity> entities = MaterialEntity.findAll().list();
        
        return entities.stream()
            .map(entity -> new MaterialResponse(entity.code, entity.name, entity.quantity)).toList();
    }

    public List<MaterialResponse> getMaterialsPerPage(Integer page, Integer size){
        List<MaterialEntity> entities = MaterialEntity.findAll().page(page, size).list();
        
        return entities.stream()
            .map(entity -> new MaterialResponse(entity.code, entity.name, entity.quantity)).toList();
    }

    public void updateMaterial(String code, MaterialRequest request) {
        MaterialEntity entity = MaterialEntity.find("code", code).firstResult();
        
        if (entity == null) {
            throw new WebApplicationException("Material not found", HttpResponseStatus.NOT_FOUND.code());
        }

        entity.name = request.getName();
        entity.quantity = request.getQuantity();
        entity.persist();
    }

    public void addQuantityMaterial(String code, Integer quantity) {
        MaterialEntity entity = MaterialEntity.find("code", code).firstResult();
        
        if (entity == null) {
            throw new WebApplicationException("Material not found", HttpResponseStatus.NOT_FOUND.code());
        }

        if (quantity == null ||quantity <= 0) {
            throw new WebApplicationException("Invalid quantity", HttpResponseStatus.BAD_REQUEST.code());
        }

        entity.quantity += quantity;
        entity.persist();
    }

    public void removeQuantityMaterial(String code, Integer quantity) {
        MaterialEntity entity = MaterialEntity.find("code", code).firstResult();
        
        if (entity == null) {
            throw new WebApplicationException("Material not found", HttpResponseStatus.NOT_FOUND.code());
        }

        if (quantity == null ||quantity <= 0 || entity.quantity - quantity < 0) {
            throw new WebApplicationException("Invalid quantity", HttpResponseStatus.BAD_REQUEST.code());
        }

        entity.quantity -= quantity;
        entity.persist();
    }

    public void deleteMaterial(String code){
        MaterialEntity entity = MaterialEntity.find("code", code).firstResult();

        if (entity == null){
            throw new WebApplicationException("Material not found", HttpResponseStatus.NOT_FOUND.code());
        }

        entity.delete();
    }

    public MaterialResponse getMaterialByCode(String code) {
        MaterialEntity entity = MaterialEntity.find("code", code).firstResult();

        if (entity == null) {
            throw new WebApplicationException("Material not found", HttpResponseStatus.NOT_FOUND.code());
        }

        return new MaterialResponse(entity.code, entity.name, entity.quantity);
    }
}
