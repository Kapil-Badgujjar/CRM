'use client'

import { useUser } from "@/context/AppContext";
import Datagrid from "./Datagrid";

export default function SalesLeaderGrid(){
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
    <div className="flex h-full">
      <Datagrid id={id} role={role} />
    </div>
  )
}
