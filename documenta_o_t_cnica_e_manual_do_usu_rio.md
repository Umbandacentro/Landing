# Documentação Técnica e Manual do Usuário — Atelier Cléo Pereira

---

## Parte 1: Documentação Técnica de Desenvolvimento

### 1. Visão Geral e Arquitetura
O site do **Atelier Cléo Pereira** foi desenvolvido como uma Single Page Application (SPA) responsiva com foco em conversão para vendas e encomendas de peças artesanais via WhatsApp. 

O sistema integra um painel CMS administrativo acessível pela rota secreta `/acp`, permitindo a gestão em tempo real de conteúdos, textos, imagens e catálogo de produtos sem necessidade de alteração ou rebuild de código.

#### Stack Tecnológica:
- **Frontend Core:** React 18+ com Vite.
- **Estilização:** Tailwind CSS (utilizando design autoral com tons de bege, vinho e rosé).
- **Iconografia:** Lucide React.
- **Backend & Autenticação:** Supabase (Database PostgreSQL + Authentication API).
- **Hospedagem & Deploy:** Vercel (CI/CD contínuo integrado ao repositório Git).

---

### 2. Estrutura do Banco de Dados (Supabase)

A persistência do conteúdo é mantida em um banco PostgreSQL gerenciado pelo Supabase.

- **Tabela Primária:** `landing_content`
- **Registro Único de Controle:** `id = 'cleo_content'`
- **Formato dos Dados:** Coluna `content` do tipo `JSONB`, garantindo flexibilidade para adição de novos campos no CMS.

#### Esquema de Objeto `JSONB`:
```json
{
  "header": {
    "atelierName": "string",
    "tagline": "string",
    "whatsappNumber": "string",
    "whatsappLabel": "string"
  },
  "hero": {
    "badge": "string",
    "title": "string",
    "subtitle": "string",
    "ctaText": "string",
    "bgImage": "string (URL)"
  },
  "about": {
    "title": "string",
    "subtitle": "string",
    "paragraph1": "string",
    "paragraph2": "string",
    "imageUrl": "string (URL)",
    "experienceYears": "string",
    "experienceText": "string"
  },
  "services": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "imageUrl": "string (URL)",
      "tag": "string"
    }
  ],
  "forWhom": {
    "title": "string",
    "items": [{ "id": "string", "title": "string", "desc": "string" }]
  },
  "howItWorks": {
    "title": "string",
    "steps": [{ "step": "string", "title": "string", "desc": "string" }]
  },
  "differentials": {
    "title": "string",
    "subtitle": "string",
    "imageUrl": "string (URL)",
    "list": ["array of strings"]
  },
  "ctaBanner": {
    "title": "string",
    "subtitle": "string",
    "buttonText": "string"
  },
  "footer": {
    "instagram": "string",
    "instagramUrl": "string",
    "address": "string",
    "copyright": "string"
  }
}
```

---

### 3. Histórico de Soluções e Correções Implementadas

1. **Persistência de Dados e Fallback:**
   - Implementado mecanismo no `useEffect` de inicialização para consultar o Supabase e utilizar o estado `DEFAULT_CLEO_CONTENT` caso o registro ainda não tenha sido populado no banco de dados.

2. **Gerenciamento de Autenticação:**
   - Proteção da rota `/acp` vinculada às funções `supabase.auth.signInWithPassword` e `supabase.auth.signOut()`.

3. **Correção de Cache e Renderização de Blocos:**
   - Resolvida a inconsistência onde versões antigas de `JSONB` no banco omitiam nós de seções como "Para Quem É", "Passo a Passo" e "Diferenciais". O código conta com *fallbacks* preventivos para evitar erros de renderização.

4. **Gerenciamento de Imagem dos Diferenciais:**
   - Adicionado o campo de input para `differentials.imageUrl` na aba **4. Diferenciais & CTA** do painel CMS administrativo.

---

## Parte 2: Manual do Usuário (Painel CMS `/acp`)

Bem-vinda ao manual de gestão do site do **Atelier Cléo Pereira**! Através do painel administrativo, você pode atualizar fotos, mudar textos de chamadas e alterar itens do catálogo a qualquer momento.

---

### 1. Como Acessar o Painel Administrativo

1. Abra o seu navegador de preferência.
2. Digite o endereço do seu site seguido de `/acp` (Exemplo: `https://seu-site.vercel.app/acp` ou `http://localhost:5173/acp`).
3. Na tela de acesso, insira o seu e-mail e senha cadastrados no Supabase.
4. Clique no botão **ENTRAR**.

---

### 2. Navegação pelas Abas do CMS

O painel é dividido em 4 seções principais situadas no menu lateral esquerdo:

#### 1. HERO & WHATSAPP
- **Número do WhatsApp:** Altere o número que receberá as mensagens (informe apenas números com DDD, ex: `5511999998888`).
- **Selo / Badge:** O pequeno rótulo acima do título principal (ex: *"Feito à Mão sob Encomenda"*).
- **Título e Subtítulo Principal:** Frases de impacto que aparecem logo no topo da página.
- **URL da Imagem do Hero:** Endereço da foto principal de capa do site.

#### 2. SOBRE A CLÉO
- **História e Biografia:** Edite os parágrafos que contam a sua trajetória e o carinho colocados em cada costura.
- **URL da Foto da Cléo:** Altere o link da imagem da artesã que ilustra a seção institucional.

#### 3. CATÁLOGO & JOGOS
- **Editar Itens Existentes:** Altere títulos, tags em destaque (como *"Mais Pedido"*, *"Lançamento"*), descrições e links de imagem dos 6 produtos cadastrados.
- **Adicionar Novo Item:** Clique no botão verde **"+ Adicionar Peça/Jogo"** no canto superior direito da seção para incluir um novo produto.
- **Remover Item:** Clique no ícone de **Lixeira** no canto de qualquer cartão para apagar o item correspondente.

#### 4. DIFERENCIAIS & CTA
- **Seção de Diferenciais:** Edite o título e subtítulo da seção de garantias do atelier.
- **URL da Imagem dos Diferenciais:** Insira o link da foto que fica ao lado da lista de diferenciais.
- **Banner Final (Chamada para Ação):** Altere a frase marcante de encerramento do site e o texto do botão final de contato no WhatsApp.

---

### 3. Como Salvar ou Restaurar as Alterações

- **Salvar no Banco de Dados:** Após realizar as edições desejadas em qualquer uma das abas, clique no botão **"Salvar Tudo no Supabase"** situado no rodapé do formulário. Uma mensagem de confirmação surgirá no canto inferior da tela.
- **Restaurar Padrões:** Se por algum motivo quiser voltar às informações e fotos padrão originais do Atelier Cléo Pereira, clique no botão **"Restaurar Padrão"** situado no cabeçalho do painel.
- **Encerrar Sessão:** Para deslogar do painel com segurança, clique no botão **"Encerrar Sessão"**.

---

## Parte 3: Guia Rápido de Deploy na Vercel

Sempre que realizar edições de código no projeto local, execute a seguinte sequência no terminal para publicar na Vercel:

```bash
# 1. Adicionar arquivos modificados
git add .

# 2. Criar mensagem do commit
git commit -m "feat: atualização do sistema e documentação técnica"

# 3. Enviar para o repositório principal
git push origin main
```

A hospedagem Vercel detectará o envio e aplicará as alterações em produção automaticamente dentro de alguns segundos.