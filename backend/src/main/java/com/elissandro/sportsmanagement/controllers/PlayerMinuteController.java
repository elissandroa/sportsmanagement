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

import com.elissandro.sportsmanagement.dtos.PlayerMinuteDTO;
import com.elissandro.sportsmanagement.services.PlayerMinuteService;

@RestController
@RequestMapping("/playerminutes")
public class PlayerMinuteController {
	
	@Autowired
	private PlayerMinuteService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<PlayerMinuteDTO> findById(@PathVariable Long id) {
		PlayerMinuteDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<Page<PlayerMinuteDTO>> findAll(Pageable pageable) {
		Page<PlayerMinuteDTO> list = service.findAll(pageable);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<PlayerMinuteDTO> insert(@RequestBody PlayerMinuteDTO dto) {
		PlayerMinuteDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<PlayerMinuteDTO> update(@PathVariable Long id, @RequestBody PlayerMinuteDTO dto) {
		PlayerMinuteDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
