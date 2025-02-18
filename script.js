const questions = [
  { question: "What is the primary purpose of a firewall?", answer: "To block unauthorized access", options: ["To block unauthorized access", "To encrypt data", "To detect malware", "To manage network traffic"] },
    { question: "What does VPN stand for?", answer: "Virtual Private Network", options: ["Virtual Private Network", "Virtual Public Network", "Verified Private Network", "Virtual Protected Network"] },
    { question: "What is phishing?", answer: "A type of cyber attack that tricks users into revealing sensitive information", options: ["A type of cyber attack that tricks users into revealing sensitive information", "A type of malware", "A network protocol", "A hardware device"] },
    { question: "Which encryption method is considered the most secure?", answer: "AES-256", options: ["AES-256", "MD5", "SHA-1", "DES"] },
    { question: "What does SQL Injection target?", answer: "Databases", options: ["Databases", "Web Servers", "Operating Systems", "Network Traffic"] },
    { question: "Which port does HTTPS typically use?", answer: "443", options: ["443", "80", "22", "3389"] },
    { question: "What is the main function of an IDS (Intrusion Detection System)?", answer: "Detect unauthorized access attempts", options: ["Detect unauthorized access attempts", "Prevent cyber attacks", "Encrypt network traffic", "Block malware"] },
    { question: "Which type of malware replicates itself without user interaction?", answer: "Worm", options: ["Worm", "Trojan", "Rootkit", "Spyware"] },
    { question: "What is a zero-day vulnerability?", answer: "A flaw that is exploited before a patch is available", options: ["A flaw that is exploited before a patch is available", "A virus that spreads in zero seconds", "A bug found on day one", "An attack that takes place at midnight"] },
    { question: "What is social engineering?", answer: "Manipulating people into divulging confidential information", options: ["Manipulating people into divulging confidential information", "Hacking social media accounts", "Using AI for cybersecurity", "Encrypting personal data"] },
    { question: "Which programming language is commonly used in malware development?", answer: "Python", options: ["Python", "Java", "HTML", "CSS"] },
    { question: "What is the purpose of penetration testing?", answer: "To identify security vulnerabilities", options: ["To identify security vulnerabilities", "To test network speed", "To improve UI design", "To create firewalls"] },
    { question: "What does Ransomware do?", answer: "Encrypts files and demands payment", options: ["Encrypts files and demands payment", "Steals passwords", "Deletes system files", "Monitors user activity"] },
    { question: "Which tool is commonly used for network packet analysis?", answer: "Wireshark", options: ["Wireshark", "Nmap", "Metasploit", "Burp Suite"] },
    { question: "Which attack exploits the human element rather than technical flaws?", answer: "Social Engineering", options: ["Social Engineering", "SQL Injection", "DDoS", "Brute Force"] },
    { question: "What is an Advanced Persistent Threat (APT)?", answer: "A prolonged cyber attack by a highly skilled adversary", options: ["A prolonged cyber attack by a highly skilled adversary", "A temporary virus", "An automatic antivirus update", "A self-replicating worm"] },
    { question: "What is a honeypot in cybersecurity?", answer: "A decoy system used to lure attackers", options: ["A decoy system used to lure attackers", "A type of malware", "A secure cloud storage", "A VPN service"] },
    { question: "Which of the following is NOT a hashing algorithm?", answer: "RSA", options: ["RSA", "SHA-256", "MD5", "SHA-1"] },
    { question: "What does a SOC (Security Operations Center) do?", answer: "Monitors and responds to security incidents", options: ["Monitors and responds to security incidents", "Develops software applications", "Provides cloud storage", "Manages Wi-Fi networks"] },
    { question: "Which protocol is used for sending emails?", answer: "SMTP", options: ["SMTP", "HTTP", "FTP", "SNMP"] }
    
  
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let correctAnswers = 0;
  let selectedAnswer = null;
  let shuffledQuestions = [];
  
  const questionNumberElement = document.getElementById("question-number");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-btn");
  const skipButton = document.getElementById("skip-btn");
  const backButton = document.getElementById("back-btn");
  const bonusButton = document.getElementById("bonus-btn");
  const retryButton = document.getElementById("retry-btn");
  const scoreElement = document.getElementById("score");
  const popup = document.getElementById("popup");
  const resultScreen = document.getElementById("result-screen");
  const resultTitle = document.getElementById("result-title");
  const resultMessage = document.getElementById("result-message");
  const resultRetryButton = document.getElementById("result-retry-btn");
  
  function shuffleQuestions() {
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  }
  
  function showQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionElement.textContent = currentQuestion.question;
  
    const options = [...currentQuestion.options];
    options.sort(() => Math.random() - 0.5);
  
    optionsElement.innerHTML = options
      .map(
        (option) =>
          `<button onclick="selectAnswer('${option}')">${option}</button>`
      )
      .join("");
    nextButton.disabled = true;
  }
  
  function selectAnswer(answer) {
    selectedAnswer = answer;
    nextButton.disabled = false;
    const buttons = optionsElement.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.textContent === answer) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    });
  }
  
  function checkAnswer() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const selectedButton = optionsElement.querySelector(".selected");
    if (selectedAnswer === currentQuestion.answer) {
      score += 1;
      correctAnswers++;
      selectedButton.classList.add("correct");
    } else {
      selectedButton.classList.add("wrong");
    }
    scoreElement.textContent = `Score: ${score}`;
    if (correctAnswers >= 15) {
      bonusButton.disabled = false;
    }
    nextButton.disabled = true;
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    if (score >= 15) {
      document.body.classList.add("winner");
      resultTitle.textContent = "Congratulations!";
      resultMessage.textContent = "You passed the quiz with flying colors!";
    } else {
      document.body.classList.add("loser");
      resultTitle.textContent = "Better Luck Next Time!";
      resultMessage.textContent = "You failed the quiz. Try again!";
    }
    resultScreen.style.display = "flex";
    quizContainer.style.display = "none";
  }
  
  skipButton.addEventListener("click", () => {
    score -= 1;
    scoreElement.textContent = `Score: ${score}`;
    nextQuestion();
  });
  
  backButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  });
  
  nextButton.addEventListener("click", () => {
    checkAnswer();
    setTimeout(() => {
      nextQuestion();
    }, 1000);
  });
  
  bonusButton.addEventListener("click", () => {
    popup.style.display = "flex";
  });
  
  retryButton.addEventListener("click", () => {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    selectedAnswer = null;
    document.body.classList.remove("winner", "loser");
    resultScreen.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
    scoreElement.textContent = `Score: ${score}`;
  });
  
  resultRetryButton.addEventListener("click", () => {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    selectedAnswer = null;
    document.body.classList.remove("winner", "loser");
    resultScreen.style.display = "none";
    quizContainer.style.display = "block";
    showQuestion();
    scoreElement.textContent = `Score: ${score}`;
  });
  
  document.getElementById("close-popup").addEventListener("click", () => {
    popup.style.display = "none";
  });
  
  shuffleQuestions();
  showQuestion();