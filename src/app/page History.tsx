"use client";

import { useState } from "react";

import Image from "next/image";
//import Counter from "./ui/counter";
//import Page from "./ui/search";
import UsuarioFilter from "./ui/Usuario/UsuarioFilter";
import UsuarioForm from "./ui/Usuario/UsuarioForm";
import UsuarioList from "./ui/Usuario/UsuarioList";
//import Modal from './components/Modal';

export default function Home() {

  const [recargar, setRecargar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtrar, setFiltrar] = useState(null);
  //let handleFiltroX = "inicio";

  const handleFiltro = (filtro: string) => {
    // Alterna el valor de recargar para que el efecto de UsuariosList se dispare
    console.log("handleFiltro")
    console.log( filtro );
    setFiltrar( filtro => filtro);
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

        {/*

        <Modal isOpen={mostrarModal} onClose={() => setMostrarModal(false)}>
      </Modal>
      

        <h2 className="text-lg font-bold mb-4">¡Hola desde el modal!</h2>
        <p className="mb-4">Este es un ejemplo básico de modal en Next.js.</p>
        <button
          onClick={() => setMostrarModal(false)}
          className="bg-gray-800 text-white px-3 py-1 rounded"
        >
          Cerrar
        </button>
          */
        }
      

      <main className="w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        {/*
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <Counter />
        <Page />

        <h1 className="text-2xl font-bold text-center">...</h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Nuevo
        </button>


        Gestión de Usuarios
        */}
        
        
        <UsuarioFilter onFiltro={handleFiltro} usuario={usuarioSeleccionado} />
        
        <div>{filtrar}</div>

        <UsuarioList triggerReload={recargar} onSeleccionUsuario={handleSeleccionUsuario} valueFiltro={filtrar} />
        <UsuarioForm isOpen={mostrarModal} onUsuarioCreado={handleUsuarioCreado} usuario={usuarioSeleccionado} />

        {
          /*

          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
        */

        }

        
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
