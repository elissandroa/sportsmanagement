package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;

import com.elissandro.sportsmanagement.entities.AnthropometricData;

public class AnthropometricDataDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Double weight;
	private Double height;
	private Double bodyFat;
	private Double leanMass;
	private Double bmi;
	private LocalDate measurementDate;
	private AthleteDTO athlete;
	
	public AnthropometricDataDTO() {
	}
	
	public AnthropometricDataDTO(Long id, Double weight, Double height, Double bodyFat,
			Double leanMass, Double bmi, LocalDate measurementDate) {
		this.id = id;
		this.weight = weight;
		this.height = height;
		this.bodyFat = bodyFat;
		this.leanMass = leanMass;
		this.bmi = bmi;
		this.measurementDate = measurementDate;
	}
	
	public AnthropometricDataDTO(AnthropometricData entity) {
		this.id = entity.getId();
		this.weight = entity.getWeight();
		this.height = entity.getHeight();
		this.bodyFat = entity.getBodyFat();
		this.leanMass = entity.getLeanMass();
		this.bmi = entity.getBmi();
		this.measurementDate = entity.getMeasurementDate();
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

	public AthleteDTO getAthlete() {
		return athlete;
	}

	public void setAthlete(AthleteDTO athlete) {
		this.athlete = athlete;
	}
}
