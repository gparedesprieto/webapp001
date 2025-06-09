// app/components/UserForm.tsx
"use client";

import { useState } from "react";
//import Select from 'react-select';


type Usuario = {
  filter_id: string;
  filter_nombres: string;
  filter_apellidos: string;
  filter_fecha: string;
};

type UserFormProps = {
  onFiltro: (filtro : string) => void;
};

export default function UsuarioFilter({ onFiltro }: UserFormProps) {
  const [formData, setFormData] = useState<Usuario>({
    filter_id: "",
    filter_nombres: "",
    filter_apellidos: "",
    filter_fecha: ""
  });

  /*
  useEffect(() => {

    if (usuario) {
      console.dir(usuario)

      setFormData({
        id: usuario.id ?? "",
        nombres: usuario.nombres ?? "",
        apellidos: usuario.apellidos ?? "",
        fecha: usuario.fecha ?? ""
      });
    }
  }, [usuario]);
  */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /*
  const handleEdadChange = (selected: any) => {
    const values = selected ? selected.map((opt: any) => opt.value) : [];
    setFormData((prev) => ({ ...prev, lugar: values }));
  };

  const handleCheckboxChange = (id: string) => {
    setFormData((prev) => {
      const updated = prev.edad.includes(id)
      ? prev.edad.filter((v) => v !== id)
      : [...prev.edad, id];
    return { ...prev, edad: updated };
    });
  };

  const closeForm = () => {
    console.log("closeForm")
    cleanForm();
  };
  */

  const cleanForm = () => {
    setFormData({
          filter_id: "",
          filter_nombres: "",
          filter_apellidos: "",
          filter_fecha: ""
        });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    console.log(JSON.stringify(formData));
    // Aquí puedes hacer la lógica de envío

    try {
      onFiltro(formData);

    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error de red o del servidor");
    }
  };

  return (
      <div className="w-full">

        <h2 className="text-xl font-bold">Filtros</h2>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block font-semibold">Id</label>
            <input
              type="text"
              name="filter_id"
              value={formData.filter_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              //required
            />
          </div>

          <div>
            <label className="block font-semibold">Nombres</label>
            <input
              type="text"
              name="filter_nombres"
              value={formData.filter_nombres}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              //required
            />
          </div>

          <div>
            <label className="block font-semibold">Apellidos</label>
            <input
              type="text"
              name="filter_apellidos"
              value={formData.filter_apellidos}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              //required
            />
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Filtrar
            </button>
            <button
              type="button"
              onClick={() => cleanForm()}
              className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
  
  );
}
