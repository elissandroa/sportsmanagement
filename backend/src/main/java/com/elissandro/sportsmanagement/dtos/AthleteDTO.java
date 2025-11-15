package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.elissandro.sportsmanagement.entities.Athlete;

public class AthleteDTO implements Serializable {
	private static final long serialVersionUID = 1L;

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

	private AddressAthleteDTO address;

	private PersonalDocumentsDTO personalDocuments;

	private List<CategoryDTO> categories = new ArrayList<>();

	private List<PlayerPositionDTO> playerPositions = new ArrayList<>();

	private List<ContractDTO> contracts = new ArrayList<>();

	private AthleteStatisticsDTO athleteStatistics;

	private List<SubjectivePerceptionRecoveryDTO> subjectivePerceptionRecoveries = new ArrayList<>();

	private List<SubjectivePerceptionEffortDTO> subjectivePerceptionEfforts = new ArrayList<>();

	private AnthropometricDataDTO anthropometricData;

	private List<MedicalRecordDTO> medicalRecords = new ArrayList<>();

	private List<PenaltyDTO> penalties = new ArrayList<>();

	public AthleteDTO() {
	}

	public AthleteDTO(Long id, String name, String photo, String position, LocalDate birthDate, int jerseyNumber,
			Double height, Double weight, String preferredFoot, boolean isActive, String phoneNumber) {
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
	}

	public AthleteDTO(Athlete entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.photo = entity.getPhoto();
		this.position = entity.getPosition();
		this.birthDate = entity.getBirthDate();
		this.jerseyNumber = entity.getJerseyNumber();
		this.height = entity.getHeight();
		this.weight = entity.getWeight();
		this.preferredFoot = entity.getPreferredFoot();
		this.isActive = entity.isActive();
		this.phoneNumber = entity.getPhoneNumber();
		this.address = new AddressAthleteDTO(entity.getAddress());
		this.personalDocuments = new PersonalDocumentsDTO(entity.getPersonalDocuments());
		this.athleteStatistics = new AthleteStatisticsDTO(entity.getAthleteStatistics());
		this.anthropometricData = new AnthropometricDataDTO(entity.getAnthropometricData());

		for (var p : entity.getPenalties()) {
			this.penalties.add(new PenaltyDTO(p));
		}

		for (var mr : entity.getMedicalRecords()) {
			this.medicalRecords.add(new MedicalRecordDTO(mr));
		}

		for (var spr : entity.getSubjectivePerceptionRecoveries()) {
			this.subjectivePerceptionRecoveries.add(new SubjectivePerceptionRecoveryDTO(spr));
		}

		for (var spe : entity.getSubjectivePerceptionEfforts()) {
			this.subjectivePerceptionEfforts.add(new SubjectivePerceptionEffortDTO(spe));
		}

		for (var cat : entity.getCategories()) {
			this.categories.add(new CategoryDTO(cat));
		}
		for (var pos : entity.getPlayerPositions()) {
			this.playerPositions.add(new PlayerPositionDTO(pos));
		}
		for (var cont : entity.getContracts()) {
			this.contracts.add(new ContractDTO(cont));
		}

	}
	
	public AthleteDTO(Athlete entity, Boolean simpleRegister) {
		this(entity);
		if(simpleRegister) {
			this.address = null;
			this.personalDocuments = null;
			this.athleteStatistics = null;
			this.anthropometricData = null;
			this.penalties.clear();
			this.medicalRecords.clear();
			this.subjectivePerceptionRecoveries.clear();
			this.subjectivePerceptionEfforts.clear();
			this.playerPositions.clear();
			this.categories.clear();
			this.contracts.clear();
		}
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

	public AddressAthleteDTO getAddress() {
		return address;
	}

	public void setAddress(AddressAthleteDTO address) {
		this.address = address;
	}

	public PersonalDocumentsDTO getPersonalDocuments() {
		return personalDocuments;
	}

	public void setPersonalDocuments(PersonalDocumentsDTO personalDocuments) {
		this.personalDocuments = personalDocuments;
	}

	public List<CategoryDTO> getCategories() {
		return categories;
	}

	public List<PlayerPositionDTO> getPlayerPositions() {
		return playerPositions;
	}

	public List<ContractDTO> getContracts() {
		return contracts;
	}

	public AthleteStatisticsDTO getAthleteStatistics() {
		return athleteStatistics;
	}

	public void setAthleteStatistics(AthleteStatisticsDTO athleteStatistics) {
		this.athleteStatistics = athleteStatistics;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public List<SubjectivePerceptionRecoveryDTO> getSubjectivePerceptionRecoveries() {
		return subjectivePerceptionRecoveries;
	}

	public List<SubjectivePerceptionEffortDTO> getSubjectivePerceptionEfforts() {
		return subjectivePerceptionEfforts;
	}

	public AnthropometricDataDTO getAnthropometricData() {
		return anthropometricData;
	}

	public void setAnthropometricData(AnthropometricDataDTO anthropometricData) {
		this.anthropometricData = anthropometricData;
	}

	public List<MedicalRecordDTO> getMedicalRecords() {
		return medicalRecords;
	}

	public List<PenaltyDTO> getPenalties() {
		return penalties;
	}

}
