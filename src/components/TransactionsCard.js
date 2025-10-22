import React, { useState, useEffect } from 'react';

const TransactionsCard = () => {
  const [transactions, setTransactions] = useState([
    { from: 'Vijayawada', to: 'Dubai', status: 'completed', time: '2 min ago' },
    { from: 'Visakhapatnam', to: 'Singapore', status: 'in-transit', time: '5 min ago' },
    { from: 'Tirupati', to: 'London', status: 'completed', time: '8 min ago' },
    { from: 'Guntur', to: 'New York', status: 'processing', time: '12 min ago' },
    { from: 'Kurnool', to: 'Tokyo', status: 'completed', time: '15 min ago' },
    { from: 'Nellore', to: 'Hong Kong', status: 'in-transit', time: '18 min ago' },
    { from: 'Kadapa', to: 'Paris', status: 'completed', time: '22 min ago' },
    { from: 'Anantapur', to: 'Berlin', status: 'processing', time: '25 min ago' }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate through transactions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % transactions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [transactions.length]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'in-transit':
        return 'text-blue-400';
      case 'processing':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in-transit':
        return '✈';
      case 'processing':
        return '⏳';
      default:
        return '●';
    }
  };

  return (
    <div className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-10">
      <div className="glass-card rounded-2xl p-4 md:p-6 w-80 md:w-96 max-h-96 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">
            Latest Export Transactions
          </h3>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {transactions.slice(currentIndex, currentIndex + 5).map((transaction, index) => (
            <div 
              key={`${transaction.from}-${transaction.to}-${index}`}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-white">
                    {transaction.from}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="text-sm font-medium text-white">
                    {transaction.to}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)} {transaction.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {transaction.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Total Active Routes</span>
            <span className="text-white font-semibold">{transactions.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-400">Andhra Pradesh → Global</span>
            <span className="text-blue-400 font-semibold">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsCard;
