import Menu from '../models/menu.model.js'

export const getmenus = async(req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createmenus = async(req, res) => {
    try {
    const { nombre, descripcion, existencia, precio, tipo, ingredientes, disponibilidad } = req.body

    console.log(req.user)

    const newMenu = new Menu({
        nombre,
        descripcion,
        existencia,
        precio,
        tipo,
        ingredientes,
        disponibilidad,
        });
        const savedMenu = await newMenu.save();
        res.json(savedMenu);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getmenu = async(req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)
        if (!menu) return res.status(404).json({ message: "Registro no encontrado" });
    res.json(menu)
    } catch (error) {
        return res.status(400).json({ message: "Registro no encontrado"});
    }
}

export const updatemenus = async(req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
        })
        if (!menu) return res.status(404).json({ message: "Registro no actualizado" });
        res.json(menu)
    } catch (error) {
        return res.status(404).json({ message: "Registro no encontrado"})
    }
}

export const deletemenus = async(req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id)
        if (!menu) return res.status(404).json({ message: "Registro no eliminado" });
    return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Registro no encontrado"})
    }
}

export const getMenuByType = async (req, res) => {
    try {
      const tipo = req.query.tipo; // Obtener el tipo de la consulta (por ejemplo, /menus?tipo=principal)
      const menus = await Menu.find({ tipo }); // Buscar menús con el tipo especificado
  
      if (menus.length === 0) {
        return res.status(404).json({ message: "No se encontraron menús con ese tipo" });
      }
  
      res.json(menus); // Devolver la lista de menús encontrados
    } catch (error) {
      return res.status(500).json({ message: "Error al buscar menús" });
    }
  };
  
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