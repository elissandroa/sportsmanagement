package com.elissandro.sportsmanagement.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elissandro.sportsmanagement.dtos.MedicalRecordDTO;
import com.elissandro.sportsmanagement.services.MedicalRecordService;

@RestController
@RequestMapping("/medicalrecords")
public class MedicalRecordController {
	
	@Autowired
	private MedicalRecordService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<MedicalRecordDTO> findById(@PathVariable Long id) {
		MedicalRecordDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<MedicalRecordDTO>> findAll() {
		List<MedicalRecordDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
		
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
