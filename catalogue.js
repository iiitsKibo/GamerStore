//cart item constructor
function CartItem(imagePath, quantity, price) {
  this.imagePath = imagePath;
  this.quantity = quantity;
  this.price = price;
}

// add event listener on add to cart btn
document.querySelectorAll(".buy-button").forEach((item) => {
  item.addEventListener("click", function () {
    let image = this.parentNode.firstChild.nextElementSibling.childNodes[1].src;
    // workout  quantity
    let total = localStorage.getItem("total");
    // debug
    console.log(this.previousElementSibling.innerText);

    // set products
    const products =
      JSON.parse(localStorage.getItem("items")) == null
        ? []
        : JSON.parse(localStorage.getItem("items"));

    // loop through products if imagePath matches image path in localstorage
    if (products.some((x) => x.imagePath == image)) {
      for (let i of products) {
        if (i.imagePath == image) {
          i.quantity++;
          i.price = `R${(
            Number(i.price.slice(1)) +
            Number(this.previousElementSibling.innerText.slice(1))
          ).toFixed(2)}`;
          let total = localStorage.getItem("total");
          total =
            Number(total) +
            Number(this.previousElementSibling.innerText.slice(1));
          localStorage.setItem(
            "total",
            JSON.stringify(Number(total.toFixed(2)))
          );
        }
        // Alert total
        alert(`Your current total is: R${Number(total).toFixed(2)}`);
      }
      // set qunatity
      let quntity =
        products.find((x) => (x.imagePath == image).quantity) !== undefined
          ? products.find((x) => x.imagePath == image).quantity
          : 1;

      localStorage.setItem("items", JSON.stringify(products));
    } else {
      const product = new CartItem(
        image,
        1,
        this.previousElementSibling.innerText.trim()
      );
      products.push(product);
      localStorage.setItem("items", JSON.stringify(products));
      let total = localStorage.getItem("total");
      // setting total
      total =
        Number(total) + Number(this.previousElementSibling.innerText.slice(1));
      localStorage.setItem("total", JSON.stringify(Number(total.toFixed(2))));
      alert(`Your current total is: R${Number(total).toFixed(2)}`);
    }
  });
});
