import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
} from "@mui/icons-material";

export default function AtletasEditar() {
  const { id } = useParams(); // ID do atleta na URL (ex: /atletas/perfil/2 -> 2)
  const navigate = useNavigate();

  // Mesmo formData do "AtletasAdicionar", com os mesmos campos:
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    escalao: "",
    clube: "",
    nacionalidade: "",
    link: "",
    rating: "",
    contatoNome: "",
    contatoTelefone: "",
  });

  // Lista de nacionalidades (carregada do back, igual a "AtletasAdicionar")
  const [listaNacionalidades, setListaNacionalidades] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --------------------------------------------------------
  // 1) Carregar nacionalidades assim que a tela monta
  // --------------------------------------------------------
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

  // --------------------------------------------------------
  // 2) Buscar dados do atleta para preencher o form
  //    GET /atleta/:id  (ex.: /atleta/2)
  // --------------------------------------------------------
  useEffect(() => {
    async function fetchAtleta() {
      try {
        const response = await fetch(`http://localhost:8080/atleta/${id}`);
        if (!response.ok) throw new Error("Erro ao carregar dados do atleta");
        const data = await response.json();

        // Ajustar para seu back-end: se data.datanascimento for "YYYY-MM-DD", ótimo;
        // se for outro formato, converta para date input
        // PREENCHER os campos do formData com o que vier do back:
        setFormData({
          nome: data.nome || "",
          dataNascimento: data.datanascimento || "", // ex.: "2005-08-15"
          escalao: data.id_escalao?.toString() || "", // se seu back manda data.id_escalao
          clube: data.id_clube?.toString() || "",     // se seu back manda data.id_clube
          nacionalidade:
            data.nacionalidades && data.nacionalidades.length > 0
              ? data.nacionalidades[0].id_nacionalidade?.toString()
              : "",
          link: data.link || "",
          rating: data.ratingfinal?.toString() || "",
          contatoNome: data.nomeencarregado || "",
          contatoTelefone: data.contactoencarregado || "",
        });
      } catch (err) {
        console.error("Erro ao carregar atleta:", err);
        setError("Não foi possível carregar os dados do atleta.");
      }
    }
    fetchAtleta();
  }, [id]);

  // --------------------------------------------------------
  // 3) handleChange igual
  // --------------------------------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --------------------------------------------------------
  // 4) Submeter -> PUT /atleta/editar/:id_atleta
  // --------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/atleta/editar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_clube: formData.clube,
          id_escalao: formData.escalao,
          id_statusatleta: 1, // se quiser fixo
          nome: formData.nome,
          datanascimento: formData.dataNascimento,
          link: formData.link,
          ratingfinal: formData.rating,
          ratinggeral: formData.rating,
          nomeencarregado: formData.contatoNome,
          contactoencarregado: formData.contatoTelefone,
          // Se seu backend aceita "nacionalidades" no editar,
          // talvez precise mandar array:
          // nacionalidades: [ formData.nacionalidade ],
        }),
      });
      if (!response.ok) throw new Error("Erro ao editar atleta");
      alert("Atleta editado com sucesso!");
      navigate("/atletas"); // Redireciona para a listagem
    } catch (err) {
      console.error("Erro ao editar atleta:", err);
      setError("Erro ao editar atleta. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------
  // 5) UI: exatamente igual ao "AtletasAdicionar",
  //    mas com o button dizendo "Atualizar" (ou "Salvar")
  // --------------------------------------------------------
  return (
    <div className="atletasadicionar-container">
      <form className="atletasadicionar-form" onSubmit={handleSubmit}>
        <h2>Editar Atleta (ID: {id})</h2>

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
                <option value="" disabled>Escalão</option>
                <option value="1">SUB-16</option>
                <option value="2">SUB-17</option>
                <option value="3">SUB-18</option>
                {/* Ajuste conforme seu BD */}
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
              <option value="" disabled>Clube</option>
              <option value="1">SL Benfica</option>
              <option value="2">FC Porto</option>
              {/* Ajuste se tiver mais clubes no BD */}
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
              <option value="" disabled>Nacionalidade</option>
              {listaNacionalidades.map((nat) => (
                <option key={nat.id_nacionalidade} value={nat.id_nacionalidade}>
                  {nat.designacao}
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
          {loading ? "Enviando..." : "Atualizar"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
