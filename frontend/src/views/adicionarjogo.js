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
  const [clubes, setClubes] = useState([]); // Novo estado para armazenar clubes
  const [escaloes, setEscaloes] = useState([]); // Novo estado para armazenar escalões
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // 1) useEffect para carregar os clubes ao montar
  useEffect(() => {
    fetch("http://localhost:8080/clube/listar")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setClubes(data.data);
        } else {
          console.error("Erro ao listar clubes:", data.message);
        }
      })
      .catch((err) => {
        console.error("Erro de rede ao listar clubes:", err);
      });

    // 2) useEffect para carregar os escalões ao montar
    fetch("http://localhost:8080/escalao/listar")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEscaloes(data.data);
        } else {
          console.error("Erro ao listar escalões:", data.message);
        }
      })
      .catch((err) => {
        console.error("Erro de rede ao listar escalões:", err);
      });
  }, []);

  // Função de mudança dos campos
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3) handleSubmit enviando o form
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
                <option value="" disabled>Selecione o escalão</option>
                {escaloes.map((e) => (
                  <option key={e.id_escalao} value={e.id_escalao}>
                    {e.designacao}
                  </option>
                ))}
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
