import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { getSalesTeamById } from "@/lib/sales-team"; // Assume you have this function to get user by ID

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";
const Admin_Id = process.env.ADMIN_ID;
const Admin_Password = process.env.ADMIN_PASSWORD;

export const GET = async (request: NextRequest) => {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return new NextResponse(JSON.stringify({ message: "No cookies found" }), { status: 401 });
  }

  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "No token found" }), { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };

    if(Admin_Id === decoded.userId){
      return new NextResponse(JSON.stringify({ message: "Logged In", data: {id:'RanchoLabsAdmin', userId:Admin_Id, role: 'ADMIN'}}),{ "status": 200});
    }else {
      const user = await getSalesTeamById(decoded.userId);
      if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
      }
  
      return new NextResponse(JSON.stringify({ message: "User fetched successfully", data: user }), { status: 200 });
    }

  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Invalid or expired token" }), { status: 401 });
  }
};
