import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookYogaClass = () => {
  const [formData, setFormData] = useState({
    learnerName: '',
    learnerEmail: '',
    instructorId: '',
    date: '',
    time: '',
    mode: 'online',
  });

  const [instructors, setInstructors] = useState([]);
  const [message, setMessage] = useState('');

  // Time picker dropdown states
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAmpm] = useState('');

  // Combine time dropdown values into one string
  useEffect(() => {
    if (hour && minute && ampm) {
      setFormData(prev => ({ ...prev, time: `${hour}:${minute} ${ampm}` }));
    }
  }, [hour, minute, ampm]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await axios.get('https://healthbridge-backend-mmfn.onrender.com/api/instructors');
        setInstructors(res.data);
      } catch (err) {
        console.error('Error fetching instructors:', err.message);
      }
    };
    fetchInstructors();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://healthbridge-backend-mmfn.onrender.com/api/yoga/book', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error booking class');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', textAlign: 'center' }}>
      <h2>🧘 Book Yoga Class</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="learnerName"
          placeholder="Your Name"
          value={formData.learnerName}
          onChange={handleChange}
          required
          style={inputStyle}
        /><br /><br />

        <input
          type="email"
          name="learnerEmail"
          placeholder="Your Email"
          value={formData.learnerEmail}
          onChange={handleChange}
          required
          style={inputStyle}
        /><br /><br />

        <select
          name="instructorId"
          value={formData.instructorId}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Instructor</option>
          {instructors.map((inst) => (
            <option key={inst._id} value={inst._id}>
              {inst.name} ({inst.email})
            </option>
          ))}
        </select><br /><br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={inputStyle}
        /><br /><br />

        {/* ⏰ Time Picker using Dropdowns only */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <select value={hour} onChange={(e) => setHour(e.target.value)} required>
            <option value="">HH</option>
            {[...Array(12)].map((_, i) => {
              const val = String(i + 1).padStart(2, '0');
              return <option key={val} value={val}>{val}</option>;
            })}
          </select>

          <select value={minute} onChange={(e) => setMinute(e.target.value)} required>
            <option value="">MM</option>
            {[0, 15, 30, 45].map((min) => {
              const val = String(min).padStart(2, '0');
              return <option key={val} value={val}>{val}</option>;
            })}
          </select>

          <select value={ampm} onChange={(e) => setAmpm(e.target.value)} required>
            <option value="">AM/PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select><br /><br />

        <button type="submit" style={buttonStyle}>Book</button>
      </form>

      {message && <p style={{ marginTop: '20px', color: 'green', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px'
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#1d4ed8',
  color: 'white',
  padding: '10px',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  cursor: 'pointer'
};

export default BookYogaClass;
