const express = require('express');
const userModel = require('./models/userModel');
const adminModel = require('./models/adminUsers');
const bcrypt = require('bcrypt');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger.json');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/api/user', async (req, res) => {
    let data = { ...req.body, role: 'user' };
    console.log("[/api/user --> 1]")
    try {
        console.log("[/api/user --> 2]")
        let user = await userModel.create(data);
        console.log("[/api/user --> 3]")
        res.json({ message: "User saved" })
        // console.log(user);
    } catch (err) {
        console.log("[/api/user --> 4]")
        console.log(err)
        res.status(400).json({ message: "Something Went Wrong", error: err.message })
    }
})

// TODO: create seperate model for admin user
app.post('/api/register/admin', async (req, res) => {
    let data = { ...req.body, role: 'admin' };
    console.log("[/api/register/admin --> 1]")
    try {
        console.log("[/api/register/admin --> 2]")
        let admin = await adminModel.create(data);
        console.log("[/api/register/admin --> 3]")
        res.json({ message: "Admin created" })
        // console.log(user);
    } catch (err) {
        console.log("[/api/register/admin --> 4]")
        console.log(err);
        res.status(400).json({ message: "Something Went Wrong", error: err.message })
    }
})

app.post('/api/login/admin', async (req, res) => {
    let { email, password } = req.body;
    console.log("[/api/login/admin --> 1]")
    try {
        console.log("[/api/login/admin --> 2]")
        let admin = await adminModel.findOne({ 'email': email });
        console.log("[/api/login/admin --> 3]")
        if (admin) {
            const result = await bcrypt.compare(password, admin.password)
            if (result) {
                console.log("[/api/login/admin --> 4]")
                const allUsers = await userModel.find();
                console.log("[/api/login/admin --> 5]")
                res.status(200).json({ message: "All Users Fetched", users: allUsers });
            } else {
                throw new Error("Invalid Creds")
            }
        } else {
            console.log("[/api/login/admin --> 6]")
            throw new Error("Admin Not Found")
        }
    } catch (err) {
        console.log("[/api/login/admin --> 7]")
        console.log(err)
        res.status(404).json({ message: "Incorrect Credentials", error: err.message })
    }
})


app.listen(8080, () => {
    console.log("Server started");
});


// async function createUser() {
//     user = {
//         name: "Alok",
//         age: 42,
//         city: "Delhi",
//         email: "alok@gmail.com",
//         password: "1234567",
//         qualification: "B.tech",
//         phone: "1234567891",

//     }



//     let data = await userModel.create(user);
//     console.log(data);
// };

// createUser();