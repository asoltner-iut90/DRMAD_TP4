import {items, shopusers, bankaccounts, transactions} from './data'
import * as bcrypt from 'bcryptjs'

/* controllers: les fonctions ci-dessous doivent mimer ce que renvoie l'API en fonction des requêtes possibles.

  Dans certains cas, ces fonctions vont avoir des paramètres afin de filtrer les données qui se trouvent dans data.js
  Ces paramètres sont généralement les mêmes qu'ils faudrait envoyer à l'API, mais pas forcément.

  Exemple 1 : se loguer auprès de la boutique
 */

function getBasket(data) {
  let id = data.id;
  let user = shopusers.find(e => e._id === id)
  if (!user) return {error: 1, status: 404, data: 'user id invalid'}
  return {error: 0, status: 200, data: user.basket}

}

function updateBasket(data) {
  let id = data.id;
  let basket = data.basket;
  let user = shopusers.find(e => e._id === id)
  if (!user) return {error: 1, status: 404, data: 'user id invalid'}
  user['basket']=basket;
  return {error: 0, status: 200, data: user.basket}
}

function shopLogin(data) {
  if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'}
  // pour simplifier : test uniquement le login
  let user = shopusers.find(e => e.login === data.login && bcrypt.compareSync(data.password, e.password))
  if (!user) return {error: 1, status: 404, data: 'login/pass incorrect'}
  // retourne uniquement les champs nécessaires
  let u = {
    _id: user._id,
    name: user.name,
    login: user.login,
    email: user.email,
    session: user.session
  }
  return {error: 0, status: 200, data: u}
}

function getAllViruses() {
  return {error: 0, data: items}
}

function getAccountAmount(number){
  if(!number) return {error:1, status: 404,data:"aucun nombre fourni"}
  let account = bankaccounts.find(e => e.number === number)
  if (!account) return {error: 1, status: 404, data: 'account number invalid'}
  return {error: 0, status: 404, data:account.amount};
}

function getAccountTransactions(number){
  if(!number) return {error:1, status: 404,data:"aucun nombre fourni"}
  let account = bankaccounts.find(e => e.number === number)
  if (!account) return {error: 1, status: 404, data: 'account number invalid'}
  let id = account._id;
  let list = transactions.filter(e => e.account === id)
  if (!list) return {error: 1, status: 404, data: 'account number invalid'}
  return {error: 0, status: 404, data:list};
}



export default{
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
  updateBasket,
  getBasket
}

