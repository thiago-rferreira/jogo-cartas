// page.jsx
'use client'
import React, { useState } from 'react';
import Ganhador from '../components/ganhador/Ganhador';

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Simulando dados da carta do jogador 1
  const player1Card = {
    nome: 'Nome do Herói',
    imagem: 'caminho/para/imagem.jpg',
    defesa: 10,
    ataque: 15,
  };

  return (
    <div>
      <h1>Página de Teste</h1>
      <button onClick={openModal}>Mostrar Vencedor</button>
      <Ganhador isOpen={modalOpen} onClose={closeModal} winnerCard={player1Card} />
    </div>
  );
};

export default Page;
