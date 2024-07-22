const userModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 10);

    const user = await new userModel({
        username,
        password: cryptedPassword,
        email,
    });
    user.save()
        .then(() => res.send({ msg: `${username} created` }))
        .catch((err) => res.send({ msg: err.errmsg }));
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email: email });
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
        res.send("error login/password");
    } else {
        const token = jwt.sign(
            {
                test: "okokok",
                ierneri: "ntm",
            },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.send({
            msg: "login success",
            data: {
                iat: token,
                username: findUser.username,
                email: email,
            },
        });
    }
};
