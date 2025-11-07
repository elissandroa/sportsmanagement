package com.elissandro.sportsmanagement.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.AthleteStatisticsDTO;
import com.elissandro.sportsmanagement.entities.AthleteStatistics;
import com.elissandro.sportsmanagement.repositories.AthleteStatisticsRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class AthleteStatisticsService {
	
	@Autowired	
	private AthleteStatisticsRepository repository;
	
	@Transactional(readOnly = true)
	public AthleteStatisticsDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AthleteStatistics not found"));
		return new AthleteStatisticsDTO(entity);
	}
	
	@Transactional(readOnly = true)	
	public List<AthleteStatisticsDTO> findAll() {
		var list = repository.findAll();
		return list.stream().map(entity -> new AthleteStatisticsDTO(entity)).toList();
	}
	
	@Transactional
	public AthleteStatisticsDTO insert(AthleteStatisticsDTO dto) {
		AthleteStatistics entity = new AthleteStatistics();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AthleteStatisticsDTO(entity);
	}
	
	@Transactional
	public AthleteStatisticsDTO update(Long id, AthleteStatisticsDTO dto) {
		AthleteStatistics entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("AthleteStatistics not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AthleteStatisticsDTO(entity);
	}
	
	private void copyDtoToEntity(AthleteStatisticsDTO dto, AthleteStatistics entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setMatchesPlayed(dto.getMatchesPlayed());
		entity.setMinutesPlayed(dto.getMinutesPlayed());
		entity.setGoalsScored(dto.getGoalsScored());
		entity.setAssists(dto.getAssists());
		entity.setYellowCards(dto.getYellowCards());
		entity.setRedCards(dto.getRedCards());
		entity.setInjuries(dto.getInjuries());
		entity.setAveragePse(dto.getAveragePse());
		entity.setAveragePsr(dto.getAveragePsr());
		entity.setLastUpdated(dto.getLastUpdated());
	}
	
	
	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("AthleteStatistics not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete AthleteStatistics with id " + id);
		}
	}

}
