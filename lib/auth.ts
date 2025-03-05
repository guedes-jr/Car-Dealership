export const runtime = "nodejs"; // Garante que o código não rode no Edge Runtime

import { compare, hash } from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";

import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Função para hashear a senha
export async function hashPassword(password: string) {
  return hash(password, 12);
}

// Função para verificar a senha hashada
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

// Criar um JWT para autenticação
export async function createJWT(payload: any) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // Expiração em 7 dias

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(JWT_SECRET));
}

// Verificar e decodificar um JWT
export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload;
  } catch (error) {
    return null;
  }
}

// Buscar usuário a partir do token
export async function getUserFromToken(token: string) {
  const payload = await verifyJWT(token);

  if (!payload || !payload.id) {
    return null;
  }

  try {
    // Buscar o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}
