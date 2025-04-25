import { useState } from 'react';
import { X } from 'lucide-react';

const TransactionForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    type: 'expense',
    value: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Chama a função onSubmit com os dados do formulário
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Nova Transação</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Data */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Data</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              required
            />
          </div>

          {/* Descrição */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Descrição</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ex.: Supermercado"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              required
            />
          </div>

          {/* Categoria */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="alimentacao">Alimentação</option>
              <option value="transporte">Transporte</option>
              <option value="moradia">Moradia</option>
              <option value="lazer">Lazer</option>
              <option value="outros">Outros</option>
            </select>
          </div>

          {/* Tipo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              required
            >
              <option value="expense">Despesa</option>
              <option value="income">Renda</option>
            </select>
          </div>

          {/* Valor */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Valor (R$)</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-600"
              required
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;