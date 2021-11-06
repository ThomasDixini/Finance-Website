
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
        id: 3,
        description: "Internet",
        amount: -20000,
        date: "20/11/2021"
    },
    {
        id: 4,
        description: "Internet",
        amount: 20000,
        date: "20/11/2021"
    },
]


const Transaction = {
    incomes() {
        let income = 0;
        
        
        transactions.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;

            }
            
            
        })

        return (income);
    },
    expenses() {
        let expense = 0;
        
        
        transactions.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;

            }
            
            
        })

        return (expense);
    },
    total() {
        

        return Transaction.incomes() + Transaction.expenses();

        
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

        const cssClasses = transactions.amount >= 0 ? "incomes" : "expenses";

        const amount = Utils.formatCurrency(transactions.amount);

        const html = `
                
                    <td class="description">${transactions.description}</td>
                    <td class=${cssClasses}>${amount}</td>
                    <td class="date">${transactions.date}</td>
                    <td>
                        <img src="./assets/minus.svg" alt="Remover transação">
                    </td>
                
    `;
        return html;
    },
    updateBalance () {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, ""); 

        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })

        return (signal + value)
    }
}


transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()