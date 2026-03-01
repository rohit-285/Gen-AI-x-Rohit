import React from 'react';
import { FileText, AlertTriangle, BookOpen, Lightbulb } from 'lucide-react';
import SummaryCard from './SummaryCard';

const SummaryDisplay = ({ data }) => {
    if (!data) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            {/* SUMMARY */}
            <SummaryCard
                title="Summary"
                icon={FileText}
                color="bg-blue-50 text-blue-600"
            >
                <p>
                    {typeof data.summary === "object"
                        ? JSON.stringify(data.summary)
                        : data.summary}
                </p>
            </SummaryCard>


            {/* ABNORMAL VALUES */}
            <SummaryCard
                title="Abnormal Values"
                icon={AlertTriangle}
                color="bg-red-50 text-red-600"
            >
                {Array.isArray(data.abnormal_values) && data.abnormal_values.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                        {data.abnormal_values.map((val, i) => (
                            <li key={i}>{val}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="italic text-gray-400">
                        No abnormal values flagged.
                    </p>
                )}
            </SummaryCard>


            {/* TERM EXPLANATIONS */}
            <SummaryCard
                title="Medical Term Explanations"
                icon={BookOpen}
                color="bg-purple-50 text-purple-600"
            >
                {typeof data.term_explanations === "object" ? (
                    <div className="space-y-1">
                        {Object.entries(data.term_explanations).map(([key, val]) => (
                            <p key={key}>
                                <strong>{key}:</strong> {val}
                            </p>
                        ))}
                    </div>
                ) : (
                    <p>{data.term_explanations}</p>
                )}
            </SummaryCard>


            {/* GENERAL ADVICE */}
            <SummaryCard
                title="General Advice"
                icon={Lightbulb}
                color="bg-green-50 text-green-600"
            >
                <p>
                    {typeof data.general_advice === "object"
                        ? JSON.stringify(data.general_advice)
                        : data.general_advice}
                </p>
            </SummaryCard>

        </div>
    );
};

export default SummaryDisplay;