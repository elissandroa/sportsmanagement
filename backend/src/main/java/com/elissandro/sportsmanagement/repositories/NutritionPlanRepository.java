package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.NutritionPlan;

public interface NutritionPlanRepository extends JpaRepository<NutritionPlan, Long> {

}
