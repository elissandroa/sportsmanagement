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

import com.elissandro.sportsmanagement.dtos.AddressAthleteDTO;
import com.elissandro.sportsmanagement.services.AddressAthelteService;

@RestController
@RequestMapping("/addresses")
public class AddressAthleteController {
	
	@Autowired
	private AddressAthelteService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<AddressAthleteDTO> findById(@PathVariable Long id) {
		AddressAthleteDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<AddressAthleteDTO>> findAll() {
		List<AddressAthleteDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<AddressAthleteDTO> insert(@RequestBody AddressAthleteDTO dto) {
		AddressAthleteDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<AddressAthleteDTO> update(@PathVariable Long id, @RequestBody AddressAthleteDTO dto) {
		AddressAthleteDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
