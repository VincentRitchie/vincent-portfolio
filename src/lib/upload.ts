import { promises as fs } from "fs";
import path from "path";

/**
 * Server-side file upload helper.
 *
 * Saves validated uploads to public/uploads/<subdir>/<timestamp>-<sanitized-name>
 * and returns the public path "/uploads/<subdir>/<file>".
 *
 * Validation:
 *  - MIME type must be in allowedMime[]
 *  - Size must be <= maxBytes
 *
 * NOTE: Local uploads are ephemeral on serverless hosts (Vercel functions have a
 * read-only filesystem except /tmp). For production, swap saveUpload() for
 * Vercel Blob / Cloudinary / S3 — see README-ADMIN.md.
 */

export interface SaveUploadResult {
  /** Public web path, e.g. /uploads/cv/1234567890-resume.pdf */
  publicPath: string;
  /** Absolute filesystem path on disk */
  absolutePath: string;
  filename: string;
  bytes: number;
  type: string;
}

export const IMAGE_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const PDF_MIME = ["application/pdf"];
export const IMAGE_MAX_BYTES = 8 * 1024 * 1024; // 8MB
export const PDF_MAX_BYTES = 8 * 1024 * 1024; // 8MB

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-").toLowerCase();
  return base.slice(0, 80) || "upload";
}

export async function saveUpload(
  file: File,
  allowedMime: string[],
  maxBytes: number,
  subdir: string
): Promise<SaveUploadResult> {
  if (!file) throw new Error("No file provided.");
  if (!allowedMime.includes(file.type)) {
    throw new Error(`File type ${file.type || "unknown"} is not allowed.`);
  }
  if (file.size <= 0) throw new Error("File is empty.");
  if (file.size > maxBytes) {
    throw new Error(`File is too large (max ${Math.round(maxBytes / 1024 / 1024)}MB).`);
  }

  const publicRoot = path.join(process.cwd(), "public");
  const uploadsDir = path.join(publicRoot, "uploads", subdir);
  await fs.mkdir(uploadsDir, { recursive: true });

  const timestamp = Date.now();
  const safe = sanitizeFilename(file.name);
  const filename = `${timestamp}-${safe}`;
  const absolutePath = path.join(uploadsDir, filename);
  const publicPath = `/uploads/${subdir}/${filename}`;

  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(absolutePath, buf);

  return { publicPath, absolutePath, filename, bytes: buf.length, type: file.type };
}

/** Convenience: route `kind` field to validated image or PDF settings. */
export function resolveKind(kind: string): { allowed: string[]; max: number; subdir: string } | null {
  if (kind === "image") {
    return { allowed: IMAGE_MIME, max: IMAGE_MAX_BYTES, subdir: "images" };
  }
  if (kind === "cv") {
    return { allowed: PDF_MIME, max: PDF_MAX_BYTES, subdir: "cv" };
  }
  return null;
}
