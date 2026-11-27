import type { NextRequest } from "next/server";
import { COOKIE, normalizeCode, openPitch } from "@/lib/partners/access";
import { LOGIN_HTML } from "@/lib/partners/pages.generated";

// mona.fitness/partners — the private investor & partner pitch. A page of
// its own (no site nav or footer), not linked from the site and kept out of
// search engines. GET shows the pitch to a visitor with a valid access code
// cookie and the sign-in screen to everyone else; POST signs in or out.

const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

function loginPage(error: boolean, status = 200) {
  const html = LOGIN_HTML.replace("{{SHAKE}}", error ? " shake" : "")
    .replace("{{INVALID}}", error ? ' aria-invalid="true" aria-describedby="err"' : "")
    .replace("{{ERROR}}", error ? "That code isn't right. Check it and try again." : "");
  return new Response(html, { status, headers: HEADERS });
}

function redirect(to: string, cookie?: string) {
  const headers = new Headers({ Location: to, "Cache-Control": "no-store" });
  if (cookie) headers.append("Set-Cookie", cookie);
  return new Response(null, { status: 303, headers });
}

const cookieAttrs = "Path=/partners; HttpOnly; Secure; SameSite=Lax";

export async function GET(request: NextRequest) {
  const code = normalizeCode(request.cookies.get(COOKIE)?.value);
  const pitch = code ? await openPitch(code) : null;
  if (pitch) return new Response(pitch, { headers: HEADERS });
  return loginPage(request.nextUrl.searchParams.get("e") === "1");
}

export async function POST(request: NextRequest) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect("/partners");
  }
  if (form.get("action") === "signout") {
    return redirect("/partners", `${COOKIE}=; ${cookieAttrs}; Max-Age=0`);
  }
  const code = normalizeCode(form.get("code"));
  if (code && (await openPitch(code))) {
    // 30 days, then the partner enters the code again.
    return redirect("/partners", `${COOKIE}=${encodeURIComponent(code)}; ${cookieAttrs}; Max-Age=2592000`);
  }
  // A wrong code waits a moment before answering, to slow down guessing.
  await new Promise((r) => setTimeout(r, 600));
  return redirect("/partners?e=1");
}
