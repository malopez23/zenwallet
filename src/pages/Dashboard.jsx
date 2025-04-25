import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TransactionForm from '../components/TransactionForm';
import SummaryCard from '../components/SummaryCard';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [monthlyIncome, setMonthlyIncome] = useState(() => {
    const savedIncome = localStorage.getItem('zenwallet_monthlyIncome');
    return savedIncome ? parseFloat(savedIncome) : 0;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('zenwallet_transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Salvar monthlyIncome no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('zenwallet_monthlyIncome', monthlyIncome);
  }, [monthlyIncome]);

  // Salvar transações no localStorage sempre que elas mudarem
  useEffect(() => {
    localStorage.setItem('zenwallet_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Função para adicionar ou editar uma transação
  const addOrEditTransaction = (transaction) => {
    if (editingTransaction !== null) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id ? { ...transaction, id: t.id } : t
        )
      );
      setEditingTransaction(null);
    } else {
      setTransactions((prev) => [
        ...prev,
        { ...transaction, id: Date.now().toString() },
      ]);
    }
    setIsModalOpen(false);
  };

  // Função para iniciar a edição de uma transação
  const startEditing = (id) => {
    const transactionToEdit = transactions.find((t) => t.id === id);
    setEditingTransaction(transactionToEdit);
    setIsModalOpen(true);
  };

  // Função para excluir uma transação
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Função para limpar todas as transações e a renda mensal
  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar todas as transações e a renda mensal? Essa ação não pode be desfeita.')) {
      setTransactions([]);
      setMonthlyIncome(0);
      localStorage.removeItem('zenwallet_transactions');
      localStorage.removeItem('zenwallet_monthlyIncome');
    }
  };

  // Filtrar transações pelo mês selecionado e ordenar por data (crescente)
  const filteredTransactions = transactions
    .filter((transaction) => {
      const transactionMonth = parseInt(transaction.date.split('-')[1]);
      return transactionMonth === selectedMonth;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  // Calcular valores para os cards
  const additionalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.value || 0), 0);

  const totalIncome = monthlyIncome + additionalIncome;

  const totalExpenses = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.value || 0), 0);

  const balance = totalIncome - totalExpenses;

  // Calcular a porcentagem de despesas em relação à renda total
  const expensePercentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  // Função para formatar a data (ex.: "2025-05-23" -> "23/05/2025")
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Agrupar despesas por categoria para o gráfico de despesas
  const expenseByCategory = filteredTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, transaction) => {
      const category = transaction.category;
      const value = parseFloat(transaction.value || 0);
      acc[category] = (acc[category] || 0) + value;
      return acc;
    }, {});

  // Preparar os dados para o gráfico de despesas
  const expenseChartData = {
    labels: Object.keys(expenseByCategory).map((category) => category.charAt(0).toUpperCase() + category.slice(1)),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: [
          '#FECACA',
          '#60A5FA',
          '#BFDBFE',
          '#FBCFE8',
          '#C4B5FD',
          '#DDD6FE',
          '#BBF7D0',
          '#F9A8D4',
          '#FED7AA',
          '#A5F3FC',
          '#D4D4D4',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Preparar os dados para o gráfico de renda
  const incomeChartData = {
    labels: ['Renda Mensal Fixa', 'Renda Adicional'],
    datasets: [
      {
        data: [monthlyIncome, additionalIncome],
        backgroundColor: ['#D1FAE5', '#4ADE80'],
        borderWidth: 1,
      },
    ],
  };

  // Opções dos gráficos
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: R$ ${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  // Mapeamento de cores para as categorias na tabela
  const categoryColors = {
    alimentacao: 'bg-[#FECACA]',
    transporte: 'bg-[#60A5FA]',
    lazer: 'bg-[#BFDBFE]',
    saude: 'bg-[#FBCFE8]',
    outros: 'bg-[#C4B5FD]',
    moradia: 'bg-[#DDD6FE]',
    educacao: 'bg-[#BBF7D0]',
    vestuario: 'bg-[#F9A8D4]',
    viagem: 'bg-[#FED7AA]',
    investimentos: 'bg-[#A5F3FC]',
    doacoes: 'bg-[#D4D4D4]',
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
          <div className="flex gap-2">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleClearAll}
            >
              Limpar Tudo
            </button>
            <button
              className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800"
              onClick={() => {
                setEditingTransaction(null);
                setIsModalOpen(true);
              }}
            >
              + Nova Transação
            </button>
          </div>
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

        {/* Resumo de Renda */}
        <div className="bg-white p-4 md:p-6 rounded-md shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumo de Renda</h2>
          {totalIncome === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-500">
              Nenhuma renda registrada neste mês.
            </div>
          ) : (
            <div className="h-48">
              <Doughnut data={incomeChartData} options={chartOptions} />
            </div>
          )}
        </div>

        {/* Resumo de Despesas */}
        <div className="bg-white p-4 md:p-6 rounded-md shadow mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Resumo de Despesas</h2>
          {Object.keys(expenseByCategory).length === 0 ? (
            <div className="h-48 flex items-center justify-center text-gray-500">
              Nenhuma despesa registrada neste mês.
            </div>
          ) : (
            <div className="h-48">
              <Doughnut data={expenseChartData} options={chartOptions} />
            </div>
          )}
          <p className="text-sm text-gray-600 mt-4">
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
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-2 md:p-3 text-center text-gray-500 text-sm">
                    Nenhuma transação registrada neste mês.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-gray-200">
                    <td className="p-2 md:p-3 text-gray-800 text-sm">{formatDate(transaction.date)}</td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm">{transaction.description}</td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm capitalize">
                      <span className={`px-2 py-1 rounded-md ${categoryColors[transaction.category] || 'bg-gray-100'} text-gray-800`}>
                        {transaction.category}
                      </span>
                    </td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm capitalize">
                      {transaction.type === 'income' ? 'Renda' : 'Despesa'}
                    </td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm">
                      <span className={`px-2 py-1 rounded-md ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                        R$ {parseFloat(transaction.value).toFixed(2)}
                      </span>
                    </td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm">
                      <button
                        className="text-green-600 mr-2"
                        onClick={() => startEditing(transaction.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        Excluir
                      </button>
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
            onClose={() => {
              setIsModalOpen(false);
              setEditingTransaction(null);
            }}
            onSubmit={addOrEditTransaction}
            initialData={editingTransaction}
            selectedMonth={selectedMonth}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;