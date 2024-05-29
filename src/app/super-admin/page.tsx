'use client'
import SalesLeaderGrid from "@/components/datagrid/Sales-Leader/SalesLeaderGrid";
import Link from "next/link";
import { useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ManageTeam from "@/components/datagrid/Manage-Team/ManageTeam";


export default function SalesLeaderPage() {
  const [activeLink, setActiveLink] = useState<Number>(1);
  return (
    <div className="flex h-full">
      <div className="flex gap-2 w-screen">
        <div className="flex flex-col gap-4 bg-blue-600 w-[240px] py-4 pl-4">
          {/* <Link className="flex items-center gap-4 text-white bg-blue-400 py-2 px-8 rounded-3xl mr-4" href="/home"><ArrowBackIosIcon fontSize={"small"} />Back</Link> */}
          <ul className="flex flex-col gap-4 w-full">
            <li className="flex w-full"><Link className={`w-full py-2 px-8 rounded-l-3xl ${activeLink === 1 ? 'bg-white text-black':'text-white hover:bg-blue-400'}`} href="/home/sales-leader" onClick={()=>setActiveLink(1)}>Leads</Link></li>
            <li className="flex w-full"><Link className={`w-full py-2 px-8 rounded-l-3xl ${activeLink === 2 ? 'bg-white text-black':'text-white hover:bg-blue-400'}`} href="/home/sales-leader" onClick={()=>setActiveLink(2)}>Manage Team</Link></li>
            <li className="flex w-full"><Link className={`w-full py-2 px-8 rounded-l-3xl ${activeLink === 3 ? 'bg-white text-black':'text-white hover:bg-blue-400'}`} href="/home/sales-leader" onClick={()=>setActiveLink(3)}>Manage Leads</Link></li>
            <li className="flex w-full"><Link className={`w-full py-2 px-8 rounded-l-3xl ${activeLink === 4 ? 'bg-white text-black':'text-white hover:bg-blue-400'}`} href="/home/sales-leader" onClick={()=>setActiveLink(4)}>Help</Link></li>
          </ul>
        </div>
        <div className="w-[100%] overflow-x-auto">
          {activeLink === 1 && <SalesLeaderGrid />}
          {activeLink === 2 && <ManageTeam />}
        </div>
      </div>
    </div>
  )
}
