const form = document.getElementById("simulatorForm");
const results = document.getElementById("results");
const resultTotal = document.getElementById("resultTotal");
const resultEntry = document.getElementById("resultEntry");
const resultFinanced = document.getElementById("resultFinanced");
const resultInterest = document.getElementById("resultInterest");
const resultInstallment = document.getElementById("resultInstallment");
const resultTotalWithInterest = document.getElementById("resultTotalWithInterest");

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const saleValue = Number(form.saleValue.value) || 0;
  const downPayment = Number(form.downPayment.value) || 0;
  const interestRate = Number(form.interestRate.value) || 0;
  const installments = Number(form.installments.value) || 0;

  const financedAmount = Math.max(saleValue - downPayment, 0);
  const interestValue = (financedAmount * interestRate) / 100;
  const totalWithInterest = saleValue + downPayment + interestValue;
  const installmentValue = installments > 0 ? totalWithInterest / installments : 0;

  resultTotal.textContent = formatCurrency(saleValue);
  resultEntry.textContent = formatCurrency(downPayment);
  resultFinanced.textContent = formatCurrency(financedAmount);
  resultInterest.textContent = formatCurrency(interestValue);
  resultInstallment.textContent = formatCurrency(installmentValue);
  resultTotalWithInterest.textContent = formatCurrency(totalWithInterest);
  results.classList.remove("hidden");
});
