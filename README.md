# Crochê Conversor

Aplicação React para traduzir informações comuns em etiquetas de fios brasileiros — principalmente TEX, peso e metragem — para categorias usadas em receitas internacionais, como DK, Worsted e Sport, e também fazer a conversão inversa.

> **Status:** protótipo funcional / fundação do projeto.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Vitest
- ESLint + `jsx-a11y`

## Princípios do projeto

- **Mobile first**, sem perder qualidade no desktop.
- **Acessibilidade desde a base**, com HTML semântico, foco visível, labels, navegação por teclado e suporte a redução de movimento.
- **Lógica de domínio separada da interface**, para facilitar testes e evolução.
- Identidade visual pastel inspirada na referência do projeto, sem reproduzir a marca original.
- Conversões tratadas como **estimativas**, não como equivalências absolutas.

## Rodando localmente

Na pasta `D:\projetinhos\crochet-conversor\crochet-conversor`:

```bash
npm install
npm run dev
```

Depois abra o endereço mostrado pelo Vite no terminal.

## Verificações

```bash
npm run test
npm run lint
npm run build
```

## Estrutura

```text
src/
├── components/
│   ├── Header.tsx
│   ├── ResultCard.tsx
│   └── YarnConverter.tsx
├── domain/
│   └── yarn/
│       ├── categories.ts
│       ├── converters.test.ts
│       ├── converters.ts
│       └── types.ts
├── App.tsx
├── index.css
└── main.tsx

docs/
├── acessibilidade.md
├── arquitetura.md
├── decisoes.md
├── identidade-visual.md
├── produto.md
└── references/
    └── identidade-base.png
```

## Funcionalidade já presente

A tela inicial permite:

- converter TEX em metros por 100 g;
- calcular TEX a partir de peso + metragem;
- obter uma categoria internacional aproximada;
- selecionar uma categoria internacional e consultar faixas aproximadas de TEX
  e metros por 100 g;
- consultar a faixa de agulha de crochê recomendada pelo CYC para o resultado;
- visualizar CYC, TEX e metros por 100 g no resultado;
- identificar zonas de transição e categorias adjacentes;
- alternar entre modos usando controles acessíveis por teclado.

## Atenção sobre a classificação

As faixas de categorias em `src/domain/yarn/categories.ts` são uma heurística
operacional validada para o MVP, não uma equivalência normativa. O critério,
as fontes e os limites da tabela estão em
[`docs/tabela-categorias.md`](./docs/tabela-categorias.md). Ainda é necessário
calibrá-la com uma amostra de fios brasileiros reais antes de recomendações
comerciais.

## Documentação

- [Arquitetura](./docs/arquitetura.md)
- [Acessibilidade](./docs/acessibilidade.md)
- [Identidade visual](./docs/identidade-visual.md)
- [Registro de decisões](./docs/decisoes.md)
- [Progresso de implementação](./docs/progresso.md)
- [Especificação do produto](./docs/produto.md)
- [Tabela-base e fontes](./docs/tabela-categorias.md)

## Próximos passos sugeridos

1. Calibrar a tabela com fios brasileiros reais, especialmente CYC 6–7.
2. Definir nome e logo finais.
3. Escolher as fontes definitivas e conferir suas licenças.
4. Incluir jardas ↔ metros e onças ↔ gramas.
5. Criar testes de componentes e auditoria automática de acessibilidade.
