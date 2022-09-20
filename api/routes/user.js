import { Router } from "express";
import { attendeeLogin, posterLogin, registerAttendee, registerPoster } from "../controller/user.js";
const poster_router = Router();
const attendee_router = Router();


poster_router.post("/login", posterLogin)
attendee_router.post("/login", attendeeLogin)

poster_router.post("/register", registerPoster)
attendee_router.post("/register", registerAttendee)



export {poster_router, attendee_router};