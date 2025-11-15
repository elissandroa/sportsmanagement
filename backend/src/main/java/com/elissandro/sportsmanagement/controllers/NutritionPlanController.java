package com.elissandro.sportsmanagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elissandro.sportsmanagement.dtos.NutritionPlanDTO;
import com.elissandro.sportsmanagement.services.NutritionPlanService;


@RestController
@RequestMapping("/nutrition-plans")
public class NutritionPlanController {
	
	@Autowired
	private NutritionPlanService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<NutritionPlanDTO> findById(@PathVariable Long id) {
		NutritionPlanDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<Page<NutritionPlanDTO>> findAll(Pageable pageable) {
		Page<NutritionPlanDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<NutritionPlanDTO> insert(@RequestBody NutritionPlanDTO dto) {
		NutritionPlanDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<NutritionPlanDTO> update(@PathVariable Long id, @RequestBody NutritionPlanDTO dto) {
		NutritionPlanDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
