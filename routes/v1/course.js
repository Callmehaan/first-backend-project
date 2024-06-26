const express = require("express");
const coursesController = require("../../controllers/v1/course");
const multer = require("multer");
const multerStorage = require("../../utils/uploader");
const authMiddleware = require("../../middlewares/auth");
const isAdminMiddleware = require("../../middlewares/isAdmin");
const joiValidatorMiddleware = require("./../../middlewares/joiValidator");
const courseValidatorSchema = require("./../../validators/course.joi");

const router = express.Router();

router
    .route("/")
    .post(
        multer({
            storage: multerStorage,
            limits: { fileSize: 1000000000 },
        }).single("cover"),
        authMiddleware,
        isAdminMiddleware,
        joiValidatorMiddleware(courseValidatorSchema), //Must Try ***
        coursesController.create
    )
    .get(authMiddleware, isAdminMiddleware, coursesController.getAll);
router.route("/popular").get(coursesController.popular);

router.route("/presell").get(coursesController.presell);

router
    .route("/sessions")
    .get(authMiddleware, isAdminMiddleware, coursesController.getAllSessions);

router.route("/:href").get(authMiddleware, coursesController.getOne);

router.route("/related/:href").get(coursesController.getRelated);

router
    .route("/:id")
    .delete(authMiddleware, isAdminMiddleware, coursesController.remove);

router.route("/:id/register").post(authMiddleware, coursesController.register);

router.route("/:id/sessions").post(
    // multer({
    //     storage: multerStorage,
    //     limits: { fileSize: 1000000000 },
    // }).single("video"),
    authMiddleware,
    isAdminMiddleware,
    coursesController.createSession
);

router.route("/category/:href").get(coursesController.getCoursesByCategory);

router.route("/:href/:sessionID").get(coursesController.getSessionInfo);

router
    .route("/sessions/:id")
    .delete(authMiddleware, isAdminMiddleware, coursesController.removeSession);

module.exports = router;
