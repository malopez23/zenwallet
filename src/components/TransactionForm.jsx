import { useState, useEffect } from 'react';

const TransactionForm = ({ onClose, onSubmit, initialData }) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [value, setValue] = useState('');

  // Preencher os campos com os dados da transação ao editar
  useEffect(() => {
    if (initialData) {
      setDate(initialData.date);
      setDescription(initialData.description);
      setCategory(initialData.category);
      setType(initialData.type);
      setValue(initialData.value);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      date,
      description,
      category,
      type,
      value: parseFloat(value),
    };
    onSubmit(newTransaction);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? 'Editar Transação' : 'Nova Transação'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Data</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="" disabled>Selecione uma categoria</option>
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="lazer">Lazer</option>
              <option value="saude">Saúde</option>
              <option value="outros">Outros</option>
              <option value="moradia">Moradia</option>
              <option value="educacao">Educação</option>
              <option value="vestuario">Vestuário</option>
              <option value="viagem">Viagem</option>
              <option value="investimentos">Investimentos</option>
              <option value="doacoes">Doações</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              <option value="expense">Despesa</option>
              <option value="income">Renda</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Valor</label>
            <input
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800"
            >
              {initialData ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;