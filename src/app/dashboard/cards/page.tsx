'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, CreditCard as CreditCardIcon } from 'lucide-react';
import { useState } from 'react';

export default function CardsPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastFourDigits: '',
    brand: '',
    limit: '',
    closingDay: '',
    dueDay: '',
    color: '#0ea5e9',
  });

  const { data: cards, refetch } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => {
      const response = await api.get('/cards');
      return response.data;
    },
  });

  const createCard = useMutation({
    mutationFn: async (data: any) => {
      return api.post('/cards', data);
    },
    onSuccess: () => {
      refetch();
      setShowForm(false);
      setFormData({
        name: '',
        lastFourDigits: '',
        brand: '',
        limit: '',
        closingDay: '',
        dueDay: '',
        color: '#0ea5e9',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCard.mutate({
      ...formData,
      limit: formData.limit ? parseFloat(formData.limit) : undefined,
      closingDay: parseInt(formData.closingDay),
      dueDay: parseInt(formData.dueDay),
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cartões</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm sm:text-base rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Novo Cartão
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Cadastrar Novo Cartão
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Cartão *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Ex: Nubank Roxinho"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Últimos 4 dígitos
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={formData.lastFourDigits}
                    onChange={(e) => setFormData({ ...formData, lastFourDigits: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="1234"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bandeira
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Ex: Visa, Mastercard"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Limite
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.limit}
                    onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="5000.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dia do Fechamento *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="31"
                    value={formData.closingDay}
                    onChange={(e) => setFormData({ ...formData, closingDay: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dia do Vencimento *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="31"
                    value={formData.dueDay}
                    onChange={(e) => setFormData({ ...formData, dueDay: e.target.value })}
                    className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="17"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cor
                  </label>
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full h-10 px-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={createCard.isPending}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {createCard.isPending ? 'Salvando...' : 'Salvar Cartão'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cards List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cards?.map((card: any) => (
            <div
              key={card.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 rounded-xl shadow-lg text-white"
              style={{ background: `linear-gradient(135deg, ${card.color} 0%, #1f2937 100%)` }}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <CreditCardIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                {card.brand && (
                  <span className="text-xs sm:text-sm font-medium uppercase">{card.brand}</span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{card.name}</h3>
              {card.lastFourDigits && (
                <p className="text-xs sm:text-sm opacity-80 mb-3 sm:mb-4">**** **** **** {card.lastFourDigits}</p>
              )}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="opacity-70">Fechamento</p>
                  <p className="font-semibold">Dia {card.closingDay}</p>
                </div>
                <div>
                  <p className="opacity-70">Vencimento</p>
                  <p className="font-semibold">Dia {card.dueDay}</p>
                </div>
              </div>
              {card.limit && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm opacity-70">Limite</p>
                  <p className="text-lg font-bold">R$ {card.limit.toFixed(2)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}


