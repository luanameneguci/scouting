import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./atletasAdicionar.css";
import {
  Person as PersonIcon,
  CalendarToday as CalendarTodayIcon,
  SportsSoccer as SportsSoccerIcon,
  Public as PublicIcon,     // (Usando de novo para "Posição")
  Star as StarIcon,
  Link as LinkIcon,
  Phone as PhoneIcon,
  Group as GroupIcon,
} from "@mui/icons-material";

export default function AtletasAdicionar() {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    escalao: "",
    clube: "",
    // Adicionando/Usando "posicao" para ID da posição selecionada
    posicao: "",
    nacionalidade: "",
    link: "",
    rating: "",
    contatoNome: "",
    contatoTelefone: "",
  });

  // Lista de nacionalidades
  const [listaNacionalidades, setListaNacionalidades] = useState([]);
  // ★ NOVO: Lista de posicoes
  const [listaPosicoes, setListaPosicoes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Carregar nacionalidades
  useEffect(() => {
    fetch("http://localhost:8080/atleta/nacionalidades")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setListaNacionalidades(data.data);
        } else {
          console.error("Erro ao carregar nacionalidades:", data.message);
        }
      })
      .catch((err) => console.error("Erro ao buscar nacionalidades:", err));
  }, []);

  // ★ NOVO: Carregar posicoes
  useEffect(() => {
    fetch("http://localhost:8080/atleta/posicoes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setListaPosicoes(data.data);
        } else {
          console.error("Erro ao carregar posicoes:", data.message);
        }
      })
      .catch((err) => console.error("Erro ao buscar posicoes:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          link: formData.link,
          ratingfinal: formData.rating,
          ratinggeral: formData.rating,
          nomeencarregado: formData.contatoNome,
          contactoencarregado: formData.contatoTelefone,
          // Se for apenas 1 nacionalidade
          nacionalidades: [formData.nacionalidade],
          // ★ NOVO: Mandar posicoes como array [ ID ]
          posicoes: [formData.posicao],
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
        {/* Nome do atleta */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Nome do atleta</label>
          <div className="atletasadicionar-input-group">
            <PersonIcon />
            <input
              type="text"
              name="nome"
              placeholder="Nome do atleta"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Data de Nascimento e Escalão */}
        <div className="atletasadicionar-form-row">
          <div className="atletasadicionar-form-group">
            <label className="atletasadicionar-label">Data de Nascimento</label>
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
                <option value="" disabled>
                  Escalão
                </option>
                <option value="1">SUB-16</option>
                <option value="2">SUB-17</option>
                <option value="3">SUB-18</option>
              </select>
            </div>
          </div>
        </div>

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
              <option value="" disabled>
                Clube
              </option>
              <option value="1">SL Benfica</option>
              <option value="2">FC Porto</option>
            </select>
          </div>
        </div>

        {/* Nacionalidade */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Nacionalidade</label>
          <div className="atletasadicionar-input-group">
            <PublicIcon />
            <select
              name="nacionalidade"
              value={formData.nacionalidade}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Nacionalidade
              </option>
              {listaNacionalidades.map((nat) => (
                <option key={nat.id_nacionalidade} value={nat.id_nacionalidade}>
                  {nat.designacao}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ★ NOVO: Posição */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Posição</label>
          <div className="atletasadicionar-input-group">
            <PublicIcon /> {/* Usei o mesmo ícone PublicIcon, mas pode trocar */}
            <select
              name="posicao"
              value={formData.posicao}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecionar posição
              </option>
              {listaPosicoes.map((pos) => (
                <option key={pos.id_posicao} value={pos.id_posicao}>
                  {pos.designacao}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Link */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Link</label>
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
        </div>

        {/* Rating */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Rating Final</label>
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
              required
            />
          </div>
        </div>

        {/* Nome do Contato */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Nome do Encarregado</label>
          <div className="atletasadicionar-input-group">
            <PersonIcon />
            <input
              type="text"
              name="contatoNome"
              placeholder="Nome do Encarregado"
              value={formData.contatoNome}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contato Telefônico */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Contato Telefônico</label>
          <div className="atletasadicionar-input-group">
            <PhoneIcon />
            <input
              type="tel"
              name="contatoTelefone"
              placeholder="Contato Telefônico"
              value={formData.contatoTelefone}
              onChange={handleChange}
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
