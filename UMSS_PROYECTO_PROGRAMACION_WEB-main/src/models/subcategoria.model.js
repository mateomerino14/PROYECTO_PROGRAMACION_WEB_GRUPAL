import mongoose from 'mongoose';

const { Schema } = mongoose;

const subcategoriaSchema = new Schema({
  nom_subcat: {
    type: String,
    required: true,
    trim: true
  },
  desc_subcat: {
    type: String,
    trim: true
  },
  sigla: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  id_cat: {
    type: mongoose.Schema.ObjectId,
    ref: "Categoria",
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Subcategoria', subcategoriaSchema);
