import mongoose from "mongoose";

export class Db {
    static isConnected() {
        return mongoose.connection.readyState === 1;
    }
    static async connect() {
        if (Db.isConnected()) {
            return;
        }
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.info('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    static async disconnect() {
        if (Db.isConnected()) {
            try {
                await mongoose.disconnect();
                console.info('Disconnected from MongoDB');
            } catch (error) {
                console.error('Error disconnecting from MongoDB:', error);
            }
        }
    }
}
