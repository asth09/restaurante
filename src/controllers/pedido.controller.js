import Pedido from '../models/pedidos.model.js'
import Menu from '../models/menu.model.js'

export const getpedidos = async(req, res) => {
    try {
        const pedidos = await Pedido.find().populate('meseros', 'usuario') .populate('mesa', 'numesa') 
        res.json(pedidos)
    } catch (error) {
        return res.status(404).json({ message: "Registro no encontrado"})
    }
}

export const createpedidos = async (req, res) => {
    try {
        const { mesa, desayuno, almuerzo, bebidas, metodo } = req.body;

        const nuevoPedido = new Pedido({
            mesa,
            desayuno,
            almuerzo,
            bebidas,
            metodo,
            meseros:req.user.id
        });

        await nuevoPedido.save();

        res.status(201).json({ message: 'Pedido creado exitosamente', data: nuevoPedido });
    } catch (error) {
        res.status(500).json({ error: 'Ocurrió un error al crear el pedido', message: error.message });
    }
};


export const getpedido = async(req, res) => {
    try {
        const pedido = await Pedido.findById(req.params.id)
        if (!pedido) return res.status(404).json({ message: "Registro no encontrado" });
        res.json(pedido)
    } catch (error) {
        return res.status(404).json({ message: "Registro no encontrado"})
    }
}

export const updatepedidos = async(req, res) => {
    try {
        const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        })
        if (!pedido) return res.status(404).json({ message: "Registro no actualizado" });
        res.json(pedido)
    } catch (error) {
        return res.status(404).json({ message: "Registro no encontrado"})
    }
}

export const deletepedidos = async(req, res) => {
    try {
        const pedido = await Pedido.findByIdAndDelete(req.params.id)
        if (!pedido) return res.status(404).json({ message: "Registro no eliminado" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Registro no encontrado"})
    }
}