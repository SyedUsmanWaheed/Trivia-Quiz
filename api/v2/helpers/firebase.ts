import admin from "firebase-admin";
import { FilterQuery, LeanDocument, Types } from "mongoose";
import { firebaseConfig } from "../config/firebase.js"
import { serviceAccount } from "../config/firebase.js"
import CRUD from "../services/CRUD.js";
import UserModel from "../models/user.js"
import { User } from "../intefaces/models.js"

import { MessagingPayload, MessagingDevicesResponse } from "firebase-admin/lib/messaging/messaging-api"

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export function notification(user_id: Types.ObjectId, title: string, message: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {

            let filter: FilterQuery<User> = { _id: user_id }

            let user: LeanDocument<User> | null = await CRUD.getOne(UserModel, filter)

            if (!user) {
                reject("This User Does not exist")
            }
            let registration_token = user?.fcm_token

            if (registration_token) {
                const payload: MessagingPayload = {
                    data: {
                        title: title,
                        message: message
                    }
                }

                admin.messaging().sendToDevice(registration_token, payload, {
                    priority: "high",
                    timeToLive: 60 * 60 * 24
                })
                    .then((res: MessagingDevicesResponse) => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        } catch (error) {
            console.log(error)
        }

    })
}