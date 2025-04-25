import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

const SummaryCard = ({ title, value, type }) => {
  let bgColor, textColor, Icon;

  switch (type) {
    case 'income':
      bgColor = 'bg-green-100';
      textColor = 'text-green-600';
      Icon = ArrowUpCircle;
      break;
    case 'expense':
      bgColor = 'bg-red-100';
      textColor = 'text-red-600';
      Icon = ArrowDownCircle;
      break;
    case 'balance':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-600';
      Icon = Wallet;
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-600';
      Icon = null;
  }

  return (
    <div className={`${bgColor} p-4 rounded-md shadow flex items-center`}>
      {Icon && <Icon className={`w-6 h-6 ${textColor} mr-3`} />}
      <div>
        <h3 className={`text-sm font-medium ${textColor}`}>{title}</h3>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;