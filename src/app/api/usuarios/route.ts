// app/api/usuarios/route.ts
import { NextResponse } from "next/server";

type Usuario = {
  nombres: string;
  apellidos: string;
  email: string;
  sexo: string;
  edadOpciones: string[];
  rol: string;
  comentarios: string;
};

// Base de datos en memoria (se borra al reiniciar)
let usuarios: Usuario[] = [];

export async function GET() {
  return NextResponse.json(usuarios);
}

export async function POST(req: Request) {
  try 
  {
    const data: Usuario = await req.json();

    // Validación básica
    if (!data.nombres || !data.apellidos || !data.email) {
      return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
    }

    usuarios.push(data);

    return NextResponse.json({ mensaje: "Usuario registrado", data });
  } catch (error) {
    return NextResponse.json({ error: "Error procesando la solicitud" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const data: Usuario = await req.json();
  usuarios = usuarios.map(u => u.email === data.email ? data : u);
  return NextResponse.json({ mensaje: "Usuario actualizado", data });
}

export async function DELETE(req: Request) {
  const { email } = await req.json();
  usuarios = usuarios.filter(u => u.email !== email);
  return NextResponse.json({ mensaje: "Usuario eliminado" });
}
