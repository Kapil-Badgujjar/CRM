'use client'
import { useUser } from "@/context/AppContext";
import Datagrid from "./Datagrid";

export default function ManageTeam(){
  const {id, role} = useUser();
  if(role !== 'Sales Leader') {
    return (
      <div>
        <div>
          Unauthorized!
        </div>
        <p>Only Sales Leader can access this 
          data.</p>
      </div>
    )
  }
  return (
    <div className="flex h-full w-full px-8 py-2">
      <Datagrid id={id} role={role} />
    </div>
  )
}
