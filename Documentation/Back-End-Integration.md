## **Back-End Integration**

The back-end integration of the Kardan Programming Competition platform ensures seamless interaction between the front-end user interface and the server, database, and other back-end services. This integration is key to delivering dynamic content, processing user actions, and maintaining the overall functionality of the platform.

### **Django and Django Rest Framework**

- **Django**: Serves as the backbone of the back-end, handling routing, session management, and database operations. Its ORM (Object-Relational Mapping) simplifies data manipulation and querying, making it efficient to work with the PostgreSQL database.
- **Django Rest Framework (DRF)**: Facilitates building RESTful APIs, enabling the front-end to communicate with the back-end through HTTP requests. DRF provides tools for serialization, authentication, and permission handling, ensuring secure and efficient data exchange.

### **Authentication and Authorization**

- **JWT (JSON Web Tokens)**: Used for securely transmitting information between parties as a JSON object. JWT is implemented for authentication and authorization, ensuring that users can only access data and actions permitted by their role.

### **Real-Time Features**

- **WebSockets**: Utilized for real-time communication between the client and server, essential for features like the live leaderboard and real-time feedback on code submissions.
- **Celery with Redis**: Manages background tasks such as sending emails, code evaluation, and other intensive operations, ensuring the application remains responsive.