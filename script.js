// Menu Mobile
let mobileMenuInitialized = false;

function setupMobileMenu() {
    console.log('Tentando configurar o menu mobile...');

    // Se já inicializado, sair
    if (mobileMenuInitialized) {
        console.log('Menu mobile já inicializado. Saindo.');
        return;
    }

    const menuButton = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        console.log('Botão do menu e menu mobile encontrados. Configurando listeners...');

        // Garante o estado inicial oculto usando display none
        mobileMenu.style.display = 'none';
        mobileMenu.classList.add('hidden');
        console.log('Estado inicial do menu mobile definido como oculto.');

        // Adiciona listener para fechar o menu ao clicar em um link dentro do menu mobile
        mobileMenu.querySelectorAll('a').forEach(link => {
            // Verifica se o listener já foi anexado para este link (opcional, para maior segurança)
            if (!link.dataset.mobileMenuListener) {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.style.display = 'none';
                    console.log('Link do menu mobile clicado, menu ocultado.');
                });
                link.dataset.mobileMenuListener = 'true'; // Marca que o listener foi anexado
                console.log('Listener de clique em link do menu mobile anexado:', link);
            }
        });
        console.log('Listeners de clique nos links do menu mobile verificados/anexados.');

        // Anexa listener de clique no botão do menu
        // Verifica se o listener já foi anexado para o botão (opcional)
        if (!menuButton.dataset.mobileMenuListener) {
            menuButton.addEventListener('click', () => {
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
            menuButton.dataset.mobileMenuListener = 'true'; // Marca que o listener foi anexado
            console.log('Event listener de clique no botão do menu anexado:', menuButton);
        }

        // Marca como inicializado para não reconfigurar
        mobileMenuInitialized = true;
        console.log('Menu mobile inicializado com sucesso.');

    } else {
        console.log('Botão do menu ou menu mobile NÃO encontrados. Não foi possível configurar o menu mobile nesta tentativa.');
    }
}

// Tenta configurar o menu mobile imediatamente
setupMobileMenu();

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