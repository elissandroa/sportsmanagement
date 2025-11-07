package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.elissandro.sportsmanagement.entities.Opponent;

public class OpponentDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String city;
	private String state;
	private String stadium;
	private String logoUrl;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	private List<CategoryDTO> categories = new ArrayList<>();
	
	public OpponentDTO() {
	}
	
	public OpponentDTO(Long id, String name, String city, String state, String stadium, String logoUrl) {
		this.id = id;
		this.name = name;
		this.city = city;
		this.state = state;
		this.stadium = stadium;
		this.logoUrl = logoUrl;
	}
	
	public OpponentDTO(Opponent entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.city =  entity.getCity();
		this.state = entity.getState();
		this.stadium = entity.getStadium();
		this.logoUrl = entity.getLogoUrl();
		this.createdAt = entity.getCreatedAt();
		this.updatedAt = entity.getUpdatedAt();
		entity.getCategories().forEach(cat -> this.categories.add(new CategoryDTO(cat)));
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
	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getStadium() {
		return stadium;
	}

	public void setStadium(String stadium) {
		this.stadium = stadium;
	}

	public String getLogoUrl() {
		return logoUrl;
	}

	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
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
