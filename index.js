function CartItem(imagePath, quantity, price) {
  this.imagePath = imagePath;
  this.quantity = quantity;
  this.price = price;
}

document.querySelectorAll(".add-to-cart").forEach((item) => {
  item.addEventListener("click", function () {
    let image = this.parentNode.previousElementSibling.src;
    // workout  quantity
    let total = localStorage.getItem("total");

    const products =
      JSON.parse(localStorage.getItem("items")) == null
        ? []
        : JSON.parse(localStorage.getItem("items"));

    if (products.some((x) => x.imagePath == image)) {
      for (let i of products) {
        if (i.imagePath == image) {
          i.quantity++;
          i.price = `R${(
            Number(i.price.slice(1)) +
            Number(this.parentNode.firstChild.nextSibling.innerText.slice(1))
          ).toFixed(2)}`;
          let total = localStorage.getItem("total");
          total =
            Number(total) +
            Number(this.parentNode.firstChild.nextSibling.innerText.slice(1));
          localStorage.setItem(
            "total",
            JSON.stringify(Number(total.toFixed(2)))
          );
        }
        alert(`Your current total is: R${Number(total).toFixed(2)}`);
      }
      let quntity =
        products.find((x) => (x.imagePath == image).quantity) !== undefined
          ? products.find((x) => x.imagePath == image).quantity
          : 1;

      localStorage.setItem("items", JSON.stringify(products));
    } else {
      const product = new CartItem(
        image,
        1,
        this.parentNode.firstChild.nextSibling.innerText.trim()
      );
      products.push(product);
      localStorage.setItem("items", JSON.stringify(products));
      let total = localStorage.getItem("total");
      total =
        Number(total) +
        Number(this.parentNode.firstChild.nextSibling.innerText.slice(1));
      localStorage.setItem("total", JSON.stringify(Number(total.toFixed(2))));
      alert(`Your current total is: R${Number(total).toFixed(2)}`);
    }
  });
});
