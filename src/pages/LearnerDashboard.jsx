import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LearnerDashboard = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchLearnerClasses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://healthbridge-backend-mmfn.onrender.com/api/yoga/learner-classes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClasses(res.data);
      } catch (err) {
        console.error('Error fetching learner classes:', err.message);
      }
    };

    fetchLearnerClasses();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h2>🧘 My Yoga Classes</h2>
      {classes.length === 0 ? (
        <p>No classes booked yet.</p>
      ) : (
        <table style={{
          margin: '20px auto',
          borderCollapse: 'collapse',
          width: '90%',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>
          <thead>
            <tr>
              <th>Instructor ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id}>
                <td>{cls.instructorId}</td>
                <td>{cls.date}</td>
                <td>{cls.time}</td>
                <td>{cls.mode}</td>
                <td>{cls.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LearnerDashboard; // ✅ REQUIRED
