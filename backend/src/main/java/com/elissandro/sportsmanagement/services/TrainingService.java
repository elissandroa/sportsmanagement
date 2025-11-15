package com.elissandro.sportsmanagement.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.AttendanceDTO;
import com.elissandro.sportsmanagement.dtos.TrainingDTO;
import com.elissandro.sportsmanagement.entities.Attendance;
import com.elissandro.sportsmanagement.entities.Training;
import com.elissandro.sportsmanagement.repositories.TrainingRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;
import com.elissandro.sportsmanagement.utils.ListUpdater;

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
		Training entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Training not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new TrainingDTO(entity);
	}

	private void copyDtoToEntity(TrainingDTO dto, Training entity) {
		if (dto.getId() != null) {
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
		
		ListUpdater<Attendance> updater = new ListUpdater<>();

		List<Attendance> updated = updater.update(entity.getAttendances(),
				dto.getAttendances().stream().map(AttendanceDTO::toEntity).toList(), entity.getId(),
				(editItem, newItem) -> {
					editItem.setPresent(newItem.getPresent());
					editItem.setObservations(newItem.getObservations());
					editItem.setAthleteId(newItem.getAthleteId());
					editItem.setRecordedAt(LocalDateTime.now());
					editItem.setTraining(entity);
				}, item -> item.setTraining(entity));

		entity.getAttendances().clear();
		entity.getAttendances().addAll(updated);
		
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
