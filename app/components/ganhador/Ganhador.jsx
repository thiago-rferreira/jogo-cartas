import React from 'react';
import estilo from './ganhador.module.css';

const Ganhador = ({ isOpen, onClose, winnerCard, player }) => {
  if (!isOpen) {
    return null;
  }

  console.log('aqui', winnerCard)

  return (
    <>
     {
        winnerCard ? (
            <div className={estilo.modal_overlay}>
            <div className={estilo.modal}>
              <div className={estilo.modal_header}>
                <h2>Resultado da Batalha</h2>
                <button className={estilo.close_button} onClick={onClose}>
                  Fechar
                </button>
              </div>
              <div className={estilo.modal_body}>
                <h1>{winnerCard.nome} é o vencedor!</h1>
                <h2>{player} é o vencedor desse duelo!</h2>
                <img src={winnerCard.imagem} alt={winnerCard.nome} />
                <p>Ataque: {winnerCard.ataque}</p>
                <p>Defesa: {winnerCard.defesa}</p>
              </div>
            </div>
          </div>
        ):(null)
       
    }
    </>
   
   
  );
};

export default Ganhador;
