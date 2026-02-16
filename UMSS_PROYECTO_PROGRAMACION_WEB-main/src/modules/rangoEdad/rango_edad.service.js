import RangoEdad from "../../models/rango_edad.model.js";

export async function findAll(){
  return await RangoEdad.find().sort({edad_inicio:1});
}

export async function findById(id){
  const rango=await RangoEdad.findById(id);
  if (!rango){
    throw new Error("Rango de edad no encontrado");
  }
  return rango;
}

export async function createRango(data){
  const {desc_rango, edad_inicio, edad_fin}=data;
  if (!desc_rango || edad_inicio === undefined || edad_fin === undefined){
    throw new Error("Faltan campos requeridos (desc_rango, edad_inicio, edad_fin)");
  }
  if (edad_inicio>edad_fin){
    throw new Error("edad_inicio no puede ser mayor a edad_fin");
  }
  return await RangoEdad.create({desc_rango,edad_inicio,edad_fin});
}

export async function updateRango(id, data){
  const rango=await RangoEdad.findByIdAndUpdate(
    id,
    data,
    {new:true,runValidators:true}
  );
  if (!rango){
    throw new Error("Rango de edad no encontrado");
  }
  return rango;
}

export async function deleteRango(id){
  const rango=await RangoEdad.findByIdAndDelete(id);
  if(!rango){
    throw new Error("Rango de edad no encontrado");
  }
  return rango;
}
