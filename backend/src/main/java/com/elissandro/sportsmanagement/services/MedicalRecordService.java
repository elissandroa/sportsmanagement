package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.MedicalRecordDTO;
import com.elissandro.sportsmanagement.repositories.MedicalRecordRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class MedicalRecordService {
	
	@Autowired	
	private MedicalRecordRepository repository;
	
	@Transactional(readOnly = true)
	public MedicalRecordDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MedicalRecord not found"));
		return new MedicalRecordDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<MedicalRecordDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new MedicalRecordDTO(entity)).toList();
	}
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("MedicalRecord not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete MedicalRecord with id " + id);
		}
	}

}
