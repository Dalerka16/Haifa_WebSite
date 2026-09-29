import "../css/CourseCard.css"

function CourseCard({course, colorHex, onDragStart, onDragEnter, onDragEnd, onMouseEnter, onMouseLeave, onClick}) {
    function onInfoClick(e) {
        e.stopPropagation(); // Предотвращает срабатывание onClick самой карточки при нажатии на кнопку "i"
        alert("Course info clicked!");
    }

    return (
        <div
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className="course-card"
            style={{backgroundColor: colorHex}}
            dir="rtl"
            draggable
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
            onDragOver={(e) => e.preventDefault()}
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