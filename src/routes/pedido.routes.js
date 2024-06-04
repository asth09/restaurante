import { Router } from "express";
import { authRequired, validateUserRole } from "../middlewares/validateToken.js";
import { getpedidos,
    getpedido,
    createpedidos,
    updatepedidos,
    deletepedidos } from "../controllers/pedido.controller.js";
import { validateSchema } from '../middlewares/validator.middle.js';  

const router = Router()

router.get('/pedidos', authRequired, getpedidos)

router.get('/pedidos/:id', authRequired, getpedido)

router.post('/pedidos', authRequired,  createpedidos)

router.delete('/pedidos/:id', validateUserRole, deletepedidos)

router.put('/pedidos/:id', authRequired, updatepedidos)


export default router