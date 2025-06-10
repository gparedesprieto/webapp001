"use client";

import { useState } from "react";

import Image from "next/image";
//import Counter from "./ui/counter";
//import Page from "./ui/search";
import UsuarioFilter from "./ui/Usuario/UsuarioFilter";
import UsuarioForm from "./ui/Usuario/UsuarioForm";
import UsuarioList from "./ui/Usuario/UsuarioList";
import UsuarioDataList from "./ui/Usuario/UsuarioDataList";

export default function Home() {

  const [recargar, setRecargar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtrar, setFiltrar] = useState<string | null>(null);
  //let handleFiltroX = "inicio";

  const handleFiltro = (filtro: string) => {
    // Alterna el valor de recargar para que el efecto de UsuariosList se dispare
    console.log("handleFiltro")
    console.log( filtro );
    setFiltrar(JSON.stringify(filtro));
    console.log( filtrar );
    setRecargar(prev => !prev);
  };

  const handleUsuarioCreado = (opcion: string) => {
    // Alterna el valor de recargar para que el efecto de UsuariosList se dispare
    setRecargar(prev => !prev);
    setMostrarModal(false); // Se cierra el modal
    if (opcion === "1")
      alert("Formulario enviado correctamente.");
  };

  const handleSeleccionUsuario = (usuario: any) => {
    setUsuarioSeleccionado(usuario); // ← recibe usuario desde UsuariosList
    setMostrarModal(true); // Se muestra el modal
  };

  return (
    <div className="w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

        
      <main className="w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        
        <UsuarioFilter onFiltro={handleFiltro} />
        <UsuarioForm isOpen={mostrarModal} onUsuarioCreado={handleUsuarioCreado} usuario={usuarioSeleccionado} />
        <UsuarioList triggerReload={recargar} onSeleccionUsuario={handleSeleccionUsuario} valueFiltro={filtrar} />
        <UsuarioDataList triggerReload={recargar} onSeleccionUsuario={handleSeleccionUsuario} valueFiltro={filtrar}  />
        
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
