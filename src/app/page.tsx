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
	return (
		<main style={{ minHeight: "100vh", padding: "24px" }}>
			<h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e40af", marginBottom: "16px" }}>
				Aluguel de Imóveis por Temporada
			</h1>
			<p style={{ fontSize: "1.125rem", color: "#475569", maxWidth: "700px", marginBottom: "32px" }}>
				Encontre o imóvel ideal para suas férias! Escolha entre casas, apartamentos e muito mais em destinos incríveis.
			</p>

			<div className="grid" style={{ maxWidth: 900 }}>
				{[1, 2, 3].map((id) => (
					<Card key={id} className="shadow-md">
						<h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "8px" }}>Apartamento {id} - Copacabana</h2>
						<p style={{ color: "#64748b", marginBottom: "8px" }}>2 quartos • Próximo à praia • A partir de R$450/noite</p>
						<Button>Ver Detalhes</Button>
					</Card>
				))}
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
					<input id="question" type="text" placeholder="Digite sua mensagem..." />
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
