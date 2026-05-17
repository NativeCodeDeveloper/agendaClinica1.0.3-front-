import { NextResponse, type NextRequest } from 'next/server'

// ─── MODO DESARROLLO ─────────────────────────────────────────────────────────
// Middleware sin autenticación — deja pasar todo para trabajar en el dashboard.
// Para activar la protección real con Clerk, reemplaza este bloque por el que
// está comentado abajo.
export default function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

/*
─── MIDDLEWARE REAL (Clerk + roles) ─────────────────────────────────────────
Descomentar cuando se quiera activar la autenticación en producción.
Requiere que las variables de entorno de Clerk estén configuradas.

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isDashboard = createRouteMatcher(['/dashboard(.*)'])

const isRecepcionistaAllowed = createRouteMatcher([
  '/dashboard',
  '/dashboard/no-access',
  '/dashboard/calendarioGeneral',
  '/dashboard/calendario',
  '/dashboard/agendaCitas',
  '/dashboard/bloqueosAgenda',
  '/dashboard/AgendaDetalle/(.*)',
  '/dashboard/GestionPaciente',
  '/dashboard/paciente/(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  if (!isDashboard(req)) return NextResponse.next()

  const { userId, sessionClaims } = await auth()

  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role

  if (role === 'recepcionista' && !isRecepcionistaAllowed(req)) {
    return NextResponse.redirect(new URL('/dashboard/no-access', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*'],
}
─────────────────────────────────────────────────────────────────────────────
*/
