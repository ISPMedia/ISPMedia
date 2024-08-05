# ISPMEDIA API

ISPMEDIA é uma plataforma digital para gestão e partilha de conteúdos multimídia. Este repositório contém a API do backend desenvolvida utilizando Node.js, TypeScript, Prisma, MySQL e Express.

## Tecnologias Utilizadas
- Node.js: Plataforma de desenvolvimento.
- TypeScript: Superset do JavaScript que adiciona tipos estáticos.
- Express: Framework para Node.js.
- Prisma: ORM (Object-Relational Mapping) para Node.js.
- MySQL: Sistema de gerenciamento de banco de dados relacional.
- fluent-ffmpeg: Biblioteca para manipulação de arquivos de vídeo.
- multer: Middleware para manipulação de uploads de arquivos.
- jsonwebtoken: Implementação de JWT para autenticação.
- bcrypt: Biblioteca para hashing de senhas.
- dotenv: Gerenciamento de variáveis de ambiente.

## Pré-requisitos

Antes de começar, você vai precisar ter instalado na sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/)

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/ispmedia-api.git
cd ispmedia-api
npm install
```

## Variáveis de Ambiente

Renomeie o arquivo .env.example para .env e configure as variáveis de ambiente conforme necessário.

`DATABASE_URL="mysql://user:password@localhost:3306/ispmedia"`
`JWT_SECRET="sua_chave_secreta_para_jwt"`
`PORT=3000` 

## Utilização
Para iniciar o servidor de desenvolvimento, execute:

`npm run dev`

## Funcionalidades Essenciais

#### Upload de Vídeos
A rota `/videos/uploads` permite que usuários autenticados façam upload de vídeos. Durante o processo de upload:
- O arquivo é recebido e armazenado temporariamente.
- O vídeo é comprimido utilizando a biblioteca `fluent-ffmpeg`.
- Os dados do vídeo, incluindo título, descrição, caminho do arquivo, mimetype e tamanho, são armazenados no banco de dados.
- O arquivo temporário é removido após a compressão.

#### Reprodução de Vídeos
A rota `/videos/play/:id` permite que usuários autenticados reproduzam vídeos. Essa rota suporta range requests, permitindo a transmissão eficiente de grandes arquivos de vídeo.

### Range Requests
A reprodução de vídeos implementa suporte para range requests, permitindo que o cliente solicite apenas uma parte do arquivo de vídeo. Isso é útil para streaming de vídeos, onde apenas uma parte do vídeo é carregada a qualquer momento, melhorando a eficiência e reduzindo o uso de largura de banda.
- O cabeçalho Range é extraído da requisição.
- O tamanho do vídeo é determinado.
- A faixa solicitada é analisada e os headers apropriados são configurados.
- Um stream de leitura é criado para a parte especificada do vídeo e enviado como resposta.

## Docker
A aplicação pode ser executada utilizando Docker. Utilize o seguinte arquivo docker-compose.yml para configurar um container MySQL:
![code](https://github.com/user-attachments/assets/b1ebe6d6-ea3d-4720-a686-0327114f9ecd)

Execute: `docker-compose up -d`
