import React from "react";

// Reusable Component
const StatisticBox = ({ value, label }) => {
  return (
    <div className="flex flex-row items-center justify-center bg-[#E6E6E6] rounded-xl px-4 py-2 w-full">
      <p className="flex flex-col items-center gap-0.5">
        <span className="text-[#2073DB] text-2xl font-semibold">{value}</span>
        <span>{label}</span>
      </p>
    </div>
  );
};

export default StatisticBox;