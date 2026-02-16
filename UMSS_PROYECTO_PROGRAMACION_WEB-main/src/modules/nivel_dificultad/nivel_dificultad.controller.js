import * as NivelService from "./nivel_dificultad.service.js";

// Devolver todos los niveles de dificultad
export async function getNivelesDificultad(req,res){
  try{
    const niveles=await NivelService.findAll();
    return res.status(200).json({
      message:"Lista obtenida correctamente",
      status:200,
      data:niveles
    });
  } 
  catch (error){
    return res.status(500).json({status: 500,error: error.message});
  }
}

// Crear nuevo nivel de dificultad
export async function createNivelDificultad(req,res){
  try{
    const nivel=await NivelService.createNivel(req.body);
    return res.status(201).json({
      message:"Nivel creado correctamente",
      status:201,
      data:nivel
    });
  } 
  catch (error){
    return res.status(400).json({status:400,error:error.message});
  }
}

// Obtener nivel de dificultad por ID
export async function getNivelDificultadById(req,res){
  try{
    const nivel=await NivelService.findById(req.params.id);
    return res.status(200).json({
      message:"Nivel obtenido correctamente",
      status:200,
      data:nivel
    });
  } 
  catch (error){
    return res.status(404).json({status: 404,error: error.message});
  }
}

// Actualizar nivel de dificultad
export async function updateNivelDificultad(req,res){
  try {
    const nivel=await NivelService.updateNivel(req.params.id,req.body);
    return res.status(200).json({
      message:"Nivel actualizado correctamente",
      status:200,
      data:nivel
    });
  } 
  catch (error){
    return res.status(400).json({status: 400,error:error.message });
  }
}

// Eliminar nivel de dificultad
export async function deleteNivelDificultad(req,res){
  try{
    await NivelService.deleteNivel(req.params.id);
    return res.status(200).json({
      message: "Nivel eliminado correctamente",
      status: 200
    });
  } 
  catch (error){
    return res.status(400).json({status: 400,error:error.message});
  }
}
