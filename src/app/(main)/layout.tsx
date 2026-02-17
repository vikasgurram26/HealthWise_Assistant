import { AppSidebar } from '@/components/layout/app-sidebar';
import { UserNav } from '@/components/layout/user-nav';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { LocaleProvider } from '@/lib/i18n/provider';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
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
    </LocaleProvider>
  );
}
