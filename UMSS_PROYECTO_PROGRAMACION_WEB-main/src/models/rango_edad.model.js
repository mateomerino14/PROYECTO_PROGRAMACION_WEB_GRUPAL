import mongoose from 'mongoose';
const {Schema}=mongoose;

const rangoEdadSchema=new Schema({
  desc_rango:{
    type:String,
    required:true,
    trim:true
  },
  edad_inicio:{
    type:Number,
    required:true
  },
  edad_fin:{
    type:Number,
    required:true
  }
},
{
  timestamps:true
});

export default mongoose.model('RangoEdad',rangoEdadSchema,'rango_edad');