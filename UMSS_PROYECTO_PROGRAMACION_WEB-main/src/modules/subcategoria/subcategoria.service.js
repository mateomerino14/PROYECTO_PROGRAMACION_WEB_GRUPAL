import { Subcategoria } from '../../models/index.js';

export async function findAll() {
  return await Subcategoria.find().sort({ nom_subcat: 1 });
}

export async function findById(id){
  const subcategoria = await Subcategoria.findById(id);
  if (!subcategoria) {
    throw new Error("Subcategoría no encontrada");
  }
  return subcategoria;
}

export async function createSubcategoria(data){
  const { nom_subcat, desc_subcat, sigla, id_cat } = data;
  if (!nom_subcat || !sigla || !id_cat) {
    throw new Error("Faltan campos requeridos (nombre, sigla o id_cat)");
  }
  return await Subcategoria.create({ nom_subcat, desc_subcat, sigla, id_cat });
}

export async function updateSubcategoria(id, data){
  const subcategoria = await Subcategoria.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  );
  if (!subcategoria) {
    throw new Error("Subcategoría no encontrada");
  }
  return subcategoria;
}

export async function deleteSubcategoria(id){
  const subcategoria = await Subcategoria.findByIdAndDelete(id);
  if (!subcategoria) {
    throw new Error("Subcategoría no encontrada");
  }
  return subcategoria;
}
