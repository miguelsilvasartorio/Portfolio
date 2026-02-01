class AppleNav extends HTMLElement {
    constructor() {
        super();
        this.isVisible = false;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --nav-height: 64px;
                    --bg-color: rgba(255, 255, 255, 0.8);
                    --blur: 20px;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: var(--nav-height);
                    background: var(--bg-color);
                    backdrop-filter: blur(var(--blur));
                    -webkit-backdrop-filter: blur(var(--blur));
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    z-index: 1000;
                    transform: translateY(-100%);
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                
                nav.visible {
                    transform: translateY(0);
                }
                
                .nav-container {
                    max-width: 1200px;
                    height: 100%;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                
                .logo {
                    font-size: 18px;
                    font-weight: 600;
                    color: #171717;
                    text-decoration: none;
                    letter-spacing: -0.02em;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }
                
                .nav-links {
                    display: flex;
                    gap: 32px;
                    list-style: none;
                }
                
                .nav-links a {
                    text-decoration: none;
                    color: #525252;
                    font-size: 14px;
                    font-weight: 400;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    transition: color 0.2s ease;
                    position: relative;
                }
                
                .nav-links a:hover {
                    color: #171717;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: #171717;
                    transition: width 0.3s ease;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        gap: 20px;
                    }
                    
                    .nav-links a {
                        font-size: 13px;
                    }
                }
            </style>
            
            <nav id="navbar">
                <div class="nav-container">
                    <a href="#" class="logo">MSartório</a>
                    <ul class="nav-links">
                        <li><a href="#sobre">Sobre mim</a></li>
                        <li><a href="#servicos">Serviços</a></li>
                        <li><a href="#experiencias">Experiências</a></li>
                        <li><a href="#contato">Contato</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }

    setupEventListeners() {
        const nav = this.shadowRoot.querySelector('#navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const heroHeight = window.innerHeight * 0.8;
            
            if (currentScroll > heroHeight) {
                nav.classList.add('visible');
            } else {
                nav.classList.remove('visible');
            }
            
            lastScroll = currentScroll;
        });
    }
}

customElements.define('apple-nav', AppleNav);
