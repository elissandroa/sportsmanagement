package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.MealPlan;

public interface MealPlanRepository extends JpaRepository<MealPlan, Long> {

}
