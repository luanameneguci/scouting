import React, { useState } from "react";
import "./atletasAdicionar.css";

export default function AtletaAdicionar() {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    escalao: "",
    clube: "",
    posicao: "",
    nacionalidade: "",
    link: "",
    rating: "",
    contatoNome: "",
    contatoTelefone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do Atleta:", formData);
    // Adicione aqui a lógica para enviar os dados para um backend.
  };

  return (
    <div className="AtletaAdicionar-page">
      <h1 className="AtletaAdicionar-Titulo">Adicionar Atleta</h1>
      <form className="AtletaAdicionar-form" onSubmit={handleSubmit}>
        <div className="AtletaAdicionar-form-group">
          <label>Nome do Atleta</label>
          <input
            type="text"
            name="nome"
            placeholder="Digite o nome do atleta"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="AtletaAdicionar-form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="AtletaAdicionar-form-group">
          <label>Escalão</label>
          <select
            name="escalao"
            value={formData.escalao}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Sub-16">Sub-16</option>
            <option value="Sub-17">Sub-17</option>
            <option value="Sub-18">Sub-18</option>
          </select>
        </div>

        <div className="AtletaAdicionar-form-group">
          <label>Clube</label>
          <select
            name="clube"
            value={formData.clube}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="SL Benfica">SL Benfica</option>
            <option value="FC Porto">FC Porto</option>
          </select>
        </div>

        <div className="AtletaAdicionar-form-group">
          <label>Posição</label>
          <select
            name="posicao"
            value={formData.posicao}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="PL">PL</option>
            <option value="DEF">DEF</option>
            <option value="MC">MC</option>
          </select>
        </div>

        <div className="AtletaAdicionar-form-group">
          <label>Nacionalidade</label>
          <select
            name="nacionalidade"
            value={formData.nacionalidade}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Portugal">Portugal</option>
            <option value="Brasil">Brasil</option>
            <option value="Espanha">Espanha</option>
          </select>
        </div>

        <div className="AtletaAdicionar-form-group">
          <label>Link</label>
          <input
            type="url"
            name="link"
            placeholder="https://example.com"
            value={formData.link}
            onChange={handleChange}
          />
        </div>

        <div className="AtletaAdicionar-form-group">
          <label>Rating Final</label>
          <input
            type="number"
            name="rating"
            placeholder="1-5"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </div>

        <div className="AtletaAdicionar-form-group">
          <label>Nome do Contacto</label>
          <input
            type="text"
            name="contatoNome"
            placeholder="Digite o nome do contato"
            value={formData.contatoNome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="AtletaAdicionar-form-group">
          <label>Contato Telefónico</label>
          <input
            type="tel"
            name="contatoTelefone"
            placeholder="912345678"
            value={formData.contatoTelefone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="AtletaAdicionar-add-button">
          Criar
        </button>
      </form>
    </div>
  );
}
