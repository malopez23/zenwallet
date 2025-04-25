import { useState } from 'react';
import { Calendar, Wallet, LogOut, Home, Menu, X } from 'lucide-react';
import { format } from 'date-fns';

const Sidebar = ({ selectedMonth, setSelectedMonth, monthlyIncome, setMonthlyIncome }) => {
  const [isOpen, setIsOpen] = useState(false);

  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2025, i, 1);
    return { value: i + 1, label: format(date, 'MMMM') };
  });

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleIncomeChange = (e) => {
    setMonthlyIncome(parseFloat(e.target.value) || 0);
  };

  return (
    <>
      {/* Botão para abrir/fechar a sidebar em mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 w-64 p-6 flex flex-col transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64 md:min-w-[16rem]`}
      >
        {/* Logo */}
        <div className="flex items-center mb-8">
          <Wallet className="w-6 h-6 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">ZenWallet</h2>
        </div>

        {/* Seletor de mês */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Mês Selecionado</label>
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600 appearance-none"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Campo para renda mensal */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">Renda Mensal</label>
          <input
            type="number"
            value={monthlyIncome || ''}
            onChange={handleIncomeChange}
            placeholder="Sua renda mensal"
            className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
          />
        </div>

        {/* Menu de navegação */}
        <ul className="flex-1">
          <li className="mb-4">
            <a href="/" className="flex items-center text-gray-600 hover:text-gray-800">
              <Home className="w-5 h-5 mr-2" />
              <span className="text-lg">Dashboard</span>
            </a>
          </li>
        </ul>

        {/* Botão de logout */}
        <button
          onClick={() => {
            console.log('Logout');
          }}
          className="mt-auto flex items-center justify-center border border-gray-300 rounded-md p-2 text-gray-600 hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sair
        </button>
      </div>

      {/* Overlay para fechar a sidebar em mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;