/**
 * MindPulse AI - Mental Well-being Assessment Website for Senior High School Students
 * Vanilla JavaScript Architecture (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

    // Open questionnaire citations directly in the current tab.
    document.querySelectorAll('.question-source a').forEach(sourceLink => {
        sourceLink.setAttribute('target', '_self');
    });

    // 1. LOADING SCREEN HANDLER
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
        }, 1000);
    }

    // 2. SCROLL PROGRESS BAR
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    const updateScrollProgress = () => {
        if (scrollProgress) {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            scrollProgress.style.width = `${progress}%`;
        }

        if (backToTopBtn) {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 3. DARK / LIGHT MODE TOGGLE
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');

        const savedTheme = localStorage.getItem('mindpulse_theme') || 'dark';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('mindpulse_theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'light') {
                themeIcon.className = 'fa-solid fa-sun';
            } else {
                themeIcon.className = 'fa-solid fa-moon';
            }
        }
    }

    // 4. MOBILE NAVIGATION TOGGLE
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = navLinks.classList.contains('mobile-open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 5. TYPEWRITER EFFECT
    const typewriterEl = document.querySelector('.typewriter-text');
    if (typewriterEl) {
        const words = JSON.parse(typewriterEl.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }
        setTimeout(typeEffect, 1200);
    }

    // 6. ANIMATED COUNTERS
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + window.innerHeight;
        const statsSection = document.querySelector('.hero-stats');
        if (statsSection && !animated) {
            const sectionTop = statsSection.offsetTop;
            if (scrollPos > sectionTop) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const speed = target / 30;
                    const updateCount = () => {
                        count += speed;
                        if (count < target) {
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                animated = true;
            }
        }
    });

    // 7. Validated PHQ-9 and GAD-7 screening forms
    const assessmentForm = document.getElementById('assessment-form');
    const questionnaireContainer = document.getElementById('assessment-questions');
    const phq9Source = 'Source and developers: PHQ-9 — Kurt Kroenke, M.D.; Robert L. Spitzer, M.D.; and Janet B.W. Williams, D.S.W. “The PHQ-9: Validity of a Brief Depression Severity Measure.” Journal of General Internal Medicine, 2001.';
    const gad7Source = 'Source and developers: GAD-7 — Robert L. Spitzer, Kurt Kroenke, Janet B.W. Williams, and Bernd Löwe. “A Brief Measure for Assessing Generalized Anxiety Disorder: The GAD-7.” Archives of Internal Medicine, 2006.';
    const scaleInstructions = {
        'PHQ-9': 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
        'GAD-7': 'Over the last 2 weeks, how often have you been bothered by the following problems?'
    };
    const screeningItems = [
        { scale: 'PHQ-9', name: 'phq9_1', text: 'Little interest or pleasure in doing things.', source: phq9Source },
        { scale: 'PHQ-9', name: 'phq9_2', text: 'Feeling down, depressed, or hopeless.', source: phq9Source },
        { scale: 'PHQ-9', name: 'phq9_3', text: 'Trouble falling or staying asleep, or sleeping too much.', source: phq9Source },
        { scale: 'PHQ-9', name: 'phq9_4', text: 'Feeling tired or having little energy.', source: phq9Source },
        { scale: 'PHQ-9', name: 'phq9_5', text: 'Poor appetite or overeating.', source: phq9Source },
        { scale: 'PHQ-9', name: 'phq9_6', text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down.', source: phq9Source },
        { scale: 'PHQ-9', name: 'phq9_7', text: 'Trouble concentrating on things, such as reading the newspaper or watching television.', source: phq9Source },
        { scale: 'PHQ-9', name: 'phq9_8', text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual.', source: phq9Source },
        { scale: 'PHQ-9', name: 'phq9_9', text: 'Thoughts that you would be better off dead, or of hurting yourself in some way.', source: phq9Source },
        { scale: 'GAD-7', name: 'gad7_1', text: 'Feeling nervous, anxious, or on edge.', source: gad7Source },
        { scale: 'GAD-7', name: 'gad7_2', text: 'Not being able to stop or control worrying.', source: gad7Source },
        { scale: 'GAD-7', name: 'gad7_3', text: 'Worrying too much about different things.', source: gad7Source },
        { scale: 'GAD-7', name: 'gad7_4', text: 'Trouble relaxing.', source: gad7Source },
        { scale: 'GAD-7', name: 'gad7_5', text: 'Being so restless that it is hard to sit still.', source: gad7Source },
        { scale: 'GAD-7', name: 'gad7_6', text: 'Becoming easily annoyed or irritable.', source: gad7Source },
        { scale: 'GAD-7', name: 'gad7_7', text: 'Feeling afraid as if something awful might happen.', source: gad7Source }
    ];
    const responseOptions = [
        { value: 0, label: 'Not at all' },
        { value: 1, label: 'Several days' },
        { value: 2, label: 'More than half the days' },
        { value: 3, label: 'Nearly every day' }
    ];

    if (questionnaireContainer) {
        screeningItems.forEach((item, index) => {
            const step = document.createElement('div');
            step.className = `question-step${index === 0 ? ' active' : ''}`;
            step.dataset.step = String(index + 1);

            const number = document.createElement('span');
            number.className = 'q-number';
            number.textContent = `Question ${index + 1} of ${screeningItems.length} · ${item.scale}`;

            const stepElements = [number];
            if (index === 0 || index === 9) {
                const instruction = document.createElement('p');
                instruction.className = 'scale-instruction';
                instruction.textContent = scaleInstructions[item.scale];
                stepElements.push(instruction);
            }

            const prompt = document.createElement('h3');
            prompt.id = `prompt-${item.name}`;
            prompt.textContent = item.text;

            const source = document.createElement('p');
            source.className = 'question-source';
            source.textContent = item.source;

            const options = document.createElement('fieldset');
            options.className = 'options-group';
            options.setAttribute('aria-labelledby', prompt.id);

            responseOptions.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = item.name;
                input.value = String(option.value);
                input.required = true;
                label.append(input, document.createTextNode(option.label));
                options.appendChild(label);
            });

            step.append(...stepElements, prompt, source, options);
            questionnaireContainer.appendChild(step);
        });
    }

    const questionSteps = document.querySelectorAll('.question-step');
    const prevBtn = document.getElementById('prev-btn');
    const historyContainer = document.getElementById('assessment-history');
    const historyStorageKey = 'mindpulse_assessment_history';
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const progressFill = document.getElementById('assessment-progress-fill');
    let currentStep = 0;

    function updateAssessmentSteps() {
        questionSteps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
        progressFill.style.width = `${((currentStep + 1) / questionSteps.length) * 100}%`;
        prevBtn.disabled = currentStep === 0;

        if (currentStep === questionSteps.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }

    function renderAssessmentHistory() {
        if (!historyContainer) return;

        let history = [];
        try {
            history = JSON.parse(localStorage.getItem(historyStorageKey) || '[]');
        } catch (error) {
            history = [];
        }

        if (!history.length) {
            historyContainer.innerHTML = '<p class="empty-history">No assessment history yet. Complete a screening to start tracking your results.</p>';
            return;
        }

        historyContainer.innerHTML = history.map(item => `
            <div class="history-item glass-card">
                <div class="history-meta">
                    <span>${item.date}</span>
                    <span class="history-score">${item.score}</span>
                </div>
                <div class="history-content">
                    <strong>${item.level}</strong>
                    <p>${item.insight}</p>
                </div>
            </div>
        `).join('');
    }

    function saveAssessmentHistory(entry) {
        let history = [];
        try {
            history = JSON.parse(localStorage.getItem(historyStorageKey) || '[]');
        } catch (error) {
            history = [];
        }

        history.unshift(entry);
        history = history.slice(0, 8);
        localStorage.setItem(historyStorageKey, JSON.stringify(history));
        renderAssessmentHistory();
    }

    renderAssessmentHistory();

    nextBtn?.addEventListener('click', () => {
        const activeQuestion = questionSteps[currentStep];
        const selectedRadio = activeQuestion.querySelector('input[type="radio"]:checked');
        if (!selectedRadio) {
            showToast('Please select an option before proceeding.', 'error');
            return;
        }
        if (currentStep < questionSteps.length - 1) {
            currentStep++;
            updateAssessmentSteps();
        }
    });

    prevBtn?.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateAssessmentSteps();
        }
    });

    assessmentForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(assessmentForm);
        const sumItems = (prefix, count) => {
            let total = 0;
            for (let index = 1; index <= count; index++) {
                total += Number(formData.get(`${prefix}_${index}`) || 0);
            }
            return total;
        };
        const phq9Score = sumItems('phq9', 9);
        const gad7Score = sumItems('gad7', 7);
        const phq9Severity = phq9Score <= 4 ? 'Minimal' : phq9Score <= 9 ? 'Mild' : phq9Score <= 14 ? 'Moderate' : phq9Score <= 19 ? 'Moderately severe' : 'Severe';
        const gad7Severity = gad7Score <= 4 ? 'Minimal' : gad7Score <= 9 ? 'Mild' : gad7Score <= 14 ? 'Moderate' : 'Severe';
        const wellnessLevel = phq9Score >= 15 || gad7Score >= 15
            ? 'high'
            : phq9Score >= 5 || gad7Score >= 5
                ? 'moderate'
                : 'low';
        const levelCopy = {
            low: {
                label: 'Low concern indicator',
                title: 'Low',
                description: 'Your responses fall in the minimal symptom range on both screeners. A low score does not rule out concerns—seek support if you need it.',
                tips: [
                    'Maintain regular exercise or physical activity; APA guidance notes that exercise can help improve mood. — American Psychiatric Association, “What Is Depression?”; physician-reviewed by Chinenye Onyemaechi, M.D. (self-help and coping)',
                    'Aim for regular, adequate sleep and a nutritious diet. — American Psychiatric Association, “What Is Depression?”; physician-reviewed by Chinenye Onyemaechi, M.D. (self-help and coping)',
                    'Consider mindfulness or relaxation as healthy habits. — American Psychiatric Association, “What Are Anxiety Disorders?”; physician-reviewed by Judith A. Gutierrez, M.D., M.P.H., and Josepha Immanuel, M.D., FAPA (self-management)'
                ]
            },
            moderate: {
                label: 'Moderate concern indicator',
                title: 'Moderate',
                description: 'At least one screener is above the minimal range. These results are not a diagnosis; consider how the symptoms affect your daily life.',
                tips: [
                    'If unhelpful thoughts keep recurring, consider discussing CBT with a counselor or clinician; CBT helps identify and change unhelpful thought patterns. — American Psychiatric Association, “What Is Depression?”; physician-reviewed by Chinenye Onyemaechi, M.D. (psychotherapy)',
                    'Try mindfulness or relaxation practices for anxiety-related symptoms. — American Psychiatric Association, “What Are Anxiety Disorders?”; physician-reviewed by Judith A. Gutierrez, M.D., M.P.H., and Josepha Immanuel, M.D., FAPA (self-management)',
                    'If symptoms persist or affect school, sleep, or relationships, speak with a doctor or psychiatrist and ask about an evaluation. — American Psychiatric Association, “What Is Depression?”; physician-reviewed by Chinenye Onyemaechi, M.D. (evaluation and treatment)'
                ]
            },
            high: {
                label: 'Higher concern indicator',
                title: 'High',
                description: 'At least one screener is in a higher symptom range. Please arrange a conversation with a qualified healthcare professional soon; this result alone is not a diagnosis.',
                tips: [
                    'Contact a doctor or psychiatrist and ask for a thorough evaluation; a screening score is not a diagnosis. — American Psychiatric Association, “What Is Depression?”; physician-reviewed by Chinenye Onyemaechi, M.D. (evaluation and treatment)',
                    'Discuss possible support or treatment with a qualified health professional; diagnoses are made by professionals after an evaluation. — American Psychiatric Association, “What Are Anxiety Disorders?”; physician-reviewed by Judith A. Gutierrez, M.D., M.P.H., and Josepha Immanuel, M.D., FAPA (diagnosis and treatment)',
                    'If you are thinking about harming yourself or do not feel safe, tell a trusted adult immediately and seek urgent help—do not stay alone. In an immediate emergency in the Philippines, call 911.'
                ]
            }
        }[wellnessLevel];

        document.getElementById('phq9-score').textContent = phq9Score;
        document.getElementById('phq9-severity').textContent = `${phq9Severity} symptom range`;
        document.getElementById('gad7-score').textContent = gad7Score;
        document.getElementById('gad7-severity').textContent = `${gad7Severity} symptom range`;
        const wellnessCard = document.getElementById('wellness-level-card');
        wellnessCard.className = `wellness-level-card wellness-level-${wellnessLevel}`;
        document.getElementById('wellness-level-label').textContent = levelCopy.label;
        document.getElementById('wellness-level-title').textContent = levelCopy.title;
        document.getElementById('wellness-level-description').textContent = levelCopy.description;
        document.getElementById('local-hospital-support').hidden = wellnessLevel !== 'high';
        document.getElementById('ai-status-badge').textContent = 'Screening only · Not a diagnosis';
        document.getElementById('result-category-title').textContent = 'PHQ-9 and GAD-7 results';
        document.getElementById('ai-insight-text').textContent = `PHQ-9: ${phq9Score}/27 (${phq9Severity} symptom range). GAD-7: ${gad7Score}/21 (${gad7Severity} symptom range). These results are screening information, not a diagnosis.`;

        const safetyAlert = document.getElementById('safety-alert');
        safetyAlert.hidden = true;
        safetyAlert.textContent = '';
        if (Number(formData.get('phq9_9')) > 0) {
            safetyAlert.hidden = false;
            safetyAlert.textContent = 'You selected an answer other than “Not at all” for the question about thoughts of death or self-harm. This is not a diagnosis, but it is important not to face this alone. Tell a trusted adult and speak with a doctor or mental health professional as soon as possible. If you are in immediate danger or cannot stay safe, stay with someone you trust, call 911, or go to the nearest emergency department.';
        }

        const recommendationsBox = document.querySelector('.recommendations-box');
        const recommendationsTitle = recommendationsBox.querySelector('h4');
        const expertTipsNote = recommendationsBox.querySelector('.expert-tips-note');
        const recommendationsList = document.getElementById('recommendations-list');
        [...recommendationsBox.children].forEach(child => {
            if (child !== recommendationsTitle && child !== expertTipsNote && child !== recommendationsList) child.remove();
        });
        recommendationsList.innerHTML = '';
        levelCopy.tips.forEach(step => {
            const listItem = document.createElement('li');
            listItem.textContent = step;
            recommendationsList.appendChild(listItem);
        });

        assessmentForm.style.display = 'none';
        document.querySelector('.assessment-progress-bar').style.display = 'none';
        document.getElementById('ai-result-container').classList.add('active-result');
        saveAssessmentHistory({
            date: new Date().toLocaleString(),
            score: `PHQ-9 ${phq9Score}/27 · GAD-7 ${gad7Score}/21`,
            level: `${phq9Severity} / ${gad7Severity}`,
            insight: document.getElementById('ai-insight-text').textContent
        });
        showToast('Screening results ready.', 'success');
    });

    // Retake assessment handler
    document.getElementById('retake-btn')?.addEventListener('click', () => {
        assessmentForm.reset();
        currentStep = 0;
        document.getElementById('safety-alert').hidden = true;
        document.getElementById('local-hospital-support').hidden = true;
        document.getElementById('recommendations-list').innerHTML = '';
        assessmentForm.style.display = 'block';
        document.querySelector('.assessment-progress-bar').style.display = 'block';
        document.getElementById('ai-result-container').classList.remove('active-result');
        updateAssessmentSteps();
    });

    // 8. DAILY MOOD TRACKER & LOCAL STORAGE
    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodFeedback = document.getElementById('mood-feedback');
    const moodSelect = document.getElementById('mood-select');
    const saveMoodBtn = document.getElementById('save-mood-btn');

    if (moodBtns.length && moodFeedback) {
        function updateMoodSelection(mood, quote) {
            moodBtns.forEach(btn => {
                btn.classList.toggle('active-mood', btn.getAttribute('data-mood') === mood);
            });

            if (moodSelect) {
                moodSelect.value = mood || '';
            }

            localStorage.setItem('mindpulse_daily_mood', mood);
            moodFeedback.innerHTML = `<p><strong>Reflection:</strong> "${quote}"</p>`;
        }

        function showMoodToast(message) {
            showToast(message, 'success');
        }

        const savedMood = localStorage.getItem('mindpulse_daily_mood');
        if (savedMood) {
            const savedButton = Array.from(moodBtns).find(btn => btn.getAttribute('data-mood') === savedMood);
            if (savedButton) {
                updateMoodSelection(savedMood, savedButton.getAttribute('data-quote'));
                moodFeedback.innerHTML = `<p><strong>Saved Reflection:</strong> "${savedButton.getAttribute('data-quote')}"</p>`;
            }
        }

        moodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mood = btn.getAttribute('data-mood');
                const quote = btn.getAttribute('data-quote');
                updateMoodSelection(mood, quote);
                showMoodToast('Mood selected and saved!');
            });
        });

        if (saveMoodBtn && moodSelect) {
            saveMoodBtn.addEventListener('click', () => {
                const mood = moodSelect.value;
                if (!mood) {
                    showToast('Please choose a mood first.', 'error');
                    return;
                }

                const selectedButton = Array.from(moodBtns).find(btn => btn.getAttribute('data-mood') === mood);
                const quote = selectedButton ? selectedButton.getAttribute('data-quote') : 'A moment to reflect on your feelings.';
                updateMoodSelection(mood, quote);
                showMoodToast('Mood saved successfully!');
            });
        }
    }

    // 9. WELLNESS TIPS GENERATOR (30+ Tips)
    const wellnessTips = {
        low: [
            "Keep your routine steady and protect your sleep so your energy stays balanced.",
            "Take a short walk or stretch after school to keep your mood calm and strong.",
            "Keep checking in with supportive friends or family to maintain healthy emotional balance."
        ],
        moderate: [
            "Break your school tasks into smaller parts so stress feels more manageable.",
            "Try a 5-minute breathing exercise or short stretch between study blocks.",
            "Use moderation by setting limits on late-night work and giving yourself rest breaks."
        ],
        high: [
            "Slow down and make rest a priority before stress gets heavier.",
            "Talk to a trusted adult, school counselor, or family member when pressure feels overwhelming.",
            "Try gentle movement like walking or stretching and reduce extra pressure for a few days."
        ]
    };

    const generateTipBtn = document.getElementById('generate-tip-btn');
    const dailyTipDisplay = document.getElementById('daily-tip-display');

    if (generateTipBtn && dailyTipDisplay) {
        function updateDailyTip(resultType) {
            const tips = wellnessTips[resultType] || wellnessTips.moderate;
            const randomIndex = Math.floor(Math.random() * tips.length);
            dailyTipDisplay.innerHTML = `<strong>${resultType === 'high' ? 'High-stress tip' : resultType === 'low' ? 'Low-stress tip' : 'Moderate-stress tip'}:</strong> ${tips[randomIndex]}`;
        }

        generateTipBtn.addEventListener('click', () => {
            const phq9Score = Number(document.getElementById('phq9-score')?.textContent || 0);
            const gad7Score = Number(document.getElementById('gad7-score')?.textContent || 0);
            const resultType = phq9Score >= 15 || gad7Score >= 15 ? 'high' : phq9Score < 5 && gad7Score < 5 ? 'low' : 'moderate';
            updateDailyTip(resultType);
            showToast('A personalized wellness tip was generated!', 'success');
        });
    }

    // 10. EXPANDABLE RESOURCES & FAQ ACCORDIONS
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        const titleBar = card.querySelector('.res-title');
        titleBar.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBar = item.querySelector('.faq-question');
        questionBar.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // 11. WELLNESS CHECKLIST LOCAL STORAGE
    const checklistContainer = document.querySelector('.checklist-items');
    const checklistDateLabel = document.getElementById('checklist-date-label');
    const checklistTemplates = [
        [
            'Drink at least 8 glasses of water',
            'Take a 10-minute walk or stretch',
            'Eat a balanced breakfast or meal',
            'Spend 5 minutes breathing slowly and calmly'
        ],
        [
            'Get 7 to 8 hours of restful sleep',
            'Put your phone away for 20 minutes while studying',
            'Do one small productive task before noon',
            'Take a short break between study sessions'
        ],
        [
            'Practice 5 minutes of meditation or reflection',
            'Talk kindly to yourself today',
            'Eat a nutritious lunch and drink water',
            'Take a brief walk outside if possible'
        ],
        [
            'Connect positively with a friend or family member',
            'Write down one thing you are grateful for',
            'Keep your desk or space tidy for a calmer mind',
            'Avoid overloading yourself with extra tasks'
        ],
        [
            'Take a scheduled break from social media',
            'Finish one important school task before relaxing',
            'Stretch your body and loosen your shoulders',
            'Pause for 3 deep breaths when you feel stressed'
        ],
        [
            'Enjoy a healthy snack and stay hydrated',
            'Spend some time doing something fun or creative',
            'Say no to one unnecessary pressure today',
            'Rest without feeling guilty for a little while'
        ],
        [
            'Review your week and set one simple goal',
            'Get ready for the week ahead with a calm plan',
            'Check in with someone you trust',
            'End the day by reflecting on one good moment'
        ]
    ];

    function getChecklistDateKey() {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    }

    function renderDailyChecklist() {
        if (!checklistContainer) return;

        const dateKey = getChecklistDateKey();
        const dayIndex = new Date().getDay();
        const items = checklistTemplates[dayIndex] || checklistTemplates[0];

        checklistContainer.innerHTML = '';
        items.forEach((itemText, index) => {
            const itemId = `mindpulse_chk_${dateKey}_${index}`;
            const savedState = localStorage.getItem(itemId);
            const li = document.createElement('li');
            li.innerHTML = `<label><input type="checkbox" class="wellness-chk" data-id="${itemId}" ${savedState === 'true' ? 'checked' : ''}> ${itemText}</label>`;
            checklistContainer.appendChild(li);
        });

        if (checklistDateLabel) {
            const today = new Date();
            checklistDateLabel.textContent = `Today: ${today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
        }

        checklistContainer.querySelectorAll('.wellness-chk').forEach(chk => {
            chk.addEventListener('change', () => {
                localStorage.setItem(chk.getAttribute('data-id'), chk.checked);
                showToast('Checklist updated!', 'success');
            });
        });
    }

    renderDailyChecklist();

    // Toast Notification Function
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        let iconClass = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-exclamation';
        if(type === 'error') iconClass = 'fa-solid fa-triangle-exclamation';

        toast.innerHTML = `<i class="${iconClass}" style="color: ${type === 'success' ? '#22c55e' : '#ef4444'}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

});