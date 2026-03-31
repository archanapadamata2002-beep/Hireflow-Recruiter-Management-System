package com.hireflow.controller;

import com.hireflow.dto.JobRequest;
import com.hireflow.entity.Job;
import com.hireflow.service.JobService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping("/create")
    public Job createJob(@RequestBody JobRequest request) {
        return jobService.createJob(request);
    }

    @GetMapping("/all")
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody JobRequest request) {
        return jobService.updateJob(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        return jobService.deleteJob(id);
    }
}