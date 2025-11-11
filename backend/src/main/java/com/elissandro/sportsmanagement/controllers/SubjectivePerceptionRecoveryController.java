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

import com.elissandro.sportsmanagement.dtos.SubjectivePerceptionRecoveryDTO;
import com.elissandro.sportsmanagement.services.SubjectivePerceptionRecoveryService;

@RestController
@RequestMapping("/psres")
public class SubjectivePerceptionRecoveryController {
	
	@Autowired
	private SubjectivePerceptionRecoveryService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<SubjectivePerceptionRecoveryDTO> findById(@PathVariable Long id) {
		SubjectivePerceptionRecoveryDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<Page<SubjectivePerceptionRecoveryDTO>> findAll(Pageable pageable) {
		Page<SubjectivePerceptionRecoveryDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<SubjectivePerceptionRecoveryDTO> insert(@RequestBody SubjectivePerceptionRecoveryDTO dto) {
		SubjectivePerceptionRecoveryDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<SubjectivePerceptionRecoveryDTO> update(@PathVariable Long id, @RequestBody SubjectivePerceptionRecoveryDTO dto) {
		SubjectivePerceptionRecoveryDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
