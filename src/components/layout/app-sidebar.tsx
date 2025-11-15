
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
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export function AppSidebar() {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    router.refresh(); // Refresh the page to apply new language from server
  };

  const navItems = [
    { href: '/dashboard', icon: LayoutGrid, label: t('sidebar.dashboard') },
    { href: '/chatbot', icon: MessageCircle, label: t('sidebar.aiChatbot') },
    { href: '/symptom-guidance', icon: HeartPulse, label: t('sidebar.symptomGuidance') },
    { href: '/preventive-healthcare', icon: ShieldCheck, label: t('sidebar.preventiveCare') },
    { href: '/vaccination-schedules', icon: Syringe, label: t('sidebar.vaccinations') },
    { href: '/outbreak-alerts', icon: AlertTriangle, label: t('sidebar.outbreakAlerts') },
  ];

  const bottomNavItems = [
    { href: '/settings', icon: Settings, label: t('sidebar.settings') },
    { href: '/support', icon: LifeBuoy, label: t('sidebar.support'), disabled: true },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
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
            {t('appTitle')}
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
                  tooltip={{ children: t('sidebar.language') }}
                >
                  <Languages />
                  <span>{t('sidebar.language')}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mb-2 w-56" side="top" align="start">
                {languages.map(lang => (
                  <DropdownMenuItem key={lang.code} onSelect={() => changeLanguage(lang.code)}>
                    <Check className={cn('mr-2 h-4 w-4', i18n.language === lang.code ? 'opacity-100' : 'opacity-0')} />
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
