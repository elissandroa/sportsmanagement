package com.elissandro.sportsmanagement.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.elissandro.sportsmanagement.entities.MealPlan;
import com.elissandro.sportsmanagement.entities.NutritionPlan;

public class NutritionPlanDTO {

	private Long id;
	private Long athleteId;
	private String type;
	private Integer calories;
	private Integer protein;
	private Integer carbs;
	private Integer fats;
	private Float water;
	private String supplements;
	private String restrictions;
	private LocalDate startDate;
	private LocalDate endDate;
	private String nutritionist;
	private Boolean active;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	private List<MealPlan> mealPlans = new ArrayList<>();
	
	public NutritionPlanDTO() {
	}
	
	public NutritionPlanDTO(Long id, Long athleteId, String type, Integer calories, Integer protein, Integer carbs,
			Integer fats, Float water, String supplements, String restrictions, LocalDate startDate, LocalDate endDate,
			String nutritionist, Boolean active) {
		this.id = id;
		this.athleteId = athleteId;
		this.type = type;
		this.calories = calories;
		this.protein = protein;
		this.carbs = carbs;
		this.fats = fats;
		this.water = water;
		this.supplements = supplements;
		this.restrictions = restrictions;
		this.startDate = startDate;
		this.endDate = endDate;
		this.nutritionist = nutritionist;
		this.active = active;
	}
	
	public NutritionPlanDTO(NutritionPlan entity) {
		this.id = entity.getId();
		this.athleteId = entity.getAthleteId();
		this.type = entity.getType();
		this.calories = entity.getCalories();
		this.protein = entity.getProtein();
		this.carbs = entity.getCarbs();
		this.fats = entity.getFats();
		this.water = entity.getWater();
		this.supplements = entity.getSupplements();
		this.restrictions = entity.getRestrictions();
		this.startDate = entity.getStartDate();
		this.endDate = entity.getEndDate();
		this.nutritionist = entity.getNutritionist();
		this.active = entity.getActive();
		this.createdAt = entity.getCreatedAt();
		this.updatedAt = entity.getUpdatedAt();
		entity.getMealPlans().forEach(mealPlan -> this.mealPlans.add(mealPlan));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAthleteId() {
		return athleteId;
	}

	public void setAthleteId(Long athleteId) {
		this.athleteId = athleteId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getCalories() {
		return calories;
	}

	public void setCalories(Integer calories) {
		this.calories = calories;
	}

	public Integer getProtein() {
		return protein;
	}

	public void setProtein(Integer protein) {
		this.protein = protein;
	}

	public Integer getCarbs() {
		return carbs;
	}

	public void setCarbs(Integer carbs) {
		this.carbs = carbs;
	}

	public Integer getFats() {
		return fats;
	}

	public void setFats(Integer fats) {
		this.fats = fats;
	}

	public Float getWater() {
		return water;
	}

	public void setWater(Float water) {
		this.water = water;
	}

	public String getSupplements() {
		return supplements;
	}

	public void setSupplements(String supplements) {
		this.supplements = supplements;
	}

	public String getRestrictions() {
		return restrictions;
	}

	public void setRestrictions(String restrictions) {
		this.restrictions = restrictions;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public String getNutritionist() {
		return nutritionist;
	}

	public void setNutritionist(String nutritionist) {
		this.nutritionist = nutritionist;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public List<MealPlan> getMealPlans() {
		return mealPlans;
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
