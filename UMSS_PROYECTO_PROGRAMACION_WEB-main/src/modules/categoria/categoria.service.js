import { Categoria } from '../../models/index.js';

export async function findAll() {
  return await Categoria.find().sort({ nom_cat: 1 });
}

export async function findById(id) {
  const categoria = await Categoria.findById(id);
  if (!categoria) {
    throw new Error("Categoria no encontrada");
  }
  return categoria;
}

export async function createCategoria(data) {
  const { nom_cat, desc_cat, sigla } = data;
  if (!nom_cat || !sigla) {
    throw new Error("Faltan campos");
  }
  return await Categoria.create({ nom_cat, desc_cat, sigla });
}

export async function updateCategoria(id, data) {
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
  if (!categoria) {
    throw new Error("Categoria no encontrada");
  }
  return categoria;
}

export async function deleteCategoria(id) {
  const categoria = await Categoria.findByIdAndDelete(id);
  if (!categoria) {
    throw new Error("Categoria no encontrada");
  }
  return categoria;
}
