import mongoose from "mongoose";

const menuShema = new mongoose.Schema({
    nombre: { 
        type: String,
        required:true,
    },
    descripcion: { 
        type: String,
        required:true,
    },
    existencia: { 
        type: Number,
        required:true,
    },
    precio: { 
        type: Number,
        required:true,
    },
    tipo: { 
        type: String,
        required:true,
    },
    ingredientes: { 
        type: String,
        required:true,
    },
    disponibilidad: { 
        type: String,
        required:true,
    },
}, {versionKey:false});

export default mongoose.model("Menu", menuShema);