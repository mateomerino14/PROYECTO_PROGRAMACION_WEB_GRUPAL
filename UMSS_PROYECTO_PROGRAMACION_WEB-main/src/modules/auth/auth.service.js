import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../../models/usuario.model.js";
import Rol from "../../models/rol.model.js";
import { JWT_SECRET } from "../../config/env.config.js";

export async function registerUser(userData) {
  const usuarioRegistrado = await Usuario.findOne({ correo: userData.correo });
  if (usuarioRegistrado) {
    throw new Error("El correo esta registrado");
  }
  let idRol = userData.id_rol;
  if (!idRol) {
    const rolDefecto = await Rol.findOne({ nombre_rol: "estudiante" });
    if (rolDefecto) {
      idRol = rolDefecto._id;
    }
  }
  const valorAleatorio = await bcrypt.genSalt(10);
  const contraseniaHasheada = await bcrypt.hash(
    userData.password,
    valorAleatorio,
  );
  const nuevoUsuario = new Usuario({
    ...userData,
    password: contraseniaHasheada,
    id_rol: idRol,
  });
  return await nuevoUsuario.save();
}

export async function loginUser(correo, password) {
  const usuarioExistente = await Usuario.findOne({ correo })
    .select("+password")
    .populate("id_rol");
  if (!usuarioExistente) {
    throw new Error("Usuario no encontrado");
  }
  const machea = await bcrypt.compare(password, usuarioExistente.password);
  if (!machea) {
    throw new Error("Contraseña incorrecta");
  }
  const payload = {
    id: usuarioExistente._id,
    role: usuarioExistente.id_rol ? usuarioExistente.id_rol.nombre_rol : null,
    handle: usuarioExistente.handle_name,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" }); //Plazo de expiracion de 24 horas
  return { token, usuarioExistente };
}

export async function obtenerUsuarios() {
  const usuarios = await Usuario.find().populate("id_rol");
  return usuarios;
}
