package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_athlete_statistics")
public class AthleteStatistics implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	@OneToOne(mappedBy = "athleteStatistics")
	private Athlete athlete;
	
	public AthleteStatistics() {
	}
	
	public AthleteStatistics(Long id, Integer matchesPlayed, Integer minutesPlayed, Integer goalsScored,
			Integer assists, Integer yellowCards, Integer redCards, Integer injuries, Double averagePse,
			Double averagePsr, LocalDateTime lastUpdated) {
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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
		AthleteStatistics other = (AthleteStatistics) obj;
		return Objects.equals(id, other.id);
	}

}
