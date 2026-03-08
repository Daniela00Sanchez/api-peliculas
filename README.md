Este proyecto trata sobre construir una REST API para manejar géneros de películas.
La API expone operaciones CRUD para los géneros.
The project was developed using Node.js and a layered architecture (models, controllers and routes).
Technologies used

Node.js
Express
MySQL
dotenv Project structure This is the project structure:
src/config → Database configuration
src/controllers → Application logic
src/models → Data models
src/routes → API route definitions

src/app.js → Main app file Get all genres GET /generos Create a genre POST /generos Update a genre PUT /generos/:id Delete a genre DELETE /generos/:id 
Author Daniela Sánchez Project academic – Development of API REST
