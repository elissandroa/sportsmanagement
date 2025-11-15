package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;

import com.elissandro.sportsmanagement.entities.MealPlan;

public class MealPlanDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String meal;
	private String time;
	private String foods;
	private Integer calories;
	private String instructions;
	
	public MealPlanDTO() {
	}
	
	public MealPlanDTO(Long id, String meal, String time, String foods, Integer calories, String instructions) {
		this.id = id;
		this.meal = meal;
		this.time = time;
		this.foods = foods;
		this.calories = calories;
		this.instructions = instructions;
	}
	
	public MealPlanDTO(MealPlan entity) {
		this.id = entity.getId();
		this.meal = entity.getMeal();
		this.time = entity.getTime();
		this.foods = entity.getFoods();
		this.calories = entity.getCalories();
		this.instructions = entity.getInstructions();
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
}
