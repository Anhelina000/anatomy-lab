
const quizForm = document.getElementById("part-two-quiz-form");

const answers = {
    q1: "b",
    q2: "a",
    q3: "c",
    q4: "b"
};

const explanations = {
    q1: "Потилична частка відіграє ключову роль в обробці зорової інформації.",
    q2: "Тім'яна частка бере участь в обробці дотику та інших тілесних відчуттів.",
    q3: "Скронева частка важлива для обробки звуків і розуміння мовлення.",
    q4: "Лобові ділянки беруть участь у плануванні та контролі поведінки."
};

if (quizForm) {
    quizForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let score = 0;
        let unanswered = false;

        Object.keys(answers).forEach(function(question) {
            const selected = quizForm.querySelector(
                'input[name="' + question + '"]:checked'
            );

            const feedback = document.getElementById(
                "feedback-" + question
            );

            if (!selected) {
                unanswered = true;
                feedback.textContent = "Обери відповідь.";
                feedback.className =
                    "answer-feedback feedback-warning";
                return;
            }

            if (selected.value === answers[question]) {
                score++;

                feedback.textContent =
                    "✓ Правильно! " + explanations[question];

                feedback.className =
                    "answer-feedback feedback-correct";
            } else {
                feedback.textContent =
                    "✗ " + explanations[question];

                feedback.className =
                    "answer-feedback feedback-wrong";
            }
        });

        const result = document.getElementById("quiz-result");

        if (unanswered) {
            result.hidden = true;
            return;
        }

        document.getElementById("quiz-score").textContent =
            score + " з 4 правильних відповідей";

        document.getElementById("quiz-message").textContent =
            score === 4
                ? "Чудово! Ти добре засвоїла матеріал."
                : score >= 2
                    ? "Непогано! Переглянь пояснення та спробуй ще раз."
                    : "Повтори матеріал і спробуй ще раз.";

        document.getElementById("quiz-xp").textContent =
            "+" + score * 25 + " XP";

        result.hidden = false;

        result.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });

    document.getElementById("retry-quiz")
        .addEventListener("click", function() {
            quizForm.reset();

            document.querySelectorAll(".answer-feedback")
                .forEach(function(item) {
                    item.textContent = "";
                    item.className = "answer-feedback";
                });

            document.getElementById("quiz-result").hidden = true;

            document.getElementById("brain-quiz")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        });
}