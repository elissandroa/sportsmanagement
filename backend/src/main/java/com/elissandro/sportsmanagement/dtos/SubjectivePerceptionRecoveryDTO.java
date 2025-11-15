package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.elissandro.sportsmanagement.entities.SubjectivePerceptionRecovery;
import com.elissandro.sportsmanagement.enums.InjuryType;

public class SubjectivePerceptionRecoveryDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private InjuryType type;
	private LocalDate date;
	private Integer psrValue;
	private String observations;
	private Long RecordedBy;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Integer fatiqueLevel;
	private Integer motivationLevel;
	private Integer stressLevel;
	private Float sleepHours;
	private Integer sleepQuality;
	private Integer muscleAching;
	private Integer hydrationLevel;
	private Integer appetiteLevel;
	private String notes;
	private Boolean isValid;
	
	private List<PainPointDTO> painPoints = new ArrayList<>();

	
	public SubjectivePerceptionRecoveryDTO() {
	}
	
	public SubjectivePerceptionRecoveryDTO(Long id, InjuryType type, LocalDate date, Integer psrValue, String observations,
			Long recordedBy, LocalDateTime createdAt, LocalDateTime updatedAt, Integer fatiqueLevel, Integer motivationLevel, Integer stressLevel,
			Float sleepHours, Integer sleepQuality, Integer muscleAching, Integer hydrationLevel,
			Integer appetiteLevel, String notes, Boolean isValid) {
		this.id = id;
		this.date = date;
		this.psrValue = psrValue;
		this.observations = observations;
		this.RecordedBy = recordedBy;
		this.createdAt = createdAt;
		this.fatiqueLevel = fatiqueLevel;
		this.motivationLevel = motivationLevel;
		this.stressLevel = stressLevel;
		this.sleepHours = sleepHours;
		this.sleepQuality = sleepQuality;
		this.muscleAching = muscleAching;
		this.hydrationLevel = hydrationLevel;
		this.appetiteLevel = appetiteLevel;
		this.notes = notes;
		this.isValid = isValid;
	}
	
	public SubjectivePerceptionRecoveryDTO(SubjectivePerceptionRecovery entity) {
		this.id = entity.getId();
		this.type = entity.getType();
		this.date = entity.getDate();
		this.psrValue = entity.getPsrValue();
		this.observations = entity.getObservations();
		this.RecordedBy = entity.getRecordedBy();
		this.createdAt = entity.getCreatedAt();
		this.fatiqueLevel = entity.getFatiqueLevel();
		this.motivationLevel = entity.getMotivationLevel();
		this.stressLevel = entity.getStressLevel();
		this.sleepHours = entity.getSleepHours();
		this.sleepQuality = entity.getSleepQuality();
		this.muscleAching = entity.getMuscleAching();
		this.hydrationLevel = entity.getHydrationLevel();
		this.appetiteLevel = entity.getAppetiteLevel();
		this.notes = entity.getNotes();
		this.isValid =  entity.getIsValid();
		this.type = entity.getType();
		this.updatedAt = entity.getUpdatedAt();
		this.createdAt = entity.getCreatedAt();
		entity.getPainPoints().forEach(pp -> this.painPoints.add(new PainPointDTO(pp)));
	}
	
	public SubjectivePerceptionRecovery toEntity() {
		SubjectivePerceptionRecovery entity = new SubjectivePerceptionRecovery();
		entity.setId(this.id);
		entity.setDate(this.date);
		entity.setPsrValue(this.psrValue);
		entity.setObservations(this.observations);
		entity.setRecordedBy(this.RecordedBy);
		entity.setCreatedAt(this.createdAt);
		entity.setFatiqueLevel(this.fatiqueLevel);
		entity.setMotivationLevel(this.motivationLevel);
		entity.setStressLevel(this.stressLevel);
		entity.setSleepHours(this.sleepHours);
		entity.setSleepQuality(this.sleepQuality);
		entity.setMuscleAching(this.muscleAching);
		entity.setHydrationLevel(this.hydrationLevel);
		entity.setAppetiteLevel(this.appetiteLevel);
		entity.setNotes(this.notes);
		entity.setIsValid(this.isValid);
		entity.setType(this.type);
		entity.setUpdatedAt(this.updatedAt);
		return entity;
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

	public Integer getPsrValue() {
		return psrValue;
	}

	public void setPsrValue(Integer psrValue) {
		this.psrValue = psrValue;
	}

	public String getObservations() {
		return observations;
	}

	public void setObservations(String observations) {
		this.observations = observations;
	}

	public Long getRecordedBy() {
		return RecordedBy;
	}

	public void setRecordedBy(Long recordedBy) {
		RecordedBy = recordedBy;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public Integer getFatiqueLevel() {
		return fatiqueLevel;
	}

	public void setFatiqueLevel(Integer fatiqueLevel) {
		this.fatiqueLevel = fatiqueLevel;
	}

	public Integer getMotivationLevel() {
		return motivationLevel;
	}

	public void setMotivationLevel(Integer motivationLevel) {
		this.motivationLevel = motivationLevel;
	}

	public Integer getStressLevel() {
		return stressLevel;
	}

	public void setStressLevel(Integer stressLevel) {
		this.stressLevel = stressLevel;
	}

	public Float getSleepHours() {
		return sleepHours;
	}

	public void setSleepHours(Float sleepHours) {
		this.sleepHours = sleepHours;
	}

	public Integer getSleepQuality() {
		return sleepQuality;
	}

	public void setSleepQuality(Integer sleepQuality) {
		this.sleepQuality = sleepQuality;
	}

	public Integer getMuscleAching() {
		return muscleAching;
	}

	public void setMuscleAching(Integer muscleAching) {
		this.muscleAching = muscleAching;
	}

	public Integer getHydrationLevel() {
		return hydrationLevel;
	}

	public void setHydrationLevel(Integer hydrationLevel) {
		this.hydrationLevel = hydrationLevel;
	}

	public Integer getAppetiteLevel() {
		return appetiteLevel;
	}

	public void setAppetiteLevel(Integer appetiteLevel) {
		this.appetiteLevel = appetiteLevel;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Boolean getIsValid() {
		return isValid;
	}

	public void setIsValid(Boolean isValid) {
		this.isValid = isValid;
	}

	public InjuryType getType() {
		return type;
	}

	public void setType(InjuryType type) {
		this.type = type;
	}

	public List<PainPointDTO> getPainPoints() {
		return painPoints;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

}
