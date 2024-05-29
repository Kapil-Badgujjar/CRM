'use client'
import { useUser } from "@/context/AppContext"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const NavigationBar = () => {
  const {setId, role, setUsername, setRole} = useUser();
  const router = useRouter();
  useEffect(()=>{
    const getUserDetails = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/get-user`);
      const body = await response.json();
      console.log(body);
      setId(body.data.id);
      setUsername(body.data.userId);
      setRole(body.data.role);
    }
    getUserDetails();
  },[]);

  const handleLogOut = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/auth/logout');
    if(response.ok){
      setId(null);
      setUsername(null);
      setRole(null);
      router.push('/');
    }
  }

  return (
    <div className="flex flex-row justify-between items-center h-[60px] bg-blue-700 px-8 py-2">
      <div className="text-white text-3xl text-blue-600">{role === 'ADMIN' ? 'RANCHO LABS CRM | Admin Dashboard' : role === "Sales Leader" ? "RANCHO LABS CRM | Sales Leader Dashboard" : "RANCHO LABS CRM"}</div>
      <div className="flex items-center justify-end">
        <button className="px-8 py-2 text-white text-xl" onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  )
}


