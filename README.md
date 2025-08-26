 - Aplicação de Quiz Educacional -

1. Sobre o Projeto

Aplicação educacional interativa desenvolvida com Next.js, TypeScript, Tailwind CSS e componentes shadcn/ui
Experiência gamificada de aprendizado com sistema de pontuação e conquistas
Diferentes níveis de dificuldade e feedback instantâneo
Foco em preparação para ENEM e vestibulares

3. Tecnologias Utilizadas
   
Framework: Next.js 15.2.4
Linguagem: TypeScript 5
Estilização: Tailwind CSS 3.4.17
Componentes UI: shadcn/ui (baseado em Radix UI)
Gerenciador de Pacotes: pnpm
Animações: Framer Motion
Gráficos: Recharts 2.15.0
Formulários: React Hook Form 7.54.1
Validação: Zod 3.24.1
Notificações: Sonner 1.7.1
Temas: next-themes 0.4.4

5. Estrutura do Projeto
   
app/: Diretório principal do Next.js App Router
api/: Rotas de API
game/: Página do jogo
page.tsx: Página inicial
components/: Componentes React reutilizáveis
ui/: Componentes de UI básicos (shadcn/ui)
[outros]: Componentes específicos da aplicação
hooks/: React Hooks personalizados
lib/: Utilitários e funções auxiliares
public/: Arquivos estáticos
styles/: Estilos globais
types/: Definições de tipos TypeScript
Arquivos de configuração:
next.config.mjs
tailwind.config.ts
tsconfig.json
package.json

7. Componentes Principais
   
4.1. Componentes de UI (shadcn/ui)

Accordion: Painéis expansíveis para conteúdo organizado
Alert/AlertDialog: Notificações e diálogos de confirmação
Avatar: Representação visual de usuários
Button: Botões estilizados com variantes
Card: Containers para conteúdo relacionado
Dialog/Drawer/Sheet: Modais e painéis deslizantes
Form: Componentes de formulário integrados com React Hook Form
Navigation: Menus de navegação e breadcrumbs
Toast: Sistema de notificações temporárias
Tooltip: Dicas contextuais para elementos da interface

4.2. Componentes Específicos da Aplicação

HeroSection: Seção principal da página inicial
FeaturesSection: Exibição dos recursos da plataforma
GamePreview: Visualização prévia do jogo
GameSidebar: Barra lateral de navegação do jogo
TutorialSection/TutorialDialog: Guia interativo para novos usuários
AnimatedBackground/AnimatedStars: Elementos visuais animados
TestimonialsSection: Depoimentos de usuários
HowItWorksSection: Explicação do funcionamento da plataforma

9. Motor do Jogo
    
game-engine.ts: Contém a lógica principal do jogo
Gerenciamento de estado do jogo
Sistema de pontuação
Verificação de respostas
Sistema de conquistas
Carregamento de perguntas da API

11. Hooks Personalizados
    
useToast: Gerenciamento de notificações toast
useMobile: Detecção de dispositivos móveis
useMediaQuery: Consultas de mídia responsivas

13. Requisitos de Sistema
    
Node.js 18.0.0 ou superior
pnpm (recomendado) ou npm/yarn

15. Instalação
    
bash
# Clonar o repositório (se aplicável)
git clone <url-do-repositorio>
cd <nome-do-repositorio>

# Instalar dependências
pnpm install

9. Scripts Disponíveis
bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Criar build de produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Executar linting
pnpm lint

10. Desenvolvimento
    
10.1. Configuração do Ambiente

Certifique-se de ter Node.js 18+ instalado
Instale o pnpm globalmente: npm install -g pnpm
Clone o repositório e instale as dependências
Crie um arquivo .env.local para variáveis de ambiente (se necessário)
Execute pnpm dev para iniciar o servidor de desenvolvimento

10.2. Adicionando Novos Componentes

bash
npx shadcn-ui@latest add <nome-do-componente>

10.3. Estilização

O projeto utiliza Tailwind CSS para estilização
Configurações personalizadas em:
tailwind.config.ts: Configuração principal
globals.css: Estilos globais e variáveis CSS

12. Implantação
    
11.1. Build de Produção

bash
# Criar build otimizada
pnpm build

# Testar build localmente
pnpm start

11.2. Hospedagem Recomendada

Vercel para melhor compatibilidade com Next.js:
Conecte seu repositório à Vercel
Configure variáveis de ambiente necessárias
A Vercel detectará automaticamente que é um projeto Next.js

12. Funcionalidades Principais
    
Sistema de Quiz: Perguntas e respostas com diferentes níveis de dificuldade
Gamificação: Sistema de pontuação, níveis e conquistas
Feedback Instantâneo: Explicações detalhadas para cada resposta
Interface Responsiva: Adaptação para dispositivos móveis e desktop
Tema Escuro/Claro: Suporte para preferências de tema do usuário
Animações: Efeitos visuais para melhorar a experiência do usuário

14. Melhorias Futuras
    
Implementação de sistema de autenticação
Banco de dados para armazenar progresso e pontuações
Modo multijogador para competições em tempo real
Editor de perguntas para administradores
Integração com redes sociais para compartilhamento

16. Contribuição

Faça um fork do projeto
Crie uma branch para sua feature (git checkout -b feature/nova-funcionalidade)
Commit suas mudanças (git commit -m 'Adiciona nova funcionalidade')
Push para a branch (git push origin feature/nova-funcionalidade)
Abra um Pull Request
