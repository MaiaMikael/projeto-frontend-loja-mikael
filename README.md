Loja Mikael Maia
Projeto de Front End da faculdade (FIEC): Fiz uma loja quase idêntica loja virtual da documentação,de calçados com página inicial, listagem de produtos, página de produto, carrinho e histórico de pedidos.
> : _(https://lojamikaelmaia-fiec.nexmaia.com.br/) >> Aqui eu fiz um subdomínio de um domínio meu existente para ficar mais profissional. 
Funcionalidades
Página inicial com carrossel de destaques e coleções
Listagem de produtos com busca, filtros por marca, categoria e gênero, e ordenação por preço
Página de detalhes do produto (galeria de imagens, escolha de tamanho e cor, avaliações)
Cadastro simples do cliente (nome + contato)
Carrinho com alteração de quantidade, remoção de itens e total
Finalização de compra e página "Meus Pedidos"
Tecnologias
Área	Ferramentas
Interface	React 19, TypeScript, Tailwind CSS 4, componentes Radix UI (padrão shadcn/ui)
Rotas e SSR	TanStack Start / TanStack Router (rotas baseadas em arquivos)
Build	Vite, Bun
Dados	Catálogo local em `src/data/products.ts`; carrinho e pedidos salvos no `localStorage` do navegador
Backend (estrutura)	Itegração com supabase e schema Drizzle em `drizzle/` e `src/integrations/supabase/`
Qualidade	ESLint, Prettier, Vitest + Testing Library
Como rodar
Pré-requisito: Bun (ou Node 20+ com npm).
```bash
# 1. instalar dependências
bun install            # ou: npm install

# 2. configurar variáveis de ambiente
cp .env.example .env   # preencha com os valores do seu projeto Supabase

# 3. iniciar em modo desenvolvimento
bun run dev            # ou: npm run dev
```
Abra http://localhost:8080.
Scripts
Comando	O que faz
`bun run dev`	Servidor de desenvolvimento
`bun run build`	Build de produção
`bun run preview`	Visualiza o build localmente
`bun run lint`	Verifica o código com ESLint
`bun run format`	Formata o código com Prettier
`bun run test`	Roda os testes (Vitest)
Estrutura do projeto
```
├── drizzle/              # Schema e migrações do banco
├── public/images/        # Imagens dos produtos, coleções e banners
├── supabase/             # Configuração do projeto Supabase
└── src/
    ├── assets/icons/     # Ícones e logos em SVG
    ├── components/       # Componentes da loja (Header, ProductCard, BuyBox...)
    │   └── ui/           # Componentes base (shadcn/ui)
    ├── data/             # Catálogo de produtos
    ├── hooks/            # Hooks reutilizáveis
    ├── integrations/     # Supabase (cliente e autenticação)
    ├── lib/              # Estado global da loja (carrinho, pedidos) e utilitários
    ├── routes/           # Páginas (uma por arquivo)
    └── test/             # Testes automatizados
```
Rotas
Rota	Página
`/`	Página inicial
`/products`	Listagem de produtos (`/produtos` redireciona para ela)
`/product/:id`	Detalhes do produto
`/categorias`	Categorias
`/carrinho`	Carrinho
`/pedidos`	Meus pedidos
Como este projeto foi desenvolvido
Este projeto foi desenvolvido com auxílio das documentações do proejto junto também com alguns projetos próprios desenvolvido com auxilio de ia, usando a plataforma gemini,gpt,lovable. Por isso o repositório mantém a configuração dessa plataforma (por exemplo, o plugin do Vite e a pasta `src/integrations/lovable/`), necessária para o projeto compilar. Por questões de as datas terem ficado muito em cima da minha rotina de trabalho e faculdade, tive que usar esses auxílios, contudo tenho toda base formada de aprendizado usado no vscode e todos requistos de linguagens dominadas também. 
Autor
Eduardo Mikael Maia — Instagram @mikaelnexmaia
