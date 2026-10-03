import React from 'react';
import '../css/CourseModal.css';

function CourseModal({course, onClose}) {
    // If no course is selected, don't render anything
    if (!course) return null;

    // 1. Create the translation array (0 = ראשון, 1 = שני, etc.)
    const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'];

    return (
        <div className="modal-overlay" onClick={onClose} dir="rtl">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <div className="modal-header" style={{backgroundColor: course.colorHex}}>
                    <h2>{course.number} - {course.name}</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    <p><strong>פקולטה:</strong> למדעי המחשב ()</p>
                    <p><strong>נקודות זכות:</strong> 5.0 (דוגמה)</p>

                    <div className="modal-description">
                        <p>כאן יופיע תיאור הקורס, דרישות קדם, סילבוס ומידע נוסף כאשר ה-API יתמוך בכך.</p>
                    </div>

                    <h3>זמני שיעורים:</h3>
                    <ul className="modal-sessions-list">
                        {course.sessions && course.sessions.map((session, index) => (
                            <li key={index}>
                                {/* 2. Use the translation array here */}
                                <strong>{session.type} {session.group}:</strong> יום {dayNames[session.day]} | {session.start} - {session.end} ({session.lecturer})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CourseModal;