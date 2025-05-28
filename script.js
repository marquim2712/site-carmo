// Menu Mobile
let mobileMenuInitialized = false;

function setupMobileMenu() {
    console.log('Tentando configurar o menu mobile com delegação de eventos...');

    // Se já inicializado, sair
    if (mobileMenuInitialized) {
        console.log('Menu mobile já inicializado. Saindo.');
        return;
    }

    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar'); // Seleciona a barra de navegação como pai

    if (mobileMenu && navbar) {
        console.log('Menu mobile e barra de navegação encontrados. Configurando delegação de eventos...');

        // Garante o estado inicial oculto usando display none
        mobileMenu.style.display = 'none';
        mobileMenu.classList.add('hidden');
        console.log('Estado inicial do menu mobile definido como oculto.');

        // Adiciona listener para fechar o menu ao clicar em um link dentro do menu mobile
        mobileMenu.querySelectorAll('a').forEach(link => {
            // Verifica se o listener já foi anexado para este link (opcional, para maior segurança)
            if (!link.dataset.mobileMenuLinkListener) { // Usar nome diferente para evitar conflito
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.style.display = 'none';
                    console.log('Link do menu mobile clicado, menu ocultado.');
                });
                link.dataset.mobileMenuLinkListener = 'true'; // Marca que o listener foi anexado
                console.log('Listener de clique em link do menu mobile anexado:', link);
            }
        });
        console.log('Listeners de clique nos links do menu mobile verificados/anexados.');

        // Adiciona um único listener de clique na barra de navegação (delegação)
        navbar.addEventListener('click', (event) => {
            const target = event.target;
            console.log('Clique detectado na navbar. Target:', target);

            // Verifica se o clique foi no botão do menu hambúrguer ou em um de seus filhos (como o ícone <i>)
            const menuButton = target.closest('#nav-toggle');

            if (menuButton) {
                console.log('Clique detectado no botão do menu hamburguer.');
                // Previne o comportamento padrão se houver (embora o botão não tenha um padrão)
                // event.preventDefault();

                // Alterna a visibilidade do menu mobile
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.style.display = 'block';
                    console.log('Menu mobile exibido.');
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.style.display = 'none';
                    console.log('Menu mobile oculto.');
                }
            }
        });
        console.log('Delegação de eventos para botão do menu hamburguer configurada na navbar.');

        // Marca como inicializado para não reconfigurar
        mobileMenuInitialized = true;
        console.log('Menu mobile inicializado com sucesso.');

    } else {
        console.log('Menu mobile (#mobile-menu) ou navbar (.navbar) NÃO encontrados. Não foi possível configurar a delegação de eventos.');
    }
}

// Configura o menu mobile quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', setupMobileMenu);

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

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        // Alterna o menu ao clicar no botão
        menuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        // Fecha o menu ao clicar em qualquer link dentro dele
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });

        // Fecha o menu ao clicar fora dele (opcional)
        document.addEventListener('click', function(e) {
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && e.target !== menuButton) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}); 