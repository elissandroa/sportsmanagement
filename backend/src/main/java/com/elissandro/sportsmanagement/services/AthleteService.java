package com.elissandro.sportsmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.elissandro.sportsmanagement.dtos.AthleteDTO;
import com.elissandro.sportsmanagement.entities.AddressAthlete;
import com.elissandro.sportsmanagement.entities.AnthropometricData;
import com.elissandro.sportsmanagement.entities.Athlete;
import com.elissandro.sportsmanagement.entities.AthleteStatistics;
import com.elissandro.sportsmanagement.entities.Contract;
import com.elissandro.sportsmanagement.entities.MedicalRecord;
import com.elissandro.sportsmanagement.entities.Penalty;
import com.elissandro.sportsmanagement.entities.PersonalDocuments;
import com.elissandro.sportsmanagement.entities.SubjectivePerceptionEffort;
import com.elissandro.sportsmanagement.entities.SubjectivePerceptionRecovery;
import com.elissandro.sportsmanagement.repositories.AthleteRepository;
import com.elissandro.sportsmanagement.repositories.CategoryRepository;
import com.elissandro.sportsmanagement.repositories.ContractRepository;
import com.elissandro.sportsmanagement.repositories.MedicalRecordRepository;
import com.elissandro.sportsmanagement.repositories.PenaltyRepository;
import com.elissandro.sportsmanagement.repositories.PlayerPositionRepository;
import com.elissandro.sportsmanagement.repositories.SubjectivePerceptionEffortRepository;
import com.elissandro.sportsmanagement.repositories.SubjectivePerceptionRecoveryRepository;
import com.elissandro.sportsmanagement.services.exceptions.DatabaseException;
import com.elissandro.sportsmanagement.services.exceptions.ResourceNotFoundException;
import com.elissandro.sportsmanagement.utils.EntityListSaver;

@Service
public class AthleteService {

	@Autowired
	private AthleteRepository repository;

	@Autowired
	private ContractRepository contractRepository;

	@Autowired
	private SubjectivePerceptionEffortRepository subjectivePerceptionEffortRepository;

	@Autowired
	private SubjectivePerceptionRecoveryRepository subjectivePerceptionRecoveryRepository;

	@Autowired
	private MedicalRecordRepository medicalRecordRepository;

	@Autowired
	private PenaltyRepository penaltyRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private PlayerPositionRepository playerPositionRepository;

	@Transactional(readOnly = true)
	public AthleteDTO findById(Long id) {
		var entity = EntityListSaver.findById(id, repository);
		return new AthleteDTO(entity);
	}

	@Transactional(readOnly = true)
	public Page<AthleteDTO> findAll(Pageable pageable) {
		return EntityListSaver.findAll(repository, pageable).map(entity -> new AthleteDTO(entity, true));
	}

	@Transactional
	public AthleteDTO insert(AthleteDTO dto) {
		Athlete entity = new Athlete();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AthleteDTO(entity);
	}

	@Transactional
	public AthleteDTO update(Long id, AthleteDTO dto) {
		Athlete entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Athlete not found"));
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new AthleteDTO(entity);
	}

	@Transactional
	public void copyDtoToEntity(AthleteDTO dto, Athlete entity) {

		// ======================
		// 🔹 Dados básicos
		// ======================
		entity.setName(dto.getName());
		entity.setPhoto(dto.getPhoto());
		entity.setPosition(dto.getPosition());
		entity.setBirthDate(dto.getBirthDate());
		entity.setJerseyNumber(dto.getJerseyNumber());
		entity.setHeight(dto.getHeight());
		entity.setWeight(dto.getWeight());
		entity.setPreferredFoot(dto.getPreferredFoot());
		entity.setPhoneNumber(dto.getPhoneNumber());
		entity.setActive(dto.isActive());

		// ======================
		// 🔹 Endereço
		// ======================
		if (dto.getAddress() != null) {
			AddressAthlete address = dto.getAddress().getId() != null ? new AddressAthlete(dto.getAddress().getId())
					: new AddressAthlete();
			address.setStreet(dto.getAddress().getStreet());
			address.setLocalNumber(dto.getAddress().getLocalNumber());
			address.setComplement(dto.getAddress().getComplement());
			address.setZipCode(dto.getAddress().getZipCode());
			address.setNeighborhood(dto.getAddress().getNeighborhood());
			address.setCity(dto.getAddress().getCity());
			address.setState(dto.getAddress().getState());
			address.setCountry(dto.getAddress().getCountry());
			address.setAthlete(entity);
			entity.setAddress(address);
		}

		// ======================
		// 🔹 Documentos pessoais
		// ======================
		if (dto.getPersonalDocuments() != null) {
			PersonalDocuments docs = dto.getPersonalDocuments().getId() != null
					? new PersonalDocuments(dto.getPersonalDocuments().getId())
					: new PersonalDocuments();
			docs.setCpf(dto.getPersonalDocuments().getCpf());
			docs.setRg(dto.getPersonalDocuments().getRg());
			docs.setPassport(dto.getPersonalDocuments().getPassport());
			docs.setBidCBF(dto.getPersonalDocuments().getBidCBF());
			docs.setAthlete(entity);
			entity.setPersonalDocuments(docs);
		}

		// ======================
		// 🔹 Dados antropométricos
		// ======================
		if (dto.getAnthropometricData() != null) {
			AnthropometricData anthropometricData = dto.getAnthropometricData().getId() != null
					? new AnthropometricData(dto.getAnthropometricData().getId())
					: new AnthropometricData();

			anthropometricData.setWeight(dto.getAnthropometricData().getWeight());
			anthropometricData.setHeight(dto.getAnthropometricData().getHeight());
			anthropometricData.setBodyFat(dto.getAnthropometricData().getBodyFat());
			anthropometricData.setLeanMass(dto.getAnthropometricData().getLeanMass());

			// Calcula o BMI e formata com 1 casa decimal
			double bmi = dto.getAnthropometricData().getWeight() / Math.pow(dto.getAnthropometricData().getHeight(), 2);
			anthropometricData.setBmi(Math.round(bmi * 10.0) / 10.0);

			anthropometricData.setMeasurementDate(dto.getAnthropometricData().getMeasurementDate());
			anthropometricData.setAthlete(entity);
			entity.setAnthropometricData(anthropometricData);
		}

		// ======================
		// 🔹 Estatísticas do atleta
		// ======================
		if (dto.getAthleteStatistics() != null) {
			AthleteStatistics stats = dto.getAthleteStatistics().getId() != null
					? new AthleteStatistics(dto.getAthleteStatistics().getId())
					: new AthleteStatistics();

			stats.setMatchesPlayed(dto.getAthleteStatistics().getMatchesPlayed());
			stats.setMinutesPlayed(dto.getAthleteStatistics().getMinutesPlayed());
			stats.setGoalsScored(dto.getAthleteStatistics().getGoalsScored());
			stats.setAssists(dto.getAthleteStatistics().getAssists());
			stats.setYellowCards(dto.getAthleteStatistics().getYellowCards());
			stats.setRedCards(dto.getAthleteStatistics().getRedCards());
			stats.setInjuries(dto.getAthleteStatistics().getInjuries());
			stats.setAveragePse(dto.getAthleteStatistics().getAveragePse());
			stats.setAveragePsr(dto.getAthleteStatistics().getAveragePsr());
			stats.setAthlete(entity);
			entity.setAthleteStatistics(stats);
		}

		// ======================
		// 🔹 Contratos
		// ======================
		entity.getContracts().clear();
		entity.getContracts().addAll(EntityListSaver.saveAll(dto.getContracts(), contractRepository,
				c -> c.getId() != null ? new Contract(c.getId()) : new Contract(), (c, contract) -> {
					contract.setHasContract(c.getHasContract());
					contract.setSalary(c.getSalary());
					contract.setDuration(c.getDuration());
					contract.setStartDate(c.getStartDate());
					contract.setEndDate(c.getEndDate());
					contract.setContractPdf(c.getContractPdf());
					contract.setContractType(c.getContractType());
					contract.setAthlete(entity);
				}));

		// ======================
		// 🔹 Penalidades
		// ======================
		entity.getPenalties().clear();
		entity.getPenalties().addAll(EntityListSaver.saveAll(dto.getPenalties(), penaltyRepository,
				p -> p.getId() != null ? new Penalty(p.getId()) : new Penalty(), (p, penalty) -> {
					penalty.setType(p.getType());
					penalty.setReason(p.getReason());
					penalty.setDate(p.getDate());
					penalty.setSuspentionGames(p.getSuspentionGames());
					penalty.setServed(p.getServed());
					penalty.setAthlete(entity);
				}));

		// ======================
		// 🔹 Registros médicos
		// ======================
		entity.getMedicalRecords().clear();
		entity.getMedicalRecords().addAll(EntityListSaver.saveAll(dto.getMedicalRecords(), medicalRecordRepository,
				m -> m.getId() != null ? new MedicalRecord(m.getId()) : new MedicalRecord(), (m, medical) -> {
					medical.setType(m.getType());
					medical.setBodyPart(m.getBodyPart());
					medical.setBodyPartCoordinates(m.getBodyPartCoordinates());
					medical.setDescription(m.getDescription());
					medical.setInjuryDate(m.getInjuryDate());
					medical.setExpectedReturn(m.getExpectedReturn());
					medical.setActualReturn(m.getActualReturn());
					medical.setStatus(m.getStatus());
					medical.setTreatment(m.getTreatment());
					medical.setSeverity(m.getSeverity());
					medical.setDaysOut(m.getDaysOut());
					medical.setRemainingDays(m.getRemainingDays());
					medical.setAthlete(entity);
				}));

		// ======================
		// 🔹 PSE (Esforço)
		// ======================
		entity.getSubjectivePerceptionEfforts().clear();
		entity.getSubjectivePerceptionEfforts().addAll(EntityListSaver.saveAll(dto.getSubjectivePerceptionEfforts(),
				subjectivePerceptionEffortRepository,
				e -> e.getId() != null ? new SubjectivePerceptionEffort(e.getId()) : new SubjectivePerceptionEffort(),
				(e, effort) -> {
					effort.setDate(e.getDate());
					effort.setPseValue(e.getPseValue());
					effort.setDuration(e.getDuration());
					effort.setRecordedBy(e.getRecordedBy());
					effort.setValid(e.isValid());
					effort.setAthlete(entity);
				}));

		// ======================
		// 🔹 PSR (Recuperação)
		// ======================
		entity.getSubjectivePerceptionRecoveries().clear();
		entity.getSubjectivePerceptionRecoveries()
				.addAll(EntityListSaver.saveAll(dto.getSubjectivePerceptionRecoveries(),
						subjectivePerceptionRecoveryRepository,
						r -> r.getId() != null ? new SubjectivePerceptionRecovery(r.getId())
								: new SubjectivePerceptionRecovery(),
						(r, recovery) -> {
							recovery.setType(r.getType());
							recovery.setDate(r.getDate());
							recovery.setPsrValue(r.getPsrValue());
							recovery.setFatiqueLevel(r.getFatiqueLevel());
							recovery.setMotivationLevel(r.getMotivationLevel());
							recovery.setStressLevel(r.getStressLevel());
							recovery.setSleepHours(r.getSleepHours());
							recovery.setSleepQuality(r.getSleepQuality());
							recovery.setMuscleAching(r.getMuscleAching());
							recovery.setHydrationLevel(r.getHydrationLevel());
							recovery.setAppetiteLevel(r.getAppetiteLevel());
							recovery.setNotes(r.getNotes());
							recovery.setIsValid(r.getIsValid());
							recovery.setRecordedBy(r.getRecordedBy());
							recovery.setAthlete(entity);
						}));

		// ======================
		// 🔹 Categorias e Posições
		// ======================
		entity.getCategories().clear();
		dto.getCategories()
				.forEach(cat -> entity.getCategories().add(categoryRepository.getReferenceById(cat.getId())));

		entity.getPlayerPositions().clear();
		dto.getPlayerPositions().forEach(
				pos -> entity.getPlayerPositions().add(playerPositionRepository.getReferenceById(pos.getId())));

	}

	@Transactional
	public void delete(Long id) {
		if (!repository.existsById(id)) {
			throw new ResourceNotFoundException("Athlete not found");
		}
		try {
			EntityListSaver.deleteById(id, repository);
		} catch (Exception e) {
			throw new DatabaseException("Could not delete Athlete with id " + id);
		}
	}

}
