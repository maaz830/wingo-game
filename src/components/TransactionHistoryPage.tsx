import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Receipt, ArrowDownCircle, ArrowUpCircle, Users, Filter } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { cn } from '../lib/utils';

interface TransactionHistoryPageProps {
  onBack: () => void;
  user: any;
}

const TransactionHistoryPage: React.FC<TransactionHistoryPageProps> = ({ onBack, user }) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(txData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching transaction history:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'all') return true;
    return tx.type === filter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownCircle size={18} className="text-emerald-500" />;
      case 'withdrawal': return <ArrowUpCircle size={18} className="text-orange-500" />;
      case 'referral_bonus': return <Users size={18} className="text-blue-500" />;
      default: return <Receipt size={18} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white rounded-b-[2.5rem] shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black uppercase tracking-tight">Transactions</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'deposit', 'withdrawal', 'referral_bonus'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                filter === f 
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                  : "bg-white text-gray-400 border border-gray-100"
              )}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading transactions...</span>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
              <Receipt size={40} />
            </div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">No records found</span>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                      {getIcon(tx.type)}
                    </div>
                    <div>
                      <div className="text-sm font-black text-gray-800 uppercase tracking-tight">{tx.type.replace('_', ' ')}</div>
                      <div className="text-[10px] text-gray-400 font-bold">{new Date(tx.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "text-base font-black tracking-tighter",
                      tx.type === 'deposit' || tx.type === 'win' || tx.type === 'referral_bonus' ? "text-emerald-600" : "text-red-500"
                    )}>
                      {tx.type === 'deposit' || tx.type === 'win' || tx.type === 'referral_bonus' ? '+' : '-'}Rs {tx.amount.toFixed(2)}
                    </div>
                    <div className={cn(
                      "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mt-1",
                      tx.status === 'completed' ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                    )}>
                      {tx.status}
                    </div>
                  </div>
                </div>
                {tx.method && (
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-3 border-t border-gray-50">
                    Method: {tx.method}
                  </div>
                )}
                {tx.fromUser && (
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-3 border-t border-gray-50">
                    From: {tx.fromUser}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
