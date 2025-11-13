package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.elissandro.sportsmanagement.entities.Training;
import com.elissandro.sportsmanagement.enums.TrainingStatus;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

public class TrainingDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Integer trainingNumber;
	private LocalDate date;
	private String time;
	private Integer mesoCycleNumber;
	private Integer microCycleNumber;
	private Integer macroCycleNumber;
	private Integer playerCount;
	private String objective;
	private Long scheduledBy;
	@Enumerated(EnumType.STRING)
	private TrainingStatus status;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	private List<CategoryDTO> categories = new ArrayList<>();

	private List<AttendanceDTO> attendances = new ArrayList<>();

	public TrainingDTO() {
	}

	public TrainingDTO(Long id, Integer trainingNumber, LocalDate date, String time, Integer mesoCycleNumber,
			Integer microCycleNumber, Integer macroCycleNumber, Integer playerCount, String objective, Long scheduledBy,
			TrainingStatus status) {
		this.id = id;
		this.trainingNumber = trainingNumber;
		this.date = date;
		this.time = time;
		this.mesoCycleNumber = mesoCycleNumber;
		this.microCycleNumber = microCycleNumber;
		this.macroCycleNumber = macroCycleNumber;
		this.playerCount = playerCount;
		this.objective = objective;
		this.scheduledBy = scheduledBy;
		this.status = status;
	}

	public TrainingDTO(Training entity) {
		this.id = entity.getId();
		this.trainingNumber = entity.getTrainingNumber();
		this.date = entity.getDate();
		this.time = entity.getTime();
		this.mesoCycleNumber = entity.getMesoCycleNumber();
		this.microCycleNumber = entity.getMicroCycleNumber();
		this.macroCycleNumber = entity.getMacroCycleNumber();
		this.playerCount = entity.getPlayerCount();
		this.objective = entity.getObjective();
		this.scheduledBy = entity.getScheduledBy();
		this.status = entity.getStatus();
		this.createdAt = entity.getCreatedAt();
		this.updatedAt = entity.getUpdatedAt();
		entity.getCategories().forEach(cat -> this.categories.add(new CategoryDTO(cat)));
		
		for(AttendanceDTO att : entity.getAttendances().stream().map(attEntity -> new AttendanceDTO(attEntity)).toList()) {
			this.attendances.add(att);
		}
	}

	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getTrainingNumber() {
		return trainingNumber;
	}

	public void setTrainingNumber(Integer trainingNumber) {
		this.trainingNumber = trainingNumber;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Integer getMesoCycleNumber() {
		return mesoCycleNumber;
	}

	public void setMesoCycleNumber(Integer mesoCycleNumber) {
		this.mesoCycleNumber = mesoCycleNumber;
	}

	public Integer getMicroCycleNumber() {
		return microCycleNumber;
	}

	public void setMicroCycleNumber(Integer microCycleNumber) {
		this.microCycleNumber = microCycleNumber;
	}

	public Integer getMacroCycleNumber() {
		return macroCycleNumber;
	}

	public void setMacroCycleNumber(Integer macroCycleNumber) {
		this.macroCycleNumber = macroCycleNumber;
	}

	public Integer getPlayerCount() {
		return playerCount;
	}

	public void setPlayerCount(Integer playerCount) {
		this.playerCount = playerCount;
	}

	public String getObjective() {
		return objective;
	}

	public void setObjective(String objective) {
		this.objective = objective;
	}

	public Long getScheduledBy() {
		return scheduledBy;
	}

	public void setScheduledBy(Long scheduledBy) {
		this.scheduledBy = scheduledBy;
	}

	public TrainingStatus getStatus() {
		return status;
	}

	public void setStatus(TrainingStatus status) {
		this.status = status;
	}

	public List<CategoryDTO> getCategories() {
		return categories;
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

	public List<AttendanceDTO> getAttendances() {
		return attendances;
	}

}
