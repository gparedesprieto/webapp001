// app/components/UsuarioForm.tsx

// + "_descripcion": para Autocomplete
"use client";

import { useEffect, useState } from "react";
import Modal from '../../components/Modal';
import Select from 'react-select';
//import Autocomplete from '../components/Autocomplete';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { guardarUsuario } from '../../promises/Usuario/usuarioEvaluate';

const opcionesLugar = [
  { value: 'L', label: 'Lima' },
  { value: 'I', label: 'Ica' },
  { value: 'A', label: 'Arequipa' },
  { value: 'P', label: 'Piura' },
];

type Usuario = {
  metodo: string;
  id: string;
  ciudad: string,
  ciudad_descripcion: string,
  nombres: string;
  apellidos: string;
  email: string;
  sexo: string;
  fecha: string;
  hora: string;
  lugar: string;
  _lugar: string[];
  edad: string;
  _edad: string[];
  rol: string;
  comentario: string;
};

type UserFormProps = {
  isOpen: boolean,
  onUsuarioCreado: (opcion : string) => void;
  usuario: Usuario | null;
};

export default function UsuarioForm({ isOpen, onUsuarioCreado, usuario }: UserFormProps) {
  const [formData, setFormData] = useState<Usuario>({
    metodo: "POST",
    id: "",
    ciudad: "",
    ciudad_descripcion: "",
    nombres: "",
    apellidos: "",
    email: "",
    sexo: "",
    fecha: "",
    hora: "",
    lugar: "",
    _lugar: [] as string[],
    edad: "",
    _edad: [] as string[],
    rol: "",
    comentario: "",
  });

  //const cities = ["Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao"];
  const cities = [
    { value: 'L', label: 'Lima' },
    { value: 'I', label: 'Ica' },
    { value: 'A', label: 'Arequipa' },
    { value: 'P', label: 'Piura' },
] ;

  useEffect(() => {

    if (usuario) {
      console.dir(usuario)

      setFormData({
        metodo: usuario.metodo ?? "PUT",
        id: usuario.id ?? "",
        ciudad: usuario.ciudad ?? "",
        ciudad_descripcion: usuario.ciudad_descripcion ?? "",
        nombres: usuario.nombres ?? "",
        apellidos: usuario.apellidos ?? "",
        email: usuario.email ?? "",
        sexo: usuario.sexo ?? "",
        fecha: usuario.fecha ?? "",
        hora: usuario.hora ?? "",
        lugar: usuario.lugar ?  usuario.lugar?.length == 0 ? "": usuario.lugar.split(",") : "",
        _lugar: usuario.lugar ?? [],
        edad: usuario.edad ? usuario.edad?.length == 0 ? "": usuario.edad.split(","): "",
        _edad: usuario.edad && usuario.edad.length == 0 ? [] : usuario.edad ?? [],
        rol: usuario.rol ?? "",
        comentario: usuario.comentario ?? "",
      });
    }
  }, [usuario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleAutocompleteChange = (event: React.SyntheticEvent, selected: { value: string; label: string } | null, name: string) => {
    const nameFull = (event.target as HTMLInputElement).id;
    //const name = nameFull.split("-option-")[0];

    const value = (event.target as HTMLInputElement).value;
    console.dir(nameFull)
    console.dir(name)
    console.dir(selected)
    console.log("Valor actual =>" + value + " =>" + selected?.value + "|" + selected?.label);
    if (selected)
      setFormData({ ...formData, [name]: selected?.value, [name + "_descripcion"]: selected?.label });
    else {
      console.log("no hay valor")
      setFormData({ ...formData, [name]: "", [name + "_descripcion"]: "" });
    }
  };
  
  const closeForm = () => {
    console.log("closeForm")
    cleanForm();
    onUsuarioCreado("0");
  };

  const cleanForm = () => {
    setFormData({
          metodo: "POST",
          id: "",
          ciudad: "",
          ciudad_descripcion: "",
          nombres: "",
          apellidos: "",
          email: "",
          sexo: "",
          fecha: "",
          hora: "",
          lugar: "",
          _lugar: [],
          edad: "",
          _edad: [],
          rol: "",
          comentario: "",
        });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    console.log(JSON.stringify(formData));

    try {
      const input = {
        payload: null
      };

      const json = JSON.parse(JSON.stringify(formData));

      console.dir(json);

      json.codigo = Number(json.id);
      let _lugar = json.lugar;
      let _edad = json.edad;
      //delete json.metodo;
      delete json.id;
      delete json.ciudad_descripcion;
      delete json._edad;
      delete json.edad;
      delete json._lugar;
      delete json.lugar;
      json.usuarioAudit = "Adminx123";
      json.lugar = _lugar? _lugar?.length== 0? "": _lugar.join(","): "";
      json.edad = _edad? _edad?.length== 0? "": _edad.join(","): "";
      input.payload = json;

      //console.log( JSON.stringify(input) )

      const response = await guardarUsuario(formData.metodo, input);

      //console.log( response.ok )

      if (response.ok) {
        onUsuarioCreado("1");
        
        //const data = await response.json();
        //console.log("Usuario registrado:", data);
        //alert("Formulario enviado correctamente");

        // Limpiar formulario
        cleanForm();
      } else {
        console.dir(response)
        const error = await response.text();
        console.error("Error al enviar formulario:", error);
        alert("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error de red o del servidor");
    }
  };

  const selectedCity = cities.find(city => city.value === formData.ciudad) || null;

  return (
    <Modal isOpen={isOpen} onClose={() => closeForm()} >
      <div className="bg-white rounded shadow-lg w-full max-w-md relative overflow-hidden">
        {/* Cabecera con fondo azul 
        
        <div className="bg-blue-600 text-white p-4">
          
        </div>
        
        */}
        
        <h2 className="text-xl font-bold">Datos</h2>

        {/* Contenido del formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="hidden"
            name="metodo"
            value={formData.metodo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          {  /*
          <Autocomplete suggestions={cities} onSelect={handleSelect} />
            */}

          <Autocomplete
            id="ciudad"
            options={cities}
            renderInput={(params) => <TextField {...params} label="Ciudad" />}
            //value={{ value: formData.ciudad, label: formData._ciudad }}
            value={selectedCity}
            onChange={(e, value) => handleAutocompleteChange(e, value, "ciudad")}
            renderOption={(props, option) => {
              const isSelected = option.value === formData.ciudad;
              return (
                <li
                  {...props}
                  style={{
                    backgroundColor: isSelected ? '#e3f2fd' : 'white',
                    fontWeight: isSelected ? 'bold' : 'normal',
                  }}
                >
                  {option.label}
                </li>
              );
            }}
          />
          
          <div>
            <label className="block font-semibold">Id</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Nombres</label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              //required
            />
          </div>

          <div>
            <label className="block font-semibold">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              //required
            />
          </div>

          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              //required
            />
          </div>

          <div>
            <label className="block font-semibold">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              //required
            />
          </div>

          <div>
            <label className="block font-semibold">Hora</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              //required
            />
          </div>

          <div>
            {/* Campo edad con burbujas tipo select2 */}
            <label className="block font-semibold">Lugares:</label>
            <Select
              isMulti
              name="lugares"
              options={opcionesLugar}
              className="basic-multi-select"
              classNamePrefix="select12"
              placeholder="Lugar1, Lugar2, ..."
              value={opcionesLugar.filter(opt => formData.lugar.includes(opt.value))}
              onChange={handleEdadChange}
            />
          </div>

          <div>
            <label className="block font-semibold">Sexo</label>
            <div className="flex space-x-4 mt-1">
              <label>
                <input
                  type="radio"
                  name="sexo"
                  value="M"
                  checked={formData.sexo === "M"}
                  onChange={handleChange}
                />{" "}
                Masculino
              </label>
              <label>
                <input
                  type="radio"
                  name="sexo"
                  value="F"
                  checked={formData.sexo === "F"}
                  onChange={handleChange}
                />{" "}
                Femenino
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold">Edad</label>
            <div className="flex flex-col space-y-1 mt-1">
              {[ { id: "menor18", opcion: "Menor de 18 años" },
                { id: "mayor", opcion: "Mayor de 18 años" },
                { id: "mayor60", opcion: "Mayor de 60 años" },
                { id: "menor", opcion: "Menor de edad" }].map(({ id, opcion })  => (
                <label key={opcion} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={id}
                    checked={formData.edad.includes(id)}
                    onChange={() => handleCheckboxChange(id)}
                  />
                  <span>{opcion}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold">Rol</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              //required
            >
              <option value="">Seleccione un rol</option>
              <option value="administrador">Administrador</option>
              <option value="supervisor">Supervisor</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Comentario</label>
            <textarea
              name="comentario"
              value={formData.comentario}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={4}
            ></textarea>
          </div>

          <div className="flex space-x-2 pt-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => closeForm()}
              className="bg-white text-gray-800 px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  
  );
}
