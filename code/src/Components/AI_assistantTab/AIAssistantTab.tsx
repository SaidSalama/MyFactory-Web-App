import { Send } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../Card/Card";
import "./AIAssistantTab.css";
import { AI_responseContext } from "../../DataProvider";
import { n8nService } from "../../Services/n8n_client";

const AIAssistantTab = () => {
	const LoggedInUser = localStorage.getItem("loggedInUser");
	const LoginUser = JSON.parse(LoggedInUser as string);
	const [userInput, setUserInput] = useState("");
	const [isWaiting, setIsWaiting] = useState(false);
	const aiResponse = useContext(AI_responseContext);
	const handleSend = async () => {
		if (!userInput.trim()) return;
		setIsWaiting(true);
		// Simulate AI reply (replace with real API call later)
		/*const reply = `AI suggestion based on your request:\n\nTask created successfully!\nTitle: Fix pump A-12\nAssigned to: John Technician\nPriority: High\nDeadline: 2026-02-20\nDescription: ${userInput}\n\nStatus: Pending`;
		setAiResponse(reply);*/
		await sendtomodel(); //send input
		setUserInput(""); // clear input
	};
	const sendtomodel = async () => {
		try {
			const response = await n8nService.sendMessage(userInput, LoginUser);
			console.log(`created task is ${response.data}`);
			if (response.status === 404) {
				console.log("error 404 for n8n");
			}
			return true;
		} catch (err) {
			console.log(`error of sending is ${err}`);
		}
	};

	//this hook is used the waiting state when aiResponse change
	useEffect(() => {
		if (aiResponse) {
			setIsWaiting(false);
		}
	}, [aiResponse]);

	return (
		<div className="ai-assistant-container">
			<Card className="ai-main-card">
				<CardHeader>
					<div className="ai-header">
						<CardTitle className="ai-title">AI Assistant</CardTitle>
						<CardDescription className="ai-desc">
							Describe the demand you need — AI will generate it
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent>
					{/* Input Area */}
					<div className="ai-input-section">
						<textarea
							className="ai-textarea"
							placeholder="e.g., Create a demand with a title:..... and description:....... and specify its deadline"
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							rows={4}
						/>
						<button
							type="button"
							className="ai-send-btn"
							onClick={handleSend}
							disabled={!userInput.trim()}
						>
							<Send className="send-icon" />
							Send
						</button>
					</div>

					{/* Response Area */}
					{!isWaiting && (
						<div className="ai-response-section">
							<div className="ai-response-bubble">
								<p className="ai-response-text">{aiResponse}</p>
							</div>
						</div>
					)}
					{isWaiting && (
						<div className="ai-response-section-w">
							<div className="ai-response-bubble-w">
								<div className="ai-loading">
									<span className="dot"></span>
									<span className="dot"></span>
									<span className="dot"></span>
									<span className="loading-text">Thinking...</span>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default AIAssistantTab;
