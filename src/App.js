import { useState } from 'react';

export default function ExpenseTracker() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [type, setType] = useState('expense');

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const addTransaction = () => {
    if (!title || !amount) return;

    const finalAmount =
      type === 'income'
        ? Number(amount)
        : -Number(amount);

    const newTransaction = {
      id: Date.now(),
      title,
      date: new Date().toLocaleDateString(),
      amount: finalAmount,
    };

    setTransactions([newTransaction, ...transactions]);

    // clear inputs
    setTitle('');
    setAmount('');
    setType('expense');
  };

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: 'Salary',
      date: 'May 05, 2026',
      amount: 25000,
    }
  ]);

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expenses;

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-[35px] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-black text-white p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">
                💳
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Welcome to
                </p>
                <h1 className="text-3xl font-bold"> Expense Tracker </h1>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-2">
              Login
            </h2>

            <p className="text-gray-500 mb-6">
              Please sign in to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black transition"
                />
              </div>

              {error && (
                <div className="bg-red-100 text-red-600 text-sm p-3 rounded-2xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 transition text-white rounded-2xl py-4 font-semibold text-lg shadow-lg"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // EXPENSE TRACKER PAGE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[35px] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Welcome Back 👋</p>
              <h1 className="text-3xl font-bold mt-1">
                Expense Tracker
              </h1>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-2xl">
              💳
            </div>
          </div>

          {/* Balance Card */}
          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-white/10">
            <p className="text-gray-300 text-sm">
              Total Balance
            </p>

            <h2 className="text-4xl font-bold mt-2">
              ₱{balance.toLocaleString()}
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-green-500/10 rounded-2xl p-4 border border-green-500/20">
                <p className="text-green-300 text-sm">
                  Income
                </p>

                <h3 className="text-xl font-bold mt-1">
                  ₱{income.toLocaleString()}
                </h3>
              </div>

              <div className="bg-red-500/10 rounded-2xl p-4 border border-red-500/20">
                <p className="text-red-300 text-sm">
                  Expenses
                </p>

                <h3 className="text-xl font-bold mt-1">
                  ₱{Math.abs(expenses).toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {/* Comment */}
            <input
              type="text"
              placeholder="Comment (e.g. Salary, Grocery)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
            />

            {/* Amount */}
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-4 outline-none focus:border-black"
            />

            {/* Debit / Credit */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setType('income')}
                className={`py-3 rounded-2xl font-semibold ${type === 'income'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100'
                  }`}
              >
                Credit
              </button>

              <button
                onClick={() => setType('expense')}
                className={`py-3 rounded-2xl font-semibold ${type === 'expense'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100'
                  }`}
              >
                Debit
              </button>
            </div>

            {/* Add Transaction */}
            <button
              onClick={addTransaction}
              className="w-full bg-black hover:bg-gray-800 transition text-white rounded-2xl py-4 font-semibold text-lg shadow-lg"
            >
              + Add Transaction
            </button>
          </div>

          {/* Transactions */}
          <div className="mt-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                Recent Transactions
              </h2>

              <button className="text-sm text-gray-500 hover:text-black transition">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition rounded-3xl p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${transaction.amount > 0
                        ? 'bg-green-100'
                        : 'bg-red-100'
                        }`}
                    >
                      {transaction.amount > 0 ? '💰' : '🛒'}
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">
                        {transaction.title}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {transaction.date}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p
                      className={`font-bold text-lg ${transaction.amount > 0
                        ? 'text-green-500'
                        : 'text-red-500'
                        }`}
                    >
                      {transaction.amount > 0 ? '+' : '-'}₱
                      {Math.abs(
                        transaction.amount
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full mt-6 bg-red-500 hover:bg-red-600 transition text-white rounded-2xl py-4 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}