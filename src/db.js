import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/restaurant');
        console.log("Base de datos creada y inicializada")
    } catch (error) {
        console.log(error)
    }
}