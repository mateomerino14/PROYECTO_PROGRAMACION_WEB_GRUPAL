import mongoose from 'mongoose';

const { Schema } = mongoose;

const rolSchema = new Schema({
  nombre_rol: {
    type: String,
    required: true,
    unique: true
  },
  desc_rol: {
    type: String,
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Rol = mongoose.model('Rol', rolSchema);

export default Rol;
