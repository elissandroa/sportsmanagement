package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.elissandro.sportsmanagement.enums.ContractType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_contract")
public class Contract implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Boolean hasContract;
	private Double salary;
	private String duration;
	private LocalDate startDate;
	private LocalDate endDate;
	private String contractPdf;
	private ContractType contractType;
	
	@ManyToMany(mappedBy = "contracts")
	private Set<Athlete> athletes = new HashSet<>();
	
	public Contract() {
	}
	
	public Contract(Long id) {
		this.id = id;
	}
	
	public Contract(Long id, Boolean hasContract, Double salary, String duration, LocalDate startDate,
			LocalDate endDate, String contractPdf, ContractType contractType) {
		this.id = id;
		this.hasContract = hasContract;
		this.salary = salary;
		this.duration = duration;
		this.startDate = startDate;
		this.endDate = endDate;
		this.contractPdf = contractPdf;
		this.contractType = contractType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getHasContract() {
		return hasContract;
	}

	public void setHasContract(Boolean hasContract) {
		this.hasContract = hasContract;
	}

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
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

	public String getContractPdf() {
		return contractPdf;
	}

	public void setContractPdf(String contractPdf) {
		this.contractPdf = contractPdf;
	}

	public ContractType getContractType() {
		return contractType;
	}

	public void setContractType(ContractType contractType) {
		this.contractType = contractType;
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
		Contract other = (Contract) obj;
		return Objects.equals(id, other.id);
	}

	public void setAthlete(Athlete entity) {
		this.athletes.add(entity);
	}
}
