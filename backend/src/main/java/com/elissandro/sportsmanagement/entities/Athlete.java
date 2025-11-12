package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_athlete")
public class Athlete implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String photo;
	private String position;
	private LocalDate birthDate;
	private int jerseyNumber;
	private Double height;
	private Double weight;
	private String preferredFoot;
	private boolean isActive;
	private String phoneNumber;	
		
	@OneToOne(cascade = CascadeType.ALL)
	private AddressAthlete address;
		
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_athlete_category",
		joinColumns = @JoinColumn(name = "athlete_id"),
		inverseJoinColumns = @JoinColumn(name = "category_id"))
	private Set<Category> categories = new HashSet<>();
	
	@OneToOne(cascade = CascadeType.ALL)
	private PersonalDocuments personalDocuments;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_athlete_player_position",
		joinColumns = @JoinColumn(name = "athlete_id"),
		inverseJoinColumns = @JoinColumn(name = "player_position_id"))
	private Set<PlayerPosition> playerPositions = new HashSet<>();
	
	@ManyToMany
	@JoinTable(name = "tb_athlete_contract",
		joinColumns = @JoinColumn(name = "athlete_id"),
		inverseJoinColumns = @JoinColumn(name = "contract_id"))
	private Set<Contract> contracts = new HashSet<>();
	
	@OneToOne(cascade = CascadeType.ALL)
	private AthleteStatistics athleteStatistics;
	
	@OneToOne(cascade = CascadeType.ALL)
	private AnthropometricData anthropometricData;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_athlete_subjective_perception_recovery",
		joinColumns = @JoinColumn(name = "athlete_id"),
		inverseJoinColumns = @JoinColumn(name = "subjective_perception_recovery_id"))
	private Set<SubjectivePerceptionRecovery> subjectivePerceptionRecoveries = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_athlete_subjective_perception_effort",
		joinColumns = @JoinColumn(name = "athlete_id"),
		inverseJoinColumns = @JoinColumn(name = "subjective_perception_effort_id"))
	private Set<SubjectivePerceptionEffort> subjectivePerceptionEfforts = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_athlete_medical_record",
		joinColumns = @JoinColumn(name = "athlete_id"),
		inverseJoinColumns = @JoinColumn(name = "medical_record_id"))
	private Set<MedicalRecord> medicalRecords = new HashSet<>();
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_athlete_penalty",
		joinColumns = @JoinColumn(name = "athlete_id"),
		inverseJoinColumns = @JoinColumn(name = "penalty_id"))
	private Set<Penalty> penalties = new HashSet<>();
	
			
	public Athlete() {
	}
	
	public Athlete(Long id, String name, String photo, String position, LocalDate birthDate, int jerseyNumber, Double height,
			Double weight, String preferredFoot, boolean isActive, String phoneNumber, AddressAthlete address,
			PersonalDocuments personalDocuments) {
		this.id = id;
		this.name = name;
		this.photo = photo;
		this.position = position;
		this.birthDate = birthDate;
		this.jerseyNumber = jerseyNumber;
		this.height = height;
		this.weight = weight;
		this.preferredFoot = preferredFoot;
		this.isActive = isActive;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.personalDocuments = personalDocuments;
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

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public int getJerseyNumber() {
		return jerseyNumber;
	}

	public void setJerseyNumber(int jerseyNumber) {
		this.jerseyNumber = jerseyNumber;
	}

	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public String getPreferredFoot() {
		return preferredFoot;
	}

	public void setPreferredFoot(String preferredFoot) {
		this.preferredFoot = preferredFoot;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public AddressAthlete getAddress() {
		return address;
	}

	public void setAddress(AddressAthlete address) {
		this.address = address;
	}

	public PersonalDocuments getPersonalDocuments() {
		return personalDocuments;
	}

	public void setPersonalDocuments(PersonalDocuments personalDocuments) {
		this.personalDocuments = personalDocuments;
	}

	public Set<Category> getCategories() {
		return categories;
	}

	public Set<PlayerPosition> getPlayerPositions() {
		return playerPositions;
	}

	public Set<Contract> getContracts() {
		return contracts;
	}

	public AthleteStatistics getAthleteStatistics() {
		return athleteStatistics;
	}

	public void setAthleteStatistics(AthleteStatistics athleteStatistics) {
		this.athleteStatistics = athleteStatistics;
	}
	
	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}
	
	public void setAnthropometricData(AnthropometricData anthropometricData) {
		this.anthropometricData = anthropometricData;
	}

	public AnthropometricData getAnthropometricData() {
		return anthropometricData;
	}

	public Set<SubjectivePerceptionRecovery> getSubjectivePerceptionRecoveries() {
		return subjectivePerceptionRecoveries;
	}

	public Set<SubjectivePerceptionEffort> getSubjectivePerceptionEfforts() {
		return subjectivePerceptionEfforts;
	}
	
	public Set<MedicalRecord> getMedicalRecords() {
		return medicalRecords;
	}

	public Set<Penalty> getPenalties() {
		return penalties;
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
		Athlete other = (Athlete) obj;
		return Objects.equals(id, other.id);
	}

}
