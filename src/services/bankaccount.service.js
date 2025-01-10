import LocalSource from "@/datasource/controller";


function getAccountAmountFromLocalSource(number){
    return LocalSource.getAccountAmount(number)
}

async function getAccountAmount(number) {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prête
        response = await  getAccountAmountFromLocalSource(number)
    }
        // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
    catch (err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la valeur du compte'}
    }
    return response
}

function getAccountTransactionsFromLocalSource(number){
    return LocalSource.getAccountTransactions(number)
}

async function getAccountTransactions(number) {
    return getAccountTransactionsFromLocalSource(number)
}



export default{
    getAccountAmount,
    getAccountTransactions,
}