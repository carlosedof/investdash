
# Dashboard de Portfólio de Investimentos

Este projeto é uma aplicação web responsiva, desenvolvida com Next.js e Tailwind CSS, projetada para fornecer um dashboard interativo em tempo real para acompanhamento de portfólios de investimento. Permite aos usuários inserir informações de ativos, visualizar gráficos de distribuição e acompanhar o desempenho financeiro de cada ativo no portfólio.

## Principais Funcionalidades

- **Gráfico de Pizza Responsivo**: Utiliza o componente `ResponsivePie` da Nivo para exibir a distribuição dos ativos de forma visual e atraente.
- **Tabela de Ativos Ordenável**: Colunas ordenáveis com ícones indicando a capacidade de ordenação. Ao clicar no cabeçalho, os ativos são classificados com base naquele campo.
- **Resumo Financeiro**: Um bloco de resumo calcula e exibe o investimento total, total por categoria (ações e FIIs) e ganhos/perdas em valores absolutos e percentuais.
- **Persistência de Dados Localmente**: Armazena dados localmente para que os usuários não precisem recarregar as entradas de ativos a cada vez.
- **Ícones Interativos**: Ícones da Phosphor indicam colunas ordenáveis, com indicadores intuitivos de ordem crescente/decrescente.
- **Next.js e Tailwind CSS**: Estilo elegante e responsivo com Tailwind. Design minimalista para otimizar o engajamento do usuário.

## Configuração e Instalação

1. **Instale as dependências**:
   ```bash
   yarn install
   ```

2. **Execute o servidor de desenvolvimento**:
   ```bash
   yarn dev
   ```
   Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

## Visão Geral do Código

### Componentes

- **Componente de Gráfico de Pizza**: Renderiza o gráfico `ResponsivePie` de forma dinâmica.
- **Componente de Tabela**: Exibe dados de ativos com colunas ordenáveis e ícones da Phosphor indicando a ordenação. Colunas podem ser ocultadas na visualização mobile para um layout otimizado.
- **Bloco de Resumo**: Calcula o investimento total, totais por categoria e ganhos/perdas, com valores absolutos e percentuais.

### Utilitários

- **Formatador de Moeda**: Formata números para exibição como moeda na tabela e no resumo.
- **Função de Ordenação**: Permite ordenar colunas da tabela por nome, preço médio, quantidade ou tipo.

## Customização

- **Fontes**: O projeto utiliza a fonte Nunito como fonte global, carregada usando a lógica de fonte local do Next.js e configurada no Tailwind CSS.
- **Ícones**: A aplicação utiliza ícones da Phosphor para indicadores de ordenação.

## Configuração de Proxy para Evitar CORS

Para evitar problemas de CORS durante a execução da aplicação Next.js, foi criada uma solução de proxy no próprio projeto para gerenciar as requisições de API. Essa abordagem facilita a comunicação entre o cliente e o servidor, contornando as restrições de CORS sem comprometer a segurança.

## Contribuição

Sinta-se à vontade para enviar issues ou pull requests. Qualquer contribuição é bem-vinda.
