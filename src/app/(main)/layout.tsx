
'use client';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { UserNav } from '@/components/layout/user-nav';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex">
        <div className="hidden md:block">
           <Skeleton className="h-screen w-12" />
        </div>
        <div className="flex-1 p-8">
            <header className="flex h-16 items-center justify-end border-b">
                 <Skeleton className="h-8 w-8 rounded-full" />
            </header>
            <main className="mt-8">
            <div className="space-y-2">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-6 w-2/3" />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Skeleton className="h-64" />
                </div>
                <div className="flex flex-col gap-6">
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                </div>
            </div>
            </main>
        </div>
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6 lg:justify-end">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
            <UserNav />
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
