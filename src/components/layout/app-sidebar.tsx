'use client';

import {
  AlertTriangle,
  HeartPulse,
  Languages,
  LayoutGrid,
  LifeBuoy,
  MessageCircle,
  Settings,
  ShieldCheck,
  Stethoscope,
  Syringe,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/dashboard',
    icon: LayoutGrid,
    label: 'Dashboard',
  },
  {
    href: '/chatbot',
    icon: MessageCircle,
    label: 'AI Chatbot',
  },
  {
    href: '/symptom-guidance',
    icon: HeartPulse,
    label: 'Symptom Guidance',
  },
  {
    href: '/preventive-healthcare',
    icon: ShieldCheck,
    label: 'Preventive Care',
  },
  {
    href: '/vaccination-schedules',
    icon: Syringe,
    label: 'Vaccinations',
  },
  {
    href: '/outbreak-alerts',
    icon: AlertTriangle,
    label: 'Outbreak Alerts',
  },
];

const bottomNavItems = [
  {
    href: '/settings',
    icon: Settings,
    label: 'Settings',
  },
  {
    href: '/support',
    icon: LifeBuoy,
    label: 'Support',
  },
  {
    href: '/language',
    icon: Languages,
    label: 'Language',
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <SidebarHeader>
        <div
          className={cn(
            'flex items-center gap-2 p-2 transition-all',
            'group-data-[collapsible=icon]:-ml-1 group-data-[collapsible=icon]:p-0'
          )}
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="size-5" />
          </div>
          <span className="truncate text-lg font-semibold group-data-[collapsible=icon]:hidden">
            HealthWise
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarSeparator />
        <SidebarMenu>
          {bottomNavItems.map((item) => (
             <SidebarMenuItem key={item.href}>
             <SidebarMenuButton
               asChild
               isActive={isActive(item.href)}
               tooltip={{ children: item.label }}
             >
               <Link href={item.href}>
                 <item.icon />
                 <span>{item.label}</span>
               </Link>
             </SidebarMenuButton>
           </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}