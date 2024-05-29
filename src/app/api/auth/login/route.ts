import { getSalesTeamByUserId } from "@/lib/sales-team";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const Admin_Id = process.env.ADMIN_ID;
const Admin_Password = process.env.ADMIN_PASSWORD;

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  try {
    if (Admin_Id === body.userId && Admin_Password === body.password) {
      // Generate JWT token
       // Generate JWT token
       const token = jwt.sign({ userId: Admin_Id, role: 'ADMIN' }, SECRET_KEY, {
        expiresIn: '30m', // Token expiration time
      });

      // Set token as HTTP-only cookie
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1800, // 30 minutes
        path: '/',
      });

      return new NextResponse(JSON.stringify({ message: "Logged In", data: {id:'RanchoLabsAdmin', userId:Admin_Id, role: 'ADMIN'} }), {
        status: 200,
        headers: {
          'Set-Cookie': cookie,
        },
      });
    } else{
      const response = await getSalesTeamByUserId(body.userId);
      if (response?.password === body.password) {
        // Generate JWT token
        const token = jwt.sign({ userId: response!.id, role: response!.role }, SECRET_KEY, {
          expiresIn: '10h', // Token expiration time
        });

        // Set token as HTTP-only cookie
        const cookie = serialize('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 36000, // 1 hour
          path: '/',
        });

        return new NextResponse(JSON.stringify({ message: "Logged In", data: response }), {
          status: 200,
          headers: {
            'Set-Cookie': cookie,
          },
        });
      } else {
        return new NextResponse(JSON.stringify({ message: "User not found!", data: undefined }), { status: 404 });
      }
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
