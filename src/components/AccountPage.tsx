import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Wallet, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Trophy, 
  History, 
  Receipt, 
  Bell, 
  Gift, 
  BarChart2, 
  Globe, 
  ChevronRight, 
  LogOut, 
  Shield, 
  Copy,
  RefreshCw,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AccountPageProps {
  onBack: () => void;
  user: any;
  balance: number;
  setView: (view: any) => void;
  onLogout: () => void;
}

const AccountPage: React.FC<AccountPageProps> = ({ onBack, user, balance, setView, onLogout }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const menuItems = [
    { icon: <Bell size={20} className="text-emerald-500" />, label: 'Notification', badge: '4', onClick: () => {} },
    { icon: <Gift size={20} className="text-emerald-500" />, label: 'Gifts', onClick: () => {} },
    { icon: <BarChart2 size={20} className="text-emerald-500" />, label: 'Game statistics', onClick: () => setView('stats') },
    { icon: <Globe size={20} className="text-emerald-500" />, label: 'Language', value: 'English', onClick: () => {} },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] pb-24">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-[#2ecc71] to-[#27ae60] pt-6 pb-20 px-6 rounded-b-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full blur-2xl"></div>
        </div>

        {/* Back Button */}
        <div className="flex items-center mb-6 relative z-10">
          <button 
            onClick={onBack}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all active:scale-90 border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full border-2 border-white/50 overflow-hidden bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-white font-black text-lg uppercase tracking-tight">
                {user?.email?.split('@')[0].toUpperCase() || 'MEMBER'}
              </h2>
              <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1 border border-white/10">
                <Shield size={10} className="text-white" />
                <span className="text-[8px] font-black text-white uppercase italic">VIP1</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-orange-500/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-orange-400/30">
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">UID</span>
                <div className="w-px h-2 bg-white/30"></div>
                <span className="text-[10px] font-black text-white tracking-wider">{user?.uid?.slice(0, 6).toUpperCase() || '937926'}</span>
                <button onClick={() => copyToClipboard(user?.uid || '')} className="text-white/60 hover:text-white transition-colors">
                  <Copy size={12} />
                </button>
              </div>
            </div>
            <div className="mt-2 text-[10px] font-bold text-white/70 uppercase tracking-widest">
              Last login: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="mx-6 -mt-12 bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 relative z-20 border border-gray-50">
        <div className="flex flex-col mb-6">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total balance</span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-gray-900 tracking-tight">Rs {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            <button className="p-1.5 bg-gray-50 rounded-full text-gray-400 hover:text-emerald-500 transition-all active:rotate-180">
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <button onClick={() => setView('wallet')} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform shadow-sm">
              <Wallet size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Wallet</span>
          </button>
          <button onClick={() => setView('deposit')} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform shadow-sm">
              <ArrowDownCircle size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Deposit</span>
          </button>
          <button onClick={() => setView('withdraw')} className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-sm">
              <ArrowUpCircle size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Withdraw</span>
          </button>
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-sm">
              <Shield size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">VIP</span>
          </button>
        </div>
      </div>

      {/* History Grid */}
      <div className="mx-6 mt-6 grid grid-cols-2 gap-4">
        <button 
          onClick={() => setView('gameHistory')}
          className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm border border-gray-50 hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
            <History size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-gray-800 uppercase tracking-tight">Game History</div>
            <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">My game history</div>
          </div>
        </button>
        <button 
          onClick={() => setView('transactionHistory')}
          className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm border border-gray-50 hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
            <Receipt size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-gray-800 uppercase tracking-tight">Transaction</div>
            <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">My transaction</div>
          </div>
        </button>
        <button 
          onClick={() => setView('depositHistory')}
          className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm border border-gray-50 hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
            <ArrowDownCircle size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-gray-800 uppercase tracking-tight">Deposit</div>
            <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">My deposit history</div>
          </div>
        </button>
        <button 
          onClick={() => setView('withdrawalHistory')}
          className="bg-white p-4 rounded-2xl flex items-center gap-3 shadow-sm border border-gray-50 hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
            <ArrowUpCircle size={20} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-gray-800 uppercase tracking-tight">Withdraw</div>
            <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">My withdraw history</div>
          </div>
        </button>
      </div>

      {/* Menu List */}
      <div className="mx-6 mt-6 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-50">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-sm font-bold text-gray-700">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && (
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-black text-white">
                  {item.badge}
                </div>
              )}
              {item.value && (
                <span className="text-xs font-bold text-gray-400">{item.value}</span>
              )}
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </button>
        ))}
      </div>

      {/* Service Center */}
      <div className="mx-6 mt-6">
        <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">Service center</div>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex items-center justify-center gap-4">
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
              <RefreshCw size={24} />
            </div>
            <span className="text-[10px] font-bold text-gray-500 uppercase">Support</span>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mx-6 mt-8">
        <button 
          onClick={onLogout}
          className="w-full bg-white text-red-500 font-black py-5 rounded-3xl shadow-sm border border-red-50 hover:bg-red-50 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <LogOut size={20} />
          <span className="uppercase tracking-widest text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
