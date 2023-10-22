"use strict";
var isAdmin = function (req, res, next) {
    try {
        var email = req.params.user.email;
        if (!email || email.indexOf("@mahindra.com") === -1) {
            res.json({
                status: false,
                message: "Sorry, you are not allowed here",
            });
            return;
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
};
module.exports = isAdmin;
