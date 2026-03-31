package com.hireflow.controller;

import com.hireflow.dto.InterviewRequest;
import com.hireflow.entity.Interview;
import com.hireflow.enums.InterviewStatus;
import com.hireflow.service.InterviewService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping("/schedule")
    public Interview scheduleInterview(@RequestBody InterviewRequest request) {
        return interviewService.scheduleInterview(request);
    }

    @PutMapping("/{interviewId}/status")
    public Interview updateInterviewStatus(@PathVariable Long interviewId,
                                           @RequestParam InterviewStatus status) {
        return interviewService.updateInterviewStatus(interviewId, status);
    }
}