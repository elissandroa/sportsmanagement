package com.elissandro.sportsmanagement.dtos;

import java.io.Serializable;

import com.elissandro.sportsmanagement.entities.PersonalDocuments;


public class PersonalDocumentsDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String cpf;
	private String rg;
	private String passport;
	private String bidCBF;
	
	private AthleteDTO athlete;
	
	public PersonalDocumentsDTO() {
	}
	
	public PersonalDocumentsDTO(Long id, String cpf, String rg, String passport, String bidCBF) {
		this.id = id;
		this.cpf = cpf;
		this.rg = rg;
		this.passport = passport;
		this.bidCBF = bidCBF;
	}
	
	public PersonalDocumentsDTO(PersonalDocuments entity) {
		this.id = entity.getId();
		this.cpf = entity.getCpf();
		this.rg = entity.getRg();
		this.passport = entity.getPassport();
		this.bidCBF = entity.getBidCBF();

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getPassport() {
		return passport;
	}

	public void setPassport(String passport) {
		this.passport = passport;
	}

	public String getBidCBF() {
		return bidCBF;
	}

	public void setBidCBF(String bidCBF) {
		this.bidCBF = bidCBF;
	}

	public AthleteDTO getAthlete() {
		return athlete;
	}

	public void setAthlete(AthleteDTO athlete) {
		this.athlete = athlete;
	}
}
