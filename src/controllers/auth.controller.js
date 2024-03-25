import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const register = async (req, res) => {
    const {usuario, password, role} = req.body

    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            usuario,
            password: passwordHash,
            role,
        })
        
        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id, role: userSaved.role})
        res.cookie('token', token)
            res.json({
                message:"User created successfully",
            })
        //res.send('registrando')
    } catch (error) {
        console.log(error)
    }
};

export const login = async (req, res) => {
    const { usuario, password } = req.body

    try {
        const userFound = await User.findOne({usuario})
        if (!userFound) return res.status(400).json({message:"Usuario o contraseña incorrecta"})

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ message:"Usuario o contraseña incorrecta" })

        const token = await createAccessToken({ id: userFound._id, role: userFound.role })
        res.cookie('token', token);
            res.json({
                message:"Bienvenido",
            })
        //res.send('registrando')
    } catch (error) {
        console.log(error)
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const verifyToken = (req, res) => {
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: "unauthorized"});

    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "unauthorized"});

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({message: "Unauthorized" });

        return res.json({
            id: userFound._id,
            role: userFound.role,
        });
    });
};
