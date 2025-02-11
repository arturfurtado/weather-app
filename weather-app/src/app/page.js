'use client'
import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { ModeToggle } from '@/components/layout/mode-toggle';

export default function Home() {
  const [useLocation, setUseLocation] = useState(false);

  return (
    <div className="flex bg-slate-600 flex-col items-center justify-center p-4">
      <div className='flex'>
      <button className={`px-48 py-2 mr-2 rounded ${!useLocation ? 'bg-blue-500' : 'bg-gray-700'}`} onClick={() => setUseLocation(false)}>
        Search cities...
      </button>
      <ModeToggle />
      </div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
      </SidebarProvider>
    </div>
  );
}
