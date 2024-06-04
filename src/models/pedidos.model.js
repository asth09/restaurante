import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
    mesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesa',
        required: [true, 'Especifique la mesa'],
    },
   
    desayuno: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
        }
    ],
    almuerzo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
        }
    ],
    bebidas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
        }
    ],
    metodo: {
            type: String,
            enum: ['EFECTIVO', 'PAGO_MOVIL', 'TRANSFERENCIA', 'DIVISAS'],
            default: 'EFECTIVO',
            required: [true, 'Escpecifique el metodo de pago']
    },

    meseros: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
    }
}, {timestamps: true,
    versionKey:false});

export default mongoose.model('Pedido', pedidoSchema)