import Log from '../models/Log';

export const logEvent = async (event: string, data: object) => {
  try {
    await Log.create({ event, data });
  } catch (error) {
    console.error('Error guardando log en MongoDB', error);
  }
};