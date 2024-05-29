import { getSalesTeamByManagerId, getSalesTeamByUserId } from "@/lib/sales-team";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  console.log(body);
  try {
    const response = await getSalesTeamByManagerId(body.managerId);
    if (response.length > 0) {

      return new NextResponse(JSON.stringify({ message: "Team fetched", data: response }), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "Team not found!", data: undefined }), { status: 404 });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
