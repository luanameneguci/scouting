import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./atletasAdicionar.css";
import axios from 'axios';
import {
  SportsSoccer as SportsSoccerIcon,
  CalendarToday as CalendarTodayIcon,
  Group as GroupIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";

export default function JogosAdicionar() {
  const url = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    data: "",
    escalao: "",
    clube1: "",
    clube2: "",
    hora: "",
    jogadores: [],
    treinadores: [],
    jogadorTreinador: {} // Novo estado para armazenar as relações jogador-treinador
  });
  const [clubes, setClubes] = useState([]);
  const [escaloes, setEscaloes] = useState([]);
  const [jogadores, setJogadores] = useState([]);
  const [treinadores, setTreinadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get(url + '/clube/listar').then((res) => {
        if (res.status === 200) {
          setClubes(res.data.data);
        } else {
          throw new Error(res.data.message);
        }
      })
    } catch (e) {
      console.error("Erro ao listar clubes:", e);
    }

    try {
      axios.get(url + '/escalao/listar').then((res) => {
        if (res.status === 200) {
          setEscaloes(res.data.data);
        } else {
          throw new Error(res.data.message);
        }
      })
    } catch (e) {
      console.error("Erro ao listar escalões:", e);
    }

    try {
      axios.get(url + '/utilizador/treinadores').then((res) => {
        if (res.status === 200) {
          setTreinadores(res.data.treinadores);
        } else {
          throw new Error(res.data.message);
        }
      })
    } catch (e) {
      console.error("Erro ao listar treinadores:", e);
    }
  }, []);

  useEffect(() => {
    if (formData.escalao) {
      fetch(`${url}/jogo/atletas/${formData.escalao}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setJogadores(data.data);
          } else {
            console.error("Erro ao listar jogadores:", data.message);
            setJogadores([]);
          }
        })
        .catch((err) => {
          console.error("Erro de rede ao listar jogadores:", err);
          setJogadores([]);
        });
    } else {
      setJogadores([]);
    }
  }, [formData.escalao]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prevData) => {
      const jogadoresArray = prevData.jogadores || [];
      
      if (checked) {
        return {
          ...prevData,
          jogadores: [...jogadoresArray, value],
        };
      } else {
        // Remove o jogador e sua relação com treinador
        const newJogadorTreinador = { ...prevData.jogadorTreinador };
        delete newJogadorTreinador[value];
        
        return {
          ...prevData,
          jogadores: jogadoresArray.filter((j) => j !== value),
          jogadorTreinador: newJogadorTreinador
        };
      }
    });
  };

  const handleTrainerSelect = (jogadorId, treinadorId) => {
    setFormData(prevData => ({
      ...prevData,
      jogadorTreinador: {
        ...prevData.jogadorTreinador,
        [jogadorId]: treinadorId
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Preparar os dados com as relações jogador-treinador
    const jogadorTreinadorArray = Object.entries(formData.jogadorTreinador).map(([jogadorId, treinadorId]) => ({
      id_atleta: jogadorId,
      id_treinador: treinadorId
    }));

    const requestData = {
      id_clube: formData.clube1,
      id_clube2: formData.clube2,
      id_escalao: formData.escalao,
      data: `${formData.data}T${formData.hora}:00Z`,
      jogadorTreinador: jogadorTreinadorArray
    };

    try {
      const response = await axios.post(`${url}/jogo/criar`, requestData);
      
      if (response.status === 200) {
        alert("Jogo criado com sucesso!");
        navigate("/jogos");
      } else {
        throw new Error(response.data.message || "Erro ao criar jogo");
      }
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
        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Clube1</label>
          <div className="atletasadicionar-input-group">
            <SportsSoccerIcon />
            <select
              name="clube1"
              value={formData.clube1}
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

        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Clube2</label>
          <div className="atletasadicionar-input-group">
            <SportsSoccerIcon />
            <select
              name="clube2"
              value={formData.clube2}
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

        <div className="atletasadicionar-form-group">
          <label className="atletasadicionar-label">Jogadores</label>
          <div className="jogadoresadicionar-input-group">
            {jogadores.length > 0 ? (
              jogadores.map((jogador) => (
                <div key={jogador.id_atleta} className="atleta-item">
                  <div className="atleta-row">
                    <label>
                      <input
                        type="checkbox"
                        value={jogador.id_atleta}
                        onChange={handleCheckboxChange}
                        checked={formData.jogadores.includes(jogador.id_atleta.toString())}
                      />
                      {jogador.nome}
                    </label>
                    
                    {formData.jogadores.includes(jogador.id_atleta.toString()) && (
                      <select
                        value={formData.jogadorTreinador[jogador.id_atleta] || ""}
                        onChange={(e) => handleTrainerSelect(jogador.id_atleta, e.target.value)}
                        className="treinador-select"
                        required
                      >
                        <option value="">Selecione um treinador</option>
                        {treinadores.map((treinador) => (
                          <option key={treinador.id_treinador} value={treinador.id_treinador}>
                            {treinador.nome}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Não há jogadores disponíveis para este escalão.</p>
            )}
          </div>
        </div>

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