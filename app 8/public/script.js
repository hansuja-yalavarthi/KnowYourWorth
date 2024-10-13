// script.js

// Handle form submission
document.getElementById('reviewForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const company = document.getElementById('company').value;
  const rating = document.getElementById('rating').value;
  const review = document.getElementById('review').value;

  const response = await fetch('/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company, rating, review })
  });

  if (response.ok) {
    alert('Review submitted!');
    loadReviews();
    e.target.reset();
  }
});

// Load reviews from the backend
async function loadReviews() {
  const response = await fetch('/reviews');
  const reviews = await response.json();

  const reviewsList = document.getElementById('reviewsList');
  //reviewsList = reviewsList.sort((a, b) => b.timestamp - a.timestamp);

  reviewsList.innerHTML = ''; // Clear old reviews

  reviews.forEach(({ company, rating, review }) => {
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `
      <h3>${company} (Rating: ${rating}/5)</h3>
      <p>${review}</p>
    `;
    reviewsList.appendChild(div);
  });
}

// Initial load of reviews
loadReviews();
