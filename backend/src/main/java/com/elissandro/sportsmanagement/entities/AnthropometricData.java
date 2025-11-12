package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_anthropometric_data")
public class AnthropometricData implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Double weight;
	private Double height;
	private Double bodyFat;
	private Double leanMass;
	private Double bmi;
	private LocalDate measurementDate;

	@OneToOne(mappedBy = "anthropometricData")
	private Athlete athlete;

	public AnthropometricData() {
	}

	public AnthropometricData(Long id) {
		this.id = id;
	}

	public AnthropometricData(Long id, Double weight, Double height, Double bodyFat, Double leanMass, Double bmi,
			LocalDate measurementDate) {
		this.id = id;
		this.weight = weight;
		this.height = height;
		this.bodyFat = bodyFat;
		this.leanMass = leanMass;
		this.bmi = bmi;
		this.measurementDate = measurementDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}

	public Double getBodyFat() {
		return bodyFat;
	}

	public void setBodyFat(Double bodyFat) {
		this.bodyFat = bodyFat;
	}

	public Double getLeanMass() {
		return leanMass;
	}

	public void setLeanMass(Double leanMass) {
		this.leanMass = leanMass;
	}

	public Double getBmi() {
		return bmi;
	}

	public void setBmi(Double bmi) {
		this.bmi = bmi;
	}

	public LocalDate getMeasurementDate() {
		return measurementDate;
	}

	public void setMeasurementDate(LocalDate measurementDate) {
		this.measurementDate = measurementDate;
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
		AnthropometricData other = (AnthropometricData) obj;
		return Objects.equals(id, other.id);
	}

	public void setAthlete(Athlete entity) {
		this.athlete = entity;
	}

}
