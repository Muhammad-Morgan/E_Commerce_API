"use strict";
exports.__esModule = true;
var jwt_1 = require("./jwt");
function createTokenUser(user) {
    var tokenUser = {
        userId: user.userId,
        name: user.name,
        role: user.role
    };
    jwt_1.attachCookiesToResponse({ payload: { tokenUser: tokenUser, res: user.res } });
}
exports["default"] = createTokenUser;
