const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El email esta en uso'
            });
        }

        user = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
    } catch(error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            })
        }

        // Confirmar password  
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar nuestro JWT
        res.json({
            ok: true,
            uid: user.id,
            name: user.name
        })
    } catch(error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
};