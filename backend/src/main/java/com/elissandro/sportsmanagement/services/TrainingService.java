package com.elissandro.sportsmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.TrainingDTO;
import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.Training;
import com.elissandro.sportsmanagement.repositories.TrainingRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class TrainingService {

	@Autowired
	private TrainingRepository repository;

	@Transactional(readOnly = true)
	public TrainingDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Training not found"));
		return new TrainingDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<TrainingDTO> findAll(Pageable pageable) {
		var list = repository.findAll(pageable);
		return list.map(entity -> new TrainingDTO(entity));
	}

	@Transactional
	public TrainingDTO insert(TrainingDTO dto) {
		Training entity = new Training();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new TrainingDTO(entity);
	}

	@Transactional
	public TrainingDTO update(Long id, TrainingDTO dto) {
		Training entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Training not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new TrainingDTO(entity);
	}

	private void copyDtoToEntity(TrainingDTO dto, Training entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setTrainingNumber(dto.getTrainingNumber());
		entity.setDate(dto.getDate());
		entity.setTime(dto.getTime());
		entity.setMesoCycleNumber(dto.getMesoCycleNumber());
		entity.setMicroCycleNumber(dto.getMicroCycleNumber());
		entity.setMacroCycleNumber(dto.getMacroCycleNumber());
		entity.setPlayerCount(dto.getPlayerCount());
		entity.setObjective(dto.getObjective());
		entity.setScheduledBy(dto.getScheduledBy());
		entity.setStatus(dto.getStatus());
	
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
			throw new ResourceNotFoundException("Training not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Training with id " + id);
		}
	}

}
