import React from 'react';

const SummaryCard = ({ title, icon: Icon, children, color }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
            <div className={`px-5 py-4 border-b border-gray-50 flex items-center gap-3 ${color}`}>
                <Icon className="w-5 h-5" />
                <h3 className="font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="p-5 text-gray-600 leading-relaxed">
                {children}
            </div>
        </div>
    );
};

export default SummaryCard;
