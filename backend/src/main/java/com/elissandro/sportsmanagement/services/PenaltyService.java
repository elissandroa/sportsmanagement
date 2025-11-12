package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.PenaltyDTO;
import com.elissandro.sportsmanagement.entities.Penalty;
import com.elissandro.sportsmanagement.repositories.PenaltyRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class PenaltyService {

	@Autowired
	private PenaltyRepository repository;

	@Transactional(readOnly = true)
	public PenaltyDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Penalty not found"));
		return new PenaltyDTO(entity);
	}

	@Transactional(readOnly = true)
	public List<PenaltyDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new PenaltyDTO(entity)).toList();
	}

	@Transactional
	public PenaltyDTO insert(PenaltyDTO dto) {
		Penalty entity = new Penalty();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PenaltyDTO(entity);
	}

	@Transactional
	public PenaltyDTO update(Long id, PenaltyDTO dto) {
		Penalty entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Penalty not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PenaltyDTO(entity);
	}

	private void copyDtoToEntity(PenaltyDTO dto, Penalty entity) {
		if (dto.getId() != null) {
			entity.setId(dto.getId());
		}
		
		entity.setDate(dto.getDate());
		entity.setReason(dto.getReason());
		entity.setSuspentionGames(dto.getSuspentionGames());
		entity.setServed(dto.getServed());
		entity.setType(dto.getType());
		
	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Penalty not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Penalty with id " + id);
		}
	}

}
