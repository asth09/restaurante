import mongoose from "mongoose";

const mesaShema = new mongoose.Schema({
    numesa: { 
        type: Number,
        required:true,
    },
    capacidad: { 
        type: Number,
        required:true,
    },
    estado: { 
        type: String,
        required:true,
    },
    ubicacion: { 
        type: String,
        required:true,
    },
    descripcion: { 
        type: String,
        required:true,
    },
    comentarios: { 
        type: String,
        required:true,
    },
    mesero: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    },
}, {versionKey:false});

export default mongoose.model("Mesa", mesaShema);