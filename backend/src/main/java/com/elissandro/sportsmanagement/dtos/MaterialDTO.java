package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.Material;
import com.elissandro.sportsmanagement.enums.MaterialType;

public class MaterialDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private MaterialType type;
	private Integer quantity;
	private String size;
	private String condition;
	private LocalDate purchaseDate;
	private Double cost;
	private String supplier;
	private Boolean isAvailable;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	private List<CategoryDTO> categories = new ArrayList<>();
	

	public MaterialDTO() {
	}
	
	public MaterialDTO(Long id, String name, MaterialType type, Integer quantity, String size, String condition,
			LocalDate purchaseDate, Double cost, String supplier, Boolean isAvailable, LocalDateTime createdAt,
			LocalDateTime updatedAt) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.quantity = quantity;
		this.size = size;
		this.condition = condition;
		this.purchaseDate = purchaseDate;
		this.cost = cost;
		this.supplier = supplier;
		this.isAvailable = isAvailable;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	
	public MaterialDTO(Material entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.type = entity.getType();
		this.quantity = entity.getQuantity();
		this.size = entity.getSize();
		this.condition = entity.getCondition();
		this.purchaseDate = entity.getPurchaseDate();
		this.cost = entity.getCost();
		this.supplier = entity.getSupplier();
		this.isAvailable = entity.getIsAvailable();
		this.createdAt = entity.getCreatedAt();
		this.updatedAt = entity.getUpdatedAt();
	}	
	
	public MaterialDTO(Material entity, Set<Category> categories) {
		this(entity);
		categories.forEach(cat -> this.categories.add(new CategoryDTO(cat)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public MaterialType getType() {
		return type;
	}

	public void setType(MaterialType type) {
		this.type = type;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public LocalDate getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(LocalDate purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public Boolean getIsAvailable() {
		return isAvailable;
	}

	public void setIsAvailable(Boolean isAvailable) {
		this.isAvailable = isAvailable;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public List<CategoryDTO> getCategories() {
		return categories;
	}
}
