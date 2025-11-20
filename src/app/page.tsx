'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, TrendingUp, BarChart3, Shield } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2">
            Organize suas Finanças
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 mt-2">
              de Forma Inteligente
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Controle cartões, parcelamentos, financiamentos e receba insights personalizados
            sobre sua saúde financeira.
          </p>
          <button
            onClick={handleGoogleLogin}
            className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Entrar com Google
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
            <div className="bg-primary-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Cartões</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Gerencie todos seus cartões, vencimentos e faturas em um só lugar.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
            <div className="bg-primary-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Parcelamentos</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Acompanhe todas as suas compras parceladas e financiamentos.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
            <div className="bg-primary-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Insights</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Receba análises inteligentes sobre seus hábitos financeiros.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
            <div className="bg-primary-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Segurança</h3>
            <p className="text-sm sm:text-base text-gray-400">
              Seus dados protegidos com autenticação Google OAuth 2.0.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


