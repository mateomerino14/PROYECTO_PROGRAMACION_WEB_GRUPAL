import * as SubcategoriaService from './subcategoria.service.js';

export async function getAllSubcategorias(req,res){
  try {
    const subcategorias = await SubcategoriaService.findAll();
    return res.status(200).json({
      success:true,
      data:subcategorias,
      total:subcategorias.length
    });
  } catch (error){
    return res.status(500).json({
      success:false,
      error:error.message || error
    });
  }
}

export async function getSubcategoriaById(req,res){
  try {
    const {id}=req.params;
    const subcategoria=await SubcategoriaService.findById(id);
    return res.status(200).json({
      success:true,
      data:subcategoria
    });
  } 
  catch (error){
    return res.status(500).json({
      success:false,
      error:error.message || error
    });
  }
}

export async function createSubcategoria(req,res){
  try {
    const data=req.body;
    const subcategoria=await SubcategoriaService.createSubcategoria(data);
    return res.status(201).json({
      success:true,
      message:'Subcategoría creada exitosamente',
      data:subcategoria
    });
  } 
  catch (error){
    return res.status(500).json({
      success:false,
      error:error.message || error
    });
  }
}

export async function updateSubcategoria(req,res){
  try {
    const {id}=req.params;
    const data=req.body;
    const subcategoria = await SubcategoriaService.updateSubcategoria(id,data);
    return res.status(200).json({
      success:true,
      message:'Subcategoría actualizada exitosamente',
      data:subcategoria
    });
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || error
    });
  }
}

export async function deleteSubcategoria(req,res){
  try {
    const { id }=req.params;
    const subcategoria=await SubcategoriaService.deleteSubcategoria(id);
    return res.status(200).json({
      success:true,
      message:'Subcategoría eliminada exitosamente',
      data:subcategoria
    });
  } 
  catch (error){
    return res.status(500).json({
      success:false,
      error:error.message || error
    });
  }
}
