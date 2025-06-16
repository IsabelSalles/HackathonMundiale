"use client";

import React, { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { perguntaChatbot } from "./chatbot";

export default function Home() {
	const [chatOpen, setChatOpen] = useState(false);
	const [chat, setChat] = useState<string[]>([]);
	const fazerPergunta = async (pergunta: string) => {
		setChat([...chat, pergunta]);
		const resposta = await perguntaChatbot(pergunta);
		setChat((prevChat) => [...prevChat, resposta]);
	}
	const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const input = e.currentTarget;
			if (input.value.trim() !== "") {
				fazerPergunta(input.value.trim());
				input.value = "";
				input.focus();
			}
		}
	};

	return (
		<main style={{ minHeight: "100vh", padding: "24px" }}>
			<h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e40af", marginBottom: "16px" }}>
				Consultório de Acupuntura e Terapias Integrativas
			</h1>
			<p style={{ fontSize: "1.125rem", color: "#475569", maxWidth: "700px", marginBottom: "32px" }}>
				Cuidando do paciente desde o primeiro contato: agendamentos e informações na palma da mão.
			</p>

			<div className="grid" style={{ maxWidth: 900 }}>
				<Card key={1} className="shadow-md">
					<h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "8px" }}>Acupuntura</h2>
					<p style={{ color: "#64748b", marginBottom: "8px" }}>Terapia a laser que ajuda a cicatrização</p>
					<Button>Ver Detalhes</Button>
				</Card>
				<Card key={2} className="shadow-md">
					<h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "8px" }}>Laserterapia</h2>
					<p style={{ color: "#64748b", marginBottom: "8px" }}>Terapia a laser que ajuda a cicatrização</p>
					<Button>Ver Detalhes</Button>
				</Card>
				<Card key={3} className="shadow-md">
					<h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "8px" }}>Ventosaterapia</h2>
					<p style={{ color: "#64748b", marginBottom: "8px" }}>Terapia que auxilia na dor e tratamento de coluna</p>
					<Button>Ver Detalhes</Button>
				</Card>
				<Card key={4} className="shadow-md">
					<h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "8px" }}>Moxaterapia</h2>
					<p style={{ color: "#64748b", marginBottom: "8px" }}>Técnica da acupuntura que auxilia em vários tratamentos</p>
					<Button>Ver Detalhes</Button>
				</Card>
			</div>

			<motion.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => setChatOpen(!chatOpen)}
				className="floating-btn"
				aria-label="Abrir Chatbot"
			>
				<MessageCircle size={24} color="white" />
			</motion.button>

			{chatOpen && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 50 }}
					className="chatbot"
				>
					<h3 style={{ fontWeight: "600", marginBottom: "8px" }}>Chatbot de Atendimento</h3>
					<p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "8px" }}>
						Como posso te ajudar? 😊
					</p>
					{chat.map((message, index) => (
						<div key={index} style={{ marginBottom: "8px", padding: "8px", backgroundColor: "#f3f4f6", borderRadius: "4px" }}>
							{message}
						</div>
					))}
					<input
						id="question"
						type="text"
						placeholder="Digite sua mensagem..." 
						onKeyDown={keyDownHandler}
					/>
					<Button onClick={() => {
						let input = document.getElementById("question") as HTMLInputElement;
						if (input.value.trim() !== "") {
							fazerPergunta(input.value.trim());
							input.value = "";
						}
					}}>Enviar</Button>
				</motion.div>
			)}
		</main>
	);
}
