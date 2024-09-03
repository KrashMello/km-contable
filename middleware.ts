import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const currentUser: any = request;
  console.log(currentUser);
  if (!currentUser && request.nextUrl.pathname !== "/")
    return NextResponse.redirect(new URL("/", request.url));

  if (currentUser && request.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (request.nextUrl.pathname === "/") return;

  let data;
  await fetch("http://localhost:5000/account", {
    method: "GET",
    headers: { "x-access-id": currentUser.value },
  }).then((res) => {
    if (res.status !== 200) data = null;
    else data = true;
    res.json();
  });
  if (data) return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
