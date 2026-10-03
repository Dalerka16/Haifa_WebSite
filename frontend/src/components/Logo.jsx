import "../css/Logo.css"

function Logo() {
    return (
        /* ADD dir="ltr" HERE */
        <div className="logo-container" dir="ltr">
            <a href="/" className="logo-link">
                {/* Modern Book Icon */}
                <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>

                <span className="logo-text">
                    Review<span className="logo-highlight">Platform</span>
                </span>
            </a>
        </div>
    );
}

export default Logo;