import { createProgram } from "@/lib/programs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(request: NextRequest) => {
    const body = await request.json();
    console.log(body);
    try{
        const response = await createProgram({programName: body.programName});
        if(response)
        return new NextResponse(
            JSON.stringify({message: 'Created Successfully'}), { status: 200}
        );
        else return new NextResponse(
            JSON.stringify({message: 'Not Created'}), { status: 201}
        );
    }catch(err){
        return new NextResponse(
            JSON.stringify({message: 'Internal Server Error'}), { status: 500}
        );
    }
}