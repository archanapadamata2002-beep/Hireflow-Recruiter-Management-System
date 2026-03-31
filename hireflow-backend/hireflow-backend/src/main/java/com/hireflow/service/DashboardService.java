package com.hireflow.service;

import com.hireflow.enums.ApplicationStatus;
import com.hireflow.repository.ApplicationRepository;
import com.hireflow.repository.JobRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public DashboardService(JobRepository jobRepository,
                            ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public long getTotalJobs() {
        return jobRepository.count();
    }

    public long getTotalApplications() {
        return applicationRepository.count();
    }

    public long getShortlisted() {
        return applicationRepository.countByStatus(ApplicationStatus.SHORTLISTED);
    }

    public long getSelected() {
        return applicationRepository.countByStatus(ApplicationStatus.SELECTED);
    }
}