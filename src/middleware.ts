import { NextResponse, NextRequest } from "next/server";
// import { cookies } from 'next/headers'
import { jwtVerify } from "jose";

type TokenPayload = {
  id: string;
  userId: string;
  role: string;
  exp: number;
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  if (pathname.includes("auth")) return NextResponse.next();

  if (!token && pathname === "/") return NextResponse.next();

  if (!token && pathname.includes("api"))
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });

  if (!token) return NextResponse.redirect(new URL("/", request.url));

  try {
    const tokenValidity = await jwtVerify<TokenPayload>(
      token as string,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    );

    if (tokenValidity.payload.exp < Math.floor(Date.now() / 1000)) {
      console.log("Token is expired!");
      // Handle expired token (e.g., redirect to login)
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("JWT error:", error);
      // Handle other JWT errors (e.g., invalid signature)
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      console.error("Unexpected error:", error);
      // Handle unexpected errors
      return new NextResponse(
        JSON.stringify({ message: "Internal Server Error" }),
        {
          status: 500,
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
