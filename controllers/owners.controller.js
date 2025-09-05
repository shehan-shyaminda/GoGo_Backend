const db = require("../config/mongo.init");
const jwt = require("jsonwebtoken");

exports.userLogin = (req, res) => {
    db.user.findOne({ username: req.body.username.toLowerCase() }).exec()
        .then(r => {
            if (!r) {
                return res.status(400).json({ status: false, message: 'Invalid credentials' });
            }
            if (req.body.userPassword !== r.userPassword) {
                return res.status(400).json({ status: false, message: 'Invalid credentials' });
            }
            const payload = {
                userId: r._id, username: r.username
            };
            const jwtToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET);
            return res.status(200).send({
                status: true, data: {
                    "user": r, "access_token": jwtToken
                }
            })
        })
    .catch(error => {
        res.status(500).send({ status: false, message: 'Error Encountered' });
    });
}

exports.userRegister = (req, res) => {
    console.log(req.body);
    const user = new db.user({
        username: req.body.username,
        userPassword: req.body.userPassword
    });
    user.save().then(r => {
        if (r.length !== 0) {
            res.status(200).send({ status: true, data: user })
        } else {
            res.status(400).send({ status: false, message: 'Error Encountered' });
        }
    })
        .catch(error => {
            res.status(500).send({ status: false, message: 'Error Encountered' });
        });
}