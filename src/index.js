"use strict";

import getData from './modules/getData';
import renderCards from './modules/renderCards';
import renderCatalog from './modules/renderCatalog';
import toggleCheakbox from './modules/toggleCheakbox';
import toggleCart from './modules/toggleCart';
import addCart from './modules/addCart';
import actionPage from './modules/actionPage';

(async function() {
    const db = await getData();
    renderCards(db);
    renderCatalog();
    toggleCheakbox();
    toggleCart();
    addCart();
    actionPage();
 }());
