import React, { useState } from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core/index.js";
import { HttpLink } from "@apollo/client/link/http/index.js";
import { ApolloProvider } from "@apollo/client/react/index.js";
import { useMutation, useQuery } from "@apollo/client/react/index.js";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache(),
});

const GET_ACCOUNTS = gql`
  query GetAccounts {
    getAccounts {
      id
      name
      email
    }
  }
`;

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($name: String!, $email: String!) {
    createAccount(name: $name, email: $email) {
      id
      name
    }
  }
`;

const DELETE_ACCOUNT = gql`
  mutation DeleteAccount($id: ID!) {
    deleteAccount(id: $id)
  }
`;

function AppContents() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data, loading, refetch } = useQuery(GET_ACCOUNTS);
  const [createAccount, { loading: mLoading }] = useMutation(CREATE_ACCOUNT);

  const [deleteAccount] = useMutation(DELETE_ACCOUNT);

  const handleSubmit = async () => {
    if (!name || !email)
      return Swal.fire("Ops!", "Preencha todos os campos.", "warning");
    try {
      await createAccount({ variables: { name, email } });
      setShowModal(false);
      setName("");
      setEmail("");
      refetch();
      Swal.fire({
        title: "Sucesso!",
        text: "Usuário cadastrado!",
        icon: "success",
        confirmButtonColor: "#4f46e5",
      });
    } catch (e) {
      Swal.fire("Erro", "Não foi possível salvar o usuário.", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Isso removerá o usuário permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAccount({ variables: { id } });
          refetch();
          Swal.fire("Deletado!", "O usuário foi removido.", "success");
        } catch (error) {
          Swal.fire("Erro!", "Não foi possível deletar.", "error");
        }
      }
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Gerenciamento de Usuários</h1>
          <button className="btn-new" onClick={() => setShowModal(true)}>
            + Novo Cadastro
          </button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th style={{ textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3">Carregando...</td>
              </tr>
            ) : (
              data?.getAccounts.map((acc) => (
                <tr key={acc.id}>
                  <td>{acc.name}</td>
                  <td>{acc.email}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => handleDelete(acc.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Novo Usuário</h2>
            <div className="input-group">
              <label>Nome Completo</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-group">
              <label>E-mail</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="btn-cancel"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={mLoading}
                className="btn-save"
              >
                {mLoading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContents />
    </ApolloProvider>
  );
}
