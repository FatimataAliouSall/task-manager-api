import Task from '../models/Task.js';
import Joi from 'joi';

// Schéma de validation des tâches avec Joi
const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  completed: Joi.boolean().default(false)
});

// Créer une nouvelle tâche
export const createTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de la tâche', err });
  }
};

// Obtenir toutes les tâches
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches', err });
  }
};

// Mettre à jour une tâche
export const updateTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

    await task.update(req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche', err });
  }
};

// Supprimer une tâche
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

    await task.destroy();
    res.status(200).json({ message: 'Tâche supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', err });
  }
};
