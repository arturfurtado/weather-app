'use client'
import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { ModeToggle } from '@/components/layout/mode-toggle';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [useLocation, setUseLocation] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className='flex'>
      <Button className="px-48 py-2 mr-2 rounded border" variant="ghost" onClick={() => setUseLocation(false)}>
        Search cities...
      </Button>
      <ModeToggle />
      </div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
      </SidebarProvider>
    </div>
  );
}
