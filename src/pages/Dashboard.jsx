import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TransactionForm from '../components/TransactionForm';
import SummaryCard from '../components/SummaryCard';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [monthlyIncome, setMonthlyIncome] = useState(() => {
    // Carregar monthlyIncome do localStorage ao inicializar
    const savedIncome = localStorage.getItem('zenwallet_monthlyIncome');
    return savedIncome ? parseFloat(savedIncome) : 0;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(() => {
    // Carregar transações do localStorage ao inicializar
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
      // Editar transação existente
      setTransactions((prev) =>
        prev.map((t, index) =>
          index === editingTransaction.index ? transaction : t
        )
      );
      setEditingTransaction(null);
    } else {
      // Adicionar nova transação
      setTransactions((prev) => [...prev, transaction]);
    }
    setIsModalOpen(false); // Fecha o modal após adicionar/editar
  };

  // Função para iniciar a edição de uma transação
  const startEditing = (index) => {
    setEditingTransaction({ ...transactions[index], index });
    setIsModalOpen(true);
  };

  // Função para excluir uma transação
  const deleteTransaction = (index) => {
    setTransactions((prev) => prev.filter((_, i) => i !== index));
  };

  // Filtrar transações pelo mês selecionado
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionMonth = parseInt(transaction.date.split('-')[1]); // Extrai o mês da data (ex.: "2025-04-24" -> 4)
    return transactionMonth === selectedMonth;
  });

  // Calcular valores para os cards
  const additionalIncome = filteredTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.value || 0), 0);

  const totalIncome = monthlyIncome + additionalIncome; // Soma monthlyIncome com transações de renda

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
            onClick={() => {
              setEditingTransaction(null); // Limpa edição ao abrir para nova transação
              setIsModalOpen(true);
            }}
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
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-2 md:p-3 text-center text-gray-500 text-sm">
                    Nenhuma transação registrada neste mês.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-2 md:p-3 text-gray-800 text-sm">{formatDate(transaction.date)}</td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm">{transaction.description}</td>
                    <td className="p-2 md:p-3 text-gray-800 text-sm capitalize">{transaction.category}</td>
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
                        onClick={() => startEditing(index)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => deleteTransaction(index)}
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
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;