/*
    RUTAS DE USUARIOS / AUTH
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { createUser, loginUser, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener 6 caracteres o mas').isLength({ min: 6 }),
        fieldValidator
    ], 
    createUser
);

router.post('/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La contraseña debe tener 6 caracteres o mas').isLength({ min: 6 }),
        fieldValidator
    ],
    loginUser
);

router.get('/renew', renewToken);

module.exports = router;

