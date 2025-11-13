package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_attendance")
public class Attendance implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Boolean present;
	private String observations;
	private LocalDateTime recordedAt;
	private Long athleteId;
	
	@ManyToMany(mappedBy = "attendances")	
	private Set<Training> trainings = new HashSet<>();
	
	public Attendance() {
	}
	
	public Attendance(Long id, Boolean present, String observations,
			LocalDateTime recordedAt) {
		this.id = id;
		this.present = present;
		this.observations = observations;
		this.recordedAt = recordedAt;
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
		Attendance other = (Attendance) obj;
		return Objects.equals(id, other.id);
	}

	public Long getAthleteId() {
		return athleteId;
	}

	public void setAthleteId(Long athleteId) {
		this.athleteId = athleteId;
	}
	
}
