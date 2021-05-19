import * as functions from "firebase-functions";

const admin = require("firebase-admin");
admin.initialize();

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then((user:any) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin`
        }
    }).catch((err:any) => {
        return err
    });
});