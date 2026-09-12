/**
 * Quiz Widget — shared component for teach-me lessons.
 *
 * Usage:
 *   1. Mark up questions with class="quiz-question" and data-correct="B" (A/B/C/D).
 *   2. Options are <ul class="quiz-options"> with radio inputs whose value="A" etc.
 *   3. Include a <div class="quiz-feedback"></div> and <button class="btn-check">.
 *   4. Add <script src="../assets/quiz.js"></script> at the end of the body.
 *
 * The script auto-discovers all .quiz-question blocks on DOMContentLoaded.
 */

document.addEventListener('DOMContentLoaded', function () {
  var questions = document.querySelectorAll('.quiz-question');
  var scoreDisplay = document.getElementById('quiz-score');
  var total = questions.length;
  var answered = 0;
  var correct = 0;

  questions.forEach(function (q) {
    var btn = q.querySelector('.btn-check');
    var feedback = q.querySelector('.quiz-feedback');
    var correctAnswer = q.getAttribute('data-correct');

    if (!btn || !feedback || !correctAnswer) return;

    btn.addEventListener('click', function () {
      var selected = q.querySelector('input[type="radio"]:checked');
      if (!selected) {
        feedback.textContent = 'Please select an answer.';
        feedback.className = 'quiz-feedback incorrect';
        return;
      }

      // Disable further changes
      var radios = q.querySelectorAll('input[type="radio"]');
      radios.forEach(function (r) { r.disabled = true; });
      btn.disabled = true;
      btn.style.opacity = '0.5';

      answered++;

      if (selected.value === correctAnswer) {
        correct++;
        feedback.textContent = '\u2705 Correct! ' + (q.getAttribute('data-explanation') || '');
        feedback.className = 'quiz-feedback correct';
      } else {
        feedback.textContent = '\u274C Incorrect. The correct answer is ' + correctAnswer + '. ' + (q.getAttribute('data-explanation') || '');
        feedback.className = 'quiz-feedback incorrect';

        // Highlight correct answer
        radios.forEach(function (r) {
          if (r.value === correctAnswer) {
            r.parentElement.style.background = '#dcfce7';
            r.parentElement.style.borderColor = '#16a34a';
          }
        });
      }

      // Update score
      if (scoreDisplay) {
        scoreDisplay.textContent = correct + ' / ' + total;
        if (answered === total) {
          scoreDisplay.textContent += answered === correct
            ? ' — Perfect! All correct.'
            : ' — Review the incorrect answers above.';
        }
      }
    });
  });
});
