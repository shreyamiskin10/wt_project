let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => button.addEventListener('click', addToCart));
    updateCartDisplay();
});

function addToCart(event) {
    const button = event.target;
    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = parseFloat(button.getAttribute('data-product-price'));

    cart.push({ id: productId, name: productName, price: productPrice });
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${productName} added to cart!`);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');

    if (cartItemsDiv && cartTotalSpan) {
        cartItemsDiv.innerHTML = ''; // Clear the current cart display
        let total = 0;

        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <p>${item.name} - $${item.price}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsDiv.appendChild(cartItemDiv);
            total += item.price;
        });

        cartTotalSpan.innerText = total.toFixed(2);

        // Add event listeners to remove buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => button.addEventListener('click', removeFromCart));
    }
}

function removeFromCart(event) {
    const button = event.target;
    const index = button.getAttribute('data-index');

    // Remove item from cart array by index
    cart.splice(index, 1);

    // Update localStorage and re-render the cart
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function checkout() {
    localStorage.removeItem('cart');
    window.location.href = 'thankyou.html';
}
