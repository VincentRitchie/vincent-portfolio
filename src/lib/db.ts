import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * NOTE: After running `prisma generate` to add new models, the dev server may
 * hold an outdated PrismaClient class in its module cache. If the existing
 * global client is missing any required models, we discard it and build a
 * fresh one. A full dev-server restart is the cleanest fix; this defensive
 * check covers the common HMR case.
 */
const REQUIRED_MODELS = [
  'siteSetting', 'companyInfo', 'project', 'article',
  'certification', 'skill', 'testimonial', 'achievement',
  'mediaAsset', 'contactMessage',
] as const

function hasAllModels(client: PrismaClient): boolean {
  return REQUIRED_MODELS.every(
    (n) => typeof (client as unknown as Record<string, unknown>)[n] !== 'undefined'
  )
}

function makeClient(): PrismaClient {
  // Only log full queries in development — in production this would leak
  // submitted data (e.g. contact-form PII) into server logs.
  return new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['warn', 'error'] : ['query'],
  })
}

let db: PrismaClient
if (globalForPrisma.prisma && hasAllModels(globalForPrisma.prisma)) {
  db = globalForPrisma.prisma
} else {
  if (globalForPrisma.prisma) {
    void globalForPrisma.prisma.$disconnect().catch(() => {})
  }
  db = makeClient()
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
}

export { db }
