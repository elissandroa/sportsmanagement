package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_match_player_statistics")
public class MatchPlayerStatistics implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Match match;
	
	@ManyToOne
	private Athlete athlete;
	
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
	
	public MatchPlayerStatistics() {
	}
	
	public MatchPlayerStatistics(Long id, Match match, Athlete athlete, Integer minutesPlayed, Integer goals,
			Integer assists, Integer yellowCards, Integer redCards, Integer passes, Integer passesCompleted,
			Integer tackles, Integer interceptions, LocalDateTime recordedAt) {
		this.id = id;
		this.match = match;
		this.athlete = athlete;
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

	public Athlete getAthlete() {
		return athlete;
	}

	public void setAthlete(Athlete athlete) {
		this.athlete = athlete;
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

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MatchPlayerStatistics other = (MatchPlayerStatistics) obj;
		return Objects.equals(id, other.id);
	}
}
