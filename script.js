// Menu Mobile
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

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(e) {
            if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && e.target !== menuButton) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
});

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

// Animação de Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Formulário de Contato
const contatoForm = document.getElementById('contato-form');
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