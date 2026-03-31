package com.hireflow.service;

import com.hireflow.dto.InterviewRequest;
import com.hireflow.entity.Application;
import com.hireflow.entity.Interview;
import com.hireflow.enums.ApplicationStatus;
import com.hireflow.enums.InterviewStatus;
import com.hireflow.repository.ApplicationRepository;
import com.hireflow.repository.InterviewRepository;
import org.springframework.stereotype.Service;

@Service
public class InterviewService {

    private final InterviewRepository interviewRepository;
    private final ApplicationRepository applicationRepository;

    // ✅ ADDED
    private final EmailService emailService;

    public InterviewService(InterviewRepository interviewRepository,
                            ApplicationRepository applicationRepository,
                            EmailService emailService) {   // ✅ CHANGED constructor
        this.interviewRepository = interviewRepository;
        this.applicationRepository = applicationRepository;
        this.emailService = emailService;   // ✅ ADDED
    }

    public Interview scheduleInterview(InterviewRequest request) {

        Application application = applicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new RuntimeException("Application not found"));

        Interview interview = new Interview();
        interview.setApplication(application);
        interview.setInterviewDate(request.getInterviewDate());
        interview.setMode(request.getMode());
        interview.setStatus(InterviewStatus.SCHEDULED);

        // existing logic
        application.setStatus(ApplicationStatus.INTERVIEW_SCHEDULED);
        applicationRepository.save(application);

        Interview savedInterview = interviewRepository.save(interview);

        // ✅ ADDED: EMAIL TRIGGER
        emailService.sendEmail(
                application.getCandidate().getEmail(),
                "Interview Scheduled",
                "Your interview is scheduled on " + request.getInterviewDate()
        );

        return savedInterview;
    }

    public Interview updateInterviewStatus(Long interviewId, InterviewStatus status) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        interview.setStatus(status);
        return interviewRepository.save(interview);
    }
}