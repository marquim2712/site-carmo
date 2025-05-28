// Menu Mobile
function setupMobileMenu() {
    console.log('Tentando configurar o menu mobile...');
    const menuButton = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        console.log('Botão do menu e menu mobile encontrados. Configurando listeners...');
        // Garante o estado inicial oculto usando display none
        mobileMenu.style.display = 'none';
        mobileMenu.classList.add('hidden');
        console.log('Estado inicial do menu mobile definido como oculto.');

        // Remove listeners existentes para evitar duplicação, se houver
        const newMenuButton = menuButton.cloneNode(true);
        menuButton.parentNode.replaceChild(newMenuButton, menuButton);
        const currentMenuButton = newMenuButton;

        // Adiciona listener para fechar o menu ao clicar em um link
        mobileMenu.querySelectorAll('a').forEach(link => {
             // Remove listeners existentes nos links para evitar duplicação
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);

            newLink.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
                console.log('Link do menu mobile clicado, menu ocultado.');
            });
        });
        console.log('Listeners de clique nos links do menu mobile reconfigurados.');

        // Anexa listener de clique no botão do menu
        currentMenuButton.addEventListener('click', () => {
            console.log('Botão do menu clicado.');
            // Alterna a visibilidade
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.display = 'block';
                console.log('Menu mobile exibido.');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.style.display = 'none';
                console.log('Menu mobile oculto.');
            }
        });
        console.log('Event listener de clique no botão do menu anexado.');
    } else {
        console.log('Botão do menu ou menu mobile NÃO encontrados.');
    }
}

// Tenta configurar o menu quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', setupMobileMenu);

// Tenta configurar o menu também no evento load (para garantir em algumas situações)
window.addEventListener('load', setupMobileMenu);

// Tenta configurar o menu em intervalos regulares caso os elementos sejam carregados dinamicamente
// (menos ideal, mas pode ajudar a depurar se for um problema de timing)
let checkMenuInterval = setInterval(setupMobileMenu, 1000); // Tenta a cada segundo

// Para parar o intervalo após um tempo ou quando o menu for configurado com sucesso
setTimeout(() => {
    clearInterval(checkMenuInterval);
    console.log('Intervalo de verificação do menu parado.');
}, 10000); // Para após 10 segundos (ajuste se necessário)

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Formulário de Chamado
const chamadoForm = document.getElementById('chamadoForm');
if (chamadoForm) {
    chamadoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const empresa = formData.get('empresa');
        const telefone = formData.get('telefone');
        const local = formData.get('local');
        const equipamento = formData.get('equipamento');
        const tipoProblema = formData.get('tipo');
        const descricao = formData.get('descricao');
        const prioridade = formData.get('prioridade');
        const data = new Date().toLocaleString();

        // Formatar mensagem para WhatsApp
        let mensagem = `*Novo Chamado Técnico*\n\n`;
        mensagem += `*Empresa:* ${empresa}\n`;
        mensagem += `*Telefone:* ${telefone}\n`;
        mensagem += `*Local:* ${local}\n`;
        mensagem += `*Equipamento:* ${equipamento}\n`;
        mensagem += `*Tipo de Problema:* ${tipoProblema}\n`;
        mensagem += `*Descrição:* ${descricao}\n`;
        mensagem += `*Prioridade:* ${prioridade}\n`;
        mensagem += `*Data:* ${data}`;

        // Codifica a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        // Abre o WhatsApp com a mensagem formatada
        window.open(`https://wa.me/5534999733669?text=${mensagemCodificada}`, '_blank');
        // Limpa o formulário
        this.reset();
    });
}

// Formulário de Pedido
const pedidoForm = document.getElementById('pedidoForm');
if (pedidoForm) {
    pedidoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(pedidoForm);
        const nome = formData.get('nome');
        const telefone = formData.get('telefone');
        const categoria = formData.get('produto');
        const produtoRelacionado = formData.get('produtoRelacionado');
        const outroProduto = formData.get('outroProduto');
        const quantidade = formData.get('quantidade');
        const observacoes = formData.get('observacoes');

        let produtoFinal = categoria;
        if (produtoRelacionado) {
            if (produtoRelacionado === 'Outro' && outroProduto) {
                produtoFinal += ' - Outro: ' + outroProduto;
            } else if (produtoRelacionado !== '' && produtoRelacionado !== 'Outro') {
                produtoFinal += ' - ' + produtoRelacionado;
            }
        }

        // Formata a mensagem para o WhatsApp
        let mensagem = `*Novo Pedido*\n\n`;
        mensagem += `*Nome:* ${nome}\n`;
        mensagem += `*Telefone:* ${telefone}\n`;
        mensagem += `*Produto:* ${produtoFinal}\n`;
        mensagem += `*Quantidade:* ${quantidade}\n`;
        if (observacoes) {
            mensagem += `*Observações:* ${observacoes}\n`;
        }

        // Codifica a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagem);
        
        // Abre o WhatsApp com a mensagem formatada
        window.open(`https://wa.me/5534999733669?text=${mensagemCodificada}`, '_blank');
        
        // Limpa o formulário
        pedidoForm.reset();
    });
}

// Formulário de Contato
const contatoForm = document.getElementById('contatoForm');
if (contatoForm) {
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const mensagem = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            assunto: formData.get('assunto'),
            mensagem: formData.get('mensagem')
        };

        // Formatar mensagem para WhatsApp
        const whatsappMensagem = `
            *NOVA MENSAGEM - CARMO ASSISTÊNCIA TÉCNICA*
            
            Nome: ${mensagem.nome}
            E-mail: ${mensagem.email}
            
            Assunto: ${mensagem.assunto}
            Mensagem: ${mensagem.mensagem}
        `.trim();

        // Abrir WhatsApp
        const whatsappUrl = `https://wa.me/5534999733669?text=${encodeURIComponent(whatsappMensagem)}`;
        window.open(whatsappUrl, '_blank');

        // Limpar formulário
        this.reset();
    });
}

// Animação de Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
}); 