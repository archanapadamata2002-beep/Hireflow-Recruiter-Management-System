package com.hireflow.repository;

import com.hireflow.entity.Application;
import com.hireflow.enums.ApplicationStatus;
import com.hireflow.entity.Job;
import com.hireflow.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByCandidate(User candidate);

    List<Application> findByJob(Job job);

    Optional<Application> findByJobAndCandidate(Job job, User candidate);
    long countByStatus(ApplicationStatus status);
}