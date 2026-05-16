"use strict";
exports.__esModule = true;
exports.checkPersmissions = void 0;
var errors_1 = require("../errors");
exports.checkPersmissions = function (requestUser, resourceUserId) {
    // unless user role is admin I wanna through an error
    if (requestUser.role === "admin")
        return;
    if (requestUser.userId === resourceUserId)
        return;
    throw new errors_1.UnauthorizedError("Unauthorized action");
};
