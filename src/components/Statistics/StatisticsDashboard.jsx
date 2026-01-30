import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../redux/finance/financeOperations';
import Chart from './Chart';
import StatisticsTable from './StatisticsTable';

// Renk Paleti (Backend kategorileriyle eşleşmeli)
const CATEGORY_COLORS = {
  'Main expenses': '#FED057',
  'Products': '#FFD8D0',
  'Car': '#FD9498',
  'Self care': '#C5BAFF',
  'Child care': '#6E78E8',
  'Household products': '#4A56E2',
  'Education': '#81E1FF',
  'Leisure': '#24CCA7',
  'Other expenses': '#00AD84',
  'Entertainment': '#DA76FA',
};

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.finance);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);

  // Backend verisini Chart formatına çevir
  const chartData = stats?.categoriesSummary?.map((item) => ({
    category: item.name,
    sum: Math.abs(item.total),
    color: CATEGORY_COLORS[item.name] || '#FFFFFF',
  })) || [];

  const years = [2023, 2024, 2025, 2026];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full h-full pt-8 md:pt-0">
      {/* SOL: Başlık ve Grafik */}
      <div className="flex-1 flex flex-col gap-6">
        <h2 className="text-3xl text-white font-normal pl-4 md:pl-0">Statistics</h2>
        
        {loading ? (
           <div className="text-white text-center py-20">Loading statistics...</div>
        ) : (
           <Chart 
             data={chartData} 
             periodTotal={stats?.expenseSummary || 0} 
           />
        )}
      </div>

      {/* SAĞ: Filtreler ve Tablo */}
      <div className="flex-1 flex flex-col gap-5 w-full">
        {/* Dropdowns */}
        <div className="flex gap-4 w-full">
          <select 
            value={month} 
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full bg-transparent border border-white/60 rounded-[30px] px-4 py-3 text-black md:text-white outline-none cursor-pointer"
          >
            {months.map((m, index) => (
              <option key={index} value={index + 1} className="text-black">{m}</option>
            ))}
          </select>

          <select 
            value={year} 
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full bg-transparent border border-white/60 rounded-[30px] px-4 py-3 text-black md:text-white outline-none cursor-pointer"
          >
            {years.map((y) => (
              <option key={y} value={y} className="text-black">{y}</option>
            ))}
          </select>
        </div>

        {/* Tablo */}
        <StatisticsTable 
            data={chartData} 
            expenseSummary={stats?.expenseSummary || 0}
            incomeSummary={stats?.incomeSummary || 0}
        />
      </div>
    </div>
  );
};

export default StatisticsDashboard;