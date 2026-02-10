# Stock & Production Control System

## 📌 Visão Geral do Projeto

Este projeto consiste em um **sistema WEB** para controle de **produtos**, **matérias-primas** e **produção**, permitindo que uma indústria saiba:

* Quais produtos podem ser fabricados com base no estoque atual de matérias-primas;
* Qual a **quantidade máxima** possível de produção de cada produto;
* Qual o **valor total** que pode ser obtido com a produção sugerida;
* Priorização automática dos produtos de **maior valor**, considerando que uma mesma matéria-prima pode ser utilizada em mais de um produto.

O sistema foi desenvolvido seguindo o conceito de **API desacoplada do front-end**, com **back-end em Quarkus** e **front-end em React**.

---

## 🏗️ Arquitetura

* **Back-end (API)**: Quarkus + Gradle
* **Front-end (Client)**: React + Vite
* **Banco de Dados**: PostgreSQL (via Docker)
* **Comunicação**: REST API

---

## ▶️ Como executar o projeto

### 🔹 Pré-requisitos

* Docker e Docker Compose
* Node.js (versão recomendada: 18+)
* npm ou yarn
* Java 17+
* (Opcional) Quarkus CLI instalado

---

### 1️⃣ Subindo o banco de dados

Entre na pasta **api** do projeto:

```bash
cd api
```

Suba os containers com Docker:

```bash
docker compose up -d
```

Aguarde até que o container do banco de dados esteja totalmente disponível.

---

### 2️⃣ Executando o back-end (API)

Ainda na pasta **api**, você possui duas opções:

#### ✔️ Opção 1 – Com Quarkus instalado

```bash
quarkus dev
```

#### ✔️ Opção 2 – Sem Quarkus instalado

```bash
./gradlew quarkusDev
```

A API estará disponível, por padrão, em:

```
http://localhost:8080
```

---

### 3️⃣ Executando o front-end

Em outro terminal, acesse a pasta **client**:

```bash
cd client
```

Instale as dependências (caso ainda não tenha feito):

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O front-end estará disponível em:

```
http://localhost:5173
```

---

## 🧩 Descrição do Problema

Uma indústria que produz produtos diversos necessita controlar o estoque dos insumos (matérias-primas) necessárias para a produção dos itens que fabrica.

O sistema permite:

* Cadastro de **produtos**, contendo:

  * Código
  * Nome
  * Valor

* Cadastro de **matérias-primas**, contendo:

  * Código
  * Nome
  * Quantidade em estoque

* Associação entre produtos e matérias-primas, informando:

  * Quais matérias-primas compõem cada produto
  * A quantidade necessária de cada matéria-prima

Além da manutenção dos cadastros, o sistema calcula automaticamente:

* Quais produtos podem ser produzidos com base no estoque disponível;
* A quantidade máxima possível de produção de cada produto;
* O valor total da produção sugerida;
* A priorização é feita pelos **produtos de maior valor**, considerando o consumo compartilhado das matérias-primas.

---

## 📋 Requisitos do Sistema

### 🔧 Requisitos Não Funcionais

* **RNF001** – Sistema WEB compatível com Chrome, Firefox e Edge.
* **RNF002** – Arquitetura baseada em API (back-end separado do front-end).
* **RNF003** – Interface responsiva no front-end.
* **RNF004** – Persistência de dados em banco relacional (Postgres, MySQL ou Oracle).
* **RNF005** – Back-end desenvolvido com framework (Quarkus).
* **RNF006** – Front-end desenvolvido com framework moderno (React).
* **RNF007** – Código, banco de dados, tabelas e colunas em língua inglesa.

---

### ⚙️ Requisitos Funcionais

* **RF001** – CRUD de produtos no back-end.
* **RF002** – CRUD de matérias-primas no back-end.
* **RF003** – CRUD de associação entre produtos e matérias-primas.
* **RF004** – Consulta dos produtos que podem ser produzidos com o estoque disponível.
* **RF005** – Interface gráfica para CRUD de produtos.
* **RF006** – Interface gráfica para CRUD de matérias-primas.
* **RF007** – Interface gráfica para associar matérias-primas aos produtos (integrada ao cadastro de produtos).
* **RF008** – Interface gráfica para listar produtos possíveis de serem produzidos e suas quantidades.

---

## 🚀 Considerações Finais

Este projeto foi desenvolvido com foco em **boas práticas**, **organização de código**, **separação de responsabilidades** e **facilidade de execução local**, utilizando tecnologias modernas amplamente adotadas no mercado.

Qualquer dúvida ou melhoria futura pode ser facilmente integrada graças à arquitetura desacoplada adotada.
