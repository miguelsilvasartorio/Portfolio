class AppleFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                footer {
                    background: #fafafa;
                    border-top: 1px solid #e5e5e5;
                    padding: 40px 24px;
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                
                .footer-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 24px;
                }
                
                .copyright {
                    font-size: 13px;
                    color: #737373;
                    font-weight: 400;
                }
                
                .footer-links {
                    display: flex;
                    gap: 32px;
                    list-style: none;
                }
                
                .footer-links a {
                    text-decoration: none;
                    color: #525252;
                    font-size: 13px;
                    font-weight: 400;
                    transition: color 0.2s ease;
                }
                
                .footer-links a:hover {
                    color: #171717;
                    text-decoration: underline;
                }
                
                .divider {
                    height: 1px;
                    background: #e5e5e5;
                    width: 100%;
                }
                
                .footer-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 16px;
                }
                
                .location {
                    font-size: 12px;
                    color: #a3a3a3;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                @media (max-width: 640px) {
                    .footer-top {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .footer-bottom {
                        flex-direction: column;
                        text-align: center;
                    }
                    
                    .footer-links {
                        gap: 20px;
                    }
                }
            </style>
            
            <footer>
                <div class="footer-container">
                    <div class="footer-top">
                        <p class="copyright">© ${new Date().getFullYear()} Miguel Sartório. Todos os direitos reservados.</p>
                        <ul class="footer-links">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Resume</a></li>
                        </ul>
                    </div>
                    <div class="divider"></div>
                    <div class="footer-bottom">
                        <span class="location">
                            <span>Campinas, São Paulo</span>
                        </span>
                        <span style="font-size: 12px; color: #a3a3a3;">Designed with precision.</span>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('apple-footer', AppleFooter);
