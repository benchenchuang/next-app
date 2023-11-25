import mongoose from "mongoose"

interface IConnection {
    isConnected: boolean
}

export const connectToDB = async () => {
    let connection: IConnection = {
        isConnected: false
    }
    try {
        if (connection.isConnected) return;
        let db: any = await mongoose.connect(process.env.MONGO as string);
        connection.isConnected = db.connections[0].readyState;
    } catch (error: any) {
        throw new Error(error)
    }
}