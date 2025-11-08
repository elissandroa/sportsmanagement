package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {

}
