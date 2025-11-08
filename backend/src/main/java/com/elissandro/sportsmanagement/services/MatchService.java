package com.elissandro.sportsmanagement.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.MatchDTO;
import com.elissandro.sportsmanagement.entities.Match;
import com.elissandro.sportsmanagement.entities.Opponent;
import com.elissandro.sportsmanagement.repositories.MatchRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class MatchService {

	@Autowired
	private MatchRepository repository;


	@Transactional(readOnly = true)
	public MatchDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match not found"));
		return new MatchDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<MatchDTO> findAll(Pageable pageable) {
		Page<Match> page = repository.findAll(pageable);
		return page.map(entity -> new MatchDTO(entity));
	}

	@Transactional
	public MatchDTO insert(MatchDTO dto) {
		Match entity = new Match();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MatchDTO(entity);
	}

	@Transactional
	public MatchDTO update(Long id, MatchDTO dto) {
		Match entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Match not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MatchDTO(entity);
	}

	private void copyDtoToEntity(MatchDTO dto, Match entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		Opponent opponent = new Opponent();
		if(dto.getOpponent().getId() != null) {
			opponent.setId(dto.getOpponent().getId());
		}
		entity.setOpponent(opponent);
		entity.setMatchDate(dto.getMatchDate());
		entity.setVenue(dto.getVenue());
		entity.setStatus(dto.getStatus());
		entity.setResult(dto.getResult());
		entity.setGoalsFor(dto.getGoalsFor());
		entity.setGoalsAgainst(dto.getGoalsAgainst());
		if(dto.getCreatedAt() != null) {
			entity.setUpdatedAt(LocalDateTime.now());
		} else {
			entity.setCreatedAt(LocalDateTime.now());
		}
	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Match not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Match with id " + id);
		}
	}

}
