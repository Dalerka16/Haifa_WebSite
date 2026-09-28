import React, {useState, useRef, useEffect} from 'react';
import '../css/Search.css';

function Search({courses, onSelectCourse}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchRef = useRef(null);

    const filteredCourses = courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.number.includes(searchQuery) // <-- Changed id to number
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="search-container" ref={searchRef} dir="rtl">

            {/* Search Input Group */}
            <div className="search-input-group">

                {/* Input Field (Takes remaining space) */}
                <div className="search-input-wrapper"
                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <input type="text" className="search-input"
                           placeholder="Choose course"
                           value={searchQuery}
                           onChange={(e) => {
                               setSearchQuery(e.target.value);
                               setIsDropdownOpen(true);
                           }}
                    />
                    {/* Small Triangle Indicator */}
                    <div className="search-arrow">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            {isDropdownOpen ? <path d="M12 8l8 8H4z"/> : <path d="M12 16l8-8H4z"/>}
                        </svg>
                    </div>
                </div>

                {/* Gray Button (Second in RTL flex order) */}
                <button className="search-button"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                         strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="21" x2="4" y2="14"></line>
                        <line x1="4" y1="10" x2="4" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12" y2="3"></line>
                        <line x1="20" y1="21" x2="20" y2="16"></line>
                        <line x1="20" y1="12" x2="20" y2="3"></line>
                        <line x1="1" y1="14" x2="7" y2="14"></line>
                        <line x1="9" y1="8" x2="15" y2="8"></line>
                        <line x1="17" y1="16" x2="23" y2="16"></line>
                    </svg>
                </button>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="search-dropdown">
                    <ul className="search-dropdown-list">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course) => (
                                <li key={course.number} className="search-dropdown-item"
                                    onClick={() => {
                                        onSelectCourse(course);
                                        setSearchQuery('');
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {/* Changed course.id to course.number here */}
                                    <span className="search-dropdown-id">{course.number}</span>
                                    <span>-</span>
                                    <span>{course.name}</span>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-3 text-gray-400 text-center">לא נמצאו קורסים</li>
                        )}
                    </ul>
                </div>
            )}

        </div>
    );
}

export default Search;