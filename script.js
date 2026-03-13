let selectedLanguage = '';
let currentQuestionIndex = 0;
let userScore = 0;

const questions = [
    { q: "Fin Knti fach kan BTC sawi $0.1?", options: ["Holanda", "Cyber Said-Net", "Paris"], correct: 1 },
    { q: "Chkoun lmola9ab b 'Aso9i'?", options: ["Adil", "Brahim", "Hamid"], correct: 2 },
    { q: "Al mo2akhira bi al amazighiya?", options: ["Assod", "Adar", "Afoss"], correct: 0 },
    { q: "Terma khanza khanza, wakha tghselha b...", options: ["Saboun El beldi", "Tide", "Javil"], correct: 0 },
    { q: "Ch7al men rijl 3inda Arrajol?", options: ["7", "1", "3"], correct: 2 },
    { q: "Khtar sebba b darija:", options: ["Sir tkhra", "Machi mochkil", "Chokran"], correct: 0 },
    { q: "5 + 5 =", options: ["203", "10", "1"], correct: 1 }
];

function selectLang(lang, element) {
    selectedLanguage = lang;
    document.querySelectorAll('.flag-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('start-btn').style.display = 'inline-block';
}

function startTest() {
    const video = document.getElementById('main-video');
    document.getElementById('video-source').src = `videos/video_${selectedLanguage}.mp4`;
    video.load();
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'block';
    video.play().catch(e => console.log("Play blocked"));
}

function startQuiz() {
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('question-card');
    const qData = questions[currentQuestionIndex];
    
    container.innerHTML = `
        <h3 style="color:#888">So2al ${currentQuestionIndex + 1}/${questions.length}</h3>
        <p style="font-size:1.2rem; font-weight:bold; margin:15px 0;">${qData.q}</p>
        ${qData.options.map((opt, i) => `
            <button class="option-btn" onclick="submitAnswer(${i})">${opt}</button>
        `).join('')}
    `;
}

function submitAnswer(index) {
    if (index === questions[currentQuestionIndex].correct) userScore++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    const percent = Math.round((userScore / questions.length) * 100);
    const msg = document.getElementById('result-message');
    
    if (percent >= 80) {
        msg.innerHTML = `<h2 style="color:green">Welcome! 🎉</h2><p>Bsa7tek nj7ti b ${percent}%</p>`;
    } else {
        msg.innerHTML = `<h2 style="color:red">Try Again ❌</h2><p>Yallah 3ndek ${percent}% (Khassek 80%)</p>`;
    }
}