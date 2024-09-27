import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";


export default function DashboardRayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      
     <div className="flex h-full">
        {/*<div className="hidden bg-red-400 lg:w-1/4 lg:block"><Sidebar/></div>*/}
        <div className=" bg-red-400 w-72 lg:block"><Sidebar/></div>
        <main className="bg-blue-300 w-full lg:w-4/3">
          <div className="flex flex-col h-full">
            <Navbar/>
            {children}
          </div>
        </main>
     </div>
    );
  }
  