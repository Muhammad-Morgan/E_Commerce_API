import express from "express";

const router = express.Router();

import { authUser } from "../middleware/authentication";
import {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController";

router.route("/").get(getAllReviews).post(authUser, createReview);

router
  .route("/:id")
  .get(getSingleReview)
  .patch(authUser, updateReview)
  .delete(authUser, deleteReview);

export { router as reviewRouter };
