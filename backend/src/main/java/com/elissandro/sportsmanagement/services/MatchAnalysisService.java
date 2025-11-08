package com.elissandro.sportsmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.MatchAnalysisDTO;
import com.elissandro.sportsmanagement.entities.MatchAnalysis;
import com.elissandro.sportsmanagement.repositories.MatchAnalysisRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class MatchAnalysisService {

	@Autowired
	private MatchAnalysisRepository repository;

	

	@Transactional(readOnly = true)
	public MatchAnalysisDTO findById(Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MatchAnalysis not found"));
		return new MatchAnalysisDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<MatchAnalysisDTO> findAll(Pageable pageable) {
		Page<MatchAnalysis> page = repository.findAll(pageable);
		return page.map(entity -> new MatchAnalysisDTO(entity));
	}

	@Transactional
	public MatchAnalysisDTO insert(MatchAnalysisDTO dto) {
		MatchAnalysis entity = new MatchAnalysis();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MatchAnalysisDTO(entity);
	}

	@Transactional
	public MatchAnalysisDTO update(Long id, MatchAnalysisDTO dto) {
		MatchAnalysis entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MatchAnalysis not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new MatchAnalysisDTO(entity);
	}

	private void copyDtoToEntity(MatchAnalysisDTO dto, MatchAnalysis entity) {
		if(dto.getId() != null) {
			entity.setId(dto.getId());
		}
		entity.setMatch(dto.getMatch());
		entity.setPasses(dto.getPasses());
		entity.setCompletePasses(dto.getCompletePasses());
		entity.setPassAccuracy(dto.getPassAccuracy());
		entity.setFinalizations(dto.getFinalizations());
		entity.setFinalizationsOnTarget(dto.getFinalizationsOnTarget());
		entity.setLongBalls(dto.getLongBalls());
		entity.setLongBallsCompleted(dto.getLongBallsCompleted());
		entity.setCorners(dto.getCorners());
		entity.setCrosses(dto.getCrosses());
		entity.setCrossesCompleted(dto.getCrossesCompleted());
		entity.setOffsides(dto.getOffsides());
		entity.setDuels(dto.getDuels());
		entity.setDuelsWon(dto.getDuelsWon());
		entity.setFoulsComitted(dto.getFoulsComitted());
		entity.setFoulsSuffered(dto.getFoulsSuffered());
		entity.setBallPossession(dto.getBallPossession());
		entity.setPressureAfterLossWon(dto.getPressureAfterLossWon());
		entity.setPressureAfterLossLost(dto.getPressureAfterLossLost());
		entity.setPressureAfterLossNone(dto.getPressureAfterLossNone());
		entity.setObservations(dto.getObservations());
	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("MatchAnalysis not found");
		}
		try {
			repository.deleteById(id);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete MatchAnalysis with id " + id);
		}
	}

}
