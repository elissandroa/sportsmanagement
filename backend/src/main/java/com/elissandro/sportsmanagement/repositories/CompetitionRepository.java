package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Competition;

public interface CompetitionRepository extends JpaRepository<Competition, Long> {

}
