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

import com.elissandro.sportsmanagement.dtos.PenaltyDTO;
import com.elissandro.sportsmanagement.services.PenaltyService;

@RestController
@RequestMapping("/penalties")
public class PenaltyController {
	
	@Autowired
	private PenaltyService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<PenaltyDTO> findById(@PathVariable Long id) {
		PenaltyDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<PenaltyDTO>> findAll() {
		List<PenaltyDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<PenaltyDTO> insert(@RequestBody PenaltyDTO dto) {
		PenaltyDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<PenaltyDTO> update(@PathVariable Long id, @RequestBody PenaltyDTO dto) {
		PenaltyDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
