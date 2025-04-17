let price = 19.5;
let cid = [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];
const currencyUnits = {
  "ONE HUNDRED": 100,
  "TWENTY": 20,
  "TEN": 10,
  "FIVE": 5,
  "ONE": 1,
  "QUARTER": 0.25,
  "DIME": 0.1,
  "NICKEL": 0.05,
  "PENNY": 0.01
};

document.getElementById("purchase-btn").addEventListener("click",() => {
  const cash = parseFloat(document.getElementById("cash").value);
  handleTransaction(price,cash,cid);
});

let changeDue = document.getElementById("change-due");

function handleTransaction(price, cash, cid)
{
  // 1. Calcul du total des fonds disponibles
  let funds = 0;
  for(var i = 0; i < cid.length; i++)
  {
    funds += cid[i][1];
  }
  funds = parseFloat(funds.toFixed(2)); // éviter les erreurs d'arrondis

  // 2. Si le client n’a pas assez de cash
  if(cash < price)
  {
    alert("Customer does not have enough money to purchase the item");
  }

  // 3. Si le client a payé le montant exact
  else if(cash === price)
  {
    changeDue.innerText="No change due - customer paid with exact cash";
  }

  else
  {
  // 4. Calcul du change à rendre
  const due = cash - price;
  
  // 5. Si la caisse ne peut pas rendre la monnaie
  if(funds < due)
  {
    changeDue.innerText= "Status: INSUFFICIENT_FUNDS";
  }
   // 6. Si la caisse a exactement le montant du change
  else if(funds === due)
  {
    let output = "Status: CLOSED"
    cid.forEach(item => {
      if(item[1]>0)
      {
        output += `${item[0]}: $${item[1].toFixed(2)}`;
        
      }
    })
    changeDue.innerText= output.trim();
  }
  // 7. Sinon (caisse ouverte et monnaie dispo — à compléter plus tard)
  else
  {
    // 7. Si on peut rendre la monnaie (Status: OPEN)
let changeArray = [];
let change = due;

let reversedCid = [...cid].reverse(); // on commence par les plus gros billets

for (let i = 0; i < reversedCid.length; i++) {
  let [unit, amountAvailable] = reversedCid[i];
  let unitValue = currencyUnits[unit];
  let amountToReturn = 0;

  // Tant qu'on peut rendre cette unité et que le change est suffisant
  while (change >= unitValue && amountAvailable > 0) {
    change -= unitValue;
    amountAvailable -= unitValue;
    amountToReturn += unitValue;
    
    // éviter les erreurs de flottants
    change = parseFloat(change.toFixed(2));
  }

  if (amountToReturn > 0) {
    changeArray.push([unit, parseFloat(amountToReturn.toFixed(2))]);
  }
}

// Si on n’a pas pu rendre le change exact
if (change > 0) {
  changeDue.innerText = "Status: INSUFFICIENT_FUNDS";
  return;
}

// Sinon on affiche le change
let output = "Status: OPEN ";
changeArray.forEach(item => {
  output += `${item[0]}: $${item[1]} `;
});

changeDue.innerText = output.trim();

  }

  }
}
