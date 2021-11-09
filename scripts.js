
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





const Transaction = {
    all: transactions = [
        {
            
            description: "Luz",
            amount: -50000,
            date: "21/01/2021"
        },
        {
            
            description: "Website",
            amount: 500000,
            date: "04/11/2021"
        },
        {
            
            description: "Internet",
            amount: -20000,
            date: "20/11/2021"
        },
        {
            
            description: "Televisão ",
            amount: 20000,
            date: "20/11/2021"
        },
    ],

    add(transaction){
        Transaction.all.push(transaction)

        App.reload();
    },

    remove(index){
        Transaction.all.splice(index,1)

        App.reload();
    },

    incomes() {
        let income = 0;
        
        
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;

            }
            
            
        })

        return (income);
    },

    expenses() {
        let expense = 0;
        
        
        Transaction.all.forEach(transaction => {
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
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
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

const Form = {
    
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    

    validateFields(){
        const {description, amount, date} = Form.getValues()

        if(description.trim() === "" || amount.trim() === "" || date.trim){
            throw new Error("Por favor, preencha todos os campos!!")
        }
        
    },

    submit(event){
       //event.preventDefault();


       try {
           
       
        // Verificar se todas as informações foram preenchidas
        Form.validateFields()
        // Formatar os dados para salvar
        //Form.formatData()
        // Salvar
        //Form.save()
        // Apagar os dados do formulário
        // Modal feche
        // Atualizar aplicação

       }catch(error){
           alert(error.message)
       }

    }


    
}


const App = {
    init(){

        Transaction.all.forEach(transaction =>{
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
    },

    reload(){
        DOM.clearTransactions();
        App.init();
    },

}



App.init()

Transaction.add({
    id: 39,
    description: "alo hello",
    amount: 2000,
    date: "21/02/2021"

})

