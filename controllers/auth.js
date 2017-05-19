const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (authService, config) => {
    const router = express.Router();


    router.post('/login', (req, res) => {
            authService.login(req.body)
                .then((userId) => {
                     const token = jwt.sign({ __user_id: userId }, 'shhhhh');
                     res.cookie('x-access-token', token);
                    res.redirect("/index.html");
                })
                .catch((err) => res.error(err));

    });

    router.get('/getId', (req, res) => {

        jwt.verify(req.cookies['x-access-token'], 'shhhhh', function (err, decoded) {
            res.send({id:decoded.__user_id});
        });


    });

    router.post('/register', (req, res) => {

            authService.register(req.body)
                .then(() => {
                    return authService.login(req.body)
                        .then(userId => {
                            const token = jwt.sign({ __user_id: userId }, 'shhhhh');
                            res.cookie('x-access-token', token);
                            res.redirect("/index.html");
                        })
                })
                .catch(err => res.error(err));

    });

    router.get('/logout', (req, res) => {
        //res.cookie(config.cookie.auth, '');
        res.redirect("/vhod.html")
    });

    return router;
};