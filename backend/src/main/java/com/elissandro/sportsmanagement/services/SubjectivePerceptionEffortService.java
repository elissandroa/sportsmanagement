package com.elissandro.sportsmanagement.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.SubjectivePerceptionEffortDTO;
import com.elissandro.sportsmanagement.entities.Athlete;
import com.elissandro.sportsmanagement.entities.SubjectivePerceptionEffort;
import com.elissandro.sportsmanagement.repositories.AthleteRepository;
import com.elissandro.sportsmanagement.repositories.SubjectivePerceptionEffortRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class SubjectivePerceptionEffortService {
	
	@Autowired	
	private SubjectivePerceptionEffortRepository repository;
	
	@Autowired
	private AthleteRepository athleteRepository;
	
	
	@Transactional(readOnly = true)
	public SubjectivePerceptionEffortDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PSE not found"));
		return new SubjectivePerceptionEffortDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public List<SubjectivePerceptionEffortDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new SubjectivePerceptionEffortDTO(entity)).toList();
	}
	
	@Transactional
	public SubjectivePerceptionEffortDTO insert(SubjectivePerceptionEffortDTO dto) {
		SubjectivePerceptionEffort entity = new SubjectivePerceptionEffort();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SubjectivePerceptionEffortDTO(entity);
	}
	
	@Transactional
	public SubjectivePerceptionEffortDTO update(Long id, SubjectivePerceptionEffortDTO dto) {
		SubjectivePerceptionEffort entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PSE not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new SubjectivePerceptionEffortDTO(entity);
	}
	
	private void copyDtoToEntity(SubjectivePerceptionEffortDTO dto, SubjectivePerceptionEffort entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setDate(LocalDate.now());
		entity.setPseValue(dto.getPseValue());
		entity.setDuration(dto.getDuration());
		entity.setObservations(dto.getObservations());
		entity.setRecordedBy(dto.getRecordedBy());
		entity.setRecordedAt(LocalDate.now());
		entity.setValid(dto.isValid());
		Athlete athlete = athleteRepository.findById(dto.getAthlete().getId())
				.orElseThrow(() -> new ResourceNotFoundException("Athlete not found"));
		entity.setAthlete(athlete);
		
		
	}
	
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("PSE not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete PSE with id " + id);
		}
	}

}
