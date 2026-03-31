package com.hireflow.controller;

import com.hireflow.dto.ApplicationRequest;
import com.hireflow.entity.Application;
import com.hireflow.enums.ApplicationStatus;
import com.hireflow.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // ✅ Apply for job
    @PostMapping("/apply")
    public String applyJob(@RequestBody ApplicationRequest request) {
        return applicationService.applyJob(request);
    }

    // ✅ Get applications of candidate
    @GetMapping("/candidate/{candidateId}")
    public List<Application> getCandidateApplications(@PathVariable Long candidateId) {
        return applicationService.getCandidateApplications(candidateId);
    }

    // ✅ Update status manually (existing)
    @PutMapping("/{applicationId}/status")
    public Application updateStatus(@PathVariable Long applicationId,
                                    @RequestParam ApplicationStatus status) {
        return applicationService.updateStatus(applicationId, status);
    }

    // ✅ 🔥 NEW: Shortlist application (ADDED)
    @PutMapping("/{applicationId}/shortlist")
    public Application shortlist(@PathVariable Long applicationId) {
        return applicationService.shortlistApplication(applicationId);
    }
    @PutMapping("/{applicationId}/select")
    public Application select(@PathVariable Long applicationId) {
        return applicationService.selectApplication(applicationId);
    }

    @PutMapping("/{applicationId}/reject")
    public Application reject(@PathVariable Long applicationId) {
        return applicationService.rejectApplication(applicationId);
    }
}