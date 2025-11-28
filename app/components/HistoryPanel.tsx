"use client";

import { HistoryEntry } from "../store/useHistory";

export default function HistoryPanel({ history, onClear }: { history: HistoryEntry[], onClear: any }) {
    if (!history || history.length === 0)
        return (
            <p className="text-gray-400 text-sm mt-6">
                No history yet. Generate something!
            </p>
        );
    return (
        <div className="card mt-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">History</h3>
                <button
                    onClick={onClear}
                    className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                >
                    Clear
                </button>
            </div>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {history.map((item: HistoryEntry, i: number) => (
                    <div key={i} className="border border-gray-700 rounded-lg p-3">
                        <p className="text-xs text-yellow-400 font-semibold">
                            {item.action}
                        </p>
                        <p className="text-xs text-gray-400">
                            {new Date(item.timestamp).toLocaleString()}
                        </p>
                        <p className="mt-1 text-sm">
                            <b>Component:</b> {item.component}
                        </p>
                        <p className="text-sm">
                            <b>Tone:</b> {item.tone}
                        </p>
                        <p className="text-sm">
                            <b>Context:</b> {item.context}
                        </p>
                        <details className="mt-2 cursor-pointer text-sm">
                            <summary className="text-pink-400">See generated copy</summary>
                            <ul className="ml-4 mt-2 list-disc text-gray-300">
                                {item.ideas.map((idea, idx) => (
                                    <li key={idx}>{idea}</li>
                                ))}
                            </ul>
                        </details>
                    </div>
                ))}
            </div>
        </div>
    );
}