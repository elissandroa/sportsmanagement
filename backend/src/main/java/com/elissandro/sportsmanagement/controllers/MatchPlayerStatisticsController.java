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

import com.elissandro.sportsmanagement.dtos.MatchPlayerStatisticsDTO;
import com.elissandro.sportsmanagement.services.MatchPlayerStatisticsService;

@RestController
@RequestMapping("/match-player-statistics")
public class MatchPlayerStatisticsController {
	
	@Autowired
	private MatchPlayerStatisticsService service;
	
	@GetMapping("/{id}")
	public ResponseEntity<MatchPlayerStatisticsDTO> findById(@PathVariable Long id) {
		MatchPlayerStatisticsDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping
	public ResponseEntity<List<MatchPlayerStatisticsDTO>> findAll() {
		List<MatchPlayerStatisticsDTO> list = service.findAll();
		return ResponseEntity.ok(list);
	}
	
	@PostMapping
	public ResponseEntity<MatchPlayerStatisticsDTO> insert(@RequestBody MatchPlayerStatisticsDTO dto) {
		MatchPlayerStatisticsDTO createdDto = service.insert(dto);
		return ResponseEntity.ok(createdDto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<MatchPlayerStatisticsDTO> update(@PathVariable Long id, @RequestBody MatchPlayerStatisticsDTO dto) {
		MatchPlayerStatisticsDTO updatedDto = service.update(id, dto);
		return ResponseEntity.ok(updatedDto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}
