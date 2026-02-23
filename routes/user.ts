import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/userController";

import expres from "express";
const router = expres.Router();

// for middleware I guess

router.get("/", getAllUsers);

router.get("/showMe", showCurrentUser);

router.patch("/updateUser", updateUser);
router.patch("/updateUserPassword", updateUserPassword);

// if this route was before any of the others disregarding "/" of course, it would've caused unnecessary bugs. Because all the routes beneath it would've ben treated as id and hence the whole functionality fails!

router.get("/:id", getSingleUser);

export { router as userRouter };
