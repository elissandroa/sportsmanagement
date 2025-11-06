package com.elissandro.sportsmanagement.dtos;

import com.elissandro.sportsmanagement.entities.PlayerPosition;

public class PlayerPositionDTO {

	private Long id;
	private String name;
	
	public PlayerPositionDTO() {
	}
	
	public PlayerPositionDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public PlayerPositionDTO(PlayerPosition entity) {
		this.id = entity.getId();
		this.name = entity.getName();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
