package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.PainPointDTO;
import com.elissandro.sportsmanagement.repositories.PainPointRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class PainPointService {

	@Autowired
	private PainPointRepository repository;
	

	@Transactional(readOnly = true)
	public PainPointDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PainPoint not found"));
		return new PainPointDTO(entity);
	}

	@Transactional(readOnly = true)
	public List<PainPointDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new PainPointDTO(entity)).toList();
	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("PainPoint not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete PainPoint with id " + id);
		}
	}

}
