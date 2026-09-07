import "./style.css";

const billInput = document.querySelector<HTMLInputElement>("#bill");
const peopleInput = document.querySelector<HTMLInputElement>("#people");

const tipButtons = document.querySelectorAll<HTMLButtonElement>(".tip-button");

const customButton =
  document.querySelector<HTMLButtonElement>("#custom-button");

const customInput = document.querySelector<HTMLInputElement>("#custom-tip");

const tipAmountElement = document.querySelector<HTMLSpanElement>("#tip-amount");

const totalAmountElement =
  document.querySelector<HTMLSpanElement>("#total-amount");

const resetButton = document.querySelector<HTMLButtonElement>("#reset");

const errorMessage = document.querySelector<HTMLSpanElement>("#error-message");

let selectedTip: number = 0;

function calculate(): void {
  if (!billInput || !peopleInput) return;

  const bill: number = Number(billInput.value);
  const people: number = Number(peopleInput.value);

  if (peopleInput.value !== "" && people === 0) {
    showError();
    resetResults();
    return;
  }

  hideError();

  if (bill <= 0 || people <= 0 || selectedTip <= 0) {
    resetResults();
    return;
  }

  const tipAmount: number = bill * (selectedTip / 100);

  const totalAmount: number = bill + tipAmount;

  const tipPerPerson: number = tipAmount / people;

  const totalPerPerson: number = totalAmount / people;

  if (tipAmountElement) {
    tipAmountElement.textContent = `$${tipPerPerson.toFixed(2)}`;
  }

  if (totalAmountElement) {
    totalAmountElement.textContent = `$${totalPerPerson.toFixed(2)}`;
  }

  if (resetButton) {
    resetButton.disabled = false;
  }
}

function showError(): void {
  errorMessage?.classList.remove("hidden");
  peopleInput?.classList.add("error");
}

function hideError(): void {
  errorMessage?.classList.add("hidden");
  peopleInput?.classList.remove("error");
}

function resetResults(): void {
  if (tipAmountElement) {
    tipAmountElement.textContent = "$0.00";
  }

  if (totalAmountElement) {
    totalAmountElement.textContent = "$0.00";
  }
}

function selectTip(tip: number): void {
  selectedTip = tip;

  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });

  const selectedButton = document.querySelector<HTMLButtonElement>(
    `[data-tip="${tip}"]`,
  );

  selectedButton?.classList.add("active");

  if (customInput) {
    customInput.value = "";
    customInput.classList.add("hidden");
  }

  customButton?.classList.remove("hidden");

  calculate();
}

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tip: number = Number(button.dataset.tip);

    selectTip(tip);
  });
});

customButton?.addEventListener("click", () => {
  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });

  customButton.classList.add("hidden");

  customInput?.classList.remove("hidden");

  customInput?.focus();

  selectedTip = 0;

  resetResults();
});

customInput?.addEventListener("input", () => {
  selectedTip = Number(customInput.value) || 0;

  calculate();
});

billInput?.addEventListener("input", () => {
  calculate();
});

peopleInput?.addEventListener("input", () => {
  calculate();
});

resetButton?.addEventListener("click", () => {
  if (billInput) {
    billInput.value = "";
  }

  if (peopleInput) {
    peopleInput.value = "";
  }

  if (customInput) {
    customInput.value = "";
    customInput.classList.add("hidden");
  }

  selectedTip = 0;

  tipButtons.forEach((button) => {
    button.classList.remove("active");
  });

  customButton?.classList.remove("hidden");

  hideError();
  resetResults();

  if (resetButton) {
    resetButton.disabled = true;
  }
});
