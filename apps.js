const budget = parseFloat(document.getElementById("budget").value) || 0;
const status = document.getElementById("status");

if (budget > 0) {
  if (grandTotal < budget * 0.8) {
    status.innerText = "🟢 You're within budget";
    status.style.color = "green";
  } else if (grandTotal <= budget) {
    status.innerText = "🟡 Near budget";
    status.style.color = "orange";
  } else {
    status.innerText = "🔴 Over budget!";
    status.style.color = "red";
  }
}
