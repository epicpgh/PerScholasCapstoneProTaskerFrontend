import {useState} from 'react';

const TaskFilter = ({onFilterChange}) => {
    const [filter, setFilter] = useState({
        status: '',
        assignedTo: '',
        dueDate: ''
    });

    const handleChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filter);
    };

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: '1rem'}}>
            <select name="status" value={filter.status} onChange={handleChange}>
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <input 
                type="text" 
                name="assignedTo" 
                placeholder="Assigned To" 
                value={filter.assignedTo} 
                onChange={handleChange} 
                style={{marginLeft: '0.5rem'}}
            />
            <input 
                type="date" 
                name="dueDate" 
                value={filter.dueDate} 
                onChange={handleChange} 
                style={{marginLeft: '0.5rem'}}
            />
            <button type="submit" style={{marginLeft: '0.5rem'}}>Apply Filters</button>
        </form>
    );
}

export default TaskFilter;