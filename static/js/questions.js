export const questions = {
    beginner: [
        {
            question: "What is the meaning of こんにちは?",
            answers: [
                { text: "Hello", correct: true },
                { text: "Goodbye", correct: false },
                { text: "Thank you", correct: false },
                { text: "Sorry", correct: false },
            ],
        },
        {
            question: "What is the meaning of ありがとう?",
            answers: [
                { text: "Hello", correct: false },
                { text: "Thank you", correct: true },
                { text: "Goodbye", correct: false },
                { text: "Sorry", correct: false },
            ],
        },
        {
            question: "What is the meaning of さようなら?",
            answers: [
                { text: "Hello", correct: false },
                { text: "Thank you", correct: false },
                { text: "Goodbye", correct: true },
                { text: "Sorry", correct: false },
            ],
        },
        {
            question: "What is the meaning of おはよう?",
            answers: [
                { text: "Good morning", correct: true },
                { text: "Good night", correct: false },
                { text: "Goodbye", correct: false },
                { text: "Thank you", correct: false },
            ],
        },
        {
            question: "What is the meaning of はい?",
            answers: [
                { text: "No", correct: false },
                { text: "Yes", correct: true },
                { text: "Maybe", correct: false },
                { text: "Please", correct: false },
            ],
        },
        {
            question: "What is the meaning of いいえ?",
            answers: [
                { text: "Yes", correct: false },
                { text: "No", correct: true },
                { text: "Maybe", correct: false },
                { text: "Sorry", correct: false },
            ],
        },
        {
            question: "What is the meaning of ごめんなさい?",
            answers: [
                { text: "Excuse me", correct: false },
                { text: "Sorry", correct: true },
                { text: "Thank you", correct: false },
                { text: "Goodbye", correct: false },
            ],
        },
        {
            question: "What is the meaning of よろしくお願いします?",
            answers: [
                { text: "Please take care of it", correct: true },
                { text: "Thank you", correct: false },
                { text: "Goodbye", correct: false },
                { text: "Excuse me", correct: false },
            ],
        },
        {
            question: "What is the meaning of すみません?",
            answers: [
                { text: "Excuse me", correct: true },
                { text: "Thank you", correct: false },
                { text: "Sorry", correct: false },
                { text: "Hello", correct: false },
            ],
        },
        {
            question: "What is the meaning of いただきます?",
            answers: [
                { text: "Bon appétit", correct: true },
                { text: "Thank you for the meal", correct: false },
                { text: "Goodbye", correct: false },
                { text: "Good morning", correct: false },
            ],
        },
    ],
    intermediate: [
        {
            question: "Choose the correct particle: 私_(は/が)_学生です。",
            answers: [
                { text: "は", correct: true },
                { text: "が", correct: false },
                { text: "に", correct: false },
                { text: "で", correct: false },
            ],
        },
        {
            question: "Choose the correct form: 日本語を_(勉強する/勉強しています)_。",
            answers: [
                { text: "勉強する", correct: false },
                { text: "勉強しています", correct: true },
                { text: "勉強した", correct: false },
                { text: "勉強している", correct: false },
            ],
        },
        {
            question: "Which sentence means 'I am going to the store now'?",
            answers: [
                { text: "私は今、店に行きます", correct: false },
                { text: "私は今、店に行っている", correct: false },
                { text: "私は今、店に行っています", correct: true },
                { text: "私は店に行く", correct: false },
            ],
        },
        {
            question: "How do you say 'I want to eat sushi'?",
            answers: [
                { text: "私は寿司を食べたい", correct: true },
                { text: "私は寿司を食べます", correct: false },
                { text: "私は寿司を食べています", correct: false },
                { text: "私は寿司を食べました", correct: false },
            ],
        },
        {
            question: "What is the polite form of する?",
            answers: [
                { text: "します", correct: true },
                { text: "しません", correct: false },
                { text: "した", correct: false },
                { text: "しろ", correct: false },
            ],
        },
        {
            question: "Choose the correct answer: このケーキは_(おいしい/おいしくない)_です。",
            answers: [
                { text: "おいしい", correct: true },
                { text: "おいしくない", correct: false },
                { text: "おいしかった", correct: false },
                { text: "おいしそう", correct: false },
            ],
        },
        {
            question: "What is the correct way to ask 'Where is the station?' in Japanese?",
            answers: [
                { text: "駅はどこですか?", correct: true },
                { text: "駅はどこ?", correct: false },
                { text: "駅はいつですか?", correct: false },
                { text: "駅がどこですか?", correct: false },
            ],
        },
        {
            question: "What is the meaning of 彼は日本語が上手です?",
            answers: [
                { text: "He is good at Japanese", correct: true },
                { text: "He is bad at Japanese", correct: false },
                { text: "He is learning Japanese", correct: false },
                { text: "He speaks Japanese", correct: false },
            ],
        },
    ],
    advanced: [
        {
            question: "Which is the correct て-form of 行く?",
            answers: [
                { text: "行って", correct: true },
                { text: "行きて", correct: false },
                { text: "行けて", correct: false },
                { text: "行かて", correct: false },
            ],
        },
        {
            question: "Choose the correct particle: 彼は日本語_(を/が)_上手です。",
            answers: [
                { text: "を", correct: false },
                { text: "が", correct: true },
                { text: "に", correct: false },
                { text: "で", correct: false },
            ],
        },
        {
            question: "What is the correct translation of 'I had been waiting for you'?",
            answers: [
                { text: "私はあなたを待っていた", correct: true },
                { text: "私はあなたを待っています", correct: false },
                { text: "私はあなたを待っていました", correct: false },
                { text: "私はあなたを待ちました", correct: false },
            ],
        },
        {
            question: "What is the correct ます-form of 来る?",
            answers: [
                { text: "来ます", correct: true },
                { text: "来ません", correct: false },
                { text: "来る", correct: false },
                { text: "来ました", correct: false },
            ],
        },
        {
            question: "What is the た-form of 食べる?",
            answers: [
                { text: "食べた", correct: true },
                { text: "食べます", correct: false },
                { text: "食べません", correct: false },
                { text: "食べる", correct: false },
            ],
        },
        {
            question: "Choose the correct particle: 日本語が上手_(に/で)_なりました。",
            answers: [
                { text: "に", correct: false },
                { text: "で", correct: true },
                { text: "を", correct: false },
                { text: "は", correct: false },
            ],
        },
        {
            question: "What is the polite way to say 'I will go' in Japanese?",
            answers: [
                { text: "行きます", correct: true },
                { text: "行く", correct: false },
                { text: "行って", correct: false },
                { text: "行こう", correct: false },
            ],
        },
        {
            question: "What is the て-form of 来る?",
            answers: [
                { text: "来て", correct: true },
                { text: "来ました", correct: false },
                { text: "来る", correct: false },
                { text: "来なかった", correct: false },
            ],
        },
    ]
};
