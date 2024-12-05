import React, { useState } from "react";
import "./atletasAdicionar.css";
import {
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  SportsSoccer as SportsSoccerIcon,
  Public as PublicIcon,
  Star as StarIcon,
  Link as LinkIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";

export default function AtletasAdicionar() {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
  };

  return (
    <div className="atletasadicionar-container">
      <form className="atletasadicionar-form" onSubmit={handleSubmit}>
        <div className="atletasadicionar-input-group">
          <PersonIcon />
          <input
            type="text"
            name="nome"
            placeholder="Nome do atleta"
            value={formData.nome}
            onChange={handleChange}
          />
        </div>
        <div className="atletasadicionar-input-group">
          <CalendarTodayIcon />
          <input
            type="date"
            name="dataNascimento"
            placeholder="Data de Nascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
          />
          <select
            name="escalao"
            value={formData.escalao}
            onChange={handleChange}
          >
            <option value="" disabled>
              Escalão
            </option>
            <option value="SUB-16">SUB-16</option>
            <option value="SUB-17">SUB-17</option>
            <option value="SUB-18">SUB-18</option>
          </select>
        </div>
        <div className="atletasadicionar-input-group">
          <PersonIcon />
          <select
            name="clube"
            value={formData.clube}
            onChange={handleChange}
          >
            <option value="" disabled>
              Clube
            </option>
            <option value="SL Benfica">SL Benfica</option>
            <option value="FC Porto">FC Porto</option>
          </select>
          <SportsSoccerIcon />
          <select
            name="posicao"
            value={formData.posicao}
            onChange={handleChange}
          >
            <option value="" disabled>
              Posição
            </option>
            <option value="PL">PL</option>
            <option value="MC">MC</option>
          </select>
        </div>
        <div className="atletasadicionar-input-group">
          <PublicIcon />
          <select
            name="nacionalidade"
            value={formData.nacionalidade}
            onChange={handleChange}
          >
            <option value="" disabled>
              Nacionalidade
            </option>
            <option value="Portugal">Portugal</option>
            <option value="Brasil">Brasil</option>
          </select>
        </div>
        <div className="atletasadicionar-input-group">
          <LinkIcon />
          <input
            type="url"
            name="link"
            placeholder="Link"
            value={formData.link}
            onChange={handleChange}
          />
        </div>
        <div className="atletasadicionar-input-group">
          <StarIcon />
          <input
            type="number"
            name="rating"
            placeholder="Rating Final"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
        </div>
        <div className="atletasadicionar-input-group">
          <PersonIcon />
          <input
            type="text"
            name="contatoNome"
            placeholder="Nome do Contato"
            value={formData.contatoNome}
            onChange={handleChange}
          />
        </div>
        <div className="atletasadicionar-input-group">
          <PhoneIcon />
          <input
            type="tel"
            name="contatoTelefone"
            placeholder="Contato telefônico"
            value={formData.contatoTelefone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="atletasadicionar-submit-button">
          Criar
        </button>
      </form>
    </div>
  );
}
