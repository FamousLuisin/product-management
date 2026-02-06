package com.management.entity.product.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor
@Data
public class ProductRequest {
    
    private String name;

    private Float price;
}
