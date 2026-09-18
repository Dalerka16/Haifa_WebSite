// src/components/CourseCard.jsx

import ReviewForm from './ReviewForm.jsx';

// This function receives 'props' (arguments) and returns HTML-like syntax
export default function CourseCard({ id, name, description }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* הזרקת קומפוננטת הטופס, והעברת ה-ID של הקורס אליה כפרמטר */}
      <ReviewForm courseId={id} />
    </div>
  );
}