import React, { useState } from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core/index.js";
import { HttpLink } from "@apollo/client/link/http/index.js";
import { ApolloProvider } from "@apollo/client/react/index.js";
import { useMutation, useQuery } from "@apollo/client/react/index.js";

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

function AppContents() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { data, loading, refetch } = useQuery(GET_ACCOUNTS);
  const [createAccount, { loading: mLoading }] = useMutation(CREATE_ACCOUNT);

  const handleSubmit = async () => {
    if (!name || !email) return alert("Preencha tudo!");
    try {
      await createAccount({ variables: { name, email } });
      setShowModal(false);
      setName("");
      setEmail("");
      refetch();
    } catch (e) {
      alert("Erro ao salvar.");
    }
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
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2">Carregando...</td>
              </tr>
            ) : (
              data?.getAccounts.map((acc) => (
                <tr key={acc.id}>
                  <td>{acc.name}</td>
                  <td>{acc.email}</td>
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
