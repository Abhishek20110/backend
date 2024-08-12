import mongoose from 'mongoose';

const empSchema = new mongoose.Schema({
    /*  const { firstname, lastname, gender, age, email, number, address, country, company, post } = req.body; */
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    company: { type: String, required: true },
    post: { type: String, required: true },
    is_del: { type: Number, default: 0 }
});

const Employee = mongoose.model('Employee', empSchema);

export default Employee;
