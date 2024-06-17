import type { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("auth");
  console.log(currentUser.value);
  if (currentUser)
    jwt.verify(`${currentUser.value}`, "asdf", (err, decode) => {
      console.log(err, decode);
    });
  return;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
