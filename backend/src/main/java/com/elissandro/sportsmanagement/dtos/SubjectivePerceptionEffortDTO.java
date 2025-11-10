package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;

import com.elissandro.sportsmanagement.entities.SubjectivePerceptionEffort;

public class SubjectivePerceptionEffortDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private LocalDate date;
	private Integer pseValue;
	private Integer duration;
	private String observations;
	private Long recordedBy;
	private LocalDate recordedAt;
	private boolean isValid;
	
	private AthleteDTO athlete;
	
	public SubjectivePerceptionEffortDTO() {
	}
	
	public SubjectivePerceptionEffortDTO(Long id, LocalDate date, Integer pseValue, Integer duration,
			String observations, Long recordedBy, LocalDate recordedAt, boolean isValid, Long athleteId) {
		this.id = id;
		this.date = date;
		this.pseValue = pseValue;
		this.duration = duration;
		this.observations = observations;
		this.recordedBy = recordedBy;
		this.recordedAt = recordedAt;
		this.isValid = isValid;

	}
	
	public SubjectivePerceptionEffortDTO(SubjectivePerceptionEffort entity) {
		this.id = entity.getId();
		this.date = entity.getDate();
		this.pseValue = entity.getPseValue();
		this.duration = entity.getDuration();
		this.observations = entity.getObservations();
		this.recordedBy = entity.getRecordedBy();
		this.recordedAt = entity.getRecordedAt();
		this.isValid = entity.isValid();
		this.athlete = new AthleteDTO(entity.getAthlete());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Integer getPseValue() {
		return pseValue;
	}

	public void setPseValue(Integer pseValue) {
		this.pseValue = pseValue;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}

	public Long getRecordedBy() {
		return recordedBy;
	}

	public void setRecordedBy(Long recordedBy) {
		this.recordedBy = recordedBy;
	}

	public LocalDate getRecordedAt() {
		return recordedAt;
	}

	public void setRecordedAt(LocalDate recordedAt) {
		this.recordedAt = recordedAt;
	}

	public boolean isValid() {
		return isValid;
	}

	public void setValid(boolean isValid) {
		this.isValid = isValid;
	}

	public AthleteDTO getAthlete() {
		return athlete;
	}

	public void setAthlete(AthleteDTO athlete) {
		this.athlete = athlete;
	}

}
