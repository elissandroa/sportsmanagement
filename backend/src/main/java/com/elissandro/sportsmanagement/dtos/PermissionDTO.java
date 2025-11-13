package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;

public class PermissionDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String description;
	private String module;
	private Boolean active;
	
	public PermissionDTO() {
	}
	
	public PermissionDTO(Long id, String name, String description, String module, Boolean active) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.module = module;
		this.active = active;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getModule() {
		return module;
	}

	public void setModule(String module) {
		this.module = module;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}
}
