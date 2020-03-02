const express = require('express');
const path = require('path');

const dataManager = require('./modules/dataManager');
const checkCookieForHomePage = require('./modules/middlewares/checkCookieForHomePage');
const checkCookieForPrivatePage = require('./modules/middlewares/checkCookieForPrivate');
const loginManager = require('./modules/checkUserLoginManager');
let resetPassword = require('./modules/resetPassword');

const app = express();
const PORT = process.env.PORT || 3335;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.get('/cash', (req, res) => {
    res.json(dataManager.getCash());
});

app.get('/getUsers',  (req, res) => {
    try {
        dataManager.getAllUsers().then((data) => {
            res.status(200).json(data);
        })
            .catch( (e) =>{ throw e});
    } catch (e) {
        res.status(400).json(e.message);
    }

});

app.get('/getUser/:id', (req, res) => {
    dataManager.getUser(req.params.id).then(data => {
        res.status(data.status).json(data.msg)
    });
});

app.get('/private', checkCookieForPrivatePage, ( req, res ) => {
    res.status(200).send('<h1>Welcome</h1><a href="/logout">Logout</a>')
});

app.delete('/deleteUser/:id', (req, res) => {
    dataManager.deleteUser(req.params.id).then(data => {
       res.json(data)
   });
});

app.get('/reset-password-success', ( req,res ) => {
    res.sendFile(__dirname + '/public/pages/resetPassword/reset-password-success.html')
});

app.route('/resetPassword/step2/:id')
    .get( ( req, res ) => {
        res.sendFile(__dirname + '/public/pages/resetPassword/reset-password-step2.html')
    })
    .put( ( req, res ) => {
        dataManager.updateUser(req.params.id, req.body ).then( data => {
            res.status(data.status).json(data.msg);
        })
    });

app.post('/resetPassword/step1', ( req, res ) => {
    const resetPass = new resetPassword(req.body);
    resetPass.resetPasswordStep1().then( data => {
          res.status(data.status).json(data.msg);
      });
    });

app.get('/logout', ( req, res ) => {
    res.clearCookie('userId');
    res.redirect('/login');
});

app.post('/login', (req,res) => {
    loginManager(req.body).then(data => {
        console.log();
        if (data.msg.token) {
            res.status(data.status).json(data.msg);
        } else {
            res.status(data.status).json(data.msg);
        }
    })
        .catch( (e) => {
            res.json(e.msg)
        })
});

app.route('/registration')
    .all()
    .get((req, res) => {
        res.sendFile(__dirname + '/public/pages/registration.html');
    })
    .post( (req, res) => {
    if (req.body) {
        dataManager.writeData(req.body).then((data) => {
            if (data.status === 201){
                dataManager.getAllUsers().then( users => {
                    const isMatch = dataManager.checkEmailIn(req.body.email, users);
                    if (isMatch) {
                        const user = users.filter(user => user.email === req.body.email);
                        res.status(data.status).json(data.msg);
                    } else {
                        res.status(data.status).json(data.msg);
                    }
                });
            } else {
                res.status(data.status).json(data.msg);
            }
        });
    } else {
        res.status(400).send('body request is empty.');
    }
});

app.post('/getUserProfile', (req,res) => {
    try {
        dataManager.getUserProfile(req.body.token)
            .then(
            data => {
                res.status(data.status).json(data.msg)
            }
        )

            .catch( err => {
                throw err;
            });
    } catch (e) {
        res.status(400).json(e.msg)
    }

});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`server started on ${PORT}`));
