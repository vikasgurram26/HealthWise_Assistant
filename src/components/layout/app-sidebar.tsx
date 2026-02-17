
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
  Check,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale } from '@/lib/i18n/provider';
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
  const { locale, setLocale } = useLocale();
  const t = useTranslations('AppSidebar');

  const navItems = [
    { href: '/dashboard', icon: LayoutGrid, label: t('dashboard') },
    { href: '/chatbot', icon: MessageCircle, label: t('chatbot') },
    { href: '/symptom-guidance', icon: HeartPulse, label: t('symptomGuidance') },
    { href: '/preventive-healthcare', icon: ShieldCheck, label: t('preventiveCare') },
    { href: '/vaccination-schedules', icon: Syringe, label: t('vaccinations') },
    { href: '/outbreak-alerts', icon: AlertTriangle, label: t('outbreakAlerts') },
  ];

  const bottomNavItems = [
    { href: '/settings', icon: Settings, label: t('settings') },
    { href: 'https://wa.me/14155238886', icon: WhatsAppIcon, label: t('contactUs') },
    { href: '/support', icon: LifeBuoy, label: t('support'), disabled: true },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'te', name: 'తెలుగు' },
  ];

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
            {t('title')}
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
               disabled={!!item.disabled}
             >
               <Link href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                 <item.icon />
                 <span>{item.label}</span>
               </Link>
             </SidebarMenuButton>
           </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  variant="ghost"
                  className="w-full justify-start"
                  tooltip={{ children: t('language') }}
                >
                  <Languages />
                  <span>{t('language')}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mb-2 w-56" side="top" align="start">
                {languages.map(lang => (
                  <DropdownMenuItem key={lang.code} onSelect={() => setLocale(lang.code)}>
                    <Check className={cn('mr-2 h-4 w-4', locale === lang.code ? 'opacity-100' : 'opacity-0')} />
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
