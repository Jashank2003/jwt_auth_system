const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/authRoutes');
const {requireAuth,checkUser} = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.set('view engine', 'ejs');


const dburi = process.env.MONGO_URI;

mongoose.connect(dburi)
    .then((result) => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => console.log(err));

app.get('*',checkUser);
app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/shakes',requireAuth,(req,res)=>{
    res.render('shakes');
})