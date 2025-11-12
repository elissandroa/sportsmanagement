package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.elissandro.sportsmanagement.entities.MedicalRecord;
import com.elissandro.sportsmanagement.enums.InjuryStatus;
import com.elissandro.sportsmanagement.enums.InjuryType;

public class MedicalRecordDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private InjuryType type;
	private String bodyPart;
	private String bodyPartCoordinates;
	private String description;
	private LocalDate injuryDate;
	private LocalDate expectedReturn;
	private LocalDate actualReturn;
	private InjuryStatus status;
	private String treatment;
	private String severity;
	private int treatedBy;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Integer daysOut;
	private Integer remainingDays;
	
	public MedicalRecordDTO() {
	}
	
	public MedicalRecordDTO(Long id, InjuryType type, String bodyPart, String bodyPartCoordinates, String description,
			LocalDate injuryDate, LocalDate expectedReturn, LocalDate actualReturn, InjuryStatus status, String treatment,
			String severity, int treatedBy, LocalDateTime createdAt, LocalDateTime updatedAt) {
		this.id = id;
		this.type = type;
		this.bodyPart = bodyPart;
		this.bodyPartCoordinates = bodyPartCoordinates;
		this.description = description;
		this.injuryDate = injuryDate;
		this.expectedReturn = expectedReturn;
		this.actualReturn = actualReturn;
		this.status = status;
		this.treatment = treatment;
		this.severity = severity;
		this.treatedBy = treatedBy;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	
	public MedicalRecordDTO(MedicalRecord entity) {
		this.id = entity.getId();
		this.type = entity.getType();
		this.bodyPart = entity.getBodyPart();
		this.bodyPartCoordinates = entity.getBodyPartCoordinates();
		this.description = entity.getDescription();
		this.injuryDate = entity.getInjuryDate();
		this.expectedReturn = entity.getExpectedReturn();
		this.actualReturn = entity.getActualReturn();
		this.status = entity.getStatus();
		this.treatment = entity.getTreatment();
		this.severity = entity.getSeverity();
		this.treatedBy = entity.getTreatedBy();
		this.createdAt = entity.getCreatedAt();
		this.updatedAt = entity.getUpdatedAt();
		this.daysOut = entity.getDaysOut();
		this.remainingDays = entity.getRemainingDays();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public InjuryType getType() {
		return type;
	}

	public void setType(InjuryType type) {
		this.type = type;
	}

	public String getBodyPart() {
		return bodyPart;
	}

	public void setBodyPart(String bodyPart) {
		this.bodyPart = bodyPart;
	}

	public String getBodyPartCoordinates() {
		return bodyPartCoordinates;
	}

	public void setBodyPartCoordinates(String bodyPartCoordinates) {
		this.bodyPartCoordinates = bodyPartCoordinates;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getInjuryDate() {
		return injuryDate;
	}

	public void setInjuryDate(LocalDate injuryDate) {
		this.injuryDate = injuryDate;
	}

	public LocalDate getExpectedReturn() {
		return expectedReturn;
	}

	public void setExpectedReturn(LocalDate expectedReturn) {
		this.expectedReturn = expectedReturn;
	}

	public LocalDate getActualReturn() {
		return actualReturn;
	}

	public void setActualReturn(LocalDate actualReturn) {
		this.actualReturn = actualReturn;
	}

	public InjuryStatus getStatus() {
		return status;
	}

	public void setStatus(InjuryStatus status) {
		this.status = status;
	}

	public String getTreatment() {
		return treatment;
	}

	public void setTreatment(String treatment) {
		this.treatment = treatment;
	}

	public String getSeverity() {
		return severity;
	}

	public void setSeverity(String severity) {
		this.severity = severity;
	}

	public int getTreatedBy() {
		return treatedBy;
	}

	public void setTreatedBy(int treatedBy) {
		this.treatedBy = treatedBy;
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

	public Integer getDaysOut() {
		return daysOut;
	}

	public void setDaysOut(Integer daysOut) {
		this.daysOut = daysOut;
	}

	public Integer getRemainingDays() {
		return remainingDays;
	}

	public void setRemainingDays(Integer remainingDays) {
		this.remainingDays = remainingDays;
	}
	
}
