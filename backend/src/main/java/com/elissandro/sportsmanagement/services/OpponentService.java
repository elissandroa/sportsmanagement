package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.OpponentDTO;
import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.Opponent;
import com.elissandro.sportsmanagement.repositories.OpponentRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class OpponentService {

	@Autowired
	private OpponentRepository repository;

	@Transactional(readOnly = true)
	public OpponentDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Opponent not found"));
		return new OpponentDTO(entity);
	}

	@Transactional(readOnly = true)
	public List<OpponentDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new OpponentDTO(entity)).toList();
	}

	@Transactional
	public OpponentDTO insert(OpponentDTO dto) {
		Opponent entity = new Opponent();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new OpponentDTO(entity);
	}

	@Transactional
	public OpponentDTO update(Long id, OpponentDTO dto) {
		Opponent entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Opponent not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new OpponentDTO(entity);
	}

	private void copyDtoToEntity(OpponentDTO dto, Opponent entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setName(dto.getName());
		entity.setCity(dto.getCity());
		entity.setState(dto.getState());
		entity.setStadium(dto.getStadium());
		entity.setLogoUrl(dto.getLogoUrl());
		entity.getCategories().clear();
		dto.getCategories().forEach(catDto -> {
			var category = new Category();
			category.setId(catDto.getId());
			entity.getCategories().add(category);
		});
		

	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Opponent not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Opponent with id " + id);
		}
	}

}
