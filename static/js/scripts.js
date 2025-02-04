// scripts.js
import { questions } from './questions.js';

let currentQuestion = 1;
const totalQuestions = 10;
let score = 0;
let questionHistory = [];
let currentLevel = 1; // Scale of 1-5 (1: Beginner, 3: Intermediate, 5: Advanced)
let consecutiveCorrect = 0;
let consecutiveIncorrect = 0;

const difficultyLevels = {
    1: 'beginner',
    2: 'beginner-intermediate',
    3: 'intermediate',
    4: 'intermediate-advanced',
    5: 'advanced'
};

function getDifficultyPool(level) {
    switch(level) {
        case 1:
            return questions.beginner;
        case 2:
            return [...questions.beginner.slice(-Math.floor(questions.beginner.length/2)), 
                    ...questions.intermediate.slice(0, Math.floor(questions.intermediate.length/3))];
        case 3:
            return questions.intermediate;
        case 4:
            return [...questions.intermediate.slice(-Math.floor(questions.intermediate.length/2)), 
                    ...questions.advanced.slice(0, Math.floor(questions.advanced.length/3))];
        case 5:
            return questions.advanced;
        default:
            return questions.beginner;
    }
}

function getNextQuestion() {
    const questionPool = getDifficultyPool(currentLevel);
    const unusedQuestions = questionPool.filter(q => 
        !questionHistory.some(h => h.question === q.question)
    );
    
    if (unusedQuestions.length === 0) {
        return questionPool[Math.floor(Math.random() * questionPool.length)];
    }
    
    return unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
}

function adjustDifficulty(wasCorrect) {
    if (wasCorrect) {
        consecutiveCorrect++;
        consecutiveIncorrect = 0;
        if (consecutiveCorrect >= 2 && currentLevel < 5) {
            currentLevel = Math.min(5, currentLevel + 1);
            consecutiveCorrect = 0;
        }
    } else {
        consecutiveIncorrect++;
        consecutiveCorrect = 0;
        if (consecutiveIncorrect >= 2 && currentLevel > 1) {
            currentLevel = Math.max(1, currentLevel - 1);
            consecutiveIncorrect = 0;
        }
    }
}

function calculateFinalLevel() {
    const totalScore = questionHistory.reduce((sum, q) => sum + (q.wasCorrect ? 1 : 0), 0);
    const percentage = (totalScore / questionHistory.length) * 100;
    
    // Calculate weighted difficulty level
    const avgDifficulty = questionHistory.reduce((sum, q) => {
        const difficultyWeight = q.wasCorrect ? 1 : -0.5;
        return sum + (q.difficulty === 'advanced' ? 3 : q.difficulty === 'intermediate' ? 2 : 1) * difficultyWeight;
    }, 0) / questionHistory.length;
    
    // Combine percentage and difficulty for final level
    let finalLevel;
    if (percentage >= 80 && avgDifficulty > 1.5) {  // Lower from 2 to 1.5
        finalLevel = 'advanced';
    } else if (percentage >= 60 && avgDifficulty > 1) {  // Lower from 1.5 to 1
        finalLevel = 'intermediate';
    } else {
        finalLevel = 'beginner';
    }
    
    return {
        level: finalLevel,
        score: totalScore,
        totalQuestions: questionHistory.length,
        percentage
    };
}

function loadQuestion() {
    const questionData = getNextQuestion();
    document.getElementById("question-text").textContent = questionData.question;

    const answerButtons = document.querySelectorAll(".btn-answer");
    answerButtons.forEach((button, index) => {
        button.textContent = questionData.answers[index].text;
        button.dataset.correct = questionData.answers[index].correct;
        button.classList.remove("correct", "incorrect");
        button.disabled = false;
    });

    document.getElementById("progress").textContent = `Question ${currentQuestion} of ${totalQuestions}`;
    
    return questionData;
}

function sendResultsToBackend(results) {
    const csrfToken = document.querySelector('#csrf_token').value;

    fetch('/submit-quiz-results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(results)
    })
    .then(response => response.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = '/chat';  // Redirect to chat page
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your results. Please try again.');
    });
}

document.querySelectorAll(".btn-answer").forEach((button) => {
    button.addEventListener("click", (event) => {
        // Prevent multiple clicks
        if (button.disabled) return;

        const isCorrect = button.dataset.correct === "true";
        const currentQuestionData = {
            question: document.getElementById("question-text").textContent,
            userAnswer: button.textContent,
            correctAnswer: Array.from(document.querySelectorAll(".btn-answer"))
                .find(btn => btn.dataset.correct === "true").textContent
        };
        
        questionHistory.push({
            difficulty: difficultyLevels[currentLevel],
            wasCorrect: isCorrect,
            question: currentQuestionData.question,
            userAnswer: currentQuestionData.userAnswer,
            correctAnswer: currentQuestionData.correctAnswer
        });

        adjustDifficulty(isCorrect);

        // Visual feedback
        if (isCorrect) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }

        // Disable all buttons
        document.querySelectorAll(".btn-answer").forEach((btn) => {
            btn.disabled = true;
        });

        setTimeout(() => {
            if (currentQuestion < totalQuestions) {
                currentQuestion++;
                const nextQuestion = loadQuestion();
            } else {
                const finalResults = calculateFinalLevel();
                sendResultsToBackend(finalResults);
            }
        }, 1000);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    currentLevel = 1;
    currentQuestion = 1;
    score = 0;
    questionHistory = [];
    consecutiveCorrect = 0;
    consecutiveIncorrect = 0;
    loadQuestion();
});