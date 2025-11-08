package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.elissandro.sportsmanagement.enums.CompetitionType;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_competition")
public class Competition implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private LocalDate startDate;
	private LocalDate endDate;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_competition_category",
		joinColumns = @JoinColumn(name = "competition_id"),
		inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<Category> categories = new HashSet<>();
	
	private CompetitionType type;
	private String regulations;
	private Boolean active;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	
	@ManyToMany
	@JoinTable(name = "tb_competition_match",
		joinColumns = @JoinColumn(name = "competition_id"),
		inverseJoinColumns = @JoinColumn(name = "match_id"))
	private Set<Match> matches = new HashSet<>();
	
	public Competition() {
	}
	
	public Competition(Long id, String name, LocalDate startDate, LocalDate endDate, CompetitionType type,
			String regulations, Boolean active) {
		this.id = id;
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.type = type;
		this.regulations = regulations;
		this.active = active;
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

	public Set<Category> getCategories() {
		return categories;
	}

	public Set<Match> getMatches() {
		return matches;
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
		Competition other = (Competition) obj;
		return Objects.equals(id, other.id);
	}

}
