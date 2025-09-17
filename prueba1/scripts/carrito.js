//CARRITO V3 LETS GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

let cart = JSON.parse(localStorage.getItem("cart")) || [];

(function(){
  const path = window.location.pathname;
  const anchor = "/prueba1/";
  const pos = path.indexOf(anchor);
  let prefix;
  if (pos >= 0) {
    const after = path.substring(pos + anchor.length);
    const depth = after.split("/").length - 1;
    const up = "../".repeat(depth);
    prefix = up + "assets/";
  } else {
    prefix = "prueba1/assets/";
  }
  window.CART_IMG_PREFIX = prefix;
  let payHref;
  if (pos >= 0) {
    const after = path.substring(pos + anchor.length);
    const depth = after.split("/").length - 1;
    if (depth === 0) payHref = "pago.html";
    else payHref = "pago.html";
  } else {
    payHref = "prueba1/scripts/pago.html";
  }
  window.CART_PAY_HREF = payHref;
})();

const IMG_PREFIX = window.CART_IMG_PREFIX;

const PRODUCT_THUMBS = {
  "Sakura Miku":                 IMG_PREFIX + "Sakuramiku.png",
  "Figura Hornet":               IMG_PREFIX + "Hornet.jpg",
  "Figura Nendoroid The Knight": IMG_PREFIX + "NendoroidHollowKnight.png",
  "Pack Library of Ruina":       IMG_PREFIX + "LoRKeyChain+ArtBook.png",
  "Poster Library of Ruina":     IMG_PREFIX + "PosterLoR.jpg",
  "Replica Invitacion LoR":      IMG_PREFIX + "InvitacionLoR.jpg",
  "Gato Basico":                 IMG_PREFIX + "BasicCat.png",
  "Gato Hacha":                  IMG_PREFIX + "AxeCat.png",
  "Figura DoomSlayer":           IMG_PREFIX + "DoomSlayer.png",
  "Figura Medic":                IMG_PREFIX + "medic.png",
  "Figura Spy":                  IMG_PREFIX + "spy.png",
  "Figura Matikanetannhauser":   IMG_PREFIX + "mambo.png",
  "Figura Kasane Teto":          IMG_PREFIX + "gorda.png",
  "Peluche Gengar":              IMG_PREFIX + "gengar.png",
  "Peluche Jimbo":               IMG_PREFIX + "jimbo.png"
};

function persist() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function findIndexByName(name) {
  return cart.findIndex(i => i.name === name);
}

function addToCart(name, price, qty = 1, img) {
  qty = Math.max(1, parseInt(qty || 1));
  const inferred = PRODUCT_THUMBS[name] || img;
  const idx = findIndexByName(name);
  if (idx >= 0) {
    cart[idx].qty = (cart[idx].qty || 1) + qty;
    if (!cart[idx].img && inferred) cart[idx].img = inferred;
  } else {
    cart.push({ name, price, qty, img: inferred });
  }
  persist();
}

function changeQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, (cart[index].qty || 1) + delta);
  persist();
}

function removeItem(index) {
  cart.splice(index, 1);
  persist();
}

function renderCart() {
  const cartCount = document.getElementById("cartCount");
  const cartList  = document.getElementById("cartList");
  const totalUnits = cart.reduce((s, it) => s + (it.qty || 1), 0);
  if (cartCount) cartCount.textContent = totalUnits;
  if (!cartList) return;
  cartList.innerHTML = "";
  if (cart.length === 0) {
    cartList.innerHTML = '<li class="text-center text-muted">El carrito está vacío</li>';
    return;
  }
  cart.forEach((item, i) => {
    const qty = item.qty || 1;
    const subtotal = item.price * qty;
    if (!item.img) item.img = PRODUCT_THUMBS[item.name] || (IMG_PREFIX + "LosTralaleros.png");
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center";
    li.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="me-2 rounded" style="width:48px;height:48px;object-fit:cover;background:#f8f9fa;">
      <div class="flex-grow-1">
        <div class="fw-semibold">${item.name}</div>
        <div class="small text-muted">x${qty} · $${item.price.toLocaleString('es-CL')} c/u</div>
      </div>
      <div class="d-flex align-items-center">
        <div class="btn-group btn-group-sm me-2" role="group" aria-label="Cambiar cantidad">
          <button class="btn btn-outline-secondary" onclick="changeQty(${i}, -1)">-</button>
          <button class="btn btn-outline-secondary" onclick="changeQty(${i}, 1)">+</button>
        </div>
        <div class="text-end me-2" style="min-width: 90px;">
          $${subtotal.toLocaleString('es-CL')}
        </div>
        <button class="btn btn-sm btn-danger" title="Eliminar" onclick="removeItem(${i})">X</button>
      </div>
    `;
    cartList.appendChild(li);
  });
  const total = cart.reduce((s, it) => s + it.price * (it.qty || 1), 0);
  const liTotal = document.createElement("li");
  liTotal.className = "list-group-item text-end";
  const payHref = window.CART_PAY_HREF || "prueba1/scripts/pago.html";
  liTotal.innerHTML = `<strong>Total: $${total.toLocaleString('es-CL')}</strong><br>
    <a href="${payHref}" class="btn btn-success btn-sm mt-2">Pagar todo</a>`;
  cartList.appendChild(liTotal);
}

document.addEventListener("DOMContentLoaded", renderCart);