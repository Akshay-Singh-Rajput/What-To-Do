const admin = require('firebase-admin');
const serviceAccount = require('../wtd-web-app-firebase-adminsdk-wx3f4-e59c340768.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-database-name.firebaseio.com"
});

module.exports = admin;
