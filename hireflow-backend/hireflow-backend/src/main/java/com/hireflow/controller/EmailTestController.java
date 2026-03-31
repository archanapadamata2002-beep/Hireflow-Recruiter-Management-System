package com.hireflow.controller;

import com.hireflow.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailTestController {

    private final EmailService emailService;

    public EmailTestController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/test")
    public String testEmail(@RequestParam String to) {
        emailService.sendEmail(
                to,
                "Test Email from HireFlow",
                "This is a test email from your Recruitment Management System."
        );
        return "Email sent successfully";
    }
}