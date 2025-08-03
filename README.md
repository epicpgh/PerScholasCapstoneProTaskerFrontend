# React + Vite

🧡 Garfield Pro-tasker

Garfield Pro-tasker is a full-stack task management application designed to help users organize their projects and tasks with the laid-back wisdom of everyone's favorite lasagna-loving cat. Built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend, it features authentication, project-based task filtering, and a colorful UI experience.
🛠️ Tech Stack
Frontend

    React with Vite

    React Router DOM

    Axios for HTTP requests

    LocalStorage for persistent state

    Custom components and modular CSS

Backend

    Node.js + Express

    MongoDB with Mongoose

    JWT authentication

    RESTful API

    Custom middleware for auth and error handling


📁 Project Structure

mod18Final-
├── pro-tasker/
│   ├── Backend/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── projectController.js
│   │   │   ├── taskController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── Project.js
│   │   │   ├── Task.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── projectRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   ├── server.js
│   │   ├── .env
│   │   └── package.json
│
├── frontend-protasker/
│   ├── src/
│   │   ├── clients/
│   │   │   └── backendClients.js
│   │   ├── components/
│   │   │   ├── GarfieldBanner.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── TaskFilter.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskList.jsx
│   │   ├── pages/
│   │   │   ├── CurrentTaskPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── TaskDetailPage.jsx
│   │   │   └── TaskListPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   └── package.json


🔗 Helpful Resources

This project was built using guidance from:

    React useEffect

    React useState

    React JSX

    React Events

    Styling in React

    Postman Docs

    MDN: Array.map()

    MDN: localStorage

    Mongoose with Express


🔗 Specific Sources Used:


https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-and-exporting-overview/

https://www.w3schools.com/react/react_useeffect.asp

https://www.w3schools.com/react/react_usestate.asp

https://www.w3schools.com/react/react_jsx.asp

https://stackoverflow.com/questions/68414024/reactjs-xhr-js177-post-http-localhost3000-registeruser-500-internal-server

https://www.w3schools.com/react/react_events.asp


https://legacy.reactjs.org/docs/faq-styling.html

https://stackoverflow.com/questions/54462227/rangeerror-invalid-time-value


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

https://stackoverflow.com/questions/79571302/how-to-solve-path-to-regexp-dependency-issue-in-express-5-1-0


https://medium.com/@thejasonfile/testing-routes-with-postman-ab5d50da9c3f

https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs/mongoose


https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage




👤 Author

Evan Miller
Final project for the Per Scholas Software Engineering Bootcamp


