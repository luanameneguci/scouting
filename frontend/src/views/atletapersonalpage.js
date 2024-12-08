import React, { useState } from 'react';
import './atletapersonalpage.css';

export default function Atletaspersonalpage() {
  const [jogadorConfirmado, setJogadorConfirmado] = useState(true);

  const handleToggleConfirmado = () => {
    setJogadorConfirmado(!jogadorConfirmado);
  };

  return (
    <div className="atletaspersonalpage-container">
      {/* Top Action Buttons */}
      <div className="atletaspersonalpage-actions">
        <button className="atletaspersonalpage-action-button-left">Editar</button>
        <button className="atletaspersonalpage-action-button-right">Arquivar</button>
      </div>

      {/* Main Profile Card */}
      <div className="atletaspersonalpage-card">
        <div className="atletaspersonalpage-info">
          <h2 className="atletaspersonalpage-section-title">Atleta</h2>
          <h1 className="atletaspersonalpage-nome">Francisco Machado</h1>
          <p className="atletaspersonalpage-posicao">
            Ponta de Lança (PL) <span className="atletaspersonalpage-text-secondary">Avançate</span>
          </p>
          <p className="atletaspersonalpage-idade">
            12/12/2000 <span className="atletaspersonalpage-text-secondary">20 anos</span>
          </p>
        </div>

        {/* Placeholder for athlete silhouette or image */}
        <div className="atletaspersonalpage-imagem"></div>
      </div>

      {/* Bottom Info Section */}
      <div className="atletaspersonalpage-detalhes">

{/* Box 1: Clube / Nacionalidade */}
<div className="atletaspersonalpage-detail-container">
  <div className="atletaspersonalpage-detail-box">
    <span className="atletaspersonalpage-detail-title">Clube</span>
    <span className="atletaspersonalpage-detail-value">Simba SC</span>
  </div>
  <div className="atletaspersonalpage-detail-box">
    <span className="atletaspersonalpage-detail-title">Nacionalidade</span>
    <span className="atletaspersonalpage-detail-value">Portugal</span>
  </div>
</div>

{/* Box 2: Equipa / Sombra / Escalão / Sub 23 */}
<div className="atletaspersonalpage-detail-container">
  <div className="atletaspersonalpage-detail-box">
    <span className="atletaspersonalpage-detail-title">Equipa</span>
    <span className="atletaspersonalpage-detail-value">Sombra</span>
  </div>
  <div className="atletaspersonalpage-detail-box">
    <span className="atletaspersonalpage-detail-title">Escalão</span>
    <span className="atletaspersonalpage-detail-value">Sub 23</span>
  </div>
</div>

{/* Box 3: Rating final / Rating médio */}
<div className="atletaspersonalpage-detail-container">
  <div className="atletaspersonalpage-detail-box">
    <span className="atletaspersonalpage-detail-title">Rating final</span>
    <span className="atletaspersonalpage-detail-value">★★★★★</span>
  </div>
  <div className="atletaspersonalpage-detail-box">
    <span className="atletaspersonalpage-detail-title">Rating médio</span>
    <span className="atletaspersonalpage-detail-value">3.6</span>
  </div>
</div>

{/* Box 4: Jogador confirmado / Remover Jogador */}
<div className="atletaspersonalpage-detail-container">
  <div className="atletaspersonalpage-detail-box">
    <span className="atletaspersonalpage-detail-title">Jogador confirmado</span>
    <label className="atletaspersonalpage-switch">
      <input
        type="checkbox"
        checked={jogadorConfirmado}
        onChange={handleToggleConfirmado}
      />
      <span className="atletaspersonalpage-slider"></span>
    </label>
  </div>
  <div className="atletaspersonalpage-detail-box">
    <span className="atletaspersonalpage-detail-remove">Remover Jogador</span>
  </div>
</div>

</div>

    </div>
  );
}