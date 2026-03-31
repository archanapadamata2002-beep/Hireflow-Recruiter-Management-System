package com.hireflow.service;

import com.hireflow.dto.JobRequest;
import com.hireflow.entity.Job;
import com.hireflow.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job createJob(JobRequest request) {
        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setExperience(request.getExperience());
        job.setSalary(request.getSalary());

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job updateJob(Long id, JobRequest request) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCompany(request.getCompany());
        job.setLocation(request.getLocation());
        job.setExperience(request.getExperience());
        job.setSalary(request.getSalary());

        return jobRepository.save(job);
    }

    public String deleteJob(Long id) {
        jobRepository.deleteById(id);
        return "Job deleted successfully";
    }
}