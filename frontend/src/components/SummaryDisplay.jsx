import React from 'react';
import { FileText, AlertTriangle, BookOpen, Lightbulb } from 'lucide-react';
import SummaryCard from './SummaryCard';

const SummaryDisplay = ({ data }) => {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SummaryCard
                title="Summary"
                icon={FileText}
                color="bg-blue-50 text-blue-600"
            >
                <p>{data.summary}</p>
            </SummaryCard>

            <SummaryCard
                title="Abnormal Values"
                icon={AlertTriangle}
                color="bg-red-50 text-red-600"
            >
                {data.abnormal_values && data.abnormal_values.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                        {data.abnormal_values.map((val, i) => (
                            <li key={i}>{val}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="italic text-gray-400">No abnormal values flagged.</p>
                )}
            </SummaryCard>

            <SummaryCard
                title="Medical Term Explanations"
                icon={BookOpen}
                color="bg-purple-50 text-purple-600"
            >
                <p>{data.term_explanations}</p>
            </SummaryCard>

            <SummaryCard
                title="General Advice"
                icon={Lightbulb}
                color="bg-green-50 text-green-600"
            >
                <p>
{typeof data.term_explanations === "object"
  ? Object.entries(data.term_explanations).map(([key, val]) => (
      <span key={key}>
        <strong>{key}:</strong> {val}<br/>
      </span>
    ))
  : data.term_explanations}
</p>
            </SummaryCard>
        </div>
    );
};

export default SummaryDisplay;
