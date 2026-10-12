
const quizForm = document.querySelector("#brain-quiz-form");
const quizResult = document.querySelector("#quiz-result");
const quizScore = document.querySelector("#quiz-score");
const quizMessage = document.querySelector("#quiz-message");
const quizXp = document.querySelector("#quiz-xp");

const correctAnswers = {
    q1: {
        answer: "b",
        explanation:
            "Центральна нервова система складається з головного та спинного мозку."
    },
    q2: {
        answer: "c",
        explanation:
            "Звивина — це підвищення на поверхні мозку. Борозна — заглиблення між звивинами."
    },
    q3: {
        answer: "a",
        explanation:
            "Мозочок бере участь у координації рухів, підтриманні рівноваги та точності рухових дій."
    }
};

quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Не дозволяємо повторно проходити цей тест
    if (quizForm.dataset.checked === "true") {
        return;
    }

    let score = 0;
    const total = Object.keys(correctAnswers).length;

    for (const question in correctAnswers) {
        const selected = quizForm.querySelector(
            `input[name="${question}"]:checked`
        );

        const feedback = document.querySelector(
            `#feedback-${question}`
        );

        const labels = quizForm.querySelectorAll(
            `input[name="${question}"]`
        );

        const correct = correctAnswers[question];

        if (selected && selected.value === correct.answer) {
            score++;

            feedback.textContent = "✓ Правильно! " + correct.explanation;
            feedback.className = "answer-feedback correct";
        } else {
            feedback.textContent = "✗ " +
                (selected ? "Не зовсім. " : "Ти пропустила питання. ") +
                correct.explanation;

            feedback.className = "answer-feedback incorrect";
        }

        // Підсвічуємо правильний варіант
        labels.forEach(function (input) {
            const label = input.closest("label");

            if (input.value === correct.answer) {
                label.classList.add("answer-correct");
            } else if (selected && input === selected) {
                label.classList.add("answer-incorrect");
            }

            input.disabled = true;
        });
    }

    quizScore.textContent = `${score} з ${total} правильних відповідей`;

    if (score === total) {
        quizMessage.textContent =
            "Чудово! Ти правильно відповіла на всі запитання.";
    } else if (score >= 2) {
        quizMessage.textContent =
            "Гарний результат! Переглянь пояснення до помилок.";
    } else {
        quizMessage.textContent =
            "Не засмучуйся — повтори матеріал і закріпи знання.";
    }

    // Навчальні XP за результатом тесту
    const xp = Math.round((score / total) * 100);
    quizXp.textContent = `+${xp} XP`;

    quizForm.dataset.checked = "true";
    quizForm.querySelector("button[type='submit']").disabled = true;

    quizResult.hidden = false;
    quizResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});
