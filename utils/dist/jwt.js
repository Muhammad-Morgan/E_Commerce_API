"use strict";
exports.__esModule = true;
exports.attachCookiesToResponse = exports.isTokenValid = exports.createJWT = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
exports.createJWT = function (_a) {
    var payload = _a.payload;
    var token = jsonwebtoken_1["default"].sign({ name: payload.name, userId: payload.userId, role: payload.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    });
    return token;
};
exports.isTokenValid = function (_a) {
    var token = _a.token;
    var decoded = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
    return decoded;
};
exports.attachCookiesToResponse = function (_a) {
    var payload = _a.payload;
    // creating that token
    var token = exports.createJWT({ payload: payload.tokenUser });
    // adding token to cookies
    var oneDay = 60 * 60 * 24 * 1000;
    payload.res.cookie("token", token, {
        expires: new Date(Date.now() + oneDay),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true
    });
};
