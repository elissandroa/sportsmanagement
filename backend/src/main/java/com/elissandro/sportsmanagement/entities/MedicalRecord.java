package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.elissandro.sportsmanagement.enums.InjuryStatus;
import com.elissandro.sportsmanagement.enums.InjuryType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_medical_record")
public class MedicalRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Enumerated(EnumType.STRING)
	private InjuryType type;
	private String bodyPart;
	private String bodyPartCoordinates;
	private String description;
	private LocalDate injuryDate;
	private LocalDate expectedReturn;
	private LocalDate actualReturn;
	@Enumerated(EnumType.STRING)
	private InjuryStatus status;
	private String treatment;
	private String severity;
	private int treatedBy;
	private LocalDate createdAt;
	private LocalDate updatedAt;

	@ManyToMany(mappedBy = "medicalRecords")
	private Set<Athlete> athletes = new HashSet<>();

	public MedicalRecord() {
	}

	public MedicalRecord(Long id, InjuryType type, String bodyPart, String bodyPartCoordinates, String description,
			LocalDate injuryDate, LocalDate expectedRun, LocalDate actualReturn, InjuryStatus status, String treatment,
			String severity, int treatedBy, LocalDate createdAt, LocalDate updatedAt) {
		this.id = id;
		this.type = type;
		this.bodyPart = bodyPart;
		this.bodyPartCoordinates = bodyPartCoordinates;
		this.description = description;
		this.injuryDate = injuryDate;
		this.expectedReturn = expectedRun;
		this.actualReturn = actualReturn;
		this.status = status;
		this.treatment = treatment;
		this.severity = severity;
		this.treatedBy = treatedBy;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
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

	public LocalDate getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDate createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDate getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDate updatedAt) {
		this.updatedAt = updatedAt;
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
		MedicalRecord other = (MedicalRecord) obj;
		return Objects.equals(id, other.id);
	}

	public Integer getDaysOut() {
		if (actualReturn != null) {
			return (int) java.time.temporal.ChronoUnit.DAYS.between(injuryDate, actualReturn);
		} else {
			return (int) java.time.temporal.ChronoUnit.DAYS.between(injuryDate, LocalDate.now());
		}
	}

	public Boolean isRecovered() {
		return status == InjuryStatus.RECOVERED;
	}

	public void updateStatus(InjuryStatus newStatus, LocalDate returnDate) {
		this.status = newStatus;
		if (newStatus == InjuryStatus.RECOVERED) {
			this.actualReturn = returnDate;
		}
	}
	
	public Integer getRemainingDays() {
		if (expectedReturn != null) {
			if((int) java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), expectedReturn) < 0) {
				return 0;
			}
			return (int) java.time.temporal.ChronoUnit.DAYS.between(LocalDate.now(), expectedReturn);
		} else {
			return null;
		}
	}

}
