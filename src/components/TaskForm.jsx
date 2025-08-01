






function TaskForm({ task = {}, onChange, onSubmit, onDelete }) {
  task = task || {
    title: '',
    description: '',
    urgency: 'Medium',
    status: 'To do',
    dueDate: '',
    completed: false,
    assignedTo: ''
  };
  return (
    <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', maxWidth: '400px'}}>
      <label htmlFor="title">Title:</label>
      <input
        id="title"
        onChange={onChange}
        type="text"
        name="title"
        value={task.title}
        required
        style={{ marginBottom: "1rem" }}
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        onChange={onChange}
        name="description"
        value={task.description|| ''}
        style={{ marginBottom: "1rem" }}
></textarea>

    <label htmlFor="urgency">Urgency:</label>
      <select
        id="urgency"
        onChange={onChange}
        name="urgency"
        value={task.urgency || 'Medium'}
        style={{ marginBottom: "1rem" }}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

      <label htmlFor="dueDate">Due Date:</label>
      <input
        id="dueDate"
        onChange={onChange}
        type="date"
        name="dueDate"
        value={task.dueDate ? task.dueDate.split('T')[0] : ''}
        style={{ marginBottom: "1rem" }}
      />

      <label htmlFor="status">Status:</label>
      <select
        id="status"
        onChange={onChange}
        name="status"
        value={task.status || 'To do'}
        style={{ marginBottom: "1rem" }}>
          <option value="To do">To do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
          <option value="Overdue">Overdue</option>
        </select> 

        <label htmlFor="completed">
          <input 
            id="completed"
            type="checkbox"
            name="completed"
            checked={task.completed || false}
            onChange={onChange}
            style={{ marginBottom: "1rem" }}
          /> Completed
        </label>


      <button type="submit">{task._id ? "Update Task" : "Add Task" } :</button>


      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          style={{ marginTop: "1rem", backgroundColor: 'red', color: 'white' }}
        >Delete Task</button> 
      )}
    </form>
  );
}

export default TaskForm;