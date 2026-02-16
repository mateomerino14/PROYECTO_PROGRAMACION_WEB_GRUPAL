import mongoose from 'mongoose';

const { Schema } = mongoose;

const categoriaSchema=new Schema({
  nom_cat: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  desc_cat: {
    type: String,
    trim: true
  },
  sigla: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Categoria', categoriaSchema);
