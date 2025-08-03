import { useEffect, useState } from "react";
import backendClient from "../clients/backendClient";
import {useParams, useNavigate} from 'react-router-dom';






function CurrentTaskPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await backendClient.get(`/tasks/${id}`);
                setTask(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching task:', err);
                setError('Failed to load task. Please try again later.');
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!task) return <p>No task found.</p>;

    return (
        <main>
            <h1>Current Task</h1>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Urgency: {task.urgency}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <button onClick={() => navigate('/tasks')}>Back to Task List</button>
        </main>
    );
}

export default CurrentTaskPage;
