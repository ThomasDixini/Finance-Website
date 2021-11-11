
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

const Storage = {
    get () {
        return JSON.parse(localStorage.getItem('DevFinances-Transactions:')) || [];
    },
    set(transactions){
        localStorage.setItem('DevFinances-Transactions:',JSON.stringify(transactions)); 
    },
}



const Transaction = {
    all:  Storage.get(),

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
        tr.innerHTML = DOM.innerHTMLTransaction(transactions,index);
        tr.dataset.index = index;

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transactions,index){

        const cssClasses = transactions.amount >= 0 ? "incomes" : "expenses";

        const amount = Utils.formatCurrency(transactions.amount);

        const html = `
                
                    <td class="description">${transactions.description}</td>
                    <td class=${cssClasses}>${amount}</td>
                    <td class="date">${transactions.date}</td>
                    <td>
                        <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
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

    formatAmount(value){
        value = Number(value) * 100;

        return value
    },

    formatDate(date){
        const splittedDate = date.split("-")                          

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

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

        if(description.trim() === "" || amount.trim() === "" || date.trim === ""){
            throw new Error("Por favor, preencha todos os campos!!")
        }
        
    },

    formatValues(){
        let {description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    

    clearTransaction(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){
        event.preventDefault()


       try{

        
           
       
        // Verificar se todas as informações foram preenchidas
        Form.validateFields()
        // Formatar os dados para salvar
        const transaction = Form.formatValues()
        // Salvar
        Transaction.add(transaction)
        // Apagar os dados do formulário
        Form.clearTransaction()
        // Modal feche
        modal.exitModal()
        // Atualizar aplicação
        console.log(transaction)
       }catch(error){
           alert(error.message)
       }
        

      

    }


    
}


const App = {
    init(){

        Transaction.all.forEach(DOM.addTransaction)
        
        DOM.updateBalance()

        Storage.set(Transaction.all)
    },

    reload(){
        DOM.clearTransactions();
        App.init();
    },

}



App.init()



