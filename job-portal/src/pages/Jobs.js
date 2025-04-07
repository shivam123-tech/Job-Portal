import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div>Loading jobs...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="jobs-container"
    >
      <h1>Job Listings</h1>
      <div className="jobs-list">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            className="job-card"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h3>{job.title}</h3>
            <p>{job.company} • {job.location}</p>
            <p className="salary">{job.salary}</p>
            <button className="apply-btn">Apply Now</button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Jobs;