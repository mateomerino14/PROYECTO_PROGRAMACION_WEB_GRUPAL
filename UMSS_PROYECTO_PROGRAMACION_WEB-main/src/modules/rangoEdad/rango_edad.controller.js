import * as RangoService from "./rango_edad.service.js";

// Obtener todo el rango de edades
export async function getRangosEdad(req,res){
  try{
    const rangos = await RangoService.findAll();
    return res.status(200).json({
      message: "Lista obtenida correctamente",
      status: 200,
      data: rangos
    });
  } 
  catch (error){
    return res.status(500).json({ status: 500, error: error.message });
  }
}

// Crear nuevo rango de edad
export async function createRangoEdad(req,res){
  try {
    const rango = await RangoService.createRango(req.body);
    return res.status(201).json({
      message: "Rango creado correctamente",
      status: 201,
      data: rango
    });
  } 
  catch (error){
    return res.status(400).json({ status: 400, error: error.message });
  }
}

// Obtener rango de edad por ID
export async function getRangoEdadById(req,res){
  try{
    const rango = await RangoService.findById(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "Rango obtenido correctamente",
      data: rango
    });
  } 
  catch (error){
    return res.status(404).json({ status: 404, error: error.message });
  }
}

// Actualizar rango de edad
export async function updateRangoEdad(req,res){
  try {
    const rango = await RangoService.updateRango(req.params.id, req.body);
    return res.status(200).json({
      status: 200,
      message: "Rango actualizado correctamente",
      data: rango
    });
  } 
  catch (error){
    return res.status(400).json({ status: 400, error: error.message });
  }
}

// Eliminar rango de edad
export async function deleteRangoEdad(req,res){
  try {
    await RangoService.deleteRango(req.params.id);
    return res.status(200).json({
      message: "Rango eliminado correctamente",
      status: 200
    });
  } 
  catch (error){
    return res.status(400).json({ status: 400, error: error.message });
  }
}
