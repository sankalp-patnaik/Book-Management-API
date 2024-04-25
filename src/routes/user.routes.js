import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { addBook, filterBooks, getBooks } from "../controllers/book.controller.js";

const router=Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// Secured Routes
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);


// Books routes
router.route("/add-books").post(addBook);

// Get Books
router.route("/getbooks").get(getBooks);
router.route("/filterbooks").post(filterBooks)

export default router;