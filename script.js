const form = document.getElementById("simulatorForm");
const results = document.getElementById("results");
const resultTotal = document.getElementById("resultTotal");
const resultEntry = document.getElementById("resultEntry");
const resultFinanced = document.getElementById("resultFinanced");
const resultInterest = document.getElementById("resultInterest");
const resultInstallment = document.getElementById("resultInstallment");
const resultTotalWithInterest = document.getElementById("resultTotalWithInterest");

// Elementos do acompanhamento de parcelas
const trackingForm = document.getElementById("trackingForm");
const trackingResults = document.getElementById("trackingResults");
const installmentsList = document.getElementById("installmentsList");

// Zerar os campos ao carregar a página
window.addEventListener("load", () => {
  form.reset();
  trackingForm.reset();
  results.classList.add("hidden");
  trackingResults.classList.add("hidden");
});

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);

// Função para converter valor para número
const parseFormattedValue = (value) => {
  if (!value || value === "") return 0;
  let numValue = Number(value);
  return isNaN(numValue) ? 0 : numValue;
};

// Navegação entre abas
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabName = btn.getAttribute("data-tab");

    // Remove active de todos os botões e conteúdos
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Adiciona active no selecionado
    btn.classList.add("active");
    document.getElementById(tabName).classList.add("active");
  });
});

// Simulador - Cálculo original
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const saleValue = parseFormattedValue(form.saleValue.value) || 0;
  const downPayment = parseFormattedValue(form.downPayment.value) || 0;
  const interestRate = parseFormattedValue(form.interestRate.value) || 0;
  const installments = Number(form.installments.value) || 0;

  const financedAmount = Math.max(saleValue - downPayment, 0);
  const interestValue = (financedAmount * interestRate) / 100;
  const totalWithInterest = (saleValue - downPayment) + interestValue;
  const installmentValue = installments > 0 ? totalWithInterest / installments : 0;

  resultTotal.textContent = formatCurrency(saleValue);
  resultEntry.textContent = formatCurrency(downPayment);
  resultFinanced.textContent = formatCurrency(financedAmount);
  resultInterest.textContent = formatCurrency(interestValue);
  resultInstallment.textContent = formatCurrency(installmentValue);
  resultTotalWithInterest.textContent = formatCurrency(totalWithInterest);
  results.classList.remove("hidden");
});

// Acompanhamento de Parcelas
trackingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const buyerName = document.getElementById("buyerName").value;
  const totalValue = parseFormattedValue(document.getElementById("trackingTotalValue").value);
  const downPayment = parseFormattedValue(document.getElementById("trackingDownPayment").value);
  const totalInstallments = Number(document.getElementById("trackingInstallments").value) || 0;
  const installmentValue = parseFormattedValue(document.getElementById("trackingInstallmentValue").value);
  const paidInstallments = Number(document.getElementById("paidInstallments").value) || 0;
  const paymentFrequency = document.getElementById("paymentFrequency").value;
  const firstPaymentDateString = document.getElementById("firstPaymentDate").value;

  // Atualizar cabeçalho
  document.getElementById("displayBuyerName").textContent = buyerName;
  document.getElementById("displayTotalValue").textContent = formatCurrency(totalValue);
  document.getElementById("displayDownPayment").textContent = formatCurrency(downPayment);
  document.getElementById("displayTotalInstallments").textContent = totalInstallments;
  document.getElementById("displayPaidInstallments").textContent = paidInstallments;

  // Gerar parcelas
  const today = new Date();
  const firstPaymentDate = new Date(firstPaymentDateString);

  // Definir o intervalo de dias baseado na frequência
  const dayInterval = paymentFrequency === "weekly" ? 7 : 14;

  // Agrupar parcelas por mês
  const installmentsByMonth = {};

  for (let i = 1; i <= totalInstallments; i++) {
    // Calcular data de vencimento baseada na primeira parcela e intervalo
    const dueDate = new Date(firstPaymentDate);
    dueDate.setDate(dueDate.getDate() + (i - 1) * dayInterval);

    // Criar chave do mês (YYYY-MM)
    const monthKey = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, "0")}`;
    
    // Inicializar array se não existir
    if (!installmentsByMonth[monthKey]) {
      installmentsByMonth[monthKey] = [];
    }

    // Determinar status
    const isPaid = i <= paidInstallments;
    const isOverdue = today > dueDate && i > paidInstallments;

    let statusClass = isPaid ? "paid" : isOverdue ? "overdue" : "ontime";
    let statusText = isPaid ? "Paga" : isOverdue ? "Atrasada" : "Em dia";

    const dueDateFormatted = dueDate.toLocaleDateString("pt-PT");

    installmentsByMonth[monthKey].push({
      number: i,
      value: formatCurrency(installmentValue),
      dueDate: dueDateFormatted,
      statusClass,
      statusText,
    });
  }

  // Gerar HTML agrupado por mês
  let html = "";
  const sortedMonths = Object.keys(installmentsByMonth).sort();

  sortedMonths.forEach((monthKey) => {
    const [year, month] = monthKey.split("-");
    const monthDate = new Date(year, parseInt(month) - 1);
    const monthLabel = monthDate.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });

    html += `<div class="month-group">
      <div class="month-header">${monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)}</div>`;

    installmentsByMonth[monthKey].forEach((installment) => {
      html += `
        <div class="installment-row">
          <span class="installment-number">Parcela ${installment.number}</span>
          <span class="installment-value">${installment.value}</span>
          <span class="installment-due-date">Vencimento: ${installment.dueDate}</span>
          <span class="status ${installment.statusClass}">${installment.statusText}</span>
        </div>
      `;
    });

    html += `</div>`;
  });

  installmentsList.innerHTML = html;
  trackingResults.classList.remove("hidden");
});

