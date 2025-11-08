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

import com.elissandro.sportsmanagement.dtos.CompetitionDTO;
import com.elissandro.sportsmanagement.services.CompetitionService;

@RestController
@RequestMapping("/competitions")
public class CompetitionController {
	
	@Autowired
	private CompetitionService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<CompetitionDTO> findById(@PathVariable Long id) {
		CompetitionDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<Page<CompetitionDTO>> findAll(Pageable pageable) {
		Page<CompetitionDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<CompetitionDTO> insert(@RequestBody CompetitionDTO dto) {
		CompetitionDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<CompetitionDTO> update(@PathVariable Long id, @RequestBody CompetitionDTO dto) {
		CompetitionDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
