const { response } = require('express');

const createUser = (req, res = response) => {

    const { name, email, password } = req.body;

    if (name.length < 5) {
        return res.status(400).json({
            ok: false,
            msg: 'El nombre debe tener 5 letras o mas'
        })
    }

    res.json({
        ok: true,
        msg: 'register',
        name,
        email,
        password
    });
}

const loginUser = (req, res = response) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
};