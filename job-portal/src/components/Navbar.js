// src/components/Navbar.js
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="navbar"
    >
      <Link to="/" className="logo">JobPortal</Link>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </motion.nav>
  );
};