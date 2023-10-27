'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import Herois, { Heroi } from '../models/herois';
import fetchApiData from '../data/heroisApi';
import estilo from './page.module.css';
import Ganhador from './components/ganhador/Ganhador';

const heroisInstancia = new Herois();

function page() {

  const [herois, setHerois] = useState([]);
  const [apiData, setApiData] = useState(null);

  const [player1, setplayer1] = useState(null);
  const [player2, setplayer2] = useState(null);

  const [player1Pontos, setplayer1Pontos] = useState(0);
  const [player2Pontos, setplayer2Pontos] = useState(0);

  const [ganhador, setGanhador] = useState(null);

  const [player1Herois, setplayer1Herois] = useState(null);
  const [player2Herois, setplayer2Herois] = useState(null);

  const [player1HeroiSelecionado, setplayer1HeroiSelecionado] = useState(null);
  const [player2HeroiSelecionado, setplayer2HeroiSelecionado] = useState(null);

  const [heroiMostar, setHeroiMostrar] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const dados = await fetchApiData();
        setApiData(dados);
      } catch (error) {
        // Lidar com erros de chamada à API
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (apiData) {
      apiData.forEach((heroi) => {
        const { id, attributes } = heroi;
        const novoHeroi = new Heroi({
          id: id,
          nome: attributes.nome,
          imagem: attributes.imagem,
          ataque: attributes.ataque,
          defesa: attributes.defesa,
          plataforma: attributes.plataforma
        });

        heroisInstancia.addHeroi(novoHeroi);
      });
      setHerois(heroisInstancia.getHerois())
    }
  }, [apiData]);

  const select5RandomHeroes = () => {
    const randomHeroes = [];
    const herois = heroisInstancia.select5RandomHerois();
    herois.forEach((heroi) => {
      randomHeroes.push(heroi);
    }
    );
    return randomHeroes;
  }

  useEffect(() => {
    if (herois.length > 0) {
      const randomHeroes = select5RandomHeroes();
      setplayer1Herois(randomHeroes);
    }
  }, [herois]);

  useEffect(() => {
    if (herois.length > 0) {
      const randomHeroes = select5RandomHeroes();
      setplayer2Herois(randomHeroes);
    }
  }, [herois]);


  function selecionarHeroi(player, heroi) {
    if (player == 'player1') {
      console.log('selecionar', heroi + player)
      setplayer1HeroiSelecionado(heroi,);
    } else {
      console.log('selecionar', heroi + player)
      setplayer2HeroiSelecionado(heroi);
    }
  }

  const batalhar = (player1HeroiSelecionado, player2HeroiSelecionado) => {
    const p1Indice = Number(player1HeroiSelecionado.ataque) + Number(player1HeroiSelecionado.defesa);
    const p2Indice = Number(player2HeroiSelecionado.ataque) + Number(player2HeroiSelecionado.defesa);

    console.log('Player 1 Pontos:', p1Indice);
    console.log('Player 2 Pontos:', p2Indice);

    if (p1Indice == p2Indice) { // Condição de empate
      removerCartaPerdedora(player1HeroiSelecionado, player2HeroiSelecionado);
      console.log('Empate');
      limparCartasSelecionadas();

    } else if (p1Indice > p2Indice) {
      setplayer1Pontos(player1Pontos + 1);
      removerCartaPerdedora(player1HeroiSelecionado, player2HeroiSelecionado);
      console.log('Player 1 ganhou')
      setGanhador('Jogador 1');
      setModalOpen(true);
      setHeroiMostrar(player1HeroiSelecionado)
      limparCartasSelecionadas();

    } else {
      setplayer2Pontos(player2Pontos + 1);
      removerCartaPerdedora(player1HeroiSelecionado, player2HeroiSelecionado);
      console.log('Player 2 ganhou')
      setGanhador('Jogador 2');
      setHeroiMostrar(player2HeroiSelecionado)
      setModalOpen(true);
      limparCartasSelecionadas();

    }

  }

  const limparCartasSelecionadas = () => {
    setplayer1HeroiSelecionado(null);
    setplayer2HeroiSelecionado(null);
  }

  const removerCartaPerdedora = (player1HeroiSelecionado, player2HeroiSelecionado) => {
    const p1Indice = Number(player1HeroiSelecionado.ataque + player1HeroiSelecionado.defesa);
    const p2Indice = Number(player2HeroiSelecionado.ataque + player2HeroiSelecionado.defesa);

    if (p1Indice == p2Indice) {
      setplayer1Herois(player1Herois.filter((heroi) => heroi.id !== player1HeroiSelecionado.id));
      setplayer2Herois(player2Herois.filter((heroi) => heroi.id !== player2HeroiSelecionado.id));
    } else if (p1Indice > p2Indice) {
      setplayer2Herois(player2Herois.filter((heroi) => heroi.id !== player2HeroiSelecionado.id));
    } else {
      setplayer1Herois(player1Herois.filter((heroi) => heroi.id !== player1HeroiSelecionado.id));
    }
  }

  return (
    <>
      <div className={estilo.mainDiv}>
        <div className={estilo.subDiv}>
          {
            player1Herois ? (
              <div className={estilo.subDiv}>
                <p>Cartas Player 1 - Pontos: {player1Pontos}</p>
                <div className={estilo.deckPlayers}>
                  {
                    player1Herois.map((heroi) => (
                      <div className={estilo.herois} key={heroi.id}>
                        <h2>{heroi.nome}</h2>
                        <p>Ataque: {heroi.ataque}</p>
                        <p>Defesa: {heroi.defesa}</p>
                        <img className={estilo.imagem} onClick={() => selecionarHeroi('player1', heroi)} src={heroi.imagem} alt={heroi.nome} />
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : (
              <div>
                <p>Carregando Player 1...</p>
              </div>
            )
          }
        </div>
        <div className={estilo.subDiv}>
          {
            player2Herois ? (
              <div className={estilo.subDiv}>
                <p>Cartas Player 2  - Pontos: {player2Pontos}</p>
                <div className={estilo.deckPlayers}>
                  {
                    player2Herois.map((heroi) => (
                      <div className={estilo.herois} key={heroi.id}>
                        <h2>{heroi.nome}</h2>
                        <p>Ataque: {heroi.ataque}</p>
                        <p>Defesa: {heroi.defesa}</p>
                        <img className={estilo.imagem} onClick={() => selecionarHeroi('player2', heroi)} src={heroi.imagem} alt={heroi.nome} width={128} />
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : (
              <div>
                <p>Carregando Player 2...</p>
              </div>
            )
          }
        </div>

      </div>
      <div className={estilo.heroisSelecionados}>
        <div>
          <p>Carta Selecionada Player 1</p>
          {
            player1HeroiSelecionado ? (
              <div className={estilo.herois} key={player1HeroiSelecionado.id}>
                <h2>{player1HeroiSelecionado.nome}</h2>
                <p>Ataque: {player1HeroiSelecionado.ataque}</p>
                <p>Defesa: {player1HeroiSelecionado.defesa}</p>
                <img className={estilo.imagem} src={player1HeroiSelecionado.imagem} alt={player1HeroiSelecionado.nome} width={128} />
              </div>
            ) : (
              <div>
                <p>Esperando Player 1</p>
              </div>
            )
          }
        </div>
        <div>
          <p>Carta Selecionada Player 2</p>
          {
            player2HeroiSelecionado ? (
              <div className={estilo.herois} key={player2HeroiSelecionado.id}>
                <h2>{player2HeroiSelecionado.nome}</h2>
                <p>Ataque: {player2HeroiSelecionado.ataque}</p>
                <p>Defesa: {player2HeroiSelecionado.defesa}</p>
                <img className={estilo.imagem} src={player2HeroiSelecionado.imagem} alt={player2HeroiSelecionado.nome} width={128} />
              </div>
            ) : (
              <div>
                <p>Esperando Player 2</p>
              </div>
            )
          }
        </div>
      </div>
      <div className={estilo.mainDiv}>
        {
          player1HeroiSelecionado && player2HeroiSelecionado ? (
            <div className={estilo.botao}>
              <button onClick={() => batalhar(player1HeroiSelecionado, player2HeroiSelecionado)}>Batalhar</button>
            </div>
          ) : (
            <div>
              <p>Selecione os heróis para batalhar</p>
            </div>
          )
        }
      </div>
      <div>
        {
          ganhador == 'Jogador 1' ? (
            <Ganhador isOpen={modalOpen} onClose={closeModal} winnerCard={heroiMostar} player={ganhador} />
          ) : (
            <Ganhador isOpen={modalOpen} onClose={closeModal} winnerCard={heroiMostar} player={ganhador} />
          )
        }
      </div>
    </>

  )
}

export default page