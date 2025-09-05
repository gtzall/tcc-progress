import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const [token, setToken] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [dados, setDados] = useState(null);

  const login = async () => {
    const resp = await fetch('http://SEU_BACKEND/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha }),
    });
    const data = await resp.json();
    setToken(data.token);
    Alert.alert('Login', 'Autenticado com sucesso!');
  };

  const getDados = async () => {
    const resp = await fetch('http://SEU_BACKEND/api/dados', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setDados(data);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Usuário:</Text>
      <TextInput value={usuario} onChangeText={setUsuario} />
      <Text>Senha:</Text>
      <TextInput value={senha} onChangeText={setSenha} secureTextEntry />
      <Button title="Entrar" onPress={login} />
      <Button title="Obter Dados Protegidos" onPress={getDados} disabled={!token} />
      {dados && <Text>{JSON.stringify(dados)}</Text>}
    </View>
  );
}