'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const { data: summary } = useQuery({
    queryKey: ['financial-summary'],
    queryFn: async () => {
      const response = await api.get('/dashboard/summary');
      return response.data;
    },
  });

  const { data: insights } = useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      const response = await api.get('/dashboard/insights');
      return response.data;
    },
  });

  const { data: cards } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await api.get('/cards');
      return response.data;
    },
  });

  const generateInsights = async () => {
    await api.post('/dashboard/insights/generate');
    window.location.reload();
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'SUCCESS':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'INFO':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'SUGGESTION':
        return <AlertCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const COLORS = ['#0ea5e9', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b'];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={generateInsights}
            className="w-full sm:w-auto px-4 py-2 bg-primary-600 text-white text-sm sm:text-base rounded-lg hover:bg-primary-700 transition-colors"
          >
            Gerar Insights
          </button>
        </div>

        {/* Stats Cards */}
        {summary && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Receitas</span>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                R$ {summary.totalIncome.toFixed(2)}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Despesas</span>
                <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                R$ {summary.totalExpenses.toFixed(2)}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Saldo</span>
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <p className={`text-xl sm:text-2xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {summary.balance.toFixed(2)}
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600">Taxa de Poupança</span>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {summary.savingsRate.toFixed(1)}%
              </p>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Expense Categories */}
          {summary?.topExpenseCategories && summary.topExpenseCategories.length > 0 && (
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Principais Categorias de Gastos
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={summary.topExpenseCategories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Cards Overview */}
          {cards && cards.length > 0 && (
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Seus Cartões</h2>
              <div className="space-y-3">
                {cards.slice(0, 5).map((card: any) => (
                  <div
                    key={card.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: card.color || '#0ea5e9' }}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">{card.name}</p>
                        <p className="text-sm text-gray-500">
                          Vence dia {card.dueDay} | Fecha dia {card.closingDay}
                        </p>
                      </div>
                    </div>
                    {card.limit && (
                      <p className="text-sm font-medium text-gray-600">
                        Limite: R$ {card.limit.toFixed(2)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Insights Section */}
        {insights && insights.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Insights Financeiros
              </h2>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {insights.map((insight: any) => (
                <div
                  key={insight.id}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                      {insight.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}


