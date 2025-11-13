package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.Permission;
import com.elissandro.sportsmanagement.entities.Staff;

public class StaffDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private String role;
	private String email;
	private String phone;
	private LocalDate hireDate;
	private Double salary;
	private Boolean active;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	private List<Category> categories = new ArrayList<>();
	
	
	private List<Permission> permissions = new ArrayList<>();
	
	public StaffDTO() {
	}
	
	public StaffDTO(Long id, String name, String role, String email, String phone, LocalDate hireDate, Double salary, Boolean active) {
		this.id = id;
		this.name = name;
		this.role = role;
		this.email = email;
		this.phone = phone;
		this.hireDate = hireDate;
		this.salary = salary;
		this.active = active;
	}
	
	public StaffDTO(Staff entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.role = entity.getRole();
		this.email = entity.getEmail();
		this.phone = entity.getPhone();
		this.hireDate = entity.getHireDate();
		this.salary = entity.getSalary();
		this.active = entity.getActive();
		this.createdAt = entity.getCreatedAt();
		this.updatedAt = entity.getUpdatedAt();
		entity.getCategories().forEach(cat -> this.categories.add(cat));
		entity.getPermissions().forEach(perm -> this.permissions.add(perm));
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

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public LocalDate getHireDate() {
		return hireDate;
	}

	public void setHireDate(LocalDate hireDate) {
		this.hireDate = hireDate;
	}

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public List<Permission> getPermissions() {
		return permissions;
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
}
