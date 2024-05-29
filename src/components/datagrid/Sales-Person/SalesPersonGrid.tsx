'use client'

import { useUser } from "@/context/AppContext";
import Datagrid from "./Datagrid";

export default function SalesPersonGrid(){
  const {id, role} = useUser();
    return (
    <div className="flex h-full p-2">
      <Datagrid id={id} role={role} />
    </div>
  )
}
