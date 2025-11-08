package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.MatchPlayerStatistics;

public interface MatchPlayerStatisticsRepository extends JpaRepository<MatchPlayerStatistics, Long> {

}
