let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const cartCount = document.getElementById("cartCount");
  const cartList = document.getElementById("cartList");

  if (cartCount) cartCount.textContent = cart.length;

  if (cartList) {
    cartList.innerHTML = "";
    cart.forEach((item, i) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item", "d-flex", "justify-content-between");
      li.innerHTML = `
        ${item.name} - $${item.price}
        <button class="btn btn-sm btn-danger" onclick="removeItem(${i})">X</button>
      `;
      cartList.appendChild(li);
    });

    if (cart.length > 0) {
      const total = cart.reduce((s, p) => s + p.price, 0);
      const li = document.createElement("li");
      li.classList.add("list-group-item", "text-end");
      li.innerHTML = `<strong>Total: $${total}</strong><br>
      <a href="prueba1/scripts/pago.html" class="btn btn-success btn-sm mt-2">Pagar todo</a>`;
      cartList.appendChild(li);
    }
  }
}


function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


document.addEventListener("DOMContentLoaded", renderCart);
