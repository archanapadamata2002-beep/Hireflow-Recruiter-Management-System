package com.hireflow.controller;

import com.hireflow.service.DashboardService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping
    public Map<String, Long> getDashboard() {

        Map<String, Long> data = new HashMap<>();

        data.put("jobs", dashboardService.getTotalJobs());
        data.put("applications", dashboardService.getTotalApplications());
        data.put("shortlisted", dashboardService.getShortlisted());
        data.put("selected", dashboardService.getSelected());

        return data;
    }
}