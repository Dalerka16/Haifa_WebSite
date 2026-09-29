import React, {useState} from 'react'; // <-- Нужно для локального hover
import '../css/Table.css';

function Table({
                   courses = [],
                   hoveredCourseId = null,
                   lockedSessionIds = [],
                   onSessionClick
               }) {
    const [hoveredSessionId, setHoveredSessionId] = useState(null); // Локальное состояние блока
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];

    // 1. Set default Grid boundaries (08:30 to 18:30)
    let startGrid = 8.5;
    let endGrid = 18.5;

    // 2. Expand boundaries dynamically if a selected course starts earlier or ends later
    courses.forEach(course => {
        (course.sessions || []).forEach(session => {
            while (session.start < startGrid) startGrid -= 1;
            while (session.end > endGrid) endGrid += 1;
        });
    });

    const totalHours = endGrid - startGrid;

    // 3. Automatically generate the exact number of time labels needed
    const times = [];
    for (let i = startGrid; i < endGrid; i++) {
        const hour = Math.floor(i);
        const formattedHour = hour < 10 ? `0${hour}` : hour;
        times.push(`${formattedHour}:30`);
    }

    return (
        <div className="table-container" dir="rtl">
            {/* Header Row */}
            <div className="table-header-row">
                <div className="table-header-cell time-column-header"></div>
                {days.map((day, index) => (
                    <div key={index} className="table-header-cell day-header">
                        {day}
                    </div>
                ))}
            </div>

            {/* Time Rows and Overlay Container */}
            <div className="table-body" style={{position: 'relative'}}>

                {/* 1. Background Grid */}
                {times.map((time, rowIndex) => (
                    <div key={rowIndex} className="table-row">
                        <div className="table-cell time-cell">
                            {time}
                        </div>
                        {days.map((_, colIndex) => (
                            <div key={colIndex} className="table-cell day-cell"></div>
                        ))}
                    </div>
                ))}

                {/* 2. INVISIBLE OVERLAY WITH COLORED BLOCKS */}
                <div className="events-overlay">
                    <div className="event-time-spacer"></div>

                    {days.map((_, dayIndex) => (
                        <div key={dayIndex} className="event-day-column">
                            {courses.map(course =>
                                (course.sessions || [])
                                    .filter(session => session.day === dayIndex)
                                    .map((session, i) => {
                                        const sessionUniqueId = `${course.number}-${session.type}-${session.group}`;

                                        // Подсветка от боковой панели ИЛИ локального наведения мыши внутри календаря
                                        const isSidebarHovered = hoveredCourseId === course.number;
                                        const isThisBlockHovered = hoveredSessionId === sessionUniqueId;
                                        const isLocked = lockedSessionIds.includes(sessionUniqueId);

                                        const isActive = isLocked || isSidebarHovered || isThisBlockHovered;

                                        const topPercent = ((session.start - startGrid) / totalHours) * 100;
                                        const heightPercent = ((session.end - session.start) / totalHours) * 100;

                                        return (
                                            <div
                                                key={sessionUniqueId}
                                                className={`event-block ${isActive ? 'hovered' : ''}`}

                                                // События мыши управляют ТОЛЬКО этим конкретным блоком
                                                onMouseEnter={() => setHoveredSessionId(sessionUniqueId)}
                                                onMouseLeave={() => setHoveredSessionId(null)}

                                                onClick={() => {
                                                    onSessionClick && onSessionClick(sessionUniqueId);
                                                    setHoveredSessionId(null); // МГНОВЕННО снимает подсветку при клике
                                                }}

                                                style={{
                                                    top: `${topPercent}%`,
                                                    height: `${heightPercent}%`,
                                                    borderColor: course.colorHex,
                                                    backgroundColor: isActive ? course.colorHex : 'white',
                                                    color: isActive ? 'white' : course.colorHex,
                                                    zIndex: isActive ? 10 : 1
                                                }}
                                            >
                                                <div className="event-title">{session.type} {session.group}</div>
                                                <div className="event-course">{course.name}</div>
                                                <div className="event-lecturer">{session.lecturer}</div>
                                            </div>
                                        )
                                    }))}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Table;