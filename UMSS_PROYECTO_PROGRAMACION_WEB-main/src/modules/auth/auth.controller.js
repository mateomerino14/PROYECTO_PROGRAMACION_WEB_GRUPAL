import * as AuthService from './auth.service.js';

export async function register(req, res){
  try{
    const usuarioNuevo=await AuthService.registerUser(req.body);
    usuarioNuevo.password=undefined;
    res.status(201).json({message:'Usuario registrado exitosamente',usuarioNuevo});
  } 
  catch(error){
    res.status(400).json({message:error.message});
  }
}

export async function login(req,res){
  try{
    const {correo, password}=req.body;
    const {token,usuarioExistente}=await AuthService.loginUser(correo,password);
    usuarioExistente.password = undefined;
    res.status(200).json({
      message: 'Login exitoso',
      token,
      usuarioExistente
    });
  } 
  catch(error){
    res.status(401).json({message: error.message});
  }
}

export async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await AuthService.obtenerUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}