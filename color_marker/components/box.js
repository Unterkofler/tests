AFRAME.registerComponent('change-color-and-show-dialog', {
  init: function () {
    var el = this.el;  // <a-box>

    el.addEventListener('click', function () {
      // Zeigen Sie den Dialog mit einer zufälligen Frage und Antworten an
      showDialog(getRandomQuestion());
    });

    function getRandomQuestion() {
      // Beispiel-Fragepool mit Fragen und ihren Antworten
      var questionPool = [
        {
          question: "Was ist 2+2?",
          answers: ["3", "4", "5", "6"],
          correctAnswer: "4"
        },
        {
          question: "Was ist die Hauptstadt von Frankreich?",
          answers: ["London", "Rom", "Paris", "Berlin"],
          correctAnswer: "Paris"
        },
        // Weitere Fragen und Antworten hier einfügen
      ];

      // Zufällige Frage auswählen
      var randomIndex = Math.floor(Math.random() * questionPool.length);
      return questionPool[randomIndex];
    }

    function showDialog(questionObj) {
      var dialogHTML = `
        <div id="dialog" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black;">
          <h2>Frage:</h2>
          <p>${questionObj.question}</p>
          <ul>
            ${questionObj.answers.map(answer => `<li><button onclick="checkAnswer('${answer}', '${questionObj.correctAnswer}')">${answer}</button></li>`).join('')}
          </ul>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', dialogHTML);
    }

    // Funktion zum Überprüfen der Antwort
    window.checkAnswer = function(selectedAnswer, correctAnswer) {
      if (selectedAnswer === correctAnswer) {
        closeDialog();
      } else {
        alert("Falsche Antwort! Versuchen Sie es erneut.");
      }
    };

    // Funktion zum Schließen des Dialogs
    function closeDialog() {
      var dialog = document.getElementById('dialog');
      dialog.parentNode.removeChild(dialog);
    }
  }
});
