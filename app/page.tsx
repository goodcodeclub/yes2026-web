"use client";

import { ComponentExample } from "@/components/component-example";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

  useEffect(() => {
    
    redirect("/teaser");
    
  }, []);

return <>
    {/* <div className="flex items-center flex-col justify-center min-h-screen gap-2">
      <h1 className="m-0 ff-pack-hard text-white font-normal text-6xl">YES!26</h1>
      <p className="m-0 text-white">Coming soon</p>
    </div> */}
</>
}