package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.elissandro.sportsmanagement.entities.base.BaseEntityAudit;
import com.elissandro.sportsmanagement.enums.PenaltyType;
import com.elissandro.sportsmanagement.utils.Identifiable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_penalty")
public class Penalty extends BaseEntityAudit implements Serializable, Identifiable<Long> {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private PenaltyType type;
	private String reason;
	private LocalDate date;
	private Integer suspentionGames;
	private Boolean served;

	@ManyToOne
	@JoinColumn(name = "athlete_id")
	private Athlete athlete;

	public Penalty() {
	}

	public Penalty(Long id) {
		this.id = id;
	}

	public Penalty(Long id, PenaltyType type, String reason, LocalDate date, Integer suspentionGames, Boolean served) {
		this.id = id;
		this.type = type;
		this.reason = reason;
		this.date = date;
		this.suspentionGames = suspentionGames;
		this.served = served;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public PenaltyType getType() {
		return type;
	}

	public void setType(PenaltyType type) {
		this.type = type;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Integer getSuspentionGames() {
		return suspentionGames;
	}

	public void setSuspentionGames(Integer suspentionGames) {
		this.suspentionGames = suspentionGames;
	}

	public Boolean getServed() {
		return served;
	}

	public void setServed(Boolean served) {
		this.served = served;
	}

	public void setAthlete(Athlete entity) {
		this.athlete = entity;
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
		Penalty other = (Penalty) obj;
		return Objects.equals(id, other.id);
	}

	public void setPenalty(Athlete entity) {
		this.athlete = entity;
	}

}
