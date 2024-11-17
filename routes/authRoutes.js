const { Router} = require('express');
const router = Router();
const authControllers = require('../controllers/authControllers');


router.get('/login',authControllers.login_get);

router.post('/login', authControllers.login_post);

router.get('/signup',authControllers.signup_get);

router.post('/signup', authControllers.signup_post);

router.get('/logout',authControllers.login_out);


module.exports = router;