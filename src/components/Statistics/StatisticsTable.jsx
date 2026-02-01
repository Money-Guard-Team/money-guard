import React from 'react';

const StatisticsTable = ({ data, expenseSummary, incomeSummary }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Başlıklar */}
      <div className="flex justify-between bg-white/10 rounded-[30px] px-6 py-4 backdrop-blur-md">
        <span className="font-bold text-white">Category</span>
        <span className="font-bold text-white">Sum</span>
      </div>

      {/* Liste */}
      <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
        {data.map((item) => (
          <div key={item.category} className="flex justify-between items-center px-4 border-b border-white/15 pb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-6 h-6 rounded-[4px]" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-white text-sm">{item.category}</span>
            </div>
            <span className="text-white text-sm">{item.sum.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Alt Toplamlar */}
      <div className="flex flex-col gap-3 mt-auto pt-4">
        <div className="flex justify-between px-4">
          <span className="text-white font-bold text-sm">Expenses:</span>
          <span className="text-[#FF868D] font-bold text-sm">
            {Math.abs(expenseSummary).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between px-4">
          <span className="text-white font-bold text-sm">Income:</span>
          <span className="text-[#24CCA7] font-bold text-sm">
            {Math.abs(incomeSummary).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;