
# Back-End RemedioJá

Bem-vindo ao repositório **Back-End RemedioJá**! Este projeto é a API backend do sistema RemedioJá, uma solução focada no gerenciamento, consulta e distribuição de medicamentos, proporcionando maior praticidade e eficiência para farmácias, profissionais de saúde e usuários finais.

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Sobre o Projeto

O **RemedioJá** visa facilitar a pesqisa de médicamentos dentro das farmacias. O projeto foi desenvolvido para atender demandas de sistemas de saúde e farmácias, podendo ser adaptado conforme necessidades específicas.

## Principais Funcionalidades

- Pesquisa de medicamentos nas principais farmacias
- Médicamento com o valor mais acessível

## Tecnologias Utilizadas

- **Deno** / **Hono.js**
- **Banco de Dados**: (MongoDB)
- **JWT** para autenticação
- **ORM/ODM**: Mongoose
- **Docker**
- Outras dependências conforme detalhado no `deno.json`

> <sub>Altere ou detalhe as tecnologias conforme a stack real do projeto!</sub>

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/fernando-ss-soares/Back-End-RemedioJa.git
   cd Back-End-RemedioJa
   ```

2. **Instale as dependências:**
   ```bash
   deno npm:install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` e ajuste as variáveis conforme necessário.

4. **Execute o servidor:**
   ```bash
   deno task start
   ```
   O servidor estará disponível em `http://localhost:3000` (ou porta configurada).

5. **Testes:**
   ```bash
   npm test
   ```

## Estrutura do Projeto

```
/
 ├── functions/
 ├── models/
 ├── routes/
 ├── types/
 ├── .env
 ├── Dockerfile.yml
 ├── docker-compose.yml
 └── main.ts
```

- **functions/**: Lógica das funções e regras de negócio
- **models/**: Definição dos esquemas do banco de dados
- **routes/**: Mapeamento das rotas da API
- **types/**: Tipagem de dados da API

## Contribuição

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`)
3. Commit suas alterações (`git commit -m 'feat: minha nova feature'`)
4. Push na branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

---

> Dúvidas ou sugestões? Abra uma issue ou entre em contato!
