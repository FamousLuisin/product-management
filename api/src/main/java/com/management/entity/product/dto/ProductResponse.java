package com.management.entity.product.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor
@Data
public class ProductResponse {
    
    private String name;

    private BigDecimal price;

    private String code;
}
