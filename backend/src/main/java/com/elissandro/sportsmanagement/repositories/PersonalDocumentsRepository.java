package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.PersonalDocuments;

public interface PersonalDocumentsRepository extends JpaRepository<PersonalDocuments, Long> {

}
