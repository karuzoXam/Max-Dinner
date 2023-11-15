import menuArray from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const createFoodItem = function (arr) {
  return arr
    .map((product) => {
      const { name, ingredients, id, emoji, price } = product;

      let updatedIngredients;

      if (id === 2 && ingredients.length === 1 && typeof ingredients[0] === 'string') {
        updatedIngredients = ingredients[0]
          .split(',')
          .map((ingredient) => ingredient.trim())
          .join(' ');
      } else {
        updatedIngredients = ingredients.join(' ');
      }

      return `
      <li class="item" id="${id}">
        <p class="item-img">${emoji}</p>
        <div class="item-info">
          <h2 class="secontary-heading">${name}</h2>
          <p class="ingredients-paragraph">${updatedIngredients}</p>
          <p class="price">$${price}</p>
        </div>
        <button class="add-to-cart-btn" id="add-to-cart-btn">
          <i class="btn-icon fa-regular fa-plus"></i>
        </button>
      </li>
    `;
    })
    .join('');
};

const handleBtnClicks = function () {
  document.addEventListener('click', function (e) {
    // console.log(e.target);
    if (e.target && e.target.closest('#add-to-cart-btn')) {
      updateCart('add', e.target.closest('li'));
    } else if (e.target && e.target.id === 'remove-btn') {
      updateCart('remove', e.target.closest('li'));
    } else if (e.target && e.target.id === 'order-btn') {
      openModal();
    } else if (e.target && !e.target.closest('#modal') && !e.target.classList.contains('hidden')) {
      closeModal();
    } else if (e.target && e.target.id === 'submit-btn') {
      submitForm(e);
    }
  });
};
handleBtnClicks();

let cart = [];
const updateCart = function (instruction, el) {
  if (instruction === 'add') {
    menuArray.forEach((obj) => {
      if (obj.id === +el.id) {
        let item = { ...obj, uuid: uuidv4() };
        cart.push(item);
      }
    });
  }

  if (instruction === 'remove') {
    cart = cart.filter((item) => item.uuid !== el.id);
  }
  calculateCartSum(cart);
  createCartEl(cart);
  toggleCart(cart);
};

const clearCart = function () {
  cart = [];
  calculateCartSum(cart);
  createCartEl(cart);
  toggleCart(cart);
};

const calculateCartSum = function (cartArr) {
  const prices = cartArr.map((cartEl) => cartEl.price);
  let sum = 0;
  prices.forEach((price) => {
    sum += price;
  });

  renderCartTotal(sum);
};

const createCartEl = function (cartArr) {
  const cartHtml = cartArr
    .map((cartEl) => {
      return `
      <li class="order-products" id="${cartEl.uuid}" data-id="${cartEl.id}">
        <div class="remove-container">
          <p class="order-product-name">${cartEl.name}</p>
          <button class="remove-order-btn" id="remove-btn">remove</button>
        </div>
        <p class="price order-price">$${cartEl.price}</p>
      </li>
  `;
    })
    .join('');
  renderCart(cartHtml);
};

const renderCartTotal = function (total) {
  document.getElementById('total').textContent = '$' + total;
};

const toggleCart = function (cartArr) {
  if (cartArr.length >= 1) {
    document.getElementById('order-section').classList.remove('hidden');
  } else {
    document.getElementById('order-section').classList.add('hidden');
  }
};

const openModal = function () {
  document.getElementById('modal').classList.remove('hidden');
};

const closeModal = function () {
  document.getElementById('modal').classList.add('hidden');
};

const submitForm = function (e) {
  e.preventDefault();
  clearFormInputs();
  closeModal();
  clearCart();
  showMessage();
  reloadPage();
};

const clearFormInputs = function () {
  document.querySelectorAll('.form-input').forEach((inputField) => (inputField.value = ''));
};

const showMessage = function () {
  document.getElementById('order-completed-section').classList.remove('hidden');
};

const reloadPage = function () {
  setTimeout(function () {
    document.location.reload();
  }, 5000);
};

const renderCart = function (html) {
  document.getElementById('order-list').innerHTML = html;
};

const render = function () {
  document.getElementById('item-list').innerHTML = createFoodItem(menuArray);
};
render();
