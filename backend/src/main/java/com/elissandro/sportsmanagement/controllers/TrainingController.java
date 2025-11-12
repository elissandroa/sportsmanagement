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

import com.elissandro.sportsmanagement.dtos.TrainingDTO;
import com.elissandro.sportsmanagement.services.TrainingService;

@RestController
@RequestMapping("/trainings")
public class TrainingController {
	
	@Autowired
	private TrainingService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<TrainingDTO> findById(@PathVariable Long id) {
		TrainingDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<Page<TrainingDTO>> findAll(Pageable pageable) {
		Page<TrainingDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<TrainingDTO> insert(@RequestBody TrainingDTO dto) {
		TrainingDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<TrainingDTO> update(@PathVariable Long id, @RequestBody TrainingDTO dto) {
		TrainingDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
