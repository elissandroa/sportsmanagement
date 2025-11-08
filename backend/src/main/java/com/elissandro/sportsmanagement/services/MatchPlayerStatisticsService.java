package com.elissandro.sportsmanagement.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.MatchPlayerStatisticsDTO;
import com.elissandro.sportsmanagement.entities.Athlete;
import com.elissandro.sportsmanagement.entities.MatchPlayerStatistics;
import com.elissandro.sportsmanagement.repositories.AthleteRepository;
import com.elissandro.sportsmanagement.repositories.MatchPlayerStatisticsRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class MatchPlayerStatisticsService {

	@Autowired
	private MatchPlayerStatisticsRepository repository;

	@Autowired
	private AthleteRepository athleteRepository;

	@Transactional(readOnly = true)
	public MatchPlayerStatisticsDTO findById(Long id) {
		var entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("MatchPlayerStatistics not found"));
		return new MatchPlayerStatisticsDTO(entity);
	}

	@Transactional(readOnly = true)
	public List<MatchPlayerStatisticsDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new MatchPlayerStatisticsDTO(entity)).toList();
	}

	@Transactional
	public MatchPlayerStatisticsDTO insert(MatchPlayerStatisticsDTO dto) {
		MatchPlayerStatistics entity = new MatchPlayerStatistics();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MatchPlayerStatisticsDTO(entity);
	}

	@Transactional
	public MatchPlayerStatisticsDTO update(Long id, MatchPlayerStatisticsDTO dto) {
		MatchPlayerStatistics entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("MatchPlayerStatistics not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MatchPlayerStatisticsDTO(entity);
	}

	private void copyDtoToEntity(MatchPlayerStatisticsDTO dto, MatchPlayerStatistics entity) {
		if (dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setAthlete(
				dto.getAthleteId() != null
						? athleteRepository.findById(dto.getAthleteId())
								.orElseThrow(() -> new ResourceNotFoundException("Athlete not found"))
						: null);
		entity.setMatch(dto.getMatch());
		entity.setAssists(dto.getAssists());
		entity.setGoals(dto.getGoals());
		entity.setMinutesPlayed(dto.getMinutesPlayed());
		entity.setYellowCards(dto.getYellowCards());
		entity.setRedCards(dto.getRedCards());
		entity.setPassesCompleted(dto.getPassesCompleted());
		entity.setPasses(dto.getPasses());
		entity.setTackles(dto.getTackles());
		entity.setInterceptions(dto.getInterceptions());
		entity.setRecordedAt(LocalDateTime.now());

	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("MatchPlayerStatistics not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete MatchPlayerStatistics with id " + id);
		}
	}

}
