'use client'
import { useState } from "react";

export const PasswordInput = ({value, setValue}:{value: string, setValue: (args:string)=>void}) => {
    const [showPassword, setShowPassword] = useState<Boolean>(false);
  return (
    <div className="flex gap-2 border-gray-500 border-[1px] w-full">
        <input className="p-2 w-full outline-none" type={showPassword?"text":"password"} placeholder="Password" value={value} onChange={(e)=>setValue(e.target.value)}  required/>
        <p className="cursor-pointer flex justify-center items-center w-[80px] bg-gray-100 border-gray-500 border-l-[1px] p-2" onClick={()=>setShowPassword(prev=>!prev)}>{showPassword?'Hide':'Show'}</p>
    </div>
  )
}
