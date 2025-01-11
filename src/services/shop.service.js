import LocalSource from "@/datasource/controller";

async function shopLoginFromLocalSource(data) {
  // récupération auprès de la source locale
  return LocalSource.shopLogin(data)
}

async function getAllVirusesFromLocalSource() {
  // récupération auprès de la source locale
  return LocalSource.getAllViruses()
}

async function shopLogin(data) {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await shopLoginFromLocalSource(data)
  }
    // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
  }
  return response
}


async function getAllViruses() {
  let response = null;
  try {
    // changer la méthode appelée quand cette fonctionnalité l'API est prête
    response = await getAllVirusesFromLocalSource()
  }
  // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
  catch(err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer la liste des viruses'  }
  }
  return response
}

async function getBasketFromLocalSource(data) {
    // récupération auprès de la source locale
    return LocalSource.getBasket(data)
}

async function updateBasketFromLocalSource(data) {
    // récupération auprès de la source locale
    return LocalSource.updateBasket(data)
}

async function getBasket(data) {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prête
        response = await getBasketFromLocalSource(data)
    }
    // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de récupérer le panier'  }
    }
    return response
}

async function updateBasket(data) {
    let response = null;
    try {
        // changer la méthode appelée quand cette fonctionnalité l'API est prête
        response = await updateBasketFromLocalSource(data)
    }
    // NB: le catch n'aura lieu que pour des requête vers l'API, s'il y a une erreur réseau
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de mettre à jour le panier'  }
    }
    return response
}

async function payOrder(data) {
    let response = null;
    LocalSource.payOrder(data)
    return response
}

async function CreateOrderFromLocalSource(userid,basket) {
    return LocalSource.createOrder(userid,basket)
}

async function CreateOrder(userid, basket) {
    let response = null;
    console.log('CreateOrder', userid, basket);

    try {
        response = await CreateOrderFromLocalSource(userid, basket);
        console.log('Réponse de CreateOrderFromLocalSource:', response); // Log la réponse obtenue
    } catch (err) {
        console.error('Erreur lors de la création de la commande:', err);
        response = { error: 1, status: 404, data: 'erreur réseau, impossible de créer la commande' };
    }

    return response;
}

export default {
    shopLogin,
    getAllViruses,
    getBasket,
    updateBasket,
    payOrder,
    CreateOrder
}