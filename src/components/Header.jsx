// src/components/Header.jsx
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <div className="header-logo-icon">A</div>
                <span>Asrama Monitor</span>
            </div>
            <nav className="header-nav">
                <Link to="/" className="btn btn-outline">Dashboard</Link>
            </nav>
        </header>
    );
};

export default Header;