package com.management.entity.product.dto;

import java.util.List;

import com.management.entity.manufacturing.dto.ProductManufacturing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor
@Data
public class ProductRequest {
    
    private String name;

    private Float price;

    private List<ProductManufacturing> manufacturing;
}
