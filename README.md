# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



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

mod18Final-
                    |_pro-tasker
                 		|_ Backend
                               |               |_config
                               |               |          |_db.js
                               |               |_controllers
                               |               |                   |_projectController.js
                               |               |                   |_taskController.js
                               |               |                   |_userContoller.js
                               |.              |_middleware
                               |               |                     |_authMiddleware.js
                               |               |                     |_errorHandler.js
                               |               |_models
                               |               |             |_Project.js
                               |               |             |_Task.js
                               |               |             |_User.js
                               |               | _routes
                               |               |             |_projectRoutes.js
                               |               |             |_taskeRoutes.js
                               |               |             |_userRoutes.js
                               |               |_utils
                               |               |        |_generateToken.js
                               |               |_server.js
                               |               |.env
                               |               |.gitignore
                               |               |package.json
                               |
                               |_frontend-protasker
                               |                  |_src
                               |                         |_clients
                               |                         |            |_backendClients.js
                               |                         |_components
                               |                         |                    |_GarfieldBanner.jsx
                               |                         |                    |_NavBar.jsx
                               |                         |                    |_TaskFilter.jsx
                               |                         |                    |_TaskForm.jsx
                               |                         |                    |_TaskList.jsx
                               |                         |_pages
                               |                         |.          |_CurrentTaskPage.jsx
                               |                         |           |_HomePage.jsx
                               |                         |           |_LoginPage.jsx
                               |                         |           |_RegisterPage.jsx
                               |                         |           |_TaskDetailPage.jsx
                               |                         |           |_TaskListPage.jsx
                               |                         |_App.css
                               |                         |_App.jsx
                               |                         |_index.css
                               |                         |_main.jsx
                               |.                        |_.env
                               |.                        |_.gitignore
                                                         |_.env.production