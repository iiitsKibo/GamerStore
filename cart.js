// cartitem constructor
function CartItem(imagePath, quantity, price) {
  this.imagePath = imagePath;
  this.quantity = quantity;
  this.price = price;
}

// when click coupon button
$("#couponbtn").on("click", function () {
  //animate btn
  $("#couponbtn")
    .animate({ height: "toggle" })
    .delay(600)
    .animate({ height: "toggle" });

  //animate input box
  $("#couponinput")
    .animate({ height: "toggle" })
    .delay(600)
    .animate({ height: "toggle" });

  // selecting
  const input = document.querySelector("#couponinput").value;
  const error = document.querySelector("#error");
  let currentCoupons = JSON.parse(localStorage.getItem("coupons"));
  const vat = document.querySelector("#vat").innerText;
  let currentTotal = JSON.parse(localStorage.getItem("total"));
  const discountRow = document.querySelector("#discountRow");
  let errorMess = "";

  // check if input is blank
  if (input == "") {
    error.innerText = "coupon cannot be blank";
    error.style.color = "red";
    return;
  }

  // loop through coupons in localstorage
  for (let coupon of currentCoupons) {
    if (input == coupon.id) {
      errorMess = "";
      discountRow.innerHTML = `  <tr id="discountRow">
      <td></td>
      <td</td>
      <td></td>
      <td>
          <div id="error" class="green-text">Discount applied</div>
      </td>
  </tr>`;

      console.log(currentTotal);
      // get new total
      currentTotal = currentTotal - (currentTotal * coupon.value) / 100;
      //ammend localstorage
      localStorage.setItem("total", JSON.stringify(currentTotal.toFixed(2)));
      // check html text
      document.querySelector("#total").innerText = `R${currentTotal.toFixed(
        2
      )}`;

      // recalculate vat
      vat.innerText = eval(Number(currentTotal) * (15 / 100)).toFixed(2);
      return;
    } else {
      errorMess = "not valid coupon";
    }

    // check for error and display
    if (errorMess != "") {
      error.innerText = errorMess;
      error.style.color = "red";
      return;
    }
  }
});

// when page loads
window.onload = function () {
  // putting data in localStorage

  // hide checkout btn
  $("#checkout").hide();

  // get total from local storage
  let total = localStorage.getItem("total");

  // fixed delivery cost
  const delivery = 200.0;

  // getting data from localstorage and display in cart
  const cartItems = JSON.parse(localStorage.getItem("items"));

  // radio btn delivery
  $("#flexRadioDefault2").change(function () {
    $("#checkout").show();
    if (this.checked) {
      $(".deliverSection").show();
      total = Number(JSON.parse(localStorage.getItem("total"))) + delivery;
      document.querySelector("#total").innerText = `R${total}`;
    } else {
      $(".deliverSection").hide();
      total = Number(JSON.parse(localStorage.getItem("total"))) - delivery;
      document.querySelector("#total").innerText = `R${total}`;
    }
  });

  // radio btn collect
  $("#flexRadioDefault1").change(function () {
    $("#checkout").show();
    if (this.checked) {
      $(".deliverSection").hide();
      total = Number(JSON.parse(localStorage.getItem("total"))) - delivery;
      document.querySelector("#total").innerText = `R${total}`;
    } else {
      $(".deliverSection").show();
      total = Number(JSON.parse(localStorage.getItem("total"))) + delivery;
      document.querySelector("#total").innerText = `R${total}`;
    }
  });
  // add cart items
  let cartTable = "";
  for (let item of cartItems) {
    let itemInCart = `
      <tr>
      <td><img src="${item.imagePath}" class="cart-img"></td>
      <td>${item.quantity}</td>
      <td>${item.price}</td>
      <td></td
      </tr>
      `;

    cartTable += itemInCart;
  }
  //calculate vat round to two decimal places
  const vat = eval(Number(total) * (15 / 100)).toFixed(2);
  total = (Number(total) + Number(vat)).toFixed(2);
  document.querySelector("tbody").innerHTML = cartTable;
  document.querySelector("#deliveryFee").innerText = `R${delivery}`;
  document.querySelector("#vat").innerText = `R${vat}`;
  document.querySelector("#total").innerText = `R${total}`;

  // on check btn click
  $("#checkout").on("click", function () {
    let orderNumber = Math.floor(Math.random() * 10000000000000000);
    alert(`Your order has been successful order number: ${orderNumber}`);
    localStorage.clear();
    $("#checkout").hide();
  });
};
