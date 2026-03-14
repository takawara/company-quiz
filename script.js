let selectedLanguage = '';
let currentQuestionIndex = 0;
let userScore = 0;

const uiTexts = {
    'en': { startBtn: "Start Training →", videoHint: "⚠️ Please watch the video to the end to unlock the safety quiz.", retryBtn: "Try Again", passTitle: "Congratulations! 🎉", passMsg: "You have successfully passed the test and you are welcome to enter the ARLANXEO warehouse.", failTitle: "Try Again ❌", failMsg: "Minimum required score is 80%. Please watch the video carefully and try again.", scoreText: "Your Score:" },
    'ar': { startBtn: "ابدأ التدريب ←", videoHint: "⚠️ يرجى مشاهدة الفيديو حتى النهاية لفتح اختبار السلامة.", retryBtn: "إعادة المحاولة", passTitle: "تهانينا! 🎉", passMsg: "لقد نجحت في الاختبار ومرحباً بك لدخول مستودع آلانكسيو.", failTitle: "حاول مرة أخرى ❌", failMsg: "الحد أدنى للنجاح هو 80%. يرجى مشاهدة الفيديو بعناية والمحاولة مرة أخرى.", scoreText: "نتيجتك:" },
    'fr': { startBtn: "Démarrer la formation →", videoHint: "⚠️ Veuillez regarder la vidéo jusqu'à la fin pour débloquer le quiz.", retryBtn: "Réessayer", passTitle: "Félicitations ! 🎉", passMsg: "Vous avez réussi le test et vous êtes les bienvenus dans l'entrepôt ARLANXEO.", failTitle: "Réessayer ❌", failMsg: "Le score minimum requis est de 80%. Veuillez regarder la vidéo attentivement et réessayer.", scoreText: "Votre score :" },
    'es': { startBtn: "Iniciar capacitación →", videoHint: "⚠️ Vea el video hasta el final para desbloquear el cuestionario.", retryBtn: "Intentar de nuevo", passTitle: "¡Felicitaciones! 🎉", passMsg: "Ha pasado la prueba con éxito y es bienvenido al almacén de ARLANXEO.", failTitle: "Intentar de nuevo ❌", failMsg: "La puntuación mínima requerida es del 80%. Vea el video con atención e inténtelo de nuevo.", scoreText: "Tu puntuación:" },
    'nl': { startBtn: "Start Training →", videoHint: "⚠️ Bekijk de video tot het einde om de quiz te ontgrendelen.", retryBtn: "Opnieuw proberen", passTitle: "Gefeliciteerd! 🎉", passMsg: "U bent geslaagd voor de test en bent welkom in het magazijn van ARLANXEO.", failTitle: "Opnieuw proberen ❌", failMsg: "Minimaal vereiste score is 80%. Bekijk de video zorgvuldig en probeer het opnieuw.", scoreText: "Uw score:" },
    'de': { startBtn: "Schulung starten →", videoHint: "⚠️ Bitte sehen Sie sich das Video bis zum Ende an, um das Quiz freizuschalten.", retryBtn: "Erneut versuchen", passTitle: "Herzlichen Glückwunsch! 🎉", passMsg: "Sie haben den Test bestanden und sind im ARLANXEO-Lager willkommen.", failTitle: "Erneut versuchen ❌", failMsg: "Die erforderliche Mindestpunktzahl beträgt 80%. Bitte sehen Sie sich das Video aufmerksam an und versuchen Sie es erneut.", scoreText: "Ihr Ergebnis:" },
    'pl': { startBtn: "Rozpocznij szkolenie →", videoHint: "⚠️ Obejrzyj film do końca, aby odblokować quiz.", retryBtn: "Spróbuj ponownie", passTitle: "Gratulacje! 🎉", passMsg: "Zdałeś test i zapraszamy do magazynu ARLANXEO.", failTitle: "Spróbuj ponownie ❌", failMsg: "Minimalny wymagany wynik to 80%. Obejrzyj uważnie film i spróbuj ponownie.", scoreText: "Twój wynik:" },
    'pt': { startBtn: "Iniciar Treinamento →", videoHint: "⚠️ Assista ao vídeo até o final para desbloquear o questionário.", retryBtn: "Tentar novamente", passTitle: "Parabéns! 🎉", passMsg: "Você passou no teste com sucesso e é bem-vindo ao armazém da ARLANXEO.", failTitle: "Tentar novamente ❌", failMsg: "A pontuação mínima exigida é de 80%. Assista ao vídeo com atenção e tente novamente.", scoreText: "Sua pontuação:" },
    'zh': { startBtn: "开始培训 →", videoHint: "⚠️ 请观看视频直到结束以解锁安全测试。", retryBtn: "再试一次", passTitle: "恭喜！ 🎉", passMsg: "您已成功通过测试，欢迎进入 ARLANXEO 仓库。", failTitle: "再试一次 ❌", failMsg: "最低要求分数为 80%。请仔细观看视频并重试。", scoreText: "您的得分：" }
};

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
        { q: "Quand faut-il signaler un incident ?", options: ["Demain", "Immédiatamente", "Jamais"], correct: 1 }
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
    
    const startBtn = document.getElementById('start-btn');
    startBtn.style.display = 'inline-block';
    startBtn.innerText = uiTexts[lang].startBtn;
    
    document.getElementById('video-hint').innerText = uiTexts[lang].videoHint;
    document.getElementById('retry-btn').innerText = uiTexts[lang].retryBtn;
}

function startTest() {
    const video = document.getElementById('main-video');
    document.getElementById('video-source').src = `videos/video_${selectedLanguage}.mp4`;
    video.load();
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('test-screen').style.display = 'block';
    
    // Play video after loading
    video.play().catch(e => console.log("Auto-play blocked, user must click play."));
}

function startQuiz() {
    console.log("Video ended, opening quiz...");
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('video-hint').style.display = 'none'; 
    currentQuestionIndex = 0; // Reset index
    userScore = 0; // Reset score
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
    const ui = uiTexts[selectedLanguage]; 
    
    if (percent >= 80) {
        msg.innerHTML = `
            <h2 style="color:#28a745;">${ui.passTitle}</h2>
            <p style="font-size: 1.2rem; margin: 15px 0;">${ui.passMsg}</p>
            <p>${ui.scoreText} <strong>${percent}%</strong></p>
        `;
        retryBtn.style.display = 'none';
    } else {
        msg.innerHTML = `
            <h2 style="color:#dc3545;">${ui.failTitle}</h2>
            <p style="margin: 10px 0;">${ui.scoreText} <strong>${percent}%</strong></p>
            <p>${ui.failMsg}</p>
        `;
        retryBtn.style.display = 'inline-block';
    }
}
