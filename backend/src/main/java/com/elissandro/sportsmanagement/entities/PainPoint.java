package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.util.Objects;

import com.elissandro.sportsmanagement.utils.Identifiable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_pain_points")
public class PainPoint implements Serializable, Identifiable<Long> {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Float x;
	private Float y;
	private Integer intensity;
	private String type;
	private String description;
	private String bodyPart;
	
	
	@ManyToOne
	@JoinColumn(name = "subjective_perception_recovery_id")
	private SubjectivePerceptionRecovery subjectivePerceptionRecovery;
	
	
	public PainPoint() {
	}
	
	public PainPoint(Long id) {
		this.id = id;
	}
	
	public PainPoint(Long id, Float x, Float y, Integer intensity, String type,
			String description, String bodyPart) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.intensity = intensity;
		this.type = type;
		this.description = description;
		this.bodyPart = bodyPart;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Float getX() {
		return x;
	}

	public void setX(Float x) {
		this.x = x;
	}

	public Float getY() {
		return y;
	}

	public void setY(Float y) {
		this.y = y;
	}

	public Integer getIntensity() {
		return intensity;
	}

	public void setIntensity(Integer intensity) {
		this.intensity = intensity;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBodyPart() {
		return bodyPart;
	}

	public void setBodyPart(String bodyPart) {
		this.bodyPart = bodyPart;
	}
	

	public void setSubjectivePerceptionRecovery(SubjectivePerceptionRecovery entity) {
		this.subjectivePerceptionRecovery = entity;
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
		PainPoint other = (PainPoint) obj;
		return Objects.equals(id, other.id);
	}

	
}
