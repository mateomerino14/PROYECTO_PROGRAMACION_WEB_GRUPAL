import mongoose from 'mongoose';

const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
  },
  correo: {
    type: String,
    required: true,
    unique: true, // para el login (no pueden haber correos iguales)
  },
  handle_name: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false // no lo devuelve en la consulta
  },
  activo: {
    type: Boolean,
    default: true
  },
  id_rol: {
    type: Schema.Types.ObjectId,
    ref: 'Rol',
    required: true
  }
}, {
  timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
