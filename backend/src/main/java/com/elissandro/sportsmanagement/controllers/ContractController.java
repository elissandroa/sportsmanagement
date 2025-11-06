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

import com.elissandro.sportsmanagement.dtos.ContractDTO;
import com.elissandro.sportsmanagement.services.ContractService;

@RestController
@RequestMapping("/contracts")
public class ContractController {
	
	@Autowired
	private ContractService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<ContractDTO> findById(@PathVariable Long id) {
		ContractDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<ContractDTO>> findAll() {
		List<ContractDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<ContractDTO> insert(@RequestBody ContractDTO dto) {
		ContractDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ContractDTO> update(@PathVariable Long id, @RequestBody ContractDTO dto) {
		ContractDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
