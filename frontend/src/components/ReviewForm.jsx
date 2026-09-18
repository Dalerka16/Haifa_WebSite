import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

export default function ReviewForm({ courseId }) {
  // 1. Local states (Variables to hold user input)
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  // 2. The Mutation (Opening a background thread to send a POST request)
  const mutation = useMutation({
    mutationFn: async (newReview) => {
      // This is the actual network request to your FastAPI backend
      const response = await fetch(`http://localhost:8000/courses/${courseId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      return response.json();
    },
    onSuccess: () => {
      alert("Review added successfully!");
      // Clear the form inputs after success
      setAuthor('');
      setContent('');
      setRating(5);
    }
  });

  // 3. The function that runs when the user clicks "Submit"
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    // We send an object that perfectly matches your FastAPI 'Review' Pydantic model
    mutation.mutate({
      course_id: courseId,
      author: author,
      rating: parseInt(rating),
      content: content
    });
  };

  // 4. The HTML/Tailwind UI (Black Box)
  return (
    <form onSubmit={handleSubmit} className="mt-4 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Add a Review</h3>

      <input
        type="text"
        placeholder="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
        required
      />

      <textarea
        placeholder="What did you think about the course?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 mb-2 rounded"
        required
      />

      <div className="flex items-center gap-2 mb-4">
        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-1 w-16 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {mutation.isPending ? 'Sending...' : 'Submit Review'}
      </button>

      {mutation.isError && (
        <p className="text-red-500 mt-2">Error submitting review.</p>
      )}
    </form>
  );
}