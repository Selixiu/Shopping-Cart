"use strict";
const currentImage = document.querySelector(".current-img");
const currentFocusedImg = document.querySelector(".current-focused");
const smallImages = document.querySelectorAll(".thumbnail");
const smallImagesFocused = document.querySelectorAll(".thumbnail-focused");
const bigImage = document.querySelector(".current-img");
const overlay = document.querySelector(".overlay");
const focusedItems = document.querySelector(".focused-div");
const rightButton = document.querySelector(".right-next-button");
const leftButton = document.querySelector(".left-previous-button");
const body = document.body;
const quantity = document.querySelector(".input-field");
const addQuantityBtn = document.querySelector(".plus-button");
const minusQuantityBtn = document.querySelector(".minus-button");
const currentPrice = document.querySelector(".current-price");
const initialPrice = document.querySelector(".initial-price");
const addToCartBttn = document.querySelector(".add-to-cart-button");
const checkOutList = document.querySelector(".checkout-items-wrapper");
const shopingContainer = document.querySelector(".shopping-cart-container");
const itemsInTheCart = document.querySelector(".number-of-items");
const closeCartBtn = document.querySelector(".close-cart");
const cartIcon = document.querySelector(".cart");
//Reusable functions
function changeImage(i) {
  bigImage.src = `./images/image-product-${i + 1}.jpg`;
}
const smallImgHighlight = function (elem) {
  smallImages.forEach((thumbnail) => thumbnail.classList.remove("highlighted"));
  elem.classList.add("highlighted");
};
function currentFocused(num) {
  currentFocusedImg.src = `./images/image-product-${num}.jpg`;
}
//

smallImages.forEach((elem, i) => {
  elem.addEventListener("click", function () {
    changeImage(i);
    smallImgHighlight(elem);
  });
});

currentImage.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  focusedItems.classList.remove("hidden");
});

// Overlay buttons
let num = 1;
rightButton.addEventListener("click", function () {
  num++;
  console.log(num);
  if (num === 5) {
    num = 1;
  }
  let selected = document.querySelector(`[data-slide="${num}"]`);
  smallImagesFocused.forEach((elem) => elem.classList.remove("highlighted"));
  selected.classList.add("highlighted");
  currentFocused(num);
});

leftButton.addEventListener("click", function () {
  num--;
  console.log(num);
  if (num === 0) {
    num = 4;
  }
  let selected = document.querySelector(`[data-slide="${num}"]`);
  smallImagesFocused.forEach((elem) => elem.classList.remove("highlighted"));
  selected.classList.add("highlighted");
  currentFocused(num);
});

//Close overlay
body.addEventListener("keydown", function () {
  overlay.classList.add("hidden");
  focusedItems.classList.add("hidden");
  shopingContainer.classList.add("hidden");
});

overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
  focusedItems.classList.add("hidden");
});

//Price buttons
let numberOfItems = 1;
let currentPriceValue = 125;
const initialPriceValue = 250;
quantity.value = 1;
let totalValue = currentPriceValue;
function itemMovements() {
  quantity.value = numberOfItems;
  totalValue = currentPriceValue * numberOfItems;
  currentPrice.innerHTML = `$${totalValue}.00`;
  let initialCost = initialPriceValue * numberOfItems;
  initialPrice.innerHTML = `$${initialCost}.00`;
}
function ifBelowZero() {
  if (numberOfItems < 1) {
    quantity.value = 1;
    numberOfItems = 1;
    currentPriceValue = 125;
    totalValue = currentPriceValue;
    currentPrice.innerHTML = `$${currentPriceValue}.00`;
    initialPrice.innerHTML = `$${initialPriceValue}.00`;
  }
  if (isNaN(quantity.value)) {
    quantity.value = " ";
    numberOfItems = 1;
    currentPriceValue = 125;
    totalValue = currentPriceValue;
    currentPrice.innerHTML = `$${currentPriceValue}.00`;
    initialPrice.innerHTML = `$${initialPriceValue}.00`;
  }
}
function ifAboveOneHundred() {
  if (quantity.value > 100) {
    quantity.value = 100;
  }
  if (numberOfItems > 100) {
    numberOfItems = 100;
  }
}

addQuantityBtn.addEventListener("click", function () {
  numberOfItems++;
  ifAboveOneHundred();
  itemMovements();
  ifBelowZero();
});
minusQuantityBtn.addEventListener("click", function () {
  numberOfItems--;
  itemMovements();
  ifBelowZero();
});

quantity.addEventListener("input", function () {
  numberOfItems = parseInt(quantity.value);
  ifAboveOneHundred();
  itemMovements();
  ifBelowZero();
});

//Add to cart
let itemNumber = 0;
addToCartBttn.addEventListener("click", function (e) {
  const html = ` <div class="items">
    <img
      class="product-inCart-picture"
      src="./images/image-product-1-thumbnail.jpg"
      alt=""
    />
    <div class="purchase-description">
      <p>Fall Limited Edition Sneakers</p>
      <p>
        $${currentPriceValue}.00 x ${numberOfItems}
        <span style="font-weight: 700">$${totalValue}.00</span>
      </p>
    </div>
    <button class="delete" >
    <svg
      class="svg"
      width="14"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
          id="a"
        />
      </defs>
      <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
    </svg>
    </button>
  </div>`;
  checkOutList.insertAdjacentHTML("afterbegin", html);
  itemNumber++;
  itemsInTheCart.classList.remove("hidden");
  itemsInTheCart.innerHTML = itemNumber;
  console.log(itemNumber);
});

checkOutList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".delete");
  if (clicked.classList.contains("delete")) {
    const toBeDeleted = clicked.closest(".items");
    toBeDeleted.remove();
    itemNumber--;
    itemsInTheCart.innerHTML = itemNumber;
  }
});

cartIcon.addEventListener("click", function () {
  shopingContainer.classList.toggle("hidden");
  if (shopingContainer.classList.contains("hidden")) {
    cartIcon.style.fill = "#69707D";
  } else {
    cartIcon.style.fill = "var(--var-Orange)";
  }
});
closeCartBtn.addEventListener("click", function () {
  shopingContainer.classList.add("hidden");
  cartIcon.style.fill = "#69707D";
  itemsInTheCart.classList.add("hidden");
});
