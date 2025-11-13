package com.elissandro.sportsmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.elissandro.sportsmanagement.entities.Staff;

public interface StaffRepository extends JpaRepository<Staff, Long> {

}
