package com.hireflow.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String text) {

        try {
            System.out.println("EMAIL METHOD CALLED");
            System.out.println("Sending email to: " + to);

            SimpleMailMessage message = new SimpleMailMessage();

            // ✅ VERY IMPORTANT
            message.setFrom("archanapadamata2002@gmail.com");

            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            mailSender.send(message);

            System.out.println("EMAIL SENT SUCCESSFULLY");

        } catch (Exception e) {
            System.out.println("EMAIL FAILED ❌");
            e.printStackTrace(); // 🔥 THIS WILL SHOW REAL ERROR
        }
    }
}