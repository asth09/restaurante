import { Router } from "express";
import { validateUserRole, validateUserRoles } from "../middlewares/validateToken.js";
import { getmesas,
    getmesa,
    createmesas,
    updatemesas,
    deletemesas } from "../controllers/mesa.controller.js";   

const router = Router()

router.get('/mesas', validateUserRoles, getmesas)

router.get('/mesas/:id', validateUserRoles, getmesa)

router.post('/mesas', validateUserRole, createmesas)

router.delete('/mesas/:id', validateUserRole, deletemesas)

router.put('/mesas/:id', validateUserRole, updatemesas)


export default router