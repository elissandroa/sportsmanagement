package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.elissandro.sportsmanagement.entities.Penalty;
import com.elissandro.sportsmanagement.enums.PenaltyType;

public class PenaltyDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private PenaltyType type;
	private String reason;
	private LocalDate date;
	private Integer suspentionGames;
	private Boolean served;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	
	public PenaltyDTO() {
	}

	public PenaltyDTO(Long id, PenaltyType type, String reason, LocalDate date, Integer suspentionGames,
			Boolean served) {
		this.id = id;
		this.type = type;
		this.reason = reason;
		this.date = date;
		this.suspentionGames = suspentionGames;
		this.served = served;
	}

	public PenaltyDTO(Penalty entity) {
		this.id = entity.getId();
		this.type = entity.getType();
		this.reason = entity.getReason();
		this.date = entity.getDate();
		this.suspentionGames = entity.getSuspentionGames();
		this.served = entity.getServed();
		this.createdAt = entity.getCreatedAt();
		this.updatedAt = entity.getUpdatedAt();

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

}
