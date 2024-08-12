import express from 'express';

import jwt from 'jsonwebtoken';
import Employee from '../models/insert.js';

const inrouter = express.Router();

//insert route

inrouter.post('/insert', async (req, res) => {
    console.log('insert');
    const { firstname, lastname, gender, age, email, number, address, country, company, post } = req.body;
    try {
        const newemp = new Employee({ firstname, lastname, gender, age, email, number, address, country, company, post });
        await newemp.save();
        res.status(201).json({
            success: true,
            message: 'Employee inserted successfully!',
            data: newemp
        });


    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});


//edit employee

inrouter.put('/edit/:id', async (req, res) => {
    console.log('edit');
    const { firstname, lastname, gender, age, email, number, address, country, company, post } = req.body;
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, { firstname, lastname, gender, age, email, number, address, country, company, post }, { new: true });
        res.json({
            success: true,
            message: 'Employee updated successfully!',
            data: updatedEmployee
        });
    } catch (error) {
        console.error('Update Error:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});
//Fetch single employee

inrouter.get('/view/:id', async (req, res) => {
    console.log('get');
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});



//soft deletes set is_del to 1

inrouter.delete('/delete/:id', async (req, res) => {
    console.log('delete');
    try {
        const deletedEmployee = await Employee.findByIdAndUpdate(req.params.id, { is_del: 1 }, { new: true });
        res.json({
            success: true,
            message: 'Employee deleted successfully!',
            data: deletedEmployee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});


//get all employees

inrouter.get('/view', async (req, res) => {
    console.log('get');
    try {
        const employees = await Employee.find({ is_del: 0 });
        res.json({
            success: true,
            data: employees
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});





export default inrouter
