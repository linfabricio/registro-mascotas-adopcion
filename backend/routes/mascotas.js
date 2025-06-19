import express from 'express';
import Mascota from '../models/Mascota.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const mascotas = await Mascota.find();
  res.json(mascotas);
});

router.post('/', async (req, res) => {
  const { nombre, tipo, edad, contacto } = req.body;
  if (!nombre || !tipo || edad < 0 || !contacto)
    return res.status(400).json({ error: 'Campos inválidos' });

  const existe = await Mascota.findOne({ nombre });
  if (existe) return res.status(400).json({ error: 'Mascota ya registrada' });

  const nueva = new Mascota({ nombre, tipo, edad, contacto });
  await nueva.save();
  res.json(nueva);
});

router.put('/:id', async (req, res) => {
  const mascota = await Mascota.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(mascota);
});

router.delete('/:id', async (req, res) => {
  await Mascota.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Eliminada' });
});

export default router;