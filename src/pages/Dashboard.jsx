import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TransactionForm from '../components/TransactionForm';
import SummaryCard from '../components/SummaryCard';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Função para adicionar uma nova transação
  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
    setIsModalOpen(false); // Fecha o modal após adicionar
  };

  // Calcular valores para os cards
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.value || 0), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.value || 0), 0);

  const balance = totalIncome - totalExpenses;

  // Calcular a porcentagem de despesas em relação à renda mensal
  const expensePercentage = monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0;

  // Função para formatar a data (ex.: "2025-05-23" -> "23/05/2025")
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        monthlyIncome={monthlyIncome}
        setMonthlyIncome={setMonthlyIncome}
      />
      <div className="flex-1 p-4 md:p-6 ml-0 md:ml-64 mt-16 md:mt-0">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6 mt-0 md:mt-10">
          <h1 className="text-3xl font-semibold text-teal-700">Dashboard</h1>
          <button
            className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800"
            onClick={() => setIsModalOpen(true)}
          >
            + Nova Transação
          </button>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Bem-vindo ao ZenWallet! Aqui você poderá gerenciar suas finanças.
        </p>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mx-2 md:mx-0">
          <SummaryCard
            title="Renda Total"
            value={`R$ ${totalIncome.toFixed(2)}`}
            type="income"
          />
          <SummaryCard
            title="Despesas"
            value={`R$ ${totalExpenses.toFixed(2)}`}
            type="expense"
          />
          <SummaryCard
            title="Saldo"
            value={`R$ ${balance.toFixed(2)}`}
            type="balance"
          />
        </div>

        {/* Resumo de Despesas */}
        <div className="bg-white p-4 md:p-6 rounded-md shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumo de Despesas</h2>
          <div className="h-48 bg-gray-100 rounded-md mb-4"></div>
          <p className="text-sm text-gray-600">
            Você gastou {expensePercentage.toFixed(1)}% da sua renda mensal
          </p>
        </div>

        {/* Tabela de Transações */}
        <div className="bg-white rounded-md shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-medium text-gray-600">Data</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-medium text-gray-600">Descrição</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-medium text-gray-600">Categoria</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-medium text-gray-600">Tipo</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-medium text-gray-600">Valor</th>
                <th className="p-2 md:p-3 text-left text-xs md:text-sm font-medium text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-2 md:p-3 text-center text-gray-500 text-sm">
                    Nenhuma transação registrada.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-2 md:p-3 text-gray-800 text-sm">{formatDate(transaction.date)}</td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm">{transaction.description}</td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm capitalize">{transaction.category}</td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm capitalize">
                      {transaction.type === 'income' ? 'Renda' : 'Despesa'}
                    </td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm">
                      R$ {parseFloat(transaction.value).toFixed(2)}
                    </td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm">
                      <span className="text-gray-500">Ações</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal do Formulário de Transações */}
        {isModalOpen && (
          <TransactionForm
            onClose={() => setIsModalOpen(false)}
            onSubmit={addTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;