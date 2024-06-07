const connectDB = require('./config/db');
const app = require('./index');
require('dotenv').config();
require('colors');
const PORT = process.env.PORT || 5000;



app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.log(error.message.red.bold);
    }
});