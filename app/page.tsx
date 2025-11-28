"use client";

import { useEffect, useRef, useState } from "react";
import CopyForm from "./components/CopyForm";
import CopyPreview from "./components/CopyPreview";
import ImproveResult from "./components/ImproveResult";
import TranslateResult from "./components/TranslateResult";
import useHistory from "./store/useHistory";
import HistoryPanel from "./components/HistoryPanel";

export default function Home() {
	const [result, setResult] = useState([]);
	const [improved, setImproved] = useState("");
	const [translated, setTranslated] = useState(null);
	const resultRef = useRef<HTMLDivElement>(null);
	const { history, add, clear } = useHistory();

	useEffect(() => {
		if (resultRef.current) {
			resultRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [result, improved, translated]);

	async function improveCopy(text: string) {
		const res = await fetch("/api/improve", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text })
		});
		const data = await res.json();
		setImproved(data.improved);
		handleNewResult([data.improved], "Improve", text, "", "");
	}

	async function translateCopy(text: string) {
		const res = await fetch("/api/translate", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text }),
		});
		const data = await res.json();
		setTranslated(data);
		handleNewResult([
			`EN: ${data.en}`,
			`HI: ${data.hi}`,
			`BN: ${data.bn}`
		], "Translate", text, "", "");
	}

	async function handleNewResult(ideas: string[], action: string, context: string, component: string, tone: string) {
		add({
			timestamp: Date.now(),
			action,
			component,
			tone,
			context,
			ideas
		});
	}


	return (
		<main className="max-w-lg mx-auto p-6 space-y-6">
			<h1 className="text-3xl font-bold text-center">
				Smart UI Copy Assistant
			</h1>
			<CopyForm onResult={(res: any) => {
				setResult(res.ideas);
				handleNewResult(res.ideas, res.action, res.context, res.component, res.tone);
			}} />
			<div ref={resultRef}>
				<CopyPreview
					ideas={result}
					onImprove={improveCopy}
					onTranslate={translateCopy}
				/>
				<ImproveResult text={improved} onClose={() => setImproved("")} />
				<TranslateResult data={translated} onClose={() => setTranslated(null)} />
			</div>
			<HistoryPanel history={history} onClear={clear} />
		</main>
	);
}