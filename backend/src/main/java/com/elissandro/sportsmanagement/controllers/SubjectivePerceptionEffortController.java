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

import com.elissandro.sportsmanagement.dtos.SubjectivePerceptionEffortDTO;
import com.elissandro.sportsmanagement.services.SubjectivePerceptionEffortService;

@RestController
@RequestMapping("/pses")
public class SubjectivePerceptionEffortController {
	
	@Autowired
	private SubjectivePerceptionEffortService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<SubjectivePerceptionEffortDTO> findById(@PathVariable Long id) {
		SubjectivePerceptionEffortDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<SubjectivePerceptionEffortDTO>> findAll() {
		List<SubjectivePerceptionEffortDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<SubjectivePerceptionEffortDTO> insert(@RequestBody SubjectivePerceptionEffortDTO dto) {
		SubjectivePerceptionEffortDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<SubjectivePerceptionEffortDTO> update(@PathVariable Long id, @RequestBody SubjectivePerceptionEffortDTO dto) {
		SubjectivePerceptionEffortDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
