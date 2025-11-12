package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;

import com.elissandro.sportsmanagement.entities.PainPoint;

public class PainPointDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Float x;
	private Float y;
	private Integer intensity;
	private String type;
	private String description;
	private String bodyPart;

	public PainPointDTO() {
	}

	public PainPointDTO(Long id, Float x, Float y, Integer intensity, String type, String description,
			String bodyPart) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.intensity = intensity;
		this.type = type;
		this.description = description;
		this.bodyPart = bodyPart;
	}

	public PainPointDTO(PainPoint entity) {
		this.id = entity.getId();
		this.x = entity.getX();
		this.y = entity.getY();
		this.intensity = entity.getIntensity();
		this.type = entity.getType();
		this.description = entity.getDescription();
		this.bodyPart = entity.getBodyPart();
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
}
