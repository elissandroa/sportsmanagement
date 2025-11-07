package com.elissandro.sportsmanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elissandro.sportsmanagement.dtos.AthleteStatisticsDTO;
import com.elissandro.sportsmanagement.services.AthleteStatisticsService;

@RestController
@RequestMapping("/athlete-statistics")
public class AthleteStatisticsController {
	
	@Autowired
	private AthleteStatisticsService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<AthleteStatisticsDTO> findById(@PathVariable Long id) {
		AthleteStatisticsDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<AthleteStatisticsDTO>> findAll() {
		List<AthleteStatisticsDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<AthleteStatisticsDTO> insert(@RequestBody AthleteStatisticsDTO dto) {
		AthleteStatisticsDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<AthleteStatisticsDTO> update(@PathVariable Long id, @RequestBody AthleteStatisticsDTO dto) {
		AthleteStatisticsDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
