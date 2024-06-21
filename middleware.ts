import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("auth");
  if (!currentUser || request.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  let data;
  await fetch("http://localhost:3000/api/auth/verify", {
    method: "POST",
    headers: { Authorization: `Bearer ${currentUser.value}` },
  })
    .then((res) => res.json())
    .then((res) => {
      data = res;
    });
  if (data) {
    return;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
