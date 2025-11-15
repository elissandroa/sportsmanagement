package com.elissandro.sportsmanagement.dtos;

import java.time.LocalDateTime;

import com.elissandro.sportsmanagement.entities.Attendance;

public class AttendanceDTO {

	private Long id;
	private Boolean present;
	private String observations;
	private LocalDateTime recordedAt;
	private Long athleteId;

	public AttendanceDTO() {
	}
	
	
	public AttendanceDTO(Long id, Boolean present, String observations,
			LocalDateTime recordedAt) {
		this.id = id;
		this.present = present;
		this.observations = observations;
		this.recordedAt = recordedAt;
	}
	
	public AttendanceDTO(Attendance entity) {
		this.id = entity.getId();
		this.present = entity.getPresent();
		this.observations = entity.getObservations();
		this.recordedAt = entity.getRecordedAt();
		this.athleteId = entity.getAthleteId();
	}

	public Attendance toEntity() {
		Attendance entity = new Attendance();
		entity.setId(this.id);
		entity.setPresent(this.present);
		entity.setObservations(this.observations);
		entity.setRecordedAt(this.recordedAt);
		entity.setAthleteId(this.athleteId);
		return entity;
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getPresent() {
		return present;
	}


	public void setPresent(Boolean present) {
		this.present = present;
	}


	public String getObservations() {
		return observations;
	}


	public void setObservations(String observations) {
		this.observations = observations;
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
