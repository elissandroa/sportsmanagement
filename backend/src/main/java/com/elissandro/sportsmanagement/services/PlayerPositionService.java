package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.PlayerPositionDTO;
import com.elissandro.sportsmanagement.entities.PlayerPosition;
import com.elissandro.sportsmanagement.repositories.PlayerPositionRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class PlayerPositionService {
	
	@Autowired	
	private PlayerPositionRepository repository;
	
	@Transactional(readOnly = true)
	public PlayerPositionDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Player Position not found"));
		return new PlayerPositionDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<PlayerPositionDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new PlayerPositionDTO(entity)).toList();
	}
	
	@Transactional
	public PlayerPositionDTO insert(PlayerPositionDTO dto) {
		PlayerPosition entity = new PlayerPosition();
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new PlayerPositionDTO(entity);
	}
	
	@Transactional
	public PlayerPositionDTO update(Long id, PlayerPositionDTO dto) {
		PlayerPosition entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Player Position not found"));
		entity.setName(dto.getName());
		entity = repository.save(entity);
		return new PlayerPositionDTO(entity);
	}
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Player Position not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Player Position with id " + id);
		}
	}

}
