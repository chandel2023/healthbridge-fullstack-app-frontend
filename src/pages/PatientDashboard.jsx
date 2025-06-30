import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('https://healthbridge-backend-mmfn.onrender.com/api/appointments/patient', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAppointments(res.data);
        } catch (err) {
            console.error('Error fetching appointments:', err.message);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div style={{ padding: '30px', textAlign: 'center' }}>
            <h2>📅 My Appointments</h2>

            {appointments.length === 0 ? (
                <p>No appointments booked yet.</p>
            ) : (
                <table style={{
                    margin: '20px auto',
                    borderCollapse: 'collapse',
                    width: '90%',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}>
                    <thead style={{ backgroundColor: '#1e40af', color: 'white' }}>
                        <tr>
                            <th style={thStyle}>Doctor</th>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Time</th>
                            <th style={thStyle}>Mode</th>
                            <th style={thStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((apt) => (
                            <tr key={apt._id} style={{ textAlign: 'center' }}>
                                <td style={tdStyle}>{apt.doctorName || apt.doctorId}</td>
                                <td style={tdStyle}>{apt.date}</td>
                                <td style={tdStyle}>{apt.time}</td>
                                <td style={tdStyle}>{apt.mode}</td>
                                <td style={tdStyle}>{apt.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

};



const thStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    fontWeight: 'bold'
};

const tdStyle = {
    padding: '10px',
    border: '1px solid #ccc'
};

export default PatientDashboard;
