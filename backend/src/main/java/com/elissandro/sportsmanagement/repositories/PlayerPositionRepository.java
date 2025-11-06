package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.PlayerPosition;

public interface PlayerPositionRepository extends JpaRepository<PlayerPosition, Long> {

}
