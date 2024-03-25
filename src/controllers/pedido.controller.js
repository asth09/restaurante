import Pedido from '../models/pedidos.model.js'
import Menu from '../models/menu.model.js'

export const getpedidos = async(req, res) => {
    try {
        const pedidos = await Pedido.find()
        res.json(pedidos)
    } catch (error) {
        return res.status(404).json({ message: "Registro no encontrado"})
    }
}

export const createpedidos = async (req, res) => {
    const { mesa, menus, metodo } = req.body;

    let session;

    console.log(req.user);

    try {
        const session = await Pedido.startSession(); // Inicia una sesión de transacción
        session.startTransaction(); // Inicia la transacción

        // Itera sobre los productos de la venta para actualizar la cantidad en la colección de productos
        for (const item of menus) {
            const menuId = item.menu;
            const cantidadVendida = item.cantidad;

            // Busca el producto en la base de datos y actualiza la cantidad
            await Menu.findByIdAndUpdate(menuId, { $inc: { existencia: -cantidadVendida } });
        }

        const newPedido = new Pedido({
            mesa,
            menus,
            metodo,
            meseros: req.user.id
        });

        const savedPedido = await newPedido.save();

        await session.commitTransaction(); // Confirma la transacción
        session.endSession(); // Finaliza la sesión

        res.json(savedPedido);
    } catch (error) {
        if (session) {
            if (session.abortTransaction) {
                await session.abortTransaction(); // Cancela la transacción si está disponible
            }
            session.endSession(); // Finaliza la sesión
        }

        console.error(error);
        res.status(500).json({ message: 'Error al realizar el pedido' });
    }
}

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