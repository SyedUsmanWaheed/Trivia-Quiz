import { NextFunction, Router, Request, Response } from "express";
import { registerPoster, posterLogin, attendeeLogin, registerAttendee } from "../controller/user.js";
const poster_router: Router = Router();
const attendee_router: Router = Router();

poster_router.post("/login", posterLogin)
attendee_router.post("/login", attendeeLogin)

poster_router.post("/register", registerPoster)
attendee_router.post("/register", registerAttendee)



export { poster_router, attendee_router };