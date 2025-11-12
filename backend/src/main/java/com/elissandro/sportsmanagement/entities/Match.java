package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.elissandro.sportsmanagement.entities.base.BaseEntityAudit;
import com.elissandro.sportsmanagement.enums.MatchResult;
import com.elissandro.sportsmanagement.enums.MatchStatus;
import com.elissandro.sportsmanagement.enums.MatchVenue;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_match")
public class Match extends BaseEntityAudit implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	private Opponent opponent;
	private LocalDate matchDate;
	private MatchVenue venue;
	private MatchStatus status;
	private MatchResult result;
	private Integer goalsFor;
	private Integer goalsAgainst;

	
	@ManyToMany(mappedBy = "matches")
	private Set<Competition> competitions = new HashSet<>();
	
	@OneToOne
	private MatchAnalysis matchAnalysis;
	
	public Match() {
	}
	
	public Match(Long id) {
		this.id = id;
	}
	
	public Match(Long id, Opponent opponent, LocalDate matchDate, MatchVenue venue, MatchStatus status,
			MatchResult result, Integer goalsFor, Integer goalsAgainst) {
		this.id = id;
		this.opponent = opponent;
		this.matchDate = matchDate;
		this.venue = venue;
		this.status = status;
		this.result = result;
		this.goalsFor = goalsFor;
		this.goalsAgainst = goalsAgainst;
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

	public MatchAnalysis getMatchAnalysis() {
		return matchAnalysis;
	}

	public void setMatchAnalysis(MatchAnalysis matchAnalysis) {
		this.matchAnalysis = matchAnalysis;
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
		Match other = (Match) obj;
		return Objects.equals(id, other.id);
	}

}
