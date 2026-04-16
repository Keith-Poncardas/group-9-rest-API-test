const db = require('../config/db');

// GET - Retrieve all records
const getAllStudents = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students');
        res.status(200).json({
            success: true,
            data: rows,
            count: rows.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// GET (by ID) - Retrieve specific record
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// POST - Insert new record
const createStudent = async (req, res) => {
    try {
        const { firstName, lastName, age, course, email } = req.body;

        if (!firstName || !lastName || !age || !course) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const [result] = await db.query(
            'INSERT INTO students (firstName, lastName, age, course, email) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, age, course, email]
        );

        const [newStudent] = await db.query('SELECT * FROM students WHERE id = ?', [result.insertId]);

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: newStudent[0]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT - Update entire record
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, age, course, email } = req.body;

        const [existing] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        await db.query(
            'UPDATE students SET firstName = ?, lastName = ?, age = ?, course = ?, email = ? WHERE id = ?',
            [firstName, lastName, age, course, email, id]
        );

        const [updated] = await db.query('SELECT * FROM students WHERE id = ?', [id]);

        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: updated[0]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PATCH - Update specific fields
const patchStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const [existing] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const allowedFields = ['firstName', 'lastName', 'age', 'course', 'email'];
        const fields = [];
        const values = [];

        for (const field of allowedFields) {
            if (updates[field] !== undefined) {
                fields.push(`${field} = ?`);
                values.push(updates[field]);
            }
        }

        if (fields.length === 0) {
            return res.status(400).json({ success: false, message: 'No valid fields to update' });
        }

        values.push(id);
        await db.query(`UPDATE students SET ${fields.join(', ')} WHERE id = ?`, values);

        const [updated] = await db.query('SELECT * FROM students WHERE id = ?', [id]);

        res.status(200).json({
            success: true,
            message: 'Student patched successfully',
            data: updated[0]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// DELETE - Remove a record
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const [existing] = await db.query('SELECT * FROM students WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        await db.query('DELETE FROM students WHERE id = ?', [id]);

        res.status(200).json({
            success: true,
            message: 'Student deleted successfully',
            deletedStudent: existing[0]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    patchStudent,
    deleteStudent
};