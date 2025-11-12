package com.elissandro.sportsmanagement.entities;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_match_analysis")
public class MatchAnalysis implements java.io.Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer passes;
	private Integer completePasses;
	private Float passAccuracy;
	private Integer finalizations;
	private Integer finalizationsOnTarget;
	private Integer longBalls;
	private Integer longBallsCompleted;
	private Integer corners;
	private Integer crosses;
	private Integer crossesCompleted;
	private Integer offsides;
	private Integer duels;
	private Integer duelsWon;
	private Integer foulsComitted;
	private Integer foulsSuffered;
	private Float ballPossession;
	private Integer pressureAfterLossWon;
	private Integer pressureAfterLossLost;
	private Integer pressureAfterLossNone;
	private String observations;
	private Long analyzedAtId;

	
	public MatchAnalysis() {
	}
	
	public MatchAnalysis(Long id) {
		this.id = id;
	}
	
	public MatchAnalysis(Long id, Integer passes, Integer completePasses, Float passAccuracy,
			Integer finalizations, Integer finalizationsOnTarget, Integer longBalls, Integer longBallsCompleted,
			Integer corners, Integer crosses, Integer crossesCompleted, Integer offsides, Integer duels,
			Integer duelsWon, Integer foulsComitted, Integer foulsSuffered, Float ballPossession,
			Integer pressureAfterLossWon, Integer pressureAfterLossLost, Integer pressureAfterLossNone,
			String observations, Long analyzedAtId) {
		this.id = id;
		this.passes = passes;
		this.completePasses = completePasses;
		this.passAccuracy = passAccuracy;
		this.finalizations = finalizations;
		this.finalizationsOnTarget = finalizationsOnTarget;
		this.longBalls = longBalls;
		this.longBallsCompleted = longBallsCompleted;
		this.corners = corners;
		this.crosses = crosses;
		this.crossesCompleted = crossesCompleted;
		this.offsides = offsides;
		this.duels = duels;
		this.duelsWon = duelsWon;
		this.foulsComitted = foulsComitted;
		this.foulsSuffered = foulsSuffered;
		this.ballPossession = ballPossession;
		this.pressureAfterLossWon = pressureAfterLossWon;
		this.pressureAfterLossLost = pressureAfterLossLost;
		this.pressureAfterLossNone = pressureAfterLossNone;
		this.observations = observations;
		this.analyzedAtId = analyzedAtId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getPasses() {
		return passes;
	}

	public void setPasses(Integer passes) {
		this.passes = passes;
	}

	public Integer getCompletePasses() {
		return completePasses;
	}

	public void setCompletePasses(Integer completePasses) {
		this.completePasses = completePasses;
	}

	public Float getPassAccuracy() {
		return passAccuracy;
	}

	public void setPassAccuracy(Float passAccuracy) {
		this.passAccuracy = passAccuracy;
	}

	public Integer getFinalizations() {
		return finalizations;
	}

	public void setFinalizations(Integer finalizations) {
		this.finalizations = finalizations;
	}

	public Integer getFinalizationsOnTarget() {
		return finalizationsOnTarget;
	}

	public void setFinalizationsOnTarget(Integer finalizationsOnTarget) {
		this.finalizationsOnTarget = finalizationsOnTarget;
	}

	public Integer getLongBalls() {
		return longBalls;
	}

	public void setLongBalls(Integer longBalls) {
		this.longBalls = longBalls;
	}

	public Integer getLongBallsCompleted() {
		return longBallsCompleted;
	}

	public void setLongBallsCompleted(Integer longBallsCompleted) {
		this.longBallsCompleted = longBallsCompleted;
	}

	public Integer getCorners() {
		return corners;
	}

	public void setCorners(Integer corners) {
		this.corners = corners;
	}

	public Integer getCrosses() {
		return crosses;
	}

	public void setCrosses(Integer crosses) {
		this.crosses = crosses;
	}

	public Integer getCrossesCompleted() {
		return crossesCompleted;
	}

	public void setCrossesCompleted(Integer crossesCompleted) {
		this.crossesCompleted = crossesCompleted;
	}

	public Integer getOffsides() {
		return offsides;
	}

	public void setOffsides(Integer offsides) {
		this.offsides = offsides;
	}

	public Integer getDuels() {
		return duels;
	}

	public void setDuels(Integer duels) {
		this.duels = duels;
	}

	public Integer getDuelsWon() {
		return duelsWon;
	}

	public void setDuelsWon(Integer duelsWon) {
		this.duelsWon = duelsWon;
	}

	public Integer getFoulsComitted() {
		return foulsComitted;
	}

	public void setFoulsComitted(Integer foulsComitted) {
		this.foulsComitted = foulsComitted;
	}

	public Integer getFoulsSuffered() {
		return foulsSuffered;
	}

	public void setFoulsSuffered(Integer foulsSuffered) {
		this.foulsSuffered = foulsSuffered;
	}

	public Float getBallPossession() {
		return ballPossession;
	}

	public void setBallPossession(Float ballPossession) {
		this.ballPossession = ballPossession;
	}

	public Integer getPressureAfterLossWon() {
		return pressureAfterLossWon;
	}

	public void setPressureAfterLossWon(Integer pressureAfterLossWon) {
		this.pressureAfterLossWon = pressureAfterLossWon;
	}

	public Integer getPressureAfterLossLost() {
		return pressureAfterLossLost;
	}

	public void setPressureAfterLossLost(Integer pressureAfterLossLost) {
		this.pressureAfterLossLost = pressureAfterLossLost;
	}

	public Integer getPressureAfterLossNone() {
		return pressureAfterLossNone;
	}

	public void setPressureAfterLossNone(Integer pressureAfterLossNone) {
		this.pressureAfterLossNone = pressureAfterLossNone;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}

	public Long getAnalyzedAtId() {
		return analyzedAtId;
	}

	public void setAnalyzedAt(Long analizedAtId) {
		this.analyzedAtId = analizedAtId;
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
		MatchAnalysis other = (MatchAnalysis) obj;
		return Objects.equals(id, other.id);
	}

}
