package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.MatchAnalysis;

public interface MatchAnalysisRepository extends JpaRepository<MatchAnalysis, Long> {

}
