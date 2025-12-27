<p align="center">
  <img src="https://github.com/Anjaneyakumar18/Skillgadi/blob/main/Skill%20gadi%20Frontend%20ReactJs/SkillGadi%20Frontend/public/images/file_0000000082f07206bbe83fc3f46cfdcf.png" alt="SkillGadi System Design" width="900"/>
</p>

# Skill Gadi – Full Stack Learning & Assessment Platform

Skill Gadi is a **full-stack, production-oriented learning and assessment platform** designed to help users **learn, practice, and evaluate technical skills** through quizzes, coding challenges, paid learning content, and AI-powered features.

This project demonstrates **real-world backend engineering**, secure payment workflows, authentication, third-party integrations, and **microservices-oriented system design**.

---

## 🧠 Key Features

- 🔐 JWT-based Authentication & Authorization  
- 🧩 Microservices-oriented Backend Architecture  
- 💳 Secure Razorpay Payment Gateway Integration  
- 📧 Real-time Automated Email Notifications (SMTP)  
- 🧑‍💻 Online Remote Code Execution (Judge0 API)  
- 📝 Paid Handwritten Notes with Auto Email Delivery  
- 📊 Quiz System with Difficulty Levels, Attempts & Rankings  
- 🤖 AI-powered Quiz & Learning Enhancements  
- 🧑‍🏫 Admin & User Role-based Access Control  
- 📡 RESTful APIs with secure backend design  

---

## 🛠️ Technologies Used

### 🎨 Frontend
- React.js  
- JavaScript  
- HTML5, CSS3  
- Vite  

---

### ⚙️ Backend
- Spring Boot – Core business services  
- Django – AI & auxiliary services  
- Java  
- Python  

---

### 🗄️ Database
- MySQL  

---

### 🔐 Security & Authentication
- JWT (Stateless Authentication)  
- Role-based Access Control (Admin / User)  

---

### 💳 Payments
- Razorpay payments Gateway  

---

### 🧑‍💻 Remote Code Execution
- Judge0 API (Sandboxed execution environment)  

---

### 🤖 AI & Integrations
- OpenAI APIs
- custom api called Pickle Ai

---

### 📬 Email & API Tools
- SMTP (Automated transactional emails)  
- Postman (API testing)  

---



## 🏗️ Architecture Overview

Skill Gadi follows a **microservices-oriented architecture**:

- React handles the user interface and client-side logic  
- Spring Boot manages core backend services  
- Django handles AI-related and auxiliary services  
- Services communicate via REST APIs  
- JWT secures both client-to-server and service-to-service communication  
- MySQL manages structured relational data  
- Razorpay handles secure payment processing  
- SMTP automates transactional email delivery  
- Judge0 executes user-submitted code in isolated containers  

---

## 🧩 Microservices Breakdown

### 🔐 Auth Service
- User registration & login  
- JWT token generation  
- Role-based authorization  

### 📝 Quiz Service
- Quiz creation & management  
- Attempts, scoring & rankings  
- Difficulty-based quizzes  

### 💳 Payment Service
- Razorpay order creation  
- Payment verification  
- Transaction tracking  

### 📚 Notes Service
- Paid notes purchase  
- Secure access control  
- Automatic email delivery  

### 🧑‍💻 Code Execution Service
- Integration with Judge0  
- Secure sandboxed execution  
