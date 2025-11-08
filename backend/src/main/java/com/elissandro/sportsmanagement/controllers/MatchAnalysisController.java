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

import com.elissandro.sportsmanagement.dtos.MatchAnalysisDTO;
import com.elissandro.sportsmanagement.services.MatchAnalysisService;

@RestController
@RequestMapping("/match-analyses")
public class MatchAnalysisController {
	
	@Autowired
	private MatchAnalysisService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<MatchAnalysisDTO> findById(@PathVariable Long id) {
		MatchAnalysisDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<Page<MatchAnalysisDTO>> findAll(Pageable pageable) {
		Page<MatchAnalysisDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<MatchAnalysisDTO> insert(@RequestBody MatchAnalysisDTO dto) {
		MatchAnalysisDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<MatchAnalysisDTO> update(@PathVariable Long id, @RequestBody MatchAnalysisDTO dto) {
		MatchAnalysisDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
