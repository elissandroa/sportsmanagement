package com.elissandro.sportsmanagement.dtos;

import java.time.LocalDateTime;

import com.elissandro.sportsmanagement.entities.PlayerMinute;

public class PlayerMinuteDTO {
	private Long id;
	private Long matchId;
	private Long playerId;
	private String playerName;
	private String position;
	private Boolean isStarter;
	private Integer entryMinute;
	private Integer exitMinute;
	private Integer totalMinutes;
	private LocalDateTime recordedAt;
	
	public PlayerMinuteDTO() {
	}
	
	public PlayerMinuteDTO(Long id, Long matchId, Long playerId, String playerName, String position,
			Boolean isStarter, Integer entryMinute, Integer exitMinute, LocalDateTime recordedAt) {
		this.id = id;
		this.matchId = matchId;
		this.playerId = playerId;
		this.playerName = playerName;
		this.position = position;
		this.isStarter = isStarter;
		this.entryMinute = entryMinute;
		this.exitMinute = exitMinute;
		this.recordedAt = recordedAt;
	}
	
	public PlayerMinuteDTO(PlayerMinute entity, Long playerId, Long matchId) {
		this.id = entity.getId();
		this.matchId = matchId;
		this.playerId = playerId;
		this.playerName = entity.getPlayerName();
		this.isStarter = entity.getIsStarter();
		this.entryMinute = entity.getEntryMinute();
		this.exitMinute = entity.getExitMinute();
		this.recordedAt = entity.getRecordedAt();
		this.position = entity.getPosition();
		this.totalMinutes = entity.calculateTotalMinutes();
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

	public Integer getTotalMinutes() {
		return totalMinutes;
	}

}
