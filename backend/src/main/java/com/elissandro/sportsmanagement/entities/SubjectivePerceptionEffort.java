package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_subjective_perception_effort")
public class SubjectivePerceptionEffort implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	

	private LocalDate date;
	private Integer pseValue;
	private Integer duration;
	private String observations;
	private Long recordedBy;
	private LocalDate recordedAt;
	private boolean isValid;
	
	public SubjectivePerceptionEffort() {
	}
	
	public SubjectivePerceptionEffort(Long id) {
		this.id = id;
	}
	
	public SubjectivePerceptionEffort(Long id, LocalDate date, Integer pseValue, Integer duration,
			String observations, Long recordedBy, LocalDate recordedAt, boolean isValid) {
		this.id = id;
		this.date = date;
		this.pseValue = pseValue;
		this.duration = duration;
		this.observations = observations;
		this.recordedBy = recordedBy;
		this.recordedAt = recordedAt;
		this.isValid = isValid;
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
		SubjectivePerceptionEffort other = (SubjectivePerceptionEffort) obj;
		return Objects.equals(id, other.id);
	}

	public void setAthlete(Athlete entity) {
		this.id = entity.getId();
	}

}
