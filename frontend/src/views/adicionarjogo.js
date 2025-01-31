import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./atletasAdicionar.css";
import {
  SportsSoccer as SportsSoccerIcon,
  CalendarToday as CalendarTodayIcon,
  Group as GroupIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";

export default function JogosAdicionar() {
  const [formData, setFormData] = useState({
    nome: "",
    data: "",
    escalao: "",
    clube: "",
    hora: "",
    jogadores: [],
  });
  const [clubes, setClubes] = useState([]);
  const [escaloes, setEscaloes] = useState([]);
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Carregar clubes e escalões na primeira renderização
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

  // Atualiza os jogadores sempre que o escalão mudar
  useEffect(() => {
    if (formData.escalao) {
      fetch(`http://localhost:8080/jogo/atletas/${formData.escalao}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);  // Adicione um log para ver a resposta
          if (data.success) {
            setJogadores(data.data);
          } else {
            console.error("Erro ao listar jogadores:", data.message);
            setJogadores([]); // Caso não encontre jogadores, esvazia a lista
          }
        })
        .catch((err) => {
          console.error("Erro de rede ao listar jogadores:", err);
          setJogadores([]); // Em caso de erro de rede, esvazia a lista
        });
    } else {
      setJogadores([]); // Se não houver escalão selecionado, esvazia a lista de jogadores
    }
  }, [formData.escalao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        jogadores: [...prevData.jogadores, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        jogadores: prevData.jogadores.filter((j) => j !== value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/jogo/criar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_clube: formData.clube,
          id_escalao: formData.escalao,
          nome: formData.nome,
          data: formData.data,
          hora: formData.hora,
          jogadores: formData.jogadores,
        }),
      });

      if (!response.ok) throw new Error("Erro ao criar jogo");
      alert("Jogo criado com sucesso!");
      navigate("/jogos");
    } catch (err) {
      console.error("Erro ao criar jogo:", err);
      setError("Erro ao criar jogo. Verifique os dados e tente novamente.");
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
                name="data"
                value={formData.data}
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

        {/* Jogadores Selecionados */}
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Jogadores</label>
          <div className="jogadoresadicionar-input-group">
            {jogadores.length > 0 ? (
              jogadores.map((jogador) => (
                <div key={jogador.id_atleta} className="atleta-item">
                  <label>
                    <input
                      type="checkbox"
                      value={jogador.id_atleta}
                      onChange={handleCheckboxChange}
                    />
                    {jogador.nome}
                  </label>
                </div>
              ))
            ) : (
              <p>Não há jogadores disponíveis para este escalão.</p>
            )}
          </div>
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          className="atletasadicionar-submit-button"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Criar Jogo"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
