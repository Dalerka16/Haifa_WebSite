import "../css/CourseCard.css"

function CourseCard({course, colorHex, onDragStart, onDragEnter, onDragEnd, onMouseEnter, onMouseLeave}) {
    function onInfoClick() {
        alert("Course info clicked!");
    }

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="course-card"
            style={{backgroundColor: colorHex}}
            dir="rtl"
            draggable
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()} // Обязательно, чтобы разрешить "сброс" элемента
        >
            {/* Right side: Drag Handle */}
            <div className="drag-handle">
                <div className="dot-row">
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div className="dot-row">
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <div className="dot-row">
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>

            {/* Middle: Course Title and ID */}
            <div className="course-info">
                <p>{course.number} - {course.name}</p>
            </div>

            {/* Left side: Info Button */}
            <button className="info-btn" onClick={onInfoClick}>
                i
            </button>
        </div>
    );
}

export default CourseCard