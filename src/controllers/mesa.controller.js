import Mesa from '../models/mesas.model.js'

export const getmesas = async(req, res) => {
    try {
        const mesas = await Mesa.find();
        res.json(mesas);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createmesas = async(req, res) => {
    try {
    const { numesa, capacidad, estado, ubicacion, descripcion, comentarios } = req.body

    console.log(req.user)

    const newMesa = new Mesa({
        numesa,
        capacidad,
        estado,
        ubicacion,
        descripcion,
        comentarios,
        vendedor: req.user.id
        });
        const savedMesa = await newMesa.save();
        res.json(savedMesa);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getmesa = async(req, res) => {
    try {
        const mesa = await Mesa.findById(req.params.id)
        if (!mesa) return res.status(404).json({ message: "Registro no encontrado" });
    res.json(mesa)
    } catch (error) {
        return res.status(400).json({ message: "Registro no encontrado"});
    }
}

export const updatemesas = async(req, res) => {
    try {
        const mesa = await Mesa.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        })
        if (!mesa) return res.status(404).json({ message: "Registro no actualizado" });
        res.json(mesa)
    } catch (error) {
        return res.status(404).json({ message: "Registro no encontrado"})
    }
}

export const deletemesas = async(req, res) => {
    try {
        const mesa = await Mesa.findByIdAndDelete(req.params.id)
        if (!mesa) return res.status(404).json({ message: "Registro no eliminado" });
    return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Registro no encontrado"})
    }
}

export const getClientes = async (req, res) => {
    /* obtengo y valido 'pagina' de la query */
    const { pagina } = req.query;
    if (!pagina) return res.status(400).json({ message: "Parametro 'pagina' es requerido en la query" });

    /* 
        buscar clientes en la db
        .skip() busca los documentos desde el numero que se indica en el parentesis
        .limit() cantidad de documentos que busca
    */
    const clientes = await Cliente.find()
    .skip(pagina * 20)
    .limit(20)

    if (!clientes) return res.status(500).json({ message: "Error al obtener los clientes" })

    res.json({clientes})
}