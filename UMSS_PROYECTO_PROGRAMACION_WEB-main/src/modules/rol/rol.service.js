import { Rol } from '../../models/index.js';

export async function createRol(data) {
  const nuevoRol = new Rol(data);
  return await nuevoRol.save();
};

export async function getRoles() {
  return await Rol.find({ activo: true });
};
