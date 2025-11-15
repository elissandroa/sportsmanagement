package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

}
