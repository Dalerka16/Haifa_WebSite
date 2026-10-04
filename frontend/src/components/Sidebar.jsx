import React from 'react';
import Search from './Search.jsx';
import CourseCard from './CourseCard.jsx';
import RepoFooter from "./RepoFooter.jsx";
import '../css/Sidebar.css';

function Sidebar({
    courseDatabase,
    handleSelectCourse,
    selectedCourses,
    coursesWithColors,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    setHoveredCourseId,
    handleSidebarCourseClick,
    setInfoCourse
}) {
    return (
        <div className="sidebar-area">

            {/* 1. This wrapper takes up all the extra space */}
            <div className="sidebar-top-content">
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
                                key={course.number}
                                course={course}
                                colorHex={course.colorHex}
                                onDragStart={() => handleDragStart(index)}
                                onDragEnter={() => handleDragEnter(index)}
                                onDragEnd={handleDragEnd}
                                onMouseEnter={() => setHoveredCourseId(course.number)}
                                onMouseLeave={() => setHoveredCourseId(null)}
                                onClick={() => handleSidebarCourseClick(course.number)}
                                onInfoClick={(selectedCourse) => setInfoCourse(selectedCourse)}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* 2. The footer sits outside the growing wrapper, forcing it to the bottom */}
            <RepoFooter />

        </div>
    );
}

export default Sidebar;