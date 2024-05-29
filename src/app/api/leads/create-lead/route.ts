import { createLead } from "@/lib/leads";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const body = await request.json();
    // console.log(body.lead);
    try {
        const response = await createLead(body.lead);
        console.log(response);
        if(response)
        return new NextResponse(
            JSON.stringify({message: "Lead Created"}), { status: 200}
        )
        else return new NextResponse(
            JSON.stringify({message: "Lead not saved!"}), { status: 401}
        )
    } catch(err){
        return new NextResponse(
            JSON.stringify({message: "Internal Server Error!"}), { status: 500}
        )
    }
}