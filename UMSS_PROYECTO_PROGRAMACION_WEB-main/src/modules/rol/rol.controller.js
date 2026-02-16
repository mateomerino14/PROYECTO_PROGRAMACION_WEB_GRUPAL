import * as RolService from './rol.service.js';

export const create = async (req, res) => {
  try {
    const rol = await RolService.createRol(req.body);
    res.status(201).json({
      succeed: true,
      rol
    });
  } catch (error) {
    res.status(500).json({
      message: error.message 
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const roles = await RolService.getRoles();
    res.status(200).json({
      roles,
      total: roles.length
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};
