package com.elissandro.sportsmanagement.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
@Entity
@Table(name = "tb_personal_documents")
public class PersonalDocuments implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String cpf;
	private String rg;
	private String passport;
	private String bidCBF;
	
	@OneToOne(mappedBy = "personalDocuments")
	private Athlete athlete;
	
	public PersonalDocuments() {
	}
	
	public PersonalDocuments(Long id, String cpf, String rg, String passport, String bidCBF) {
		this.id = id;
		this.cpf = cpf;
		this.rg = rg;
		this.passport = passport;
		this.bidCBF = bidCBF;
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
		PersonalDocuments other = (PersonalDocuments) obj;
		return Objects.equals(id, other.id);
	}

}
