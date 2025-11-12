package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.elissandro.sportsmanagement.entities.Match;
import com.elissandro.sportsmanagement.entities.Opponent;
import com.elissandro.sportsmanagement.enums.MatchResult;
import com.elissandro.sportsmanagement.enums.MatchStatus;
import com.elissandro.sportsmanagement.enums.MatchVenue;

public class MatchDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Opponent opponent;
	private LocalDate matchDate;
	private MatchVenue venue;
	private MatchStatus status;
	private MatchResult result;
	private Integer goalsFor;
	private Integer goalsAgainst;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private MatchAnalysisDTO matchAnalysis;
	
	public MatchDTO() {
	}
	
	public MatchDTO(Long id, Opponent opponent, LocalDate matchDate, MatchVenue venue, MatchStatus status,
			MatchResult result, Integer goalsFor, Integer goalsAgainst, LocalDateTime createdAt, LocalDateTime updatedAt) {
		this.id = id;
		this.opponent = opponent;
		this.matchDate = matchDate;
		this.venue = venue;
		this.status = status;
		this.result = result;
		this.goalsFor = goalsFor;
		this.goalsAgainst = goalsAgainst;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	
	public MatchDTO(Match entity) {
		this.id = entity.getId();
		this.opponent = entity.getOpponent();
		this.matchDate = entity.getMatchDate();
		this.venue = entity.getVenue();
		this.status = entity.getStatus();
		this.result = entity.getResult();
		this.goalsFor = entity.getGoalsFor();
		this.goalsAgainst = entity.getGoalsAgainst();
		this.createdAt = entity.getCreatedAt();
		this.updatedAt = entity.getUpdatedAt();
		this.matchAnalysis = entity.getMatchAnalysis() != null ? new MatchAnalysisDTO(entity.getMatchAnalysis()) : null;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Opponent getOpponent() {
		return opponent;
	}

	public void setOpponent(Opponent opponent) {
		this.opponent = opponent;
	}

	public LocalDate getMatchDate() {
		return matchDate;
	}

	public void setMatchDate(LocalDate matchDate) {
		this.matchDate = matchDate;
	}

	public MatchVenue getVenue() {
		return venue;
	}

	public void setVenue(MatchVenue venue) {
		this.venue = venue;
	}

	public MatchStatus getStatus() {
		return status;
	}

	public void setStatus(MatchStatus status) {
		this.status = status;
	}

	public MatchResult getResult() {
		return result;
	}

	public void setResult(MatchResult result) {
		this.result = result;
	}

	public Integer getGoalsFor() {
		return goalsFor;
	}

	public void setGoalsFor(Integer goalsFor) {
		this.goalsFor = goalsFor;
	}

	public Integer getGoalsAgainst() {
		return goalsAgainst;
	}

	public void setGoalsAgainst(Integer goalsAgainst) {
		this.goalsAgainst = goalsAgainst;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public MatchAnalysisDTO getMatchAnalysis() {
		return matchAnalysis;
	}

	public void setMatchAnalysis(MatchAnalysisDTO matchAnalysis) {
		this.matchAnalysis = matchAnalysis;
	}

}
