import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YogaDashboard = () => {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://healthbridge-backend-mmfn.onrender.com/api/yoga/classes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setClasses(res.data);
    } catch (err) {
      console.error('Error fetching yoga classes:', err.message);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`https://healthbridge-backend-mmfn.onrender.com/api/yoga/classes/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchClasses();
    } catch (err) {
      console.error('Error updating status:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://healthbridge-backend-mmfn.onrender.com/api/yoga/classes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchClasses();
    } catch (err) {
      console.error('Error deleting class:', err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h2>🧘 Yoga Instructor Dashboard</h2>
      {classes.length === 0 ? (
        <p>No learners yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Learner</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id}>
                <td>{cls.learnerName}</td>
                <td>{cls.learnerEmail}</td>
                <td>{cls.date}</td>
                <td>{cls.time}</td>
                <td>{cls.mode}</td>
                <td>{cls.status}</td>
                <td>
                  <button onClick={() => handleStatusChange(cls._id, 'approved')} style={btnGreen}>Approve</button>
                  <button onClick={() => handleStatusChange(cls._id, 'cancelled')} style={btnYellow}>Cancel</button>
                  <button onClick={() => handleDelete(cls._id)} style={btnRed}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const tableStyle = {
  margin: '20px auto',
  borderCollapse: 'collapse',
  width: '90%',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
};

const btnGreen = {
  marginRight: '5px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
};

const btnYellow = {
  marginRight: '5px',
  backgroundColor: '#FFBF00',
  color: 'black',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
};

const btnRed = {
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default YogaDashboard;
