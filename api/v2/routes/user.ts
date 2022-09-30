import { NextFunction, Router, Request, Response } from "express";
import { registerPoster, posterLogin, attendeeLogin, registerAttendee, update_location, find_nearby, find_nearby_sorted, polygon_searching } from "../controller/user.js";
const poster_router: Router = Router();
const attendee_router: Router = Router();
const user_router : Router = Router();

poster_router.post("/login", posterLogin)
attendee_router.post("/login", attendeeLogin)

poster_router.post("/register", registerPoster)
attendee_router.post("/register", registerAttendee)

user_router.post("/updateLocation", update_location)
user_router.post("/find_nearby", find_nearby)
user_router.post("/find_nearby_sorted", find_nearby_sorted)
user_router.get("/users_in_pak", polygon_searching)

export { poster_router, attendee_router, user_router };