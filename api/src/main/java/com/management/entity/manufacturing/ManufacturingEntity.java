package com.management.entity.manufacturing;

import com.management.entity.material.MaterialEntity;
import com.management.entity.product.ProductEntity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor
@Entity @Table(name = "tb_manufacturing")
public class ManufacturingEntity extends PanacheEntityBase {
    
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer id;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "product_id", nullable = false)
    public ProductEntity product;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "material_id")
    public MaterialEntity material;

    public Integer quantity;
}
