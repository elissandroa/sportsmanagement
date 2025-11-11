package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.elissandro.sportsmanagement.entities.AthleteStatistics;

public class AthleteStatisticsDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Integer matchesPlayed;
	private Integer minutesPlayed;
	private Integer goalsScored;
	private Integer assists;
	private Integer yellowCards;
	private Integer redCards;
	private Integer injuries;
	private Double averagePse;
	private Double averagePsr;
	private LocalDateTime lastUpdated;
	
	private AthleteDTO athlete;
	
	public AthleteStatisticsDTO() {
	}
	
	public AthleteStatisticsDTO(Long id, Integer matchesPlayed, Integer minutesPlayed,
			Integer goalsScored, Integer assists, Integer yellowCards, Integer redCards, Integer injuries,
			Double averagePse, Double averagePsr, LocalDateTime lastUpdated) {
		this.id = id;
		this.matchesPlayed = matchesPlayed;
		this.minutesPlayed = minutesPlayed;
		this.goalsScored = goalsScored;
		this.assists = assists;
		this.yellowCards = yellowCards;
		this.redCards = redCards;
		this.injuries = injuries;
		this.averagePse = averagePse;
		this.averagePsr = averagePsr;
		this.lastUpdated = lastUpdated;
	}
	
	public AthleteStatisticsDTO(AthleteStatistics entity) {
		this.id = entity.getId();
		this.matchesPlayed = entity.getMatchesPlayed();
		this.minutesPlayed = entity.getMinutesPlayed();
		this.goalsScored =  entity.getGoalsScored();
		this.assists = entity.getAssists();
		this.yellowCards = entity.getYellowCards();
		this.redCards = entity.getRedCards();
		this.injuries = entity.getInjuries();
		this.averagePse = entity.getAveragePse();
		this.averagePsr = entity.getAveragePsr();
		this.lastUpdated = entity.getLastUpdated();
		
	}

	public Long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}


	public Integer getMatchesPlayed() {
		return matchesPlayed;
	}

	public void setMatchesPlayed(Integer matchesPlayed) {
		this.matchesPlayed = matchesPlayed;
	}

	public Integer getMinutesPlayed() {
		return minutesPlayed;
	}

	public void setMinutesPlayed(Integer minutesPlayed) {
		this.minutesPlayed = minutesPlayed;
	}

	public Integer getGoalsScored() {
		return goalsScored;
	}

	public void setGoalsScored(Integer goalsScored) {
		this.goalsScored = goalsScored;
	}

	public Integer getAssists() {
		return assists;
	}

	public void setAssists(Integer assists) {
		this.assists = assists;
	}

	public Integer getYellowCards() {
		return yellowCards;
	}

	public void setYellowCards(Integer yellowCards) {
		this.yellowCards = yellowCards;
	}

	public Integer getRedCards() {
		return redCards;
	}

	public void setRedCards(Integer redCards) {
		this.redCards = redCards;
	}

	public Integer getInjuries() {
		return injuries;
	}

	public void setInjuries(Integer injuries) {
		this.injuries = injuries;
	}

	public Double getAveragePse() {
		return averagePse;
	}

	public void setAveragePse(Double averagePse) {
		this.averagePse = averagePse;
	}

	public Double getAveragePsr() {
		return averagePsr;
	}

	public void setAveragePsr(Double averagePsr) {
		this.averagePsr = averagePsr;
	}

	public LocalDateTime getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(LocalDateTime lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public AthleteDTO getAthlete() {
		return athlete;
	}

	public void setAthlete(AthleteDTO athlete) {
		this.athlete = athlete;
	}
	
}
