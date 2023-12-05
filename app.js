const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// In-memory database
const students = [
  { id: 1, name: "Student 1", criteria1: 5, criteria2: 3 },
  { id: 2, name: "Student 2", criteria1: 2, criteria2: 4 },
];

const books = [
  { id: 1, title: "Book 1", criteria1: 4, criteria2: 2 },
  { id: 2, title: "Book 2", criteria1: 1, criteria2: 5 },
];

app.use(bodyParser.json());

// Calculate the difference of vectors
function calculateDifference(vector1, vector2) {
  return Math.abs(vector1 - vector2);
}

// Find books that match the user's answers
function findMatchingBooks(userAnswers) {
  const matches = [];

  students.forEach((student) => {
    const difference =
      calculateDifference(student.criteria1, userAnswers.criteria1) +
      calculateDifference(student.criteria2, userAnswers.criteria2);

    const match = {
      student: student.name,
      difference,
    };

    matches.push(match);
  });

  // Sort matches by the difference
  matches.sort((a, b) => a.difference - b.difference);

  // Return the top matching books
  return matches;
}

// API endpoint for book matching
app.post("/matchBooks", (req, res) => {
  const userAnswers = req.body;
  const matchingBooks = findMatchingBooks(userAnswers);

  res.json(matchingBooks);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function matchBooks() {
    const answer1 = document.getElementById('answer1').value;
    const answer2 = document.getElementById('answer2').value;
  
    // Send answers to the backend for processing (AJAX request)
    fetch('/matchBooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer1, answer2 }),
    })
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => console.error('Error:', error));
  }
  
  function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.textContent = `${result.student} - Difference: ${result.difference}`;
      resultsDiv.appendChild(resultItem);
    });
  }
  
