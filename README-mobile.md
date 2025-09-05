# Fluxo de Integração Mobile

Este documento descreve o fluxo de integração para aplicações mobile, incluindo endpoints, autenticação JWT e exemplos de uso.

## Endpoints

1. **Login**  
   - **Método:** POST  
   - **URL:** `/api/login`  
   - **Descrição:** Autentica o usuário e retorna um token JWT.

2. **Obter Dados**  
   - **Método:** GET  
   - **URL:** `/api/dados`  
   - **Descrição:** Recupera dados protegidos que requerem autenticação.

## Autenticação JWT

A autenticação é realizada utilizando tokens JWT. Após o login, o token deve ser enviado em todos os pedidos subsequentes no cabeçalho `Authorization` da seguinte forma:

```
Authorization: Bearer {token}
```

## Exemplo de Uso

```javascript
// Exemplo de autenticação e uso do endpoint de dados
const login = async (usuario, senha) => {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
    });
    const data = await response.json();
    return data.token;
};

const obterDados = async (token) => {
    const response = await fetch('/api/dados', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    return data;
};
```

## Considerações Finais

Certifique-se de manter o token seguro e não expô-lo em código público.
