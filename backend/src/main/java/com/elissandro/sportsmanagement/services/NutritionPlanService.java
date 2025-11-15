package com.elissandro.sportsmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.NutritionPlanDTO;
import com.elissandro.sportsmanagement.entities.Athlete;
import com.elissandro.sportsmanagement.entities.MealPlan;
import com.elissandro.sportsmanagement.entities.NutritionPlan;
import com.elissandro.sportsmanagement.repositories.AthleteRepository;
import com.elissandro.sportsmanagement.repositories.NutritionPlanRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class NutritionPlanService {

	@Autowired
	private NutritionPlanRepository repository;
	
	@Autowired
	private AthleteRepository athleteRepository;

	@Transactional(readOnly = true)
	public NutritionPlanDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("NutritionPlan not found"));
		return new NutritionPlanDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<NutritionPlanDTO> findAll(Pageable pageable) {
		var list = repository.findAll(pageable);
		return list.map(entity -> new NutritionPlanDTO(entity));
	}

	@Transactional
	public NutritionPlanDTO insert(NutritionPlanDTO dto) {
		NutritionPlan entity = new NutritionPlan();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new NutritionPlanDTO(entity);
	}

	@Transactional
	public NutritionPlanDTO update(Long id, NutritionPlanDTO dto) {
		NutritionPlan entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("NutritionPlan not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new NutritionPlanDTO(entity);
	}

	private void copyDtoToEntity(NutritionPlanDTO dto, NutritionPlan entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		Athlete athlete = athleteRepository.findById(dto.getAthleteId())
				.orElseThrow(() -> new ResourceNotFoundException("Athlete not found"));
		
		entity.setActive(dto.getActive());
		entity.setAthleteId(athlete.getId());
		entity.setCalories(dto.getCalories());
		entity.setCarbs(dto.getCarbs());
		entity.setFats(dto.getFats());
		entity.setProtein(dto.getProtein());
		entity.setType(dto.getType());
		entity.setNutritionist(dto.getNutritionist());
		entity.getMealPlans().clear();
		entity.getMealPlans().addAll(dto.getMealPlans());
		entity.setStartDate(dto.getStartDate());
		entity.setEndDate(dto.getEndDate());
		entity.setRestrictions(dto.getRestrictions());
		entity.getMealPlans().clear();
		for (MealPlan mealPlan : dto.getMealPlans()) {
			MealPlan mp = new MealPlan();
			if(mealPlan.getId() != null) {
				mp.setId(mealPlan.getId());
			}
			mp.setCalories(mealPlan.getCalories());
			mp.setFoods(mealPlan.getFoods());
			mp.setInstructions(mealPlan.getInstructions());
			mp.setMeal(mealPlan.getMeal());
			mp.setTime(mealPlan.getTime());
			mp.setNutritionPlan(entity);
			entity.getMealPlans().add(mp);
			
		}
	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("NutritionPlan not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete NutritionPlan with id " + id);
		}
	}

}
