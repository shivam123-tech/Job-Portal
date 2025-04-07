import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard-container"
    >
      <h1>Welcome back, {user?.name}!</h1>
      
      <div className="dashboard-cards">
        <motion.div 
          className="profile-card"
          whileHover={{ scale: 1.02 }}
        >
          <h3>Profile Strength</h3>
          <div className="progress-container">
            <motion.div 
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: `${user?.profileCompletion || 0}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p>{user?.profileCompletion || 0}% complete</p>
          <Link to="/profile" className="profile-link">Complete Profile</Link>
        </motion.div>

        <motion.div 
          className="quick-actions"
          whileHover={{ scale: 1.02 }}
        >
          <h3>Quick Actions</h3>
          <Link to="/jobs" className="action-link">Browse Jobs</Link>
          <Link to="/profile" className="action-link">Update Profile</Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;