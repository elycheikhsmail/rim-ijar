import { NextResponse } from "next/server";
import type { NextRequest } from "next/server"; 

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/my")) {
    const cookies = request.cookies;

    if (cookies.size === 0) {
      // Les cookies sont vides
      console.log("Aucun cookie trouvé");
      url.pathname = "/p/users/connexion";
    } else {
      const sessionId = cookies.get("sessionId");
      if (sessionId == undefined) {
        url.pathname = "/p/users/connexion";
      }  
    }
    /*
    redict only if url.pathname == "/p/users/connexion" 
    to avoid infinit redirection 
    */
    if (url.pathname == "/p/users/connexion") {
      console.log("redirect to /p/users/connexion from the mddlwear");
      return NextResponse.redirect(url);
    } else {
      // if 
      console.log("not redirect from the mddlwear");
    }
  }
}

export const config = {
  matcher: "/my/:path*",
};
