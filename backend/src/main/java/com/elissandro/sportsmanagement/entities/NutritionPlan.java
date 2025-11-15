package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.elissandro.sportsmanagement.entities.base.BaseEntityAudit;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_nutrition_plans")
public class NutritionPlan extends BaseEntityAudit implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	@OneToMany(mappedBy = "nutritionPlan", cascade = CascadeType.ALL, orphanRemoval = true)	
	private Set<MealPlan> mealPlans = new HashSet<>();
	
	public NutritionPlan() {
	}
	
	public NutritionPlan(Long id, Long athleteId, String type, Integer calories, Integer protein, Integer carbs,
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

	public Set<MealPlan> getMealPlans() {
		return mealPlans;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		NutritionPlan other = (NutritionPlan) obj;
		return Objects.equals(id, other.id);
	}
	
}
