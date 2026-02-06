package com.management.entity.material;

import java.util.UUID;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity @Table(name = "tb_materials")
@NoArgsConstructor @AllArgsConstructor
public class MaterialEntity extends PanacheEntityBase {
    
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    public UUID id;
    public String code;
    public String name;
    public Integer quantity;
}
