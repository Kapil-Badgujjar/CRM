import { getAllPrograms } from "@/lib/programs"
import { NextResponse } from "next/server"

export const GET = async () => {
    try{
        const response = await getAllPrograms()
        return new NextResponse( JSON.stringify({ message: 'Programs fetched successfully', data: response}),{status: 200 });
    } catch(e){
        return new NextResponse( JSON.stringify({ message: 'Internal Server Error'}), { status: 500})
    }
}