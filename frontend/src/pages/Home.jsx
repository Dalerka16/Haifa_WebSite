import Semestr from '../components/Semestr.jsx';
import Search from '../components/Search';
import CourseCard from '../components/CourseCard';
import Logo from "../components/Logo.jsx";
import Table from "../components/Table.jsx";
import React, {useState, useRef, useEffect} from 'react';
import {bringCourses} from "../services/api.js";

import "../css/Home.css"
import RepoFooter from "../components/RepoFooter.jsx";

function Home() {
    const [courseDatabase, setCourseDatabase] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Fetch data when the Home component mounts
    useEffect(() => {
        const loadCourses = async () => {
            try {
                const data = await bringCourses();
                setCourseDatabase(data);
            } catch (err) {
                console.error(err);
                setError("Failed to load courses...");
            } finally {
                setLoading(false);
            }
        };

        loadCourses();
    }, []);

    // 2. Create state to hold the courses the user has actually selected
    const [selectedCourses, setSelectedCourses] = useState([]);

    const [hoveredCourseId, setHoveredCourseId] = useState(null);

    const coursePalette = ["#2563EB", /* 1. Royal Blue */
        "#059669", /* 2. Emerald Green */
        "#7C3AED", /* 3. Vibrant Purple */
        "#EA580C", /* 4. Deep Orange */
        "#DB2777", /* 5. Pink/Magenta */
        "#0D9488", /* 6. Teal */
        "#DC2626", /* 7. Strong Red */
        "#475569", /* 8. Slate/Grey */
        "#65A30D", /* 9. Olive Green */
        "#4F46E5", /* 10. Indigo */
        "#BE123C", /* 11. Rose/Crimson */
        "#0284C7", /* 12. Sky Blue */
        "#B45309", /* 13. Dark Amber */
        "#4338CA", /* 14. Deep Violet */
        "#1D4ED8"  /* 15. Dark Blue */];

// This calculates colors BEFORE sending data to the Table or Cards
    const coursesWithColors = selectedCourses.map((course, index) => ({
        ...course, colorHex: coursePalette[index % coursePalette.length]
    }));

// --- DRAG & DROP ---
    const dragItemIndex = useRef(null);
    const dragOverItemIndex = useRef(null);

    const handleDragStart = (index) => {
        dragItemIndex.current = index;
    };

    const handleDragEnter = (index) => {
        dragOverItemIndex.current = index;
    };

    const handleDragEnd = () => {
        if (dragItemIndex.current !== null && dragOverItemIndex.current !== null) {
            const newCourses = [...selectedCourses];
            // Вырезаем карточку из старого места
            const draggedItem = newCourses.splice(dragItemIndex.current, 1)[0];
            // Вставляем карточку на новое место
            newCourses.splice(dragOverItemIndex.current, 0, draggedItem);
            setSelectedCourses(newCourses);
        }
        dragItemIndex.current = null;
        dragOverItemIndex.current = null;
    };
    // 3. Create a handler function for when a course is clicked in the search dropdown
    const handleSelectCourse = (course) => {
        // Check if the course is already in the list to prevent duplicates
        if (!selectedCourses.some(c => c.number === course.number)) {
            setSelectedCourses([...selectedCourses, course]);
        }
    }


    return (<div>
        <Logo/>
        <div className="app-container" dir="rtl">
            {/* Top Navigation Bar */}
            <header
                className="flex items-center justify-center gap-8 px-4 py-3 bg-white border-b border-gray-200 shadow-sm">

                <div className="flex items-center gap-4 text-sm">
                    <Semestr/>
                </div>
            </header>

            {/* Main Layout: Grid on the right (RTL), Sidebar on the left */}
            <main className="home-main">

                {/* Update the Table to receive the courses and the hover state */}
                <div className="calendar-area">
                    {/* Обертка для таблицы, чтобы она занимала оставшееся место */}
                    <div style={{flexGrow: 1, minHeight: 0}}>
                        <Table courses={coursesWithColors} hoveredCourseId={hoveredCourseId}/>
                    </div>

                    {/* Подвал для ссылки на GitHub */}
                    <div className="repo-footer">
                        <RepoFooter/>
                    </div>
                </div>

                {/* Sidebar Area (Takes up a fixed width column) */}
                <div className="sidebar-area">
                    <Search
                        courses={courseDatabase}
                        onSelectCourse={handleSelectCourse}
                    />
                    {/* List of Selected Courses */}
                    <div className="flex flex-col gap-1">
                        {selectedCourses.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center mt-4">לא נבחרו מקצועות</p>
                        ) : (
                            coursesWithColors.map((course, index) => (
                                <CourseCard
                                    key={course.number} // <-- Changed from course.id to course.number
                                    course={course}
                                    colorHex={course.colorHex}
                                    onDragStart={() => handleDragStart(index)}
                                    onDragEnter={() => handleDragEnter(index)}
                                    onDragEnd={handleDragEnd}
                                    onMouseEnter={() => setHoveredCourseId(course.number)} // <-- Change here too
                                    onMouseLeave={() => setHoveredCourseId(null)}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    </div>);
}

export default Home;