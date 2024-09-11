import React, { useState, useEffect } from 'react';
import './tutorlist.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch('/api/students');
                const data = await response.json();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleAddStudent = async () => {
        setIsAdding(true);
        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                body: JSON.stringify({ name: 'New Student', email: 'newstudent@example.com' }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setStudents([...students, data]);
        } catch (error) {
            console.error('Error adding student:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleRemoveStudent = async (studentId) => {
        try {
            await fetch(`/api/students/${studentId}`, {
                method: 'DELETE',
            });
            setStudents(students.filter((student) => student.id !== studentId));
        } catch (error) {
            console.error('Error removing student:', error);
        }
    };

    return (
        <div className="tutorSect">
            <h2 style={{ color: 'black', fontSize: '20px', marginBottom: '20px' }}>List of Students</h2>
            {loading ? (
                <p>Loading students...</p>
            ) : students.length > 0 ? (
                <ul className="tutorList">
                    {students.map((student) => (
                        <li key={student.id}>
                            <span>{student.name}</span>
                            <span>{student.email}</span>
                            <button onClick={() => handleRemoveStudent(student.id)} className='addButton'>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ color: 'black', margin: '20px' }}>No students available</p>
            )}
            <button className='addButton' onClick={handleAddStudent} disabled={isAdding}>
                {isAdding ? 'Adding...' : 'Add Student'}
            </button>
        </div>
    );
};

export default StudentList;
