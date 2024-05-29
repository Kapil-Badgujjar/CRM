import { NextResponse } from "next/server";
import { serialize } from "cookie";

export const GET = async () => {
    const cookie = serialize("token", "", {
      maxAge: -1, // Expire the cookie immediately
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return new NextResponse(JSON.stringify({ message: "Logged Out" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
      },
    });
};
