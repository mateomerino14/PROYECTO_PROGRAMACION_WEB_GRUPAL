import mongoose from 'mongoose';
const {Schema}=mongoose;

const nivelDificultadSchema=new Schema({
  nom_nivel:{
    type:String,
    required:true,
    trim:true
  },
  desc_nivel:{
    type:String,
    trim:true
  }
},
{
  timestamps:true
});

export default mongoose.model('NivelDificultad', nivelDificultadSchema,'nivel_dificultad');
