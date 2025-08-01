import { useEffect, useState } from "react";
import axios from "axios";
import TaskFilter from "../components/TaskFilter";
import { useNavigate } from "react-router-dom";


import TaskForm from "../components/TaskForm";


axios.defaults.baseURL = "http://localhost:3000/api";



function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    urgency: "Medium",
    status: "To Do",
    assignedTo: "",
    dueDate: ""
  });





  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };    


 useEffect(() => {

  const fetchData = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
      setFilteredTasks(response.data);
      const usersResponse = await axios.get('/users');
      setUsers(usersResponse.data);
    } catch (err) {
      console.error('Error fetching tasks or users:', err);
      setError('Failed to fetch tasks or users. Please try again later.');
     


      const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      setTasks(localTasks);
      setFilteredTasks(localTasks);
    }
  };

  fetchData();
}, []);
  const handleFilterChange = (filters) => {
    let filtered = [...tasks];

    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    if (filters.assignedTo) {
      filtered = filtered.filter(t => t.assignedTo === filters.assignedTo);
    }
    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      filtered = filtered.filter(
        t =>
          t.title.toLowerCase().includes(keyword) ||
          (t.description && t.description.toLowerCase().includes(keyword))
      );
    }
    if (filters.due) {
      const now = new Date();
      if (filters.due === "today") {
        filtered = filtered.filter(t =>
          new Date(t.dueDate).toDateString() === now.toDateString()
        );
      } else if (filters.due === "week") {
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);
        filtered = filtered.filter(t => {
          const due = new Date(t.dueDate);
          return due >= now && due <= nextWeek;
        });
      } else if (filters.due === "overdue") {
        filtered = filtered.filter(t => new Date(t.dueDate) < now);
      }
    }

    setFilteredTasks(filtered);
  };

 const handleTaskSubmit = async (e) => {
  try {
    e.preventDefault();
    const realProjectId = '64cdef1234567890abcdef12';
    const taskToSend = { ...newTask };

   
    const res = await axios.post(`/tasks/project/${realProjectId}`, taskToSend);

    
    const updatedTasks = [...tasks, res.data];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setNewTask({
      title: "",
      description: "",
      urgency: "Medium",
      status: "To Do",
      assignedTo: "",
      dueDate: ""
    });
  } catch (error) {
    console.error('Failed to save task. Saving to localStorage instead.', error);

   
    const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updated = [...localTasks, newTask];
    localStorage.setItem('tasks', JSON.stringify(updated));
    setTasks(updated);
    setFilteredTasks(updated);
    setNewTask({
      title: "",
      description: "",
      urgency: "Medium",
      status: "To Do",
      assignedTo: "",
      dueDate: ""
    });
  }
};

  return (
    <main className="container">
      <h1>All Tasks</h1>
      <TaskFilter onFilterChange={handleFilterChange} users={users} />


      <TaskForm
        task={newTask}
        onChange={handleTaskChange}
        onSubmit={handleTaskSubmit}
      />

      <ul>
        {(Array.isArray(filteredTasks) ? filteredTasks : []).map((task, index) => (
          <li
            key={task._id || `task-${index}`}
            className="task-card"
            onClick={() => navigate(`/tasks/${task._id}`)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <small>Status: {task.status}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default TaskListPage;