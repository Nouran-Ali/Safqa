import { NextResponse } from "next/dist/server/web/spec-extension/response";

export default function middleware(req) {
  const response = NextResponse.next();
  let { url, nextUrl } = req;
  let { origin } = nextUrl;
  let token = req.cookies.get("token");

  // redirect url to login if have not token
  if (!token && url.includes("/dashboard")) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // if have verify token and go to login redirect to dashboard
  if (token && url === `${origin}/login`) {
    return NextResponse.redirect(`${origin}/dashboard`);
  }
}

