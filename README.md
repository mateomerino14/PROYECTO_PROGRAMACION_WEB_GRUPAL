==========PROYECTO SEMESTRAL - PROGRAMACIÓN WEB==========

====DESCRIPCIÓN====
Backend desarrollado como proyecto semestral para la implementación y prueba de una API RESTful enfocada en la gestión de contenido educativo. 
El proyecto explora la creación de esquemas, definición de endpoints, autenticación mediante JWT, control de acceso basado en roles y la interacción con base de datos MongoDB. 
Todo el desarrollo se realizó con Node.js, Express y Mongoose, y fue probado íntegramente con Postman.

====CARACTERÍSTICAS PRINCIPALES====

----Autenticación y Autorización----
- Sistema de registro y login con JWT
- Middleware verifyToken para proteger rutas
- Middleware restrictTo para control de acceso por roles
- Roles de prueba: administrador, profesor, estudiante
- Encriptación de contraseñas con bcryptjs

----Modelado de Datos (Esquemas)----
- Categorías (ej. Matemáticas, Lenguaje, Historia)
- Subcategorías vinculadas a categorías
- Niveles de dificultad
- Rangos de edad
- Usuarios con asignación de roles

----Endpoints Implementados----
- CRUD completo para cada módulo
- Rutas protegidas según rol
- Endpoints públicos y privados

----Pruebas----
- Todos los endpoints fueron probados con Postman
- Validación de autenticación y autorización por rol
- Verificación de respuestas y códigos HTTP

====TECNOLOGÍAS UTILIZADAS====

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose (ODM)
- JWT (JSON Web Tokens)
- Bcryptjs
- Dotenv

**Herramientas de prueba:**
- Postman (para prueba de endpoints)
- MongoDB Compass (visualización de datos)
