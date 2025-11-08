package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.elissandro.sportsmanagement.entities.Category;
import com.elissandro.sportsmanagement.entities.Competition;
import com.elissandro.sportsmanagement.entities.Match;
import com.elissandro.sportsmanagement.enums.CompetitionType;

public class CompetitionDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String name;
	private LocalDate startDate;
	private LocalDate endDate;

	private List<CategoryDTO> categories = new ArrayList<>();
	
	private CompetitionType type;
	private String regulations;
	private Boolean active;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;

	private List<MatchDTO> matches = new ArrayList<>();
	
	public CompetitionDTO() {
	}
	
	public CompetitionDTO(Long id, String name, LocalDate startDate, LocalDate endDate, CompetitionType type,
			String regulations, Boolean active) {
		this.id = id;
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.type = type;
		this.regulations = regulations;
		this.active = active;
	}
	
	public CompetitionDTO(Competition entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.startDate = entity.getStartDate();
		this.endDate = entity.getEndDate();
		this.type = entity.getType();
		this.regulations = entity.getRegulations();
		this.active = entity.getActive();
		this.createdAt = entity.getCreatedAt();
		this.updatedAt = entity.getUpdatedAt();
	}
	
	public CompetitionDTO(Competition entity, Set<Match> matches, Set<Category> categories) {
		this(entity);
		matches.forEach(match -> this.matches.add(new MatchDTO(match)));
		categories.forEach(cat -> this.categories.add(new CategoryDTO(cat)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public CompetitionType getType() {
		return type;
	}

	public void setType(CompetitionType type) {
		this.type = type;
	}

	public String getRegulations() {
		return regulations;
	}

	public void setRegulations(String regulations) {
		this.regulations = regulations;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
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

	public List<MatchDTO> getMatches() {
		return matches;
	}

	public List<CategoryDTO> getCategories() {
		return categories;
	}

}
