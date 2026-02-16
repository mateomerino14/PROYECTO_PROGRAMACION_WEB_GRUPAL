import NivelDificultad from "../../models/nivel_dificultad.model.js";

export async function findAll(){
  return await NivelDificultad.find().sort({nom_nivel:1});
}

export async function findById(id){
  const nivel=await NivelDificultad.findById(id);
  if (!nivel){
    throw new Error("Nivel de dificultad no encontrado");
  }
  return nivel;
}

export async function createNivel(data){
  const {nom_nivel, desc_nivel}=data;
  if (!nom_nivel){
    throw new Error("El nombre del nivel es requerido");
  }

  return await NivelDificultad.create({nom_nivel,desc_nivel});
}

export async function updateNivel(id,data){
  const nivel=await NivelDificultad.findByIdAndUpdate(
    id,
    data,
    {new:true,runValidators:true}
  );
  if(!nivel){
    throw new Error("Nivel de dificultad no encontrado");
  }
  return nivel;
}

export async function deleteNivel(id){
  const nivel=await NivelDificultad.findByIdAndDelete(id);
  if(!nivel){
    throw new Error("Nivel de dificultad no encontrado");
  }
  return nivel;
}
