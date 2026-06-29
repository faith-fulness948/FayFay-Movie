import mongoose from 'mongoose'
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(colors.green("Successfully connected to:", conn.connection.name));
        
    } catch (error) {
        console.log(colors.red("Database Connection Error:", error));
        process.exit(1); // exiting with a failure
    }
}

export default connectDB;