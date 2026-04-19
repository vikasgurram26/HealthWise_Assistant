'use client';

import {
  AlertTriangle,
  ClipboardPlus,
  HeartPulse,
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
import { useTranslations } from '@/lib/i18n/use-translations';


const WhatsAppIcon = () => (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.76.46 3.42 1.25 4.9L2 22l5.27-1.38c1.44.75 3.06 1.18 4.77 1.18h.01c5.46 0 9.9-4.45 9.9-9.9S17.5 2 12.04 2M9.53 8.5c.24-.24.58-.38.88-.38.3 0 .64.14.88.38l.12.12c.24.24.38.58.38.88 0 .3-.14.64-.38.88l-1.25 1.25c-.24.24-.38.58-.38.88 0 .3.14.64.38.88l2.5 2.5c.24.24.58.38.88.38.3 0 .64-.14.88-.38l1.25-1.25c.24-.24.58-.38.88-.38.3 0 .64.14.88.38l.12.12c.24.24.38.58.38.88 0 .3-.14.64-.38.88l-1.25 1.25c-.24.24-.58.38-.88.38-.3 0-.64-.14-.88-.38l-4.38-4.38c-.24-.24-.38-.58-.38-.88 0-.3.14.64.38-.88l1.25-1.25c.24-.24.58-.38.88-.38.3 0 .64.14.88.38l-1.25 1.25c-.24.24-.38.58-.38.88 0 .3.14.64.38.88l2.5 2.5c.24.24.58.38.88.38s.64-.14.88-.38l1.25-1.25c.24-.24.58-.38.88-.38.3 0 .64.14.88.38l.12.12c.24.24.38.58.38.88 0 .3-.14.64-.38.88l-1.25 1.25c-.24.24-.58.38-.88.38s-.64-.14-.88-.38l-4.38-4.38c-.24-.24-.38-.58-.38-.88s.14-.64.38-.88l1.25-1.25c.24-.24.58-.38.88-.38s.64.14.88.38l-.12-.12c-.24-.24-.58-.38-.88-.38s-.64.14-.88.38L9.53 8.5z" />
    </svg>
  );


export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations('AppSidebar');

  const navItems = [
    { href: '/dashboard', icon: LayoutGrid, label: t('dashboard') },
    { href: '/chatbot', icon: MessageCircle, label: t('chatbot') },
    { href: '/symptom-guidance', icon: HeartPulse, label: t('symptomGuidance') },
    { href: '/preventive-healthcare', icon: ShieldCheck, label: t('preventiveCare') },
    { href: '/vaccination-schedules', icon: Syringe, label: t('vaccinations') },
    { href: '/my-records', icon: ClipboardPlus, label: t('myRecords') },
    { href: '/outbreak-alerts', icon: AlertTriangle, label: t('outbreakAlerts') },
  ];

  const bottomNavItems = [
    { href: '/settings', icon: Settings, label: t('settings') },
    { href: 'https://wa.me/14155238886', icon: WhatsAppIcon, label: t('contactUs') },
    { href: '/support', icon: LifeBuoy, label: t('support'), disabled: true },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <>
      <SidebarHeader className="p-6">
        <Link
          href="/dashboard"
          className={cn(
            'flex items-center gap-3 transition-all active:scale-95',
            'group-data-[collapsible=icon]:p-0'
          )}
        >
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Stethoscope className="size-6" />
          </div>
          <span className="truncate text-xl font-bold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
            {t('title')}
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3 pb-4">
        <SidebarMenu className="gap-1">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={{ children: item.label }}
                className={cn(
                  "h-12 rounded-xl transition-all",
                  isActive(item.href) ? "bg-primary text-primary-foreground shadow-md shadow-primary/10" : "hover:bg-primary/5 hover:text-primary"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarSeparator className="mb-4" />
        <SidebarMenu className="gap-1">
          {bottomNavItems.map((item) => (
             <SidebarMenuItem key={item.href}>
             <SidebarMenuButton
               asChild
               isActive={isActive(item.href)}
               tooltip={{ children: item.label }}
               disabled={!!item.disabled}
               className={cn(
                 "h-11 rounded-xl transition-all",
                 isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-primary/5 hover:text-primary"
               )}
             >
               <Link href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                 <item.icon className="size-5" />
                 <span className="font-medium">{item.label}</span>
               </Link>
             </SidebarMenuButton>
           </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}