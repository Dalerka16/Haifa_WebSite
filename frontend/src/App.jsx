import './App.css';
import CourseCard from './components/CourseCard.jsx';
// Import the hook that fetches data
import { useQuery } from '@tanstack/react-query';

function App() {

  // This function makes the actual HTTP GET request to your FastAPI server
  const fetchCourses = async () => {
    // We send a request to localhost:8000, which is where your FastAPI runs
    const response = await fetch('http://localhost:8000/courses');

    // If the server returned an error (like 404 or CORS blocked it)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Convert the raw response into a JSON array that React can understand
    return response.json();
  };

  // React Query handles the background thread, loading state, and caching
  const { data: courses, isLoading, isError } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses
  });

  // What to show while waiting for the server to reply
  if (isLoading) return <div className="p-8 text-center text-xl">טוען קורסים מהשרת...</div>;

  // What to show if the server is off or CORS blocked the request
  if (isError) return <div className="p-8 text-center text-red-500 text-xl">שגיאה בתקשורת מול השרת (FastAPI)!</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Course Review Platform
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {/* We map over the real data that came from your PostgreSQL database */}
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            name={course.name}
            description={"Course ID from DB: " + course.id}
          />
        ))}

      </div>
    </div>
  );
}

export default App;