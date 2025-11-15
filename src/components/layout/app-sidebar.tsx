
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
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

export function AppSidebar() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();

  const navItems = [
    { href: '/dashboard', icon: LayoutGrid, label: t('dashboard') },
    { href: '/chatbot', icon: MessageCircle, label: t('aiChatbot') },
    { href: '/symptom-guidance', icon: HeartPulse, label: t('symptomGuidance') },
    { href: '/preventive-healthcare', icon: ShieldCheck, label: t('preventiveCare') },
    { href: '/vaccination-schedules', icon: Syringe, label: t('vaccinations') },
    { href: '/outbreak-alerts', icon: AlertTriangle, label: t('outbreakAlerts') },
  ];

  const bottomNavItems = [
    { href: '/settings', icon: Settings, label: t('settings') },
    { href: '/support', icon: LifeBuoy, label: t('support'), disabled: true },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
            {t('healthwise')}
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
                <Link href={item.href}>
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
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  <Check className={cn('mr-2 h-4 w-4', i18n.language !== 'en' && 'opacity-0')} />
                  {t('english')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('es')}>
                  <Check className={cn('mr-2 h-4 w-4', i18n.language !== 'es' && 'opacity-0')} />
                  {t('spanish')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('hi')}>
                  <Check className={cn('mr-2 h-4 w-4', i18n.language !== 'hi' && 'opacity-0')} />
                  {t('hindi')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('te')}>
                  <Check className={cn('mr-2 h-4 w-4', i18n.language !== 'te' && 'opacity-0')} />
                  {t('telugu')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
