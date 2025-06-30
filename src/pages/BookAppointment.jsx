import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    doctorId: '',
    date: '',
    time: '',
    mode: 'online',
  });

  const [message, setMessage] = useState('');
  const [doctors, setDoctors] = useState([]);

  // Dropdown states
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAmpm] = useState('');

  // Combine dropdown values into time format and update formData
  useEffect(() => {
    if (hour && minute && ampm) {
      setFormData((prev) => ({
        ...prev,
        time: `${hour}:${minute} ${ampm}`,
      }));
    }
  }, [hour, minute, ampm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://healthbridge-backend-mmfn.onrender.com/api/appointments', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error booking appointment');
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get('https://healthbridge-backend-mmfn.onrender.com/api/doctors');
        setDoctors(res.data);
      } catch (err) {
        console.error('Error fetching doctors:', err.message);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', textAlign: 'center' }}>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="patientName"
          placeholder="Your Name"
          value={formData.patientName}
          onChange={handleChange}
          required
        /><br /><br />

        <input
          type="email"
          name="patientEmail"
          placeholder="Your Email"
          value={formData.patientEmail}
          onChange={handleChange}
          required
        /><br /><br />

        <select name="doctorId" value={formData.doctorId} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.email})
            </option>
          ))}
        </select><br /><br />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        /><br /><br />

        {/* ⏰ Custom Dropdown Time Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <select value={hour} onChange={(e) => setHour(e.target.value)} required>
            <option value="">HH</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                {String(i + 1).padStart(2, '0')}
              </option>
            ))}
          </select>

          <select value={minute} onChange={(e) => setMinute(e.target.value)} required>
            <option value="">MM</option>
            {[0, 15, 30, 45].map((min) => (
              <option key={min} value={String(min).padStart(2, '0')}>
                {String(min).padStart(2, '0')}
              </option>
            ))}
          </select>

          <select value={ampm} onChange={(e) => setAmpm(e.target.value)} required>
            <option value="">AM/PM</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <select name="mode" value={formData.mode} onChange={handleChange}>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select><br /><br />

        <button type="submit">Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookAppointment;
