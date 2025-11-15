package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_meal_plans")
public class MealPlan implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String meal;
	private String time;
	private String foods;
	private Integer calories;
	private String instructions;
	
	@ManyToOne	
	@JoinColumn(name = "nutrition_plan_id")
	private NutritionPlan nutritionPlan;
	
	public MealPlan() {
	}
	
	public MealPlan(Long id, String meal, String time, String foods, Integer calories, String instructions) {
		this.id = id;
		this.meal = meal;
		this.time = time;
		this.foods = foods;
		this.calories = calories;
		this.instructions = instructions;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMeal() {
		return meal;
	}

	public void setMeal(String meal) {
		this.meal = meal;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getFoods() {
		return foods;
	}

	public void setFoods(String foods) {
		this.foods = foods;
	}

	public Integer getCalories() {
		return calories;
	}

	public void setCalories(Integer calories) {
		this.calories = calories;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	
	public void setNutritionPlan(NutritionPlan entity) {
		this.nutritionPlan = entity;
		
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
		MealPlan other = (MealPlan) obj;
		return Objects.equals(id, other.id);
	}

}
