let cart = [],
  currentImageIndex = 0,
  currentProduct = "",
  productDetails = {
    "Producto 1": {
      title: "Producto 1",
      description: "Este es un producto increíble con varias características.",
      price: 10,
      images: [
        "https://picsum.photos/650/700?random=1",
        "https://picsum.photos/650/700?random=2",
        "https://picsum.photos/650/700?random=3",
      ],
    },
    "Producto 2": {
      title: "Producto 2",
      description: "Otro producto de alta calidad con muchas funciones.",
      price: 15,
      images: [
        "https://picsum.photos/650/700?random=4",
        "https://picsum.photos/650/700?random=5",
        "https://picsum.photos/650/700?random=6",
      ],
    },
    "Producto 3": {
      title: "Producto 3",
      description: "Un producto premium para los clientes más exigentes.",
      price: 20,
      images: [
        "https://picsum.photos/650/700?random=7",
        "https://picsum.photos/650/700?random=8",
        "https://picsum.photos/650/700?random=9",
      ],
    },
    "Producto 4": {
      title: "Producto 4",
      description: "Producto de alta gama con características avanzadas.",
      price: 25,
      images: [
        "https://picsum.photos/650/700?random=10",
        "https://picsum.photos/650/700?random=11",
        "https://picsum.photos/650/700?random=12",
      ],
    },
  };

function addToCart(product, price) {
  const item = cart.find((i) => i.product === product);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ product, price, quantity: 1 });
  }
  updateCart();
  updateCartCount();
}

function updateCart() {
  const list = document.getElementById("cartItems"),
    totalElement = document.getElementById("totalAmount");
  list.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const product = productDetails[item.product];
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `<img src="${product.images[0]}" alt="${product.title}">
                         <div class="cart-item-details">
                             <h3>${product.title}</h3>
                             <p>${product.description}</p>
                             <div class="cart-item-quantity">
                                 <button onclick="updateQuantity('${
                                   item.product
                                 }', -1)">
                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                         <path d="M19 13H5v-2h14v2z"/>
                                     </svg>
                                 </button>
                                 <span style="font-size:1.5em">${
                                   item.quantity
                                 }</span>
                                 <button onclick="updateQuantity('${
                                   item.product
                                 }', 1)">
                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                         <path d="M19 13H5v-2h14v2z"/>
                                         <path d="M13 5v14h-2V5h2z"/>
                                     </svg>
                                 </button>
                                 <button class="trash" onclick="removeItem('${
                                   item.product
                                 }')">
                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                         <path d="M3 6h18v2H3V6zm2 3h14v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V9zm4 0v10h2V9H9zm4 0v10h2V9h-2z"/>
                                     </svg>
                                 </button>
                             </div>
                             <p><strong>Precio: $${item.price.toFixed(
                               2
                             )}</strong></p>
                         </div>`;
    list.appendChild(div);
    total += item.price * item.quantity;
  });
  totalElement.textContent = total.toFixed(2);
}

function updateQuantity(product, change) {
  const item = cart.find((i) => i.product === product);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.product !== product);
    }
    updateCart();
    updateCartCount();
  }
}

function removeItem(product) {
  cart = cart.filter((i) => i.product !== product);
  updateCart();
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cartCount").textContent = cart.length;
}

function handleCheckout(e) {
  e.preventDefault();
  const name = document.getElementById("name").value,
    email = document.getElementById("email").value,
    address = document.getElementById("address").value;
  if (!cart.length) {
    alert(
      "Tu carrito está vacío. Agrega productos antes de realizar la compra."
    );
    return;
  }
  alert(
    `Gracias por tu compra, ${name}! Te enviaremos los productos a ${address}.`
  );
  cart = [];
  updateCart();
  updateCartCount();
  document.querySelector(".cart-form").reset();
}

function showProductDetails(product) {
  let data = productDetails[product];
  currentProduct = product;
  document.getElementById("productTitle").textContent = data.title;
  document.getElementById("productDescription").textContent = data.description;
  document.getElementById("productPrice").textContent = data.price.toFixed(2);
  document.getElementById("mainImage").src = data.images[0];
  document.getElementById("additionalImages").innerHTML = data.images
    .map(
      (img, i) =>
        `<img src="${img}" alt="Imagen adicional" onclick="changeImageTo(${i})">`
    )
    .join("");
  showModal();
}

function showModal() {
  const m = document.getElementById("productModal");
  m.style.display = "flex";
  setTimeout(() => {
    m.style.opacity = "1";
  }, 0);
}

function closeModal() {
  const m = document.getElementById("productModal");
  m.style.opacity = "0";
  setTimeout(() => {
    m.style.display = "none";
  }, 300);
}

function changeImageTo(i) {
  currentImageIndex = i;
  const newSrc = document.querySelectorAll("#additionalImages img")[i].src;
  document.getElementById("mainImage").src = newSrc;
}

function toggleZoom(event) {
  const img = document.getElementById("mainImage");
  if (img.classList.contains("zoomed")) {
    img.classList.remove("zoomed");
    img.style.transformOrigin = "center center";
  } else {
    const rect = img.getBoundingClientRect(),
      offsetX = event.clientX - rect.left,
      offsetY = event.clientY - rect.top,
      originX = (offsetX / rect.width) * 100,
      originY = (offsetY / rect.height) * 100;
    img.style.transformOrigin = `${originX}% ${originY}%`;
    img.classList.add("zoomed");
  }
}

function openCartModal() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "flex";
  setTimeout(() => {
    cartModal.style.opacity = "1";
  }, 0);
}

function closeCartModal() {
  const cartModal = document.getElementById("cartModal");
  cartModal.style.opacity = "0";
  setTimeout(() => {
    cartModal.style.display = "none";
  }, 300);
}

document.querySelectorAll(".product").forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") {
      showProductDetails(el.dataset.product);
    }
  });
});

document.querySelectorAll(".product button").forEach((b) => {
  b.addEventListener("click", (e) => {
    e.stopPropagation();
    addToCart(b.dataset.product, parseFloat(b.dataset.price));
  });
});

document.querySelector(".cart-form").addEventListener("submit", handleCheckout);
document.querySelectorAll(".close").forEach((closeButton) => {
  closeButton.addEventListener("click", closeModal);
});

document
  .getElementById("modalAddToCartButton")
  .addEventListener("click", () => {
    addToCart(currentProduct, productDetails[currentProduct].price);
    closeModal();
  });

document.getElementById("mainImage").addEventListener("click", toggleZoom);
document
  .getElementById("cartIconContainer")
  .addEventListener("click", openCartModal);

// Configuración del enlace de WhatsApp a partir de una variable de entorno
document.addEventListener("DOMContentLoaded", () => {
  const whatsappLink = document.getElementById("whatsappLink");
  whatsappLink.href = `https://wa.me/${process.env.WHATSAPP_NUMBER}`;
});

// Registrar el Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}
