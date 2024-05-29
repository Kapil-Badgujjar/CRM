import { getAllSalesLeaders, getAllSalesTeams, getSalesTeamByManagerId, getSalesTeamByUserId } from "@/lib/sales-team";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  // const body = await request.json();
  // console.log(body);
  try {
    const response = await getAllSalesLeaders();
    if (response.length > 0) {

      return new NextResponse(JSON.stringify({ message: "Sales leaders fetched", data: response }), {
        status: 200,
      });
    } else {
      return new NextResponse(JSON.stringify({ message: "Data not found!", data: undefined }), { status: 404 });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
