import { createSalesTeam, getSalesTeamByUserId } from "@/lib/sales-team";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log(body.userId);
  try{
      const checkUserId = await getSalesTeamByUserId(body.userId)
      if(checkUserId) return new NextResponse(JSON.stringify({ message: "Username already in use! Try with another UserId"}), {
        status: 401,
      });
      body.managerId ? createSalesTeam({ userId:body.userId, password:body.password, role: body.role, managerId:body.managerId}):createSalesTeam({ userId:body.userId, password:body.password, role: body.role }); 

      return new NextResponse(JSON.stringify({ message: "Account created successfully" }), {
        status: 200,
      });

  } catch (err){
    console.log(err);
     return new NextResponse(JSON.stringify({ message: "Internal server error" }), {
        status: 500,
      });
  }
};
