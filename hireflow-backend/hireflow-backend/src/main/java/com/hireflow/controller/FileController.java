package com.hireflow.controller;

import com.hireflow.entity.User;
import com.hireflow.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final UserRepository userRepository;

    public FileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/upload/{userId}")
    public ResponseEntity<String> uploadResume(@PathVariable Long userId,
                                               @RequestParam("file") MultipartFile file) {

        try {

            // 1. Get user
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 2. Create uploads folder (absolute path)
            String folderPath = System.getProperty("user.dir") + File.separator + "uploads";
            File directory = new File(folderPath);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 3. Generate unique file name
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // 4. Create full file path
            String filePath = folderPath + File.separator + fileName;

            // 5. Save file
            file.transferTo(new File(filePath));

            // 6. Save path in DB
            user.setResumeUrl(filePath);
            userRepository.save(user);

            return ResponseEntity.ok("Resume uploaded successfully");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("File upload failed");
        }
    }
}