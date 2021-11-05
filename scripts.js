
const modal = {

exitModal () {

const cancelModal = document.querySelector('div.modal-overlay');

cancelModal.classList.toggle('active');

},

openModal() {
    const openTheModal = document.querySelector('div.modal-overlay')
    openTheModal.classList.toggle('active');
}

}


const transactions = [
    {
        id: 1,
        description: "Luz",
        amount: -50000,
        date: "21/01/2021"
    },
    {
        id: 2,
        description: "Website",
        amount: 500000,
        date: "04/11/2021"
    },
    {
        id: 1,
        description: "Internet",
        amount: -20000,
        date: "20/11/2021"
    },
]


const Transaction = {
    incomes() {
        // Somar entradas
    },
    expenses() {
        // Somar saídas
    },
    total() {
        // Entradas - Saídas
    },
}

const DOM = {

    transactionsContainer:document.querySelector('#data-table tbody'),

    addTransaction(transactions,index){
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transactions);

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transactions){
        const html = `
                
                    <td class="description">${transactions.description}</td>
                    <td class="expenses">${transactions.amount}</td>
                    <td class="date">${transactions.date}</td>
                    <td>
                        <img src="./assets/minus.svg" alt="Remover transação">
                    </td>
                
    `;
        return html;
    },
}


transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})