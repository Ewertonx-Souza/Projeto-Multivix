// Função principal que gera o PDF
function gerarPDF() {
 
  // Pega os valores de cada campo do formulário
  var nomeFuncionario = document.getElementById("nomeFuncionario").value.trim();
  var cargo = document.getElementById("cargo").value.trim();
  var turno = document.getElementById("turno").value;
 
  var placa = document.getElementById("placa").value.trim();
  var tipoVeiculo = document.getElementById("tipoVeiculo").value;
  var nomeMotorista = document.getElementById("nomeMotorista").value.trim();
  var transportadora = document.getElementById("transportadora").value.trim();
 
  var qtdNotas = document.getElementById("qtdNotas").value.trim();
  var qtdVolumes = document.getElementById("qtdVolumes").value.trim();
  var pesoTotal = document.getElementById("pesoTotal").value.trim();
  var tipoCarga = document.getElementById("tipoCarga").value.trim();
  var condicaoCarga = document.getElementById("condicaoCarga").value;
 
  var dataRecebimento = document.getElementById("dataRecebimento").value;
  var horaChegada = document.getElementById("horaChegada").value;
  var horaInicio = document.getElementById("horaInicio").value;
  var horaTermino = document.getElementById("horaTermino").value;
 
  var observacoes = document.getElementById("observacoes").value.trim();
 
  // Validação simples dos campos obrigatórios
  if (!nomeFuncionario || !placa || !dataRecebimento) {
    alert("Por favor, preencha pelo menos: Nome do Funcionário, Placa do Veículo e Data do Recebimento.");
    return;
  }
 
  // Formata a data de yyyy-mm-dd para dd/mm/yyyy
  var dataFormatada = "";
  if (dataRecebimento) {
    var partes = dataRecebimento.split("-");
    dataFormatada = partes[2] + "/" + partes[1] + "/" + partes[0];
  }
 
  // Cria o PDF usando a biblioteca jsPDF
  var { jsPDF } = window.jspdf;
  var doc = new jsPDF();
 
  // Cor azul escuro para os títulos (RGB)
  var corTitulo = [26, 75, 140];
  var corTexto = [50, 50, 50];
  var corLinha = [200, 210, 225];
 
  // --- Cabeçalho ---
  doc.setFillColor(26, 75, 140);
  doc.rect(0, 0, 210, 28, "F");
 
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("RELATÓRIO DE RECEBIMENTO DE CARGA", 105, 12, { align: "center" });
 
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Controle de Entrada - Galpão Logístico", 105, 20, { align: "center" });
 
  // Linha separadora abaixo do cabeçalho
  var y = 35; // posição vertical atual
 
  // --- Função auxiliar para adicionar seção ---
  function adicionarSecao(titulo) {
    doc.setFillColor(235, 241, 252);
    doc.rect(10, y, 190, 8, "F");
    doc.setTextColor(corTitulo[0], corTitulo[1], corTitulo[2]);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(titulo, 14, y + 5.5);
    y += 12;
  }
 
  // --- Função auxiliar para adicionar uma linha de campo ---
  function adicionarCampo(rotulo, valor) {
    // Se o valor estiver vazio, exibe "Não informado"
    var valorFinal = valor ? valor : "Não informado";
 
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(rotulo + ":", 14, y);
 
    doc.setTextColor(corTexto[0], corTexto[1], corTexto[2]);
    doc.setFont("helvetica", "normal");
    doc.text(valorFinal, 75, y);
 
    // Linha pontilhada embaixo
    doc.setDrawColor(corLinha[0], corLinha[1], corLinha[2]);
    doc.setLineWidth(0.3);
    doc.line(14, y + 2, 196, y + 2);
 
    y += 10;
  }
 
  // --- Dados do Funcionário ---
  adicionarSecao("DADOS DO FUNCIONÁRIO");
  adicionarCampo("Nome do Funcionário", nomeFuncionario);
  adicionarCampo("Cargo", cargo);
  adicionarCampo("Turno", turno);
 
  y += 3; // espaço entre seções
 
  // --- Dados do Veículo ---
  adicionarSecao("DADOS DO VEÍCULO");
  adicionarCampo("Placa do Veículo", placa.toUpperCase());
  adicionarCampo("Tipo de Veículo", tipoVeiculo);
  adicionarCampo("Nome do Motorista", nomeMotorista);
  adicionarCampo("Transportadora", transportadora);
 
  y += 3;
 
  // --- Dados da Carga ---
  adicionarSecao("DADOS DA CARGA");
  adicionarCampo("Qtd. de Notas Fiscais", qtdNotas);
  adicionarCampo("Qtd. de Volumes", qtdVolumes);
  adicionarCampo("Peso Total (kg)", pesoTotal ? pesoTotal + " kg" : "");
  adicionarCampo("Tipo de Mercadoria", tipoCarga);
  adicionarCampo("Condição da Carga", condicaoCarga);
 
  y += 3;
 
  // --- Horários ---
  adicionarSecao("HORÁRIOS");
  adicionarCampo("Data de Recebimento", dataFormatada);
  adicionarCampo("Hora de Chegada", horaChegada);
  adicionarCampo("Início da Descarga", horaInicio);
  adicionarCampo("Término / Saída", horaTermino);
 
  y += 3;
 
  // --- Observações ---
  adicionarSecao("OBSERVAÇÕES");
  doc.setTextColor(corTexto[0], corTexto[1], corTexto[2]);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
 
  if (observacoes) {
    // Quebra o texto em várias linhas se for longo
    var linhas = doc.splitTextToSize(observacoes, 180);
    doc.text(linhas, 14, y);
    y += linhas.length * 5 + 5;
  } else {
    doc.setTextColor(150, 150, 150);
    doc.text("Nenhuma observação registrada.", 14, y);
    y += 10;
  }
 
  y += 10;
 
  // --- Assinatura ---
  doc.setDrawColor(corTitulo[0], corTitulo[1], corTitulo[2]);
  doc.setLineWidth(0.5);
  doc.line(14, y, 100, y);
 
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Assinatura do Responsável", 14, y + 5);
  doc.text(nomeFuncionario ? nomeFuncionario : "______________________", 14, y + 11);
 
  // Rodapé do PDF
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text("Gerado em: " + new Date().toLocaleString("pt-BR"), 105, 285, { align: "center" });
  doc.text("Sistema de Relatório de Galpão", 105, 290, { align: "center" });
 
  // Salva o arquivo com o nome baseado na data e placa
  var nomeArquivo = "relatorio_" + (placa ? placa.replace("-", "") : "carga") + "_" + (dataRecebimento || "semdata") + ".pdf";
  doc.save(nomeArquivo);
}
 
