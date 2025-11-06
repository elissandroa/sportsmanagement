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

import com.elissandro.sportsmanagement.dtos.PlayerPositionDTO;
import com.elissandro.sportsmanagement.services.PlayerPositionService;

@RestController
@RequestMapping("/player-positions")
public class PlayerPositionController {
	
	@Autowired
	private PlayerPositionService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<PlayerPositionDTO> findById(@PathVariable Long id) {
		PlayerPositionDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<PlayerPositionDTO>> findAll() {
		List<PlayerPositionDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<PlayerPositionDTO> insert(@RequestBody PlayerPositionDTO dto) {
		PlayerPositionDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<PlayerPositionDTO> update(@PathVariable Long id, @RequestBody PlayerPositionDTO dto) {
		PlayerPositionDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
