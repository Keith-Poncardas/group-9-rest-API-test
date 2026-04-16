const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/students', studentRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Student Management API',
        endpoints: {
            getAll: 'GET /api/students',
            getById: 'GET /api/students/:id',
            create: 'POST /api/students',
            update: 'PUT /api/students/:id',
            patch: 'PATCH /api/students/:id',
            delete: 'DELETE /api/students/:id'
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});