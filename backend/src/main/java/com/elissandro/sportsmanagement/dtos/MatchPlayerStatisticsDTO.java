package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.elissandro.sportsmanagement.entities.Match;
import com.elissandro.sportsmanagement.entities.MatchPlayerStatistics;

public class MatchPlayerStatisticsDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Match match;
	private Integer minutesPlayed;
	private Integer goals;
	private Integer assists;
	private Integer yellowCards;
	private Integer redCards;
	private Integer passes;
	private Integer passesCompleted;
	private Integer tackles;
	private Integer interceptions;
	private LocalDateTime recordedAt;
	private Long athleteId;
	
	public MatchPlayerStatisticsDTO() {
	}
	
	public MatchPlayerStatisticsDTO(Long id, Match match, Integer minutesPlayed, Integer goals,
			Integer assists, Integer yellowCards, Integer redCards, Integer passes, Integer passesCompleted,
			Integer tackles, Integer interceptions, LocalDateTime recordedAt) {
		this.id = id;
		this.match = match;
		this.minutesPlayed = minutesPlayed;
		this.goals = goals;
		this.assists = assists;
		this.yellowCards = yellowCards;
		this.redCards = redCards;
		this.passes = passes;
		this.passesCompleted = passesCompleted;
		this.tackles = tackles;
		this.interceptions = interceptions;
		this.recordedAt = recordedAt;
	}
	
	public MatchPlayerStatisticsDTO(MatchPlayerStatistics entity) {
		this.id = entity.getId();
		this.match = entity.getMatch();
		this.athleteId = entity.getAthlete().getId();
		this.minutesPlayed = entity.getMinutesPlayed();
		this.goals = entity.getGoals();
		this.assists = entity.getAssists();
		this.yellowCards = entity.getYellowCards();
		this.redCards = entity.getRedCards();
		this.passes = entity.getPasses();
		this.passesCompleted = entity.getPassesCompleted();
		this.tackles = entity.getTackles();
		this.interceptions = entity.getInterceptions();
		this.recordedAt = entity.getRecordedAt();
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Match getMatch() {
		return match;
	}

	public void setMatch(Match match) {
		this.match = match;
	}
	
	public Integer getMinutesPlayed() {
		return minutesPlayed;
	}

	public void setMinutesPlayed(Integer minutesPlayed) {
		this.minutesPlayed = minutesPlayed;
	}

	public Integer getGoals() {
		return goals;
	}

	public void setGoals(Integer goals) {
		this.goals = goals;
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

	public Integer getPasses() {
		return passes;
	}

	public void setPasses(Integer passes) {
		this.passes = passes;
	}

	public Integer getPassesCompleted() {
		return passesCompleted;
	}

	public void setPassesCompleted(Integer passesCompleted) {
		this.passesCompleted = passesCompleted;
	}

	public Integer getTackles() {
		return tackles;
	}

	public void setTackles(Integer tackles) {
		this.tackles = tackles;
	}

	public Integer getInterceptions() {
		return interceptions;
	}

	public void setInterceptions(Integer interceptions) {
		this.interceptions = interceptions;
	}

	public LocalDateTime getRecordedAt() {
		return recordedAt;
	}

	public void setRecordedAt(LocalDateTime recordedAt) {
		this.recordedAt = recordedAt;
	}

	public Long getAthleteId() {
		return athleteId;
	}

	public void setAthleteId(Long athleteId) {
		this.athleteId = athleteId;
	}

}
