import { Router } from "express";
import { validateUserRole, validateUserRoles } from "../middlewares/validateToken.js";
import { getmenus,
    getmenu,
    createmenus,
    updatemenus,
    deletemenus,
    getMenuByType } from "../controllers/menu.controller.js";   

const router = Router()

router.get('/menus', validateUserRoles, getmenus)

router.get('/menus/:id', validateUserRoles, getmenu)

router.post('/menus', validateUserRole, createmenus)

router.delete('/menus/:id', validateUserRole, deletemenus)

router.put('/menus/:id', validateUserRole, updatemenus)

router.get('/menu', validateUserRoles, getMenuByType)

export default router