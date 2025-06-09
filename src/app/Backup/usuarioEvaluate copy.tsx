// src/utils/loadUsuarioData.tsx
import { UsuarioEvaluate } from '../services/Usuario/UsuarioEvaluate'; // ajusta el path según corresponda

export const usuarioEvaluate = async (
  input: any,
  setLoading: (loading: boolean) => void
): Promise<void> => {
  setLoading(true);
  try {
    let data = await UsuarioEvaluate(input);
    console.dir(data)
  } catch (error) {
    console.dir(error)
    console.error('Error loading data:', error);
  } finally {
    setLoading(false);
  }
};
