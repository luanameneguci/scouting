import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./editarutilizador.css";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Lock as LockIcon,
  AccountBox as AccountBoxIcon,
} from "@mui/icons-material";
import axios from "axios";

export default function EditarUtilizador() {
  const { id } = useParams(); // Obtém o ID do utilizador da URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    confirmarPassword: "",
    tipoUtilizador: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Buscar dados do utilizador ao carregar a página
  useEffect(() => {
    setLoading(true)
    const fetchUtilizador = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/utilizador/${id}`);
        if (response.data) {
          setFormData({
            nome: response.data.nome || "",
            email: response.data.email || "",
            telefone: response.data.telefone || "",
            password: "", // Não carregamos a senha por segurança
            confirmarPassword: "",
            tipoUtilizador: response.data.id_tipoutilizador ? response.data.id_tipoutilizador.toString() : "1",
          });
        }
      } catch (err) {
        console.error("Erro ao buscar utilizador:", err);
        setError("Erro ao carregar dados do utilizador.");
      }
    };

    fetchUtilizador();
    setLoading(false)
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password && formData.password !== formData.confirmarPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const updateData = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        id_tipoutilizador: Number(formData.tipoUtilizador),
      };

      // Se o utilizador digitou uma nova senha, enviamos para ser atualizada
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await axios.put(`http://localhost:8080/utilizador/${id}`, updateData);

      if (response.status === 200) {
        alert("Utilizador atualizado com sucesso!");
        navigate("/credenciais"); // Redireciona para a página de credenciais
      }
    } catch (err) {
      console.error("Erro ao atualizar utilizador:", err);
      setError("Erro ao atualizar utilizador. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>
    A carregar...
  </div>

  return (
    <div className="editarutilizador-container">
      <h1>Editar Utilizador</h1>
      <form className="editarutilizador-form" onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="editarutilizador-form-group">
          <label className="editarutilizador-label">Nome</label>
          <div className="editarutilizador-input-group">
            <PersonIcon />
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="editarutilizador-form-group">
          <label className="editarutilizador-label">Email</label>
          <div className="editarutilizador-input-group">
            <EmailIcon />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Telefone */}
        <div className="editarutilizador-form-group">
          <label className="editarutilizador-label">Telefone</label>
          <div className="editarutilizador-input-group">
            <PhoneIcon />
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Senha */}
        <div className="editarutilizador-form-group">
          <label className="editarutilizador-label">Nova Senha (opcional)</label>
          <div className="editarutilizador-input-group">
            <LockIcon />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Deixe em branco para manter a senha atual"
            />
          </div>
        </div>

        {/* Confirmar Senha */}
        <div className="editarutilizador-form-group">
          <label className="editarutilizador-label">Confirmar Senha</label>
          <div className="editarutilizador-input-group">
            <LockIcon />
            <input
              type="password"
              name="confirmarPassword"
              value={formData.confirmarPassword}
              onChange={handleChange}
              placeholder="Confirme a nova senha"
            />
          </div>
        </div>

        {/* Tipo de Utilizador */}
        <div className="editarutilizador-form-group">
          <label className="editarutilizador-label">Tipo de Utilizador</label>
          <div className="editarutilizador-input-group">
            <AccountBoxIcon />
            <select
              name="tipoUtilizador"
              value={formData.tipoUtilizador}
              onChange={handleChange}
              required
            >
              <option value="1">Administrador</option>
              <option value="2">Scout</option>
              <option value="3">Convidado</option>
            </select>
          </div>
        </div>

        {/* Botão de Enviar */}
        <button
          type="submit"
          className="editarutilizador-submit-button"
          disabled={loading}
        >
          {loading ? "Atualizando..." : "Editar"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
