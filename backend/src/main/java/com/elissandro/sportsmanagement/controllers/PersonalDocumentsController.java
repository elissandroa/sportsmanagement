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

import com.elissandro.sportsmanagement.dtos.PersonalDocumentsDTO;
import com.elissandro.sportsmanagement.services.PersonalDocumentsService;

@RestController
@RequestMapping("/personal-documents")
public class PersonalDocumentsController {
	
	@Autowired
	private PersonalDocumentsService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<PersonalDocumentsDTO> findById(@PathVariable Long id) {
		PersonalDocumentsDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<PersonalDocumentsDTO>> findAll() {
		List<PersonalDocumentsDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<PersonalDocumentsDTO> insert(@RequestBody PersonalDocumentsDTO dto) {
		PersonalDocumentsDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<PersonalDocumentsDTO> update(@PathVariable Long id, @RequestBody PersonalDocumentsDTO dto) {
		PersonalDocumentsDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
