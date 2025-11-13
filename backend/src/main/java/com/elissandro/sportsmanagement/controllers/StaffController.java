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

import com.elissandro.sportsmanagement.dtos.StaffDTO;
import com.elissandro.sportsmanagement.services.StaffService;

@RestController
@RequestMapping("/staffs")
public class StaffController {
	
	@Autowired
	private StaffService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<StaffDTO> findById(@PathVariable Long id) {
		StaffDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<Page<StaffDTO>> findAll(Pageable pageable) {
		Page<StaffDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<StaffDTO> insert(@RequestBody StaffDTO dto) {
		StaffDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<StaffDTO> update(@PathVariable Long id, @RequestBody StaffDTO dto) {
		StaffDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
