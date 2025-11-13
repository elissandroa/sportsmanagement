package com.elissandro.sportsmanagement.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_player_minutes")
public class PlayerMinute {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)	
	private Long id;
	private Long matchId;
	private Long playerId;
	private String playerName;
	private String position;
	private Boolean isStarter;
	private Integer entryMinute;
	private Integer exitMinute;
	private LocalDateTime recordedAt;
	
	
	public PlayerMinute() {
	}
	
	public PlayerMinute(Long matchId, Long playerId, String playerName, String position, Boolean isStarter,
			Integer entryMinute, Integer exitMinute, LocalDateTime recordedAt) {
		this.matchId = matchId;
		this.playerId = playerId;
		this.playerName = playerName;
		this.position = position;
		this.isStarter = isStarter;
		this.entryMinute = entryMinute;
		this.exitMinute = exitMinute;
		this.recordedAt = recordedAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMatchId() {
		return matchId;
	}

	public void setMatchId(Long matchId) {
		this.matchId = matchId;
	}

	public Long getPlayerId() {
		return playerId;
	}

	public void setPlayerId(Long playerId) {
		this.playerId = playerId;
	}

	public String getPlayerName() {
		return playerName;
	}

	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public Boolean getIsStarter() {
		return isStarter;
	}

	public void setIsStarter(Boolean isStarter) {
		this.isStarter = isStarter;
	}

	public Integer getEntryMinute() {
		return entryMinute;
	}

	public void setEntryMinute(Integer entryMinute) {
		this.entryMinute = entryMinute;
	}

	public Integer getExitMinute() {
		return exitMinute;
	}

	public void setExitMinute(Integer exitMinute) {
		this.exitMinute = exitMinute;
	}

	public LocalDateTime getRecordedAt() {
		return recordedAt;
	}

	public void setRecordedAt(LocalDateTime recordedAt) {
		this.recordedAt = recordedAt;
	}
	
	public Integer calculateTotalMinutes() {
		if (entryMinute == null || exitMinute == null) {
			return 0;
		}
		return exitMinute - entryMinute;
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
		PlayerMinute other = (PlayerMinute) obj;
		return Objects.equals(id, other.id);
	}
}
