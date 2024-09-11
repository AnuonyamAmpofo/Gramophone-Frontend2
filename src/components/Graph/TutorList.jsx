import React, { useState, useEffect } from 'react';
import './tutorlist.css';

const TutorList = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await fetch('/api/tutors');
                const data = await response.json();
                setTutors(data);
            } catch (error) {
                console.error('Error fetching tutors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

    const handleAddTutor = async () => {
        setIsAdding(true);
        try {
            const response = await fetch('/api/tutors', {
                method: 'POST',
                body: JSON.stringify({ name: 'New Tutor', email: 'newtutor@example.com' }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setTutors([...tutors, data]);
        } catch (error) {
            console.error('Error adding tutor:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleRemoveTutor = async (tutorId) => {
        try {
            await fetch(`/api/tutors/${tutorId}`, {
                method: 'DELETE',
            });
            setTutors(tutors.filter((tutor) => tutor.id !== tutorId));
        } catch (error) {
            console.error('Error removing tutor:', error);
        }
    };

    return (
        <div className="tutorSect">
            <h2 style={{ color: 'black', fontSize: '20px', marginBottom: '20px' }}>List of Tutors</h2>
            {loading ? (
                <p>Loading tutors...</p>
            ) : tutors.length > 0 ? (
                <ul className="tutorList">
                    {tutors.map((tutor) => (
                        <li key={tutor.id}>
                            <span>{tutor.name}</span>
                            <span>{tutor.email}</span>
                            <button onClick={() => handleRemoveTutor(tutor.id)} className='removeButton'>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ color: 'black', margin: '20px' }}>No tutors available</p>
            )}
            <button className="addButton" onClick={handleAddTutor} disabled={isAdding}>
                {isAdding ? 'Adding...' : 'Add Tutor'}
            </button>
        </div>
    );
};

export default TutorList;
