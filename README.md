# 🐾 Pet Love — Landing Page

Landing page moderna e responsiva para pet shop, desenvolvida com HTML5, CSS3 e JavaScript puro (Vanilla JS), seguindo princípios de Clean Code.

---

## 📁 Estrutura do Projeto

```
pet-love/
├── index.html
├── assets/
│   ├── css/
│   │   ├── variables.css       # Design tokens (cores, tipografia, espaçamentos)
│   │   ├── reset.css           # Normalização e estilos base
│   │   ├── style.css           # Utilitários globais e componentes reutilizáveis
│   │   ├── header.css          # Cabeçalho fixo e navegação
│   │   ├── hero.css            # Seção hero e cards de diferenciais
│   │   ├── services.css        # Grade de serviços e banner promocional
│   │   ├── products.css        # Grid de produtos com filtros
│   │   ├── gallery.css         # Galeria com lightbox
│   │   ├── testimonials.css    # Slider de depoimentos e FAQ accordion
│   │   ├── contact.css         # Formulário de contato
│   │   ├── footer.css          # Rodapé completo
│   │   ├── animations.css      # Keyframes e sistema de scroll reveal
│   │   └── responsive.css      # Media queries (xs → xl)
│   ├── js/
│   │   ├── main.js             # Entry point — inicializa todos os módulos
│   │   ├── menu.js             # Menu mobile e navegação ativa
│   │   ├── scroll.js           # Scroll suave e comportamento do header
│   │   ├── slider.js           # Carousel automático de depoimentos
│   │   ├── gallery.js          # Lazy loading, lightbox e filtros de produtos
│   │   ├── form.js             # Validação de formulário e máscara de telefone
│   │   ├── animations.js       # Scroll reveal, contadores, accordion e cupom
│   │   └── backToTop.js        # Botão flutuante de voltar ao topo
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── products/
│   │   ├── gallery/
│   │   ├── testimonials/
│   │   ├── icons/
│   │   └── backgrounds/
│   └── fonts/
└── README.md
```

---

## ✨ Funcionalidades

| Funcionalidade | Arquivo |
|---|---|
| Menu mobile com hamburger | `menu.js` |
| Scroll suave para âncoras | `scroll.js` |
| Header fixo com mudança ao scroll | `scroll.js` |
| Slider automático de depoimentos | `slider.js` |
| Lazy loading de imagens | `gallery.js` |
| Lightbox da galeria | `gallery.js` |
| Filtros de produtos com animação | `gallery.js` |
| Validação de formulário | `form.js` |
| Máscara de telefone | `form.js` |
| Toast de confirmação de envio | `form.js` |
| Scroll Reveal (data-reveal) | `animations.js` |
| Contadores animados | `animations.js` |
| FAQ Accordion | `animations.js` |
| Cupom copiável | `animations.js` |
| Botão voltar ao topo | `backToTop.js` |

---

## 🎨 Design

**Paleta de cores:**
- Primária: `#FF8C42` (Laranja)
- Secundária: `#4DA6FF` (Azul)
- Background: `#FFF6EF` (Creme) / `#F5F5F5` (Cinza claro)
- Textos: `#222222` / `#666666`

**Tipografia:** [Poppins](https://fonts.google.com/specimen/Poppins) (400, 500, 600, 700, 800)

**Ícones:** [Font Awesome 6.5](https://fontawesome.com/)

**Imagens:** [Unsplash](https://unsplash.com/) via CDN (carregadas com lazy loading)

---

## 📐 Responsividade

| Breakpoint | Largura |
|---|---|
| `xs` | ≤ 480px |
| `sm` | ≤ 640px |
| `md` | ≤ 768px |
| `lg` | ≤ 1024px |
| `xl` | ≤ 1280px |

---

## 🚀 Como usar

1. Clone ou baixe o repositório
2. Abra `index.html` diretamente no navegador — não é necessário servidor local
3. Para editar imagens, substitua as referências do Unsplash por arquivos locais nas respectivas pastas dentro de `assets/images/`

> **Nota:** Os módulos JavaScript usam `type="module"`, portanto para desenvolvimento recomenda-se um servidor local simples, como a extensão **Live Server** do VS Code ou `npx serve .`

---

## 🏗️ Seções da Página

1. **Header** — Logo, navegação desktop/mobile, botão CTA
2. **Hero** — Banner principal com imagem, estatísticas animadas e botões de ação
3. **Diferenciais** — 4 cards com os valores do pet shop
4. **Serviços** — 8 serviços em grid com preços e badges
5. **Banner Promocional** — 20% OFF com cupom copiável (`PETLOVE20`)
6. **Produtos** — Grid com filtros por categoria
7. **Galeria** — Fotos de clientes com lightbox
8. **Depoimentos** — Slider com avaliações e estrelas
9. **FAQ** — Perguntas frequentes em accordion
10. **Contato** — Formulário validado, mapa e informações
11. **Footer** — Links, redes sociais, horários e newsletter

---

## 📋 Requisitos

- Navegador moderno com suporte a ES Modules (Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+)
- Conexão à internet para carregar Poppins (Google Fonts), Font Awesome e imagens do Unsplash

---

*Desenvolvido com ❤️ para o Pet Love Pet Shop*
