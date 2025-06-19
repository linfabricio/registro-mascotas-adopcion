import mongoose from 'mongoose';

const MascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, enum: ['Perro', 'Gato'], required: true },
  edad: { type: Number, required: true, min: 0 },
  contacto: { type: String, required: true }
});

export default mongoose.model('Mascota', MascotaSchema);