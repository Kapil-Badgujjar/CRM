'use client'
import { FormEvent, useContext, useState } from "react"
import { PasswordInput } from "./password-input"

import { useUser } from "@/context/AppContext"
import { useRouter } from "next/navigation"

export const Form = () => {
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {setId, setUsername, setRole} = useUser();
    const router = useRouter();

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`,{ method: 'POST',body: JSON.stringify({userId, password})});
        const body = await response.json();
        console.log(body);
        setId(body.data.id);
        setUsername(body.data.userId);
        setRole(body.data.role);
        if(body?.data.role === 'ADMIN'){
                router.push('/admin');
        }else if(body?.data.role === 'Sales Leader'){
                router.push('/home/sales-leader');
        }else router.push('/home/sales-person')
    }

  return (
    <form className="flex flex-col gap-8 w-[480px]">
        <div className="flex flex-col gap-2">
                <h3 className="text-gray-500">Welcome Back! to</h3>
                <h1 className="text-3xl text-blue-700 font-semibold tracking-wider">RANCHO LABS CRM</h1>
                <h2 className="text-gray-300 text-xl mt-8">Login to your account</h2>
        </div>
        <div className="flex flex-col gap-2">
                <input className="p-2 w-full border-gray-500 border-[1px] outline-none" type="text" placeholder="Username" value={userId} onChange={(e)=>setUserId(e.target.value)} required />
                <PasswordInput value={password} setValue={setPassword} />
        </div>
        <div className="flex justify-center">
                <button 
                        className="bg-blue-700 text-xl text-white px-8 py-1 rounded-sm" type="submit"
                        onClick={handleSubmit}
                >Login</button>
        </div>
    </form>
  )
}
