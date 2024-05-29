'use client'
import { useUser } from "@/context/AppContext";
import Datagrid from "./Datagrid";

export default function AdminManageTeam(){
  return (
    <div className="flex h-full w-full px-8 py-2">
      <Datagrid/>
    </div>
  )
}
