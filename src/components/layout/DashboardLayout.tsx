'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  TrendingUp,
  FileText,
  LogOut,
  Menu,
  X,
  Home,
  Receipt,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) return null;

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Cartões', href: '/dashboard/cards', icon: CreditCard },
    { name: 'Transações', href: '/dashboard/transactions', icon: FileText },
    { name: 'Receitas', href: '/dashboard/incomes', icon: Wallet },
    { name: 'Empréstimos', href: '/dashboard/loans', icon: TrendingUp },
    { name: 'Financiamentos', href: '/dashboard/financings', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 w-72 sm:w-64 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out shadow-xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:shadow-none`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700">
            <h1 className="text-xl font-bold text-white">Fin Organizer</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              {user.picture && (
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 h-16 shadow-sm">
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h2 className="lg:hidden text-lg font-semibold text-gray-900">Fin Organizer</h2>
            <div className="flex-1 lg:flex-none"></div>
            {user.picture && (
              <div className="lg:hidden flex items-center gap-2">
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 min-h-screen bg-gray-50 pb-20 lg:pb-6">{children}</main>
      </div>

      {/* Bottom Navigation Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-4 h-16">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              pathname === '/dashboard'
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Início</span>
          </Link>
          
          <Link
            href="/dashboard/cards"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              pathname === '/dashboard/cards'
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs font-medium">Cartões</span>
          </Link>
          
          <Link
            href="/dashboard/transactions"
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              pathname === '/dashboard/transactions'
                ? 'text-primary-600 bg-primary-50'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Receipt className="w-5 h-5" />
            <span className="text-xs font-medium">Transações</span>
          </Link>
          
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col items-center justify-center gap-1 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
}


