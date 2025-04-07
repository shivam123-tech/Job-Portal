import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="home-container"
    >
      <div className="hero-section">
        <motion.h1 
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          Welcome to JobPortal
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Your dream job is waiting for you
        </motion.p>
      </div>

      <motion.div 
        className="auth-options"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2>Get Started</h2>
        <div className="auth-buttons">
          <Link to="/login" className="auth-button login-btn">
            Login
          </Link>
          <Link to="/register" className="auth-button register-btn">
            Register
          </Link>
        </div>
      </motion.div>

      <motion.div 
        className="features"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3>Why Choose JobPortal?</h3>
        <div className="feature-cards">
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.05 }}
          >
            <h4>Thousands of Jobs</h4>
            <p>Find opportunities from top companies</p>
          </motion.div>
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.05 }}
          >
            <h4>Easy Application</h4>
            <p>Apply to jobs with just a few clicks</p>
          </motion.div>
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.05 }}
          >
            <h4>Career Growth</h4>
            <p>Discover opportunities to advance your career</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;