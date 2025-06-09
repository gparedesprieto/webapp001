// app/components/UserForm.tsx
"use client";

import { useEffect, useState } from "react";
import Modal from './../components/Modal';
import Select from 'react-select';

const opcionesLugar = [
  { value: 'L', label: 'Lima' },
  { value: 'I', label: 'Ica' },
  { value: 'A', label: 'Arequipa' },
  { value: 'P', label: 'Piura' },
];

type Usuario = {
  metodo: string;
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  sexo: string;
  fecha: string;
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

export default function UserForm({ isOpen, onUsuarioCreado, usuario }: UserFormProps) {
  const [formData, setFormData] = useState<Usuario>({
    metodo: "POST",
    id: "",
    nombres: "",
    apellidos: "",
    email: "",
    sexo: "",
    fecha: "",
    lugar: "",
    _lugar: [] as string[],
    edad: "",
    _edad: [] as string[],
    rol: "",
    comentario: "",
  });

  useEffect(() => {

    if (usuario) {
      console.dir(usuario)

      setFormData({
        metodo: "PUT",
        id: usuario.id ?? "",
        nombres: usuario.nombres ?? "",
        apellidos: usuario.apellidos ?? "",
        email: usuario.email ?? "",
        sexo: usuario.sexo ?? "",
        fecha: usuario.fecha ?? "",
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

  const closeForm = () => {
    console.log("closeForm")
    cleanForm();
    onUsuarioCreado("0");
  };

  const cleanForm = () => {
    setFormData({
          metodo: "POST",
          id: "",
          nombres: "",
          apellidos: "",
          email: "",
          sexo: "",
          fecha: "",
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
    // Aquí puedes hacer la lógica de envío

    try {
      //
      /*
      const response = await fetch("/api/usuarios", {
        method: formData.metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      */
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
      delete json._edad;
      delete json.edad;
      delete json._lugar;
      delete json.lugar;
      json.usuarioAudit = "Adminx123";
      json.lugar = _lugar? _lugar?.length== 0? "": _lugar.join(","): "";
      json.edad = _edad? _edad?.length== 0? "": _edad.join(","): "";
      input.payload = json;

      console.log( JSON.stringify(input) )

      const token = "eyJ4NXQiOiJNV1V4WW1Oa1pXSXdZVFEyTkRjeU1UVXdZelUxTlRReVlUbGpZekF5WmpNNU5EZ3haVFZrWkRGbE5tVmhORGt6WXpneVlqQXlNMk5pWlRBellqUTBZdyIsImtpZCI6Ik1XVXhZbU5rWldJd1lUUTJORGN5TVRVd1l6VTFOVFF5WVRsall6QXlaak01TkRneFpUVmtaREZsTm1WaE5Ea3pZemd5WWpBeU0yTmlaVEF6WWpRMFl3X1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIxYWIwYjY2YS1kNDkzLTRmNGItYmQwNS0xZTk5MGUzYzI4NjkiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJuYmYiOjE3NDgwMzg2MDEsImF6cCI6InBSV1YydEhhbkliRkYxQ3VHUk9POEx5TU5WOGEiLCJzY29wZSI6ImRlZmF1bHQiLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo5NDQzL29hdXRoMi90b2tlbiIsImV4cCI6MTc0ODA0MjIwMSwiaWF0IjoxNzQ4MDM4NjAxLCJqdGkiOiJlZTI4MjQ2ZS02ZTI4LTQxMWUtYjQ2YS1iZDQ1MWFkMWY4MDUiLCJjbGllbnRfaWQiOiJwUldWMnRIYW5JYkZGMUN1R1JPTzhMeU1OVjhhIn0.cGZWOfG608M-N2EwpGk63SeCOcgadqpMwgOvyp7IbFtOpsErN6rhogFb1iIQAJfoVGVWIsl5Q3KjpedV6R4JgoZ-2nN6RkebdmS4Zgyz_zeHQ_LLxpePHDfwyYRUm8cokDMgBE3T0DIHhK8ya_fe8EkH8zsaFNYsl69aOLOG90oWgLq7kFxQYVi_IC8i3Re7z96QfYWnSmmGnSEaA1Ss1TmtxANuIE3WmvnATZSTdtaxbGqFPs2Daso5qLrgcWvxx4Y-4tz2Skypr4XCeG6UMuW0KcbbBlMIRq_LpWYamCxVZge4XmsYgUFQszFUYAuoSlmgAyQMKaYp7xbW1NjHqw";

      const response = await fetch("https://localhost:8243/seguridad/v1/GuardarUsuario", {
        method: formData.metodo,
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(input)
      });

      console.log( response.ok )

      if (response.ok) {
        onUsuarioCreado("1");
        
        //const data = await response.json();
        //console.log("Usuario registrado:", data);
        //alert("Formulario enviado correctamente");

        // Limpiar formulario
        cleanForm();
      } else {
        const error = await response.text();
        console.error("Error al enviar formulario:", error);
        alert("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error de red o del servidor");
    }
  };

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
            type="text"
            name="metodo"
            value={formData.metodo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
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

          {/*
          <div>
            <label className="block font-semibold">Hora</label>
            <input
              type="time"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Mes</label>
            <input
              type="month"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Semana</label>
            <input
              type="week"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Color</label>
            <input
              type="color"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Boton imagen</label>
            <input
              type="image"
              name="btnImagen"
              src="/globe.svg"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 w-12 h-12"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Adjunto</label>
            <input
              type="file"
              name="fecha"
              //value="/aaa.jpg"
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          */}

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
