package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import com.elissandro.sportsmanagement.entities.base.BaseEntityAudit;
import com.elissandro.sportsmanagement.enums.TrainingStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_training")
public class Training extends BaseEntityAudit implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_training_category",
		joinColumns = @JoinColumn(name = "training_id"),
		inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<Category> categories = new HashSet<>();
	
	@OneToMany(mappedBy = "training", cascade = CascadeType.ALL, orphanRemoval = true)	
	private List<Attendance> attendances = new ArrayList<>();
	
	public Training() {
	}
	
	public Training(Long id, Integer trainingNumber, LocalDate date, String time, Integer mesoCycleNumber,
			Integer microCycleNumber, Integer macroCycleNumber, Integer playerCount, String objective,
			Long scheduledBy, TrainingStatus status) {
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

	public Set<Category> getCategories() {
		return categories;
	}

	public List<Attendance> getAttendances() {
		return attendances;
	}
	
	public void setTraining(Training entity) {
		this.id = entity.getId();
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
		Training other = (Training) obj;
		return Objects.equals(id, other.id);
	}

}
