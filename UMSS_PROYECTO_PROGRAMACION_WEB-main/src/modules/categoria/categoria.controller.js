import * as CategoriaService from './categoria.service.js';

export async function getAllCategorias(req, res) {
  try {
    const categorias = await CategoriaService.findAll();
    return res.status(200).json({
      success: true,
      data: categorias,
      total: categorias.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || error
    });
  }
}

export async function getCategoriaById(req, res) {
  try {
    const { id } = req.params;
    const categoria = await CategoriaService.findById(id);
    return res.status(200).json({
      success: true,
      data: categoria
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    });
  }
}

export async function createCategoria(req, res) {
  try {
    const data = req.body;
    const categoria = await CategoriaService.createCategoria(data);
    return res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      data: categoria
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    });
  }
}

export async function updateCategoria(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const categoria = await CategoriaService.updateCategoria(id, data);
    return res.status(200).json({
      success: true,
      message: 'Categoría actualizada exitosamente',
      data: categoria
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    });
  }
}

export async function deleteCategoria(req, res) {
  try {
    const { id } = req.params;
    const categoria = await CategoriaService.deleteCategoria(id);
    return res.status(200).json({
      success: true,
      message: 'Categoría eliminada exitosamente',
      data: categoria
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    });
  }
}
