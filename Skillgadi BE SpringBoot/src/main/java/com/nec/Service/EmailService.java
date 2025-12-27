package com.nec.Service;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    // ✅ In-memory OTP store (email -> otp)
    private final Map<String, String> otpStore = new ConcurrentHashMap<>();

    // 4-digit OTP generator
    private String generateOtp() {
        Random random = new Random();
        int otp = 1000 + random.nextInt(9000);
        return String.valueOf(otp);
    }

    // 🔹 Send verification email
    public String sendVerificationEmail(String toEmail) {

        try {
            String otp = generateOtp();

            // store OTP
            otpStore.put(toEmail, otp);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            Context context = new Context();
            context.setVariable("otp", otp);

            String htmlContent =
                    templateEngine.process("email-verification", context);

            helper.setTo(toEmail);
            helper.setSubject("SkillGadi - Email Verification Code");
            helper.setText(htmlContent, true);

            mailSender.send(message);

            return otp; // optional (useful for testing)

        } catch (Exception e) {
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    // 🔹 Verify OTP
    public boolean verifyOtp(String email, String otp) {

        String storedOtp = otpStore.get(email);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStore.remove(email); // one-time use
            return true;
        }
        return false;
    }

    // 🔹 Greeting mail (unchanged)
    public void sendGreetingMail(String toEmail) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            Context context = new Context();
            context.setVariable("appName", "SkillGadi");

            String htmlContent =
                    templateEngine.process("greeting-mail", context);

            helper.setTo(toEmail);
            helper.setFrom("no-reply@skillgadi.com");
            helper.setSubject("Welcome to SkillGadi 🚀");
            helper.setText(htmlContent, true);

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send greeting mail", e);
        }
    }
    
    public void sendNotesMail(String email, String notesName, String notesLink)
            throws Exception {

        ClassPathResource resource = new ClassPathResource("templates/notes-mail.html");
        String html = Files.readString(resource.getFile().toPath(), StandardCharsets.UTF_8);

        html = html.replace("{{notesName}}", notesName)
                   .replace("{{notesLink}}", notesLink);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(email);
        helper.setSubject("SkillGadi | Payment Successful – Get Your Notes");
        helper.setText(html, true);

        mailSender.send(message);
    }
    
}
