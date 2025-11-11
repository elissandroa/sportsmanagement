package com.elissandro.sportsmanagement.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.SubjectivePerceptionRecoveryDTO;
import com.elissandro.sportsmanagement.entities.SubjectivePerceptionRecovery;
import com.elissandro.sportsmanagement.repositories.SubjectivePerceptionRecoveryRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class SubjectivePerceptionRecoveryService {

	@Autowired
	private SubjectivePerceptionRecoveryRepository repository;


	@Transactional(readOnly = true)
	public SubjectivePerceptionRecoveryDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Subjective Perception Recovery not found"));
		return new SubjectivePerceptionRecoveryDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<SubjectivePerceptionRecoveryDTO> findAll(Pageable pageable) {
		Page<SubjectivePerceptionRecovery> page = repository.findAll(pageable);
		return page.map(entity -> new SubjectivePerceptionRecoveryDTO(entity));
	}

	@Transactional
	public SubjectivePerceptionRecoveryDTO insert(SubjectivePerceptionRecoveryDTO dto) {
		SubjectivePerceptionRecovery entity = new SubjectivePerceptionRecovery();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SubjectivePerceptionRecoveryDTO(entity);
	}

	@Transactional
	public SubjectivePerceptionRecoveryDTO update(Long id, SubjectivePerceptionRecoveryDTO dto) {
		SubjectivePerceptionRecovery entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SubjectivePerceptionRecovery not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SubjectivePerceptionRecoveryDTO(entity);
	}

	private void copyDtoToEntity(SubjectivePerceptionRecoveryDTO dto, SubjectivePerceptionRecovery entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setType(dto.getType());
		entity.setDate(dto.getDate());
		entity.setPsrValue(dto.getPsrValue());
		entity.setObservations(dto.getObservations());
		entity.setRecordedBy(dto.getRecordedBy());
		entity.setCreatedAt(LocalDate.now()); 
		entity.setFatiqueLevel(dto.getFatiqueLevel());
		entity.setMotivationLevel(dto.getMotivationLevel());
		entity.setStressLevel(dto.getStressLevel());
		entity.setSleepHours(dto.getSleepHours());
		entity.setSleepQuality(dto.getSleepQuality());
		entity.setMuscleAching(dto.getMuscleAching());
		entity.setHydrationLevel(dto.getHydrationLevel());
		entity.setAppetiteLevel(dto.getAppetiteLevel());
		entity.setNotes(dto.getNotes());
		entity.setIsValid(dto.getIsValid());

		
	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Subjective Perception Recovery not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Subjective Perception Recovery with id " + id);
		}
	}

}
