// Access to the /partners pitch.
//
// The pitch ships encrypted (lib/partners/pages.generated.ts). The access
// code is the key: a code that decrypts it is a valid code, and nothing else
// is stored anywhere. The code a partner enters is kept in an httpOnly cookie
// scoped to /partners, so each visit decrypts on the server and the browser
// only ever receives the pitch after a correct code.

import { createDecipheriv, scrypt } from "node:crypto";
import { PITCH } from "./pages.generated";

export const COOKIE = "mona_partners";

export function normalizeCode(raw: unknown): string {
  return typeof raw === "string" ? raw.trim().toUpperCase().slice(0, 64) : "";
}

function deriveKey(code: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(code, salt, 32, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }, (err, key) =>
      err ? reject(err) : resolve(key),
    ),
  );
}

// Decrypting costs a deliberate ~0.1s of scrypt, so the page is kept in
// memory for the one code that opened it.
let cache: { code: string; html: string } | null = null;

/** The pitch HTML when `code` is right, otherwise null. */
export async function openPitch(code: string): Promise<string | null> {
  if (code.length < 12) return null;
  if (cache && cache.code === code) return cache.html;
  try {
    const key = await deriveKey(code, Buffer.from(PITCH.salt, "base64"));
    const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(PITCH.iv, "base64"));
    decipher.setAuthTag(Buffer.from(PITCH.tag, "base64"));
    const html = Buffer.concat([
      decipher.update(Buffer.from(PITCH.data, "base64")),
      decipher.final(),
    ]).toString("utf8");
    cache = { code, html };
    return html;
  } catch {
    return null;
  }
}
