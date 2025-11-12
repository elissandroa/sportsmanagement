package com.elissandro.sportsmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.MatchDTO;
import com.elissandro.sportsmanagement.entities.Match;
import com.elissandro.sportsmanagement.entities.MatchAnalysis;
import com.elissandro.sportsmanagement.entities.Opponent;
import com.elissandro.sportsmanagement.repositories.MatchAnalysisRepository;
import com.elissandro.sportsmanagement.repositories.MatchRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;

@Service
public class  MatchService {

	@Autowired
	private MatchRepository repository;
	
	@Autowired
	private MatchAnalysisRepository matchAnalysisRepository;


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
		
		MatchAnalysis matchAnalysis = new MatchAnalysis();
		
		if(dto.getMatchAnalysis() != null && dto.getMatchAnalysis().getId() != null) {
			matchAnalysis.setId(dto.getMatchAnalysis().getId());
		}
			matchAnalysis.setAnalyzedAt(dto.getMatchAnalysis().getAnalyzedAtId());
			matchAnalysis.setBallPossession(dto.getMatchAnalysis().getBallPossession());
			matchAnalysis.setCompletePasses(dto.getMatchAnalysis().getCompletePasses());
			matchAnalysis.setFinalizationsOnTarget(dto.getMatchAnalysis().getFinalizationsOnTarget());
			matchAnalysis.setFinalizations(dto.getMatchAnalysis().getFinalizations());
			matchAnalysis.setLongBalls(dto.getMatchAnalysis().getLongBalls());
			matchAnalysis.setPassAccuracy(dto.getMatchAnalysis().getPassAccuracy());
			matchAnalysis.setPasses(dto.getMatchAnalysis().getPasses());
			matchAnalysis.setDuelsWon(dto.getMatchAnalysis().getDuelsWon());
			matchAnalysis.setDuels(dto.getMatchAnalysis().getDuels());
			matchAnalysis.setCrossesCompleted(dto.getMatchAnalysis().getCrossesCompleted());
			matchAnalysis.setCrosses(dto.getMatchAnalysis().getCrosses());
			matchAnalysis.setFoulsComitted(dto.getMatchAnalysis().getFoulsComitted());
			matchAnalysis.setFoulsSuffered(dto.getMatchAnalysis().getFoulsSuffered());
			matchAnalysis.setOffsides(dto.getMatchAnalysis().getOffsides());
			matchAnalysis.setPressureAfterLossWon(dto.getMatchAnalysis().getPressureAfterLossWon());
			matchAnalysis.setPressureAfterLossLost(dto.getMatchAnalysis().getPressureAfterLossLost());
			matchAnalysis.setPressureAfterLossNone(dto.getMatchAnalysis().getPressureAfterLossNone());
			matchAnalysis.setObservations(dto.getMatchAnalysis().getObservations());
			matchAnalysis.setCorners(dto.getMatchAnalysis().getCorners());
			matchAnalysis.setLongBallsCompleted(dto.getMatchAnalysis().getLongBallsCompleted());
		
		matchAnalysis = matchAnalysisRepository.save(matchAnalysis);
		entity.setMatchAnalysis(matchAnalysis);
		
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
