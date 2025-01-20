import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./atletasAdicionar.css";
import {
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  SportsSoccer as SportsSoccerIcon,
  Public as PublicIcon,
  Star as StarIcon,
  Link as LinkIcon,
  Phone as PhoneIcon,
  Group as GroupIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";

export default function AtletasAdicionar() {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    escalao: "",
    clube: "",
    contatoNome: "",
    hora: "",
    atleta: "",
  });
  const [clubes, setClubes] = useState([]); // << NOVO state para armazenar clubes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 1) useEffect para carregar os clubes ao montar
  useEffect(() => {
    fetch("http://localhost:8080/clube/listar") // a rota que você criou
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setClubes(data.data); // Preenche o array com os clubes do banco
        } else {
          console.error("Erro ao listar clubes:", data);
        }
      })
      .catch((err) => {
        console.error("Erro de rede ao listar clubes:", err);
      });
  }, []);

  // Função de mudança dos campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2) handleSubmit enviando o form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/atleta/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_clube: formData.clube,
          id_escalao: formData.escalao,
          id_statusatleta: 1,
          nome: formData.nome,
          datanascimento: formData.dataNascimento,
          nomeencarregado: formData.contatoNome,
          contactoencarregado: formData.contatoTelefone,
          hora: formData.hora,
          atleta: formData.atleta,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar atleta");
      alert("Atleta criado com sucesso!");
      navigate("/atletas");
    } catch (err) {
      console.error("Erro ao criar atleta:", err);
      setError("Erro ao criar atleta. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="atletasadicionar-container">
      <form className="atletasadicionar-form" onSubmit={handleSubmit}>
        
        {/* Clube */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Clube</label>
          <div className="atletasadicionar-input-group">
            <SportsSoccerIcon />
            <select
              name="clube"
              value={formData.clube}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Selecione o clube</option>
              {clubes.map((c) => (
                <option key={c.id_clube} value={c.id_clube}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Data */}
        <div className="atletasadicionar-form-row">
          <div className="atletasadicionar-form-group">
            <label className="atletasadicionar-label">Data</label>
            <div className="atletasadicionar-input-group">
              <CalendarTodayIcon />
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Escalão */}
        <div className="atletasadicionar-form-row">
          <div className="atletasadicionar-form-group">
            <label className="atletasadicionar-label">Escalão</label>
            <div className="atletasadicionar-input-group">
              <GroupIcon />
              <select
                name="escalao"
                value={formData.escalao}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Escalão</option>
                <option value="1">SUB-23</option>
                <option value="2">SUB-19</option>
                <option value="3">SUB-16</option>
                <option value="4">SUB-14</option>
                <option value="5">SUB-13</option>
                <option value="6">SUB-12</option>
                <option value="7">SUB-11</option>
                <option value="8">SUB-10</option>
              </select>
            </div>
          </div>
        </div>

        {/* Treinador */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Treinador</label>
          <div className="atletasadicionar-input-group">
            <PersonIcon />
            <input
              type="text"
              name="contatoNome"
              placeholder="Nome"
              value={formData.contatoNome}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Hora */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Hora</label>
          <div className="atletasadicionar-input-group">
            <AccessTimeIcon />
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Atleta */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Atleta</label>
          <div className="atletasadicionar-input-group">
            <PersonIcon />
            <input
              type="text"
              name="atleta"
              placeholder="Atleta"
              value={formData.atleta}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          className="atletasadicionar-submit-button"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Adicionar"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}