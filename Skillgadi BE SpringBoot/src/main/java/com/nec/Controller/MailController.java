	package com.nec.Controller;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.web.bind.annotation.*;

	import com.nec.Service.EmailService;

	@RestController
	@RequestMapping("/mail")
	public class MailController {

	    @Autowired
	    private EmailService emailService;

	    @GetMapping("/test")
	    public String test() {
	        return "Mail controller working!";
	    }

	    @GetMapping("/send-html")
	    public String sendHtmlMail() {
	        emailService.sendGreetingMail("anjaneyakumar1804@gmail.com");
	        return "HTML Mail Sent Successfully";
	    }

	    @GetMapping("/emailverify")
	    public String verify(@RequestParam String mail) {
	    	System.out.println("Mail sent");

	        emailService.sendVerificationEmail(mail);

	        return "Verification code sent";
	    }
	    
	    @GetMapping("/verifyotp")
	    public String verifyOtp(@RequestParam String mail,
	                            @RequestParam String otp) {
	    	System.out.println("reached here!");

	        return emailService.verifyOtp(mail, otp)
	                ? "OTP verification success"
	                : "Invalid OTP";
	    }

	}

	
	
