import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, History, Filter, Calendar, Search } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { cn } from '../lib/utils';

interface GameHistoryPageProps {
  onBack: () => void;
  user: any;
}

const GameHistoryPage: React.FC<GameHistoryPageProps> = ({ onBack, user }) => {
  const [bets, setBets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'bets'),
      where('userId', '==', user.uid),
      orderBy('placedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const betData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBets(betData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching game history:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredBets = bets.filter(bet => {
    if (filter === 'all') return true;
    return bet.status === filter;
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white rounded-b-[2.5rem] shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black uppercase tracking-tight">Game History</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {['all', 'win', 'loss', 'pending'].map((f) => (
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
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading history...</span>
          </div>
        ) : filteredBets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
              <History size={40} />
            </div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">No records found</span>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBets.map((bet) => (
              <div key={bet.id} className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Period: {bet.period}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-gray-800">Bet: {bet.value}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">{bet.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "text-base font-black uppercase tracking-tighter",
                      bet.status === 'win' ? "text-emerald-600" : bet.status === 'loss' ? "text-red-500" : "text-orange-400"
                    )}>
                      {bet.status === 'win' ? `+Rs ${bet.winAmount.toFixed(2)}` : bet.status === 'loss' ? `-Rs ${bet.amount.toFixed(2)}` : "Pending"}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold">{new Date(bet.placedAt).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Amount: Rs {bet.amount}</span>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                    bet.status === 'win' ? "bg-emerald-50 text-emerald-600" : bet.status === 'loss' ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                  )}>
                    {bet.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameHistoryPage;
