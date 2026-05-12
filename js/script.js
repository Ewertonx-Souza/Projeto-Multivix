// Salva automaticamente os campos no localStorage
function salvarTudo() {

    const campos = [
        'relatorio-id',
        'data-operacao',
        'responsavel',
        'tipo-movimentacao',
        'nota-fiscal',
        'status-carga',
        'observacoes'
    ];

    campos.forEach(id => {

        const el = document.getElementById(id);

        if (el) {
            localStorage.setItem(id, el.value);
        }
    });
}

/**
 * Valida os campos obrigatórios
 */
function validarFormulario() {

    const mensagemErro = document.getElementById('mensagem-erro');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');

    mensagemErro.textContent = '';
    mensagemSucesso.textContent = '';

    const relatorioId = document.getElementById('relatorio-id').value.trim();
    const dataOperacao = document.getElementById('data-operacao').value.trim();
    const responsavel = document.getElementById('responsavel').value.trim();

    const honeypot = document.getElementById('website').value.trim();

    // Anti-spam
    if (honeypot !== '') {

        mensagemErro.textContent = 'Ação bloqueada por segurança.';
        return false;
    }

    // Validação básica
    if (!relatorioId || !dataOperacao || !responsavel) {

        mensagemErro.textContent =
            'Preencha todos os campos obrigatórios.';

        return false;
    }

    return true;
}

/**
 * Restaura dados salvos
 */
window.addEventListener('DOMContentLoaded', () => {

    const campos = [
        'relatorio-id',
        'data-operacao',
        'responsavel',
        'tipo-movimentacao',
        'nota-fiscal',
        'status-carga',
        'observacoes'
    ];

    campos.forEach(id => {

        const el = document.getElementById(id);

        const valor = localStorage.getItem(id);

        if (el && valor) {
            el.value = valor;
        }

        if (el) {
            el.addEventListener('input', salvarTudo);
        }
    });
});

/**
 * Geração do PDF
 */
document.getElementById('gerar-pdf')
.addEventListener('click', () => {

    if (!validarFormulario()) return;

    const relatorioId =
        document.getElementById('relatorio-id').value;

    const dataOperacao =
        document.getElementById('data-operacao').value;

    const responsavel =
        document.getElementById('responsavel').value;

    const tipoMovimentacao =
        document.getElementById('tipo-movimentacao').value;

    const notaFiscal =
        document.getElementById('nota-fiscal').value;

    const statusCarga =
        document.getElementById('status-carga').value;

    const observacoes =
        document.getElementById('observacoes').value;

    const docDefinition = {

        content: [

            {
                text: 'RELATÓRIO LOGÍSTICO',
                style: 'header'
            },

            {
                text: `ID / OS: ${relatorioId}`,
                margin: [0, 10, 0, 5]
            },

            {
                text: `Data da Operação: ${dataOperacao}`
            },

            {
                text: `Responsável: ${responsavel}`,
                margin: [0, 0, 0, 15]
            },

            {
                text: 'Movimentação',
                style: 'section'
            },

            {
                text: `Tipo: ${tipoMovimentacao}`
            },

            {
                text: `Nota Fiscal: ${notaFiscal || '-'}`
            },

            {
                text: 'Status da Carga',
                style: 'section'
            },

            {
                text: statusCarga
            },

            {
                text: 'Observações',
                style: 'section'
            },

            {
                text: observacoes || 'Nenhuma observação registrada.'
            }
        ],

        styles: {

            header: {
                fontSize: 22,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 20]
            },

            section: {
                fontSize: 16,
                bold: true,
                margin: [0, 15, 0, 8]
            }
        },

        defaultStyle: {
            fontSize: 12,
            lineHeight: 1.5
        }
    };

    pdfMake.createPdf(docDefinition)
        .download(`relatorio-${relatorioId}.pdf`);

    const mensagemSucesso =
        document.getElementById('mensagem-sucesso');

    mensagemSucesso.innerHTML = `
        ✅ Relatório gerado com sucesso!
    `;

    setTimeout(() => {

        mensagemSucesso.innerHTML = '';

    }, 10000);
});

/**
 * Atualiza o ano do rodapé
 */
document.getElementById('ano-atual')
.textContent = new Date().getFullYear();
