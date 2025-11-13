package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.PlayerMinute;

public interface PlayerMinuteRepository extends JpaRepository<PlayerMinute, Long> {

}
