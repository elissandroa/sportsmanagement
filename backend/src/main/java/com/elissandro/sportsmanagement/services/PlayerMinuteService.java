package com.elissandro.sportsmanagement.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.AthleteDTO;
import com.elissandro.sportsmanagement.dtos.PlayerMinuteDTO;
import com.elissandro.sportsmanagement.entities.PlayerMinute;
import com.elissandro.sportsmanagement.repositories.AthleteRepository;
import com.elissandro.sportsmanagement.repositories.PlayerMinuteRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class PlayerMinuteService {

	@Autowired
	private PlayerMinuteRepository repository;

	@Autowired
	private AthleteRepository athleteRepository;

	@Transactional(readOnly = true)
	public PlayerMinuteDTO findById(Long id) {
		var entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Player Minute not found"));
		return new PlayerMinuteDTO(entity, entity.getPlayerId(), entity.getMatchId());
	}

	@Transactional(readOnly = true)
	public Page<PlayerMinuteDTO> findAll(Pageable pageable) {
		var list = repository.findAll(pageable);
		return list.map(entity -> new PlayerMinuteDTO(entity, entity.getPlayerId(), entity.getMatchId()));
	}

	@Transactional
	public PlayerMinuteDTO insert(PlayerMinuteDTO dto) {
		PlayerMinute entity = new PlayerMinute();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PlayerMinuteDTO(entity, entity.getPlayerId(), entity.getMatchId());
	}

	@Transactional
	public PlayerMinuteDTO update(Long id, PlayerMinuteDTO dto) {
		PlayerMinute entity = repository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Player Minute not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PlayerMinuteDTO(entity, entity.getPlayerId(), entity.getMatchId());
	}

	private void copyDtoToEntity(PlayerMinuteDTO dto, PlayerMinute entity) {
		if (dto.getId() != null) {
			entity.setId(dto.getId());
		}
		try {
			AthleteDTO athlete = new AthleteDTO();
			athlete = new AthleteDTO(athleteRepository.findById(dto.getPlayerId()).orElseThrow(
					() -> new ResourceNotFoundException("Athlete not found for id " + dto.getPlayerId())));
			entity.setMatchId(dto.getMatchId());
			entity.setPlayerId(dto.getPlayerId());
			entity.setPlayerName(athlete.getName());
			entity.setIsStarter(dto.getIsStarter());
			entity.setEntryMinute(dto.getEntryMinute());
			entity.setExitMinute(dto.getExitMinute());
			entity.setRecordedAt(LocalDateTime.now());
			entity.setPosition(
					athlete.getPlayerPositions().isEmpty() ? "Unknown" : athlete.getPlayerPositions().get(0).getName());
		} catch (Exception e) {
			throw new ResourceNotFoundException("Athlete not found for id " + dto.getPlayerId());
		}
	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Player Minute not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Player Minute with id " + id);
		}
	}

}
