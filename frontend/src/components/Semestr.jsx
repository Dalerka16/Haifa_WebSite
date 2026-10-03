import "../css/Semestr.css"

function Semestr() {
    return (
        <div className="semestr-container" dir="rtl">
            <button className="semestr-btn" aria-label="בחר סמסטר">

                <div className="semestr-content">
                    {/* Modern Calendar Icon */}
                    <svg className="semestr-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>סמסטר א׳</span>
                </div>

                {/* Dropdown Arrow */}
                <svg className="semestr-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>

            </button>
        </div>
    );
}

export default Semestr;