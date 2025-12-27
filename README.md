# 🚀 Skill Gadi – Full Stack Learning & Assessment Platform

Skill Gadi is a **full-stack, production-oriented learning and assessment platform** designed to help users **learn, practice, and evaluate technical skills** through quizzes, coding challenges, paid learning content, and AI-powered features.

This project demonstrates **real-world backend engineering**, secure payment workflows, authentication, and microservices-based system design.

---

## 🧠 Key Features

- 🔐 JWT-based Authentication & Authorization  
- 🧩 Microservices-oriented Backend Architecture  
- 💳 Secure Razorpay Payment Gateway Integration  
- 📧 Real-time Automated Email Notifications (SMTP)  
- 🧑‍💻 Online Remote Code Execution (Judge0 API)  
- 📝 Paid Handwritten Notes with Auto Email Delivery  
- 📊 Quiz System with Difficulty Levels, Attempts & Rankings  
- 🤖 AI-powered Quiz & Learning Enhancements (OpenAI APIs)  
- 🧑‍🏫 Admin & User Role-based Access Control  
- 📡 RESTful APIs with Secure Backend Design  

---

## 🛠️ Technologies Used

### 🎨 Frontend
- React.js  
- JavaScript  
- HTML5, CSS3  
- Vite  

---

### ⚙️ Backend
- **Spring Boot** – Core business services  
- **Django** – AI & auxiliary services  
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
- Razorpay (Test & Live Mode Supported)  

---

### 🧑‍💻 Remote Code Execution
- Judge0 API (Sandboxed execution environment)  

---

### 🤖 AI & Integrations
- OpenAI APIs (Quiz generation & learning enhancements)  

---

### 📬 Email & API Tools
- SMTP (Automated transactional emails)  
- Postman (API testing)  

---

### ☁️ Deployment & DevOps
- AWS (EC2-based deployment)  
- Environment-based configuration  

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

- **Auth Service**  
  - User registration & login  
  - JWT token generation  
  - Role-based authorization  

- **Quiz Service**  
  - Quiz creation & management  
  - Attempts, scoring & rankings  
  - Difficulty-based quizzes  

- **Payment Service**  
  - Razorpay order creation  
  - Payment verification  
  - Transaction tracking  

- **Notes Service**  
  - Paid notes purchase  
  - Secure access control  
  - Automatic email delivery  

- **Code Execution Service**  
  - Integration with Judge0  
  - Secure sandboxed execution  

- **AI Service**  
  - OpenAI-based quiz & learning features  

---

## 📂 Project Structure (High Level)

