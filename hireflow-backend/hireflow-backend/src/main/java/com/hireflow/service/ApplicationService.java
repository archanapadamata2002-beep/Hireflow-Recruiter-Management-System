package com.hireflow.service;

import com.hireflow.dto.ApplicationRequest;
import com.hireflow.entity.Application;
import com.hireflow.entity.Job;
import com.hireflow.entity.User;
import com.hireflow.enums.ApplicationStatus;
import com.hireflow.repository.ApplicationRepository;
import com.hireflow.repository.JobRepository;
import com.hireflow.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public ApplicationService(ApplicationRepository applicationRepository,
                              JobRepository jobRepository,
                              UserRepository userRepository,
                              EmailService emailService) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public String applyJob(ApplicationRequest request) {

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found"));

        User candidate = userRepository.findById(request.getCandidateId())
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        if (applicationRepository.findByJobAndCandidate(job, candidate).isPresent()) {
            return "You have already applied for this job";
        }

        Application application = new Application();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setStatus(ApplicationStatus.APPLIED);
        application.setAppliedDate(LocalDate.now());

        applicationRepository.save(application);

        return "Job application submitted successfully";
    }

    public List<Application> getCandidateApplications(Long candidateId) {
        User candidate = userRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        return applicationRepository.findByCandidate(candidate);
    }

    public Application updateStatus(Long applicationId, ApplicationStatus status) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status);
        return applicationRepository.save(application);
    }

    // ✅ SHORTLIST
    public Application shortlistApplication(Long applicationId) {

        System.out.println("SHORTLIST METHOD CALLED");

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.SHORTLISTED);

        Application saved = applicationRepository.save(application);

        System.out.println("Sending shortlist email to: " + application.getCandidate().getEmail());

        emailService.sendEmail(
                application.getCandidate().getEmail(),
                "Application Shortlisted",
                "Congratulations! You have been shortlisted for " +
                        application.getJob().getTitle()
        );

        return saved;
    }

    // ✅ SELECT
    public Application selectApplication(Long applicationId) {

        System.out.println("SELECT METHOD CALLED");

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.SELECTED);

        Application saved = applicationRepository.save(application);

        System.out.println("Sending SELECT email to: " + application.getCandidate().getEmail());

        emailService.sendEmail(
                application.getCandidate().getEmail(),
                "Congratulations! You are selected",
                "You have been selected for " + application.getJob().getTitle()
        );

        return saved;
    }

    // ❌ REJECT
    public Application rejectApplication(Long applicationId) {

        System.out.println("REJECT METHOD CALLED");

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(ApplicationStatus.REJECTED);

        Application saved = applicationRepository.save(application);

        System.out.println("Sending REJECT email to: " + application.getCandidate().getEmail());

        emailService.sendEmail(
                application.getCandidate().getEmail(),
                "Application Update",
                "We regret to inform you that you are not selected for " +
                        application.getJob().getTitle()
        );

        return saved;
    }
}