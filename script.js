let selectedLanguage = '';
let currentQuestionIndex = 0;
let userScore = 0;

const translations = {
    'en': [
        { q: "What should you always wear?", options: ["Casual clothes", "Required PPE", "Nothing"], correct: 1 },
        { q: "When can you operate equipment?", options: ["If you are trained/authorized", "If you are in a hurry", "Anytime"], correct: 0 },
        { q: "Safe distance from a forklift is:", options: ["1 meter", "2 meters", "At least 5 meters"], correct: 2 },
        { q: "Who is allowed inside the warehouse?", options: ["Everyone", "Authorized personnel only", "Visitors"], correct: 1 },
        { q: "Material stacking must follow:", options: ["Warehouse procedures", "Height of the roof", "Randomly"], correct: 0 },
        { q: "Max speed limit in the warehouse is:", options: ["20 Km/h", "5 Km/h", "12 Km/h"], correct: 2 },
        { q: "What process is used for load/unload?", options: ["Fast-Track", "LOTOTO", "Manual only"], correct: 1 },
        { q: "When should you report an incident?", options: ["Tomorrow", "Immediately", "Never"], correct: 1 }
    ],
    'ar': [
        { q: "ماذا يجب عليك ارتداؤه دائماً؟", options: ["ملابس عادية", "معدات الوقاية الشخصية (PPE)", "لا شيء"], correct: 1 },
        { q: "متى يمكنك تشغيل المعدات؟", options: ["إذا كنت مدرباً ومصرحاً لك", "إذا كنت مستعجلاً", "في أي وقت"], correct: 0 },
        { q: "المسافة الآمنة من الرافعة الشوكية هي:", options: ["متر واحد", "متران", "5 أمتار على الأقل"], correct: 2 },
        { q: "من المسموح له بدخول المستودعات؟", options: ["الجميع", "الموظفون المصرح لهم فقط", "الزوار"], correct: 1 },
        { q: "يجب أن يتبع ترتيب المواد:", options: ["إجراءات المستودع", "ارتفاع السقف", "بشكل عشوائي"], correct: 0 },
        { q: "السرعة القصوى داخل المستودع هي:", options: ["20 كم/س", "5 كم/س", "12 كم/س"], correct: 2 },
        { q: "ما هي العملية المستخدمة للتحميل والتفريغ؟", options: ["المسار السريع", "عملية LOTOTO", "يدوي فقط"], correct: 1 },
        { q: "متى يجب الإبلاغ عن حادث أو خطر؟", options: ["غداً", "فوراً", "أبداً"], correct: 1 }
    ],
    'es': [
        { q: "¿Qué debe usar siempre?", options: ["Ropa casual", "Equipo de Protección Personal (EPP)", "Nada"], correct: 1 },
        { q: "¿Cuándo puede operar equipos?", options: ["Si está capacitado y autorizado", "Si tiene prisa", "En cualquier momento"], correct: 0 },
        { q: "La distancia de seguridad de un montacargas es:", options: ["1 metro", "2 metros", "Al menos 5 metros"], correct: 2 },
        { q: "¿Quién puede entrar al almacén?", options: ["Todos", "Solo personal autorizado", "Visitantes"], correct: 1 },
        { q: "El apilamiento de materiales debe seguir:", options: ["Procedimientos del almacén", "Altura del techo", "Al azar"], correct: 0 },
        { q: "El límite de velocidad máxima es:", options: ["20 Km/h", "5 Km/h", "12 Km/h"], correct: 2 },
        { q: "¿Qué proceso se usa para carga/descarga?", options: ["Vía rápida", "Proceso LOTOTO", "Solo manual"], correct: 1 },
        { q: "¿Cuándo debe reportar un incidente?", options: ["Mañana", "Inmediatamente", "Nunca"], correct: 1 }
    ],
    'fr': [
        { q: "Que devez-vous toujours porter ?", options: ["Vêtements décontractés", "Équipements de Protection Individuelle (EPI)", "Rien"], correct: 1 },
        { q: "Quand pouvez-vous utiliser l'équipement ?", options: ["Si vous êtes formé et autorisé", "Si vous êtes pressé", "À tout moment"], correct: 0 },
        { q: "La distance de sécurité d'un chariot élévateur est :", options: ["1 mètre", "2 mètres", "Au moins 5 mètres"], correct: 2 },
        { q: "Qui est autorisé à l'intérieur de l'entrepôt ?", options: ["Tout le monde", "Personnel autorisé uniquement", "Visiteurs"], correct: 1 },
        { q: "L'empilage des matériaux doit suivre :", options: ["Procédures de l'entrepôt", "Hauteur du toit", "Au hasard"], correct: 0 },
        { q: "La vitesse maximale est de :", options: ["20 Km/h", "5 Km/h", "12 Km/h"], correct: 2 },
        { q: "Quel processus est utilisé pour charger/décharger ?", options: ["Voie rapide", "Processus LOTOTO", "Manuel uniquement"], correct: 1 },
        { q: "Quand faut-il signaler un incident ?", options: ["Demain", "Immédiatement", "Jamais"], correct: 1 }
    ],
    'nl': [
        { q: "Wat moet u altijd dragen?", options: ["Casual kleding", "Vereiste PBM", "Niets"], correct: 1 },
        { q: "Wanneer mag u apparatuur bedienen?", options: ["Als u getraind en bevoegd bent", "Als u haast heeft", "Altijd"], correct: 0 },
        { q: "Veilige afstand van een heftruck is:", options: ["1 meter", "2 meter", "Minimaal 5 meter"], correct: 2 },
        { q: "Wie mag er in het magazijn komen?", options: ["Iedereen", "Alleen bevoegd personeel", "Bezoekers"], correct: 1 },
        { q: "Het stapelen van materialen moet volgens:", options: ["Magazijnprocedures", "Hoogte van het dak", "Willekeurig"], correct: 0 },
        { q: "De maximumsnelheid is:", options: ["20 km/u", "5 km/u", "12 km/u"], correct: 2 },
        { q: "Welk proces wordt gebruikt voor laden/lossen?", options: ["Snelweg", "LOTOTO-proces", "Alleen handmatig"], correct: 1 },
        { q: "Wanneer moet u een incident melden?", options: ["Morgen", "Onmiddellijk", "Nooit"], correct: 1 }
    ],
    'de': [
        { q: "Was müssen Sie immer tragen?", options: ["Freizeitkleidung", "Erforderliche PSA", "Nichts"], correct: 1 },
        { q: "Wann dürfen Sie Geräte bedienen?", options: ["Wenn Sie geschult und autorisiert sind", "Wenn Sie in Eile sind", "Jederzeit"], correct: 0 },
        { q: "Sicherheitsabstand zum Gabelstapler beträgt:", options: ["1 Meter", "2 Meter", "Mindestens 5 Meter"], correct: 2 },
        { q: "Wer darf das Lager betreten?", options: ["Jeder", "Nur autorisiertes Personal", "Besucher"], correct: 1 },
        { q: "Materialstapelung muss erfolgen nach:", options: ["Lagerverfahren", "Dachhöhe", "Zufällig"], correct: 0 },
        { q: "Höchstgeschwindigkeit beträgt:", options: ["20 km/h", "5 km/u", "12 km/h"], correct: 2 },
        { q: "Welches Verfahren wird zum Be-/Entladen verwendet?", options: ["Schnellstraße", "LOTOTO-Prozess", "Nur manuell"], correct: 1 },
        { q: "Wann sollten Sie einen Vorfall melden?", options: ["Morgen", "Sofort", "Niemals"], correct: 1 }
    ],
    'pl': [
        { q: "Co powinieneś zawsze nosić?", options: ["Ubrania codzienne", "Wymagane ŚOI", "Nic"], correct: 1 },
        { q: "Kiedy można obsługiwać urządzenia?", options: ["Po przeszkoleniu i autoryzacji", "W pośpiechu", "Zawsze"], correct: 0 },
        { q: "Bezpieczna odległość od wózka widłowego to:", options: ["1 metr", "2 metry", "Co najmniej 5 metrów"], correct: 2 },
        { q: "Kto może wchodzić do magazynu?", options: ["Wszyscy", "Tylko upoważniony personel", "Goście"], correct: 1 },
        { q: "Układanie materiałów musi odbywać się zgodnie z:", options: ["Procedurami magazynowymi", "Wysokością dachu", "Losowo"], correct: 0 },
        { q: "Maksymalna prędkość to:", options: ["20 km/h", "5 km/h", "12 km/h"], correct: 2 },
        { q: "Jaki proces jest używany do załadunku/rozładunku?", options: ["Szybka ścieżka", "Proces LOTOTO", "Tylko ręcznie"], correct: 1 },
        { q: "Kiedy należy zgłosić incydent?", options: ["Jutro", "Natychmiast", "Nigdy"], correct: 1 }
    ],
    'pt': [
        { q: "O que você deve sempre usar?", options: ["Roupas casuais", "EPI necessário", "Nada"], correct: 1 },
        { q: "Quando você pode operar equipamentos?", options: ["Se for treinado e autorizado", "Se estiver com pressa", "A qualquer momento"], correct: 0 },
        { q: "A distância segura de uma empilhadeira é:", options: ["1 metro", "2 metros", "Pelo menos 5 metros"], correct: 2 },
        { q: "Quem pode entrar no armazém?", options: ["Todos", "Apenas pessoal autorizado", "Visitantes"], correct: 1 },
        { q: "O empilhamento de materiais deve seguir:", options: ["Procedimentos do armazém", "Altura do telhado", "Aleatoriamente"], correct: 0 },
        { q: "O limite de velocidade máxima é:", options: ["20 km/h", "5 km/h", "12 km/h"], correct: 2 },
        { q: "Qual processo é usado para carga/descarga?", options: ["Via rápida", "Processo LOTOTO", "Apenas manual"], correct: 1 },
        { q: "Quando você deve relatar um incidente?", options: ["Amanhã", "Imediatamente", "Nunca"], correct: 1 }
    ],
    'zh': [
        { q: "你应该一直穿什么？", options: ["便服", "必需的个人防护装备 (PPE)", "什么都不穿"], correct: 1 },
        { q: "什么时候可以操作设备？", options: ["经过培训并获得授权", "赶时间的时候", "任何时候"], correct: 0 },
        { q: "与叉车的安全距离是：", options: ["1米", "2米", "至少5米"], correct: 2 },
        { q: "谁被允许进入仓库？", options: ["所有人", "仅限授权人员", "访客"], correct: 1 },
        { q: "材料堆放必须遵循：", options: ["仓库程序", "屋顶高度", "随机地"], correct: 0 },
        { q: "最高限速是：", options: ["20 公里/小时", "5 公里/小时", "12 公里/小时"], correct: 2 },
        { q: "装卸车使用什么流程？", options: ["快速通道", "LOTOTO 流程", "仅限手动"], correct: 1 },
        { q: "什么时候应该报告事故？", options: ["明天", "立即", "从不"], correct: 1 }
    ]
};

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
    document.getElementById('video-hint').style.display = 'none'; 
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById('question-card');
    const currentQuestions = translations[selectedLanguage];
    const qData = currentQuestions[currentQuestionIndex];
    
    container.innerHTML = `
        <h3 style="color:#888">Question ${currentQuestionIndex + 1}/${currentQuestions.length}</h3>
        <p style="font-size:1.2rem; font-weight:bold; margin:15px 0;">${qData.q}</p>
        ${qData.options.map((opt, i) => `
            <button class="option-btn" onclick="submitAnswer(${i})">${opt}</button>
        `).join('')}
    `;
}

function submitAnswer(index) {
    const currentQuestions = translations[selectedLanguage];
    if (index === currentQuestions[currentQuestionIndex].correct) userScore++;
    
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('test-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    
    const currentQuestions = translations[selectedLanguage];
    const percent = Math.round((userScore / currentQuestions.length) * 100);
    const msg = document.getElementById('result-message');
    const retryBtn = document.getElementById('retry-btn');
    
    if (percent >= 80) {
        msg.innerHTML = `
            <h2 style="color:#28a745;">Congratulations! 🎉</h2>
            <p style="font-size: 1.2rem; margin: 15px 0;">You have successfully passed the test and you are welcome to enter the <strong>ARLANXEO</strong> warehouse.</p>
            <p>Your Score: <strong>${percent}%</strong></p>
        `;
        retryBtn.style.display = 'none'; // إخفاء الزر عند النجاح
    } else {
        msg.innerHTML = `
            <h2 style="color:#dc3545;">Try Again ❌</h2>
            <p>Your score: <strong>${percent}%</strong></p>
            <p>Minimum required score is 80%. Please watch the video carefully and try again.</p>
        `;
        retryBtn.style.display = 'inline-block'; // إظهار الزر عند الرسوب
    }
}
