package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.AnthropometricDataDTO;
import com.elissandro.sportsmanagement.repositories.AnthropometricDataRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class AnthropometricDataService {
	
	@Autowired	
	private AnthropometricDataRepository repository;
	
	@Transactional(readOnly = true)
	public AnthropometricDataDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AnthropometricData not found"));
		return new AnthropometricDataDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<AnthropometricDataDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new AnthropometricDataDTO(entity)).toList();
	}
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("AnthropometricData not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete AnthropometricData with id " + id);
		}
	}

}
