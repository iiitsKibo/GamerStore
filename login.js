// getting elements
const password = document.querySelector("#password");
const email = document.querySelector("#email");
const errorElement = document.querySelector("#error");
const form = document.querySelector("#form");

// coupon constructor
function Coupon(id, value) {
  (this.id = id), (this.value = value);
}

// get current coupons from localstorage and check value
$(function () {
  let currentCoupons = JSON.parse(localStorage.getItem("coupons"));

  if (currentCoupons == null) {
    localStorage.setItem("coupons", JSON.stringify([]));
  }
});

// add eventlister on form
form.addEventListener("submit", (e) => {
  let messages = [];

  let currentUsers = JSON.parse(localStorage.getItem("users"));
  console.log(currentUsers);
  e.preventDefault();
  if (currentUsers == null) {
    messages.push(`not a valid user please register`);
  } else {
    for (let i of currentUsers) {
      if (i.email.toLowerCase() == email.value.toLowerCase()) {
        messages = [];
        if (i.password.toLowerCase() == password.value.toLowerCase()) {
          // get current coupons from localstorage
          let currentCoupons = JSON.parse(localStorage.getItem("coupons"));

          const discountCoupon = Math.random().toString(36).substring(2, 7);

          const coupon = new Coupon(discountCoupon, random([10, 20, 30, 40]));

          currentCoupons.push(coupon);
          localStorage.setItem("coupons", JSON.stringify(currentCoupons));
          // alert coupon value and id
          alert(`You coupon id: ${coupon.id}
Price off ${coupon.value}%`);
        } else {
          messages.push(`incorrect password`);
          console.log(messages);
        }
      } else {
        messages = [];
        messages.push(`incorrect email`);
      }
    }
  }
  // check for error messages
  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(", ");
  } else {
    window.location = "/index.html";
  }
});

// get random coupon number
function random(numbers) {
  return numbers[Math.floor(Math.random() * numbers.length)];
}
