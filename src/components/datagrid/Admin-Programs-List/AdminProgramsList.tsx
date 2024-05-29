'use client'
import Datagrid from "./Datagrid";
import { useEffect, useState } from "react";
import { getSalesLeaders } from "./functions";

interface SalesLeadersInterface {
  id: string;
  userId: string;
  password: string;
  tole: string;
  managerId: string | null;
}

export default function AdminProgramsList(){
  const [ salesLeadersStates, setSalesLeadersStates] = useState<string[]>([]);
  const [ salesLeaders, setSalesLeaders] = useState<SalesLeadersInterface[]>([]);
  const fetchData = async () => {
      const data = await getSalesLeaders();
      setSalesLeaders(data);
      const salesLeadersList = ['Unassigned', ...data.map((d:SalesLeadersInterface) => d.userId)]
      setSalesLeadersStates(salesLeadersList);
  }
  useEffect(()=>{ fetchData()},[])

  if(salesLeaders.length <= 0 )  return <div>Loading...</div>;

  return (
    <div className="flex h-full w-full px-8 py-2">
      <Datagrid  salesLeaders={salesLeaders} salesLeadersStates={salesLeadersStates}/>
    </div>
  )
}
