import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let currentUser: any = request.cookies.get("auth");
  if (currentUser)
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account`, {
      method: "GET",
      headers: { "x-access-id": currentUser.value },
    }).then((res) => {
      if (res.status !== 200) {
        currentUser = null;
        request.cookies.delete("auth");
      }
    });

  if (!currentUser && request.nextUrl.pathname !== "/")
    return NextResponse.redirect(new URL("/", request.url));

  if (currentUser && request.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/dashboard", request.url));

  if (request.nextUrl.pathname === "/") return;
  return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
