document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#search");
    const categories = document.querySelectorAll(".category");
    const itemsList = document.querySelector(".items-list");
    const cartList = document.querySelector("#cart-list");
    const cartTotal = document.querySelector("#cart-total");
    const checkoutButton = document.querySelector("#checkout");
    let cart = [];

    const menuItems = {
        pizza: [
            { name: "Margherita", price: 199, img: "margerita.jpg" },
            { name: "Pepperoni", price: 249, img: "pepper.jpg" },
            { name: "Veggie Deluxe", price: 229, img: "veg.jpg" }
        ],
        burger: [
            { name: "Cheese Burger", price: 149, img: "cheese.jpg" },
            { name: "Chicken Burger", price: 169, img: "chicburger.jpg" }
        ],
        sandwich: [
            { name: "Club Sandwich", price: 120, img: "club.jpg" },
            { name: "Grilled Sandwich", price: 130, img: "veg2.jpg" }
        ],
        pasta: [
            { name: "White Sauce Pasta", price: 180, img: "white.jpg" },
            { name: "Red Sauce Pasta", price: 190, img: "red.jpg" }
        ],
        desserts: [
            { name: "Chocolate Cake", price: 250, img: "choco.jpg" },
            { name: "Cheesecake", price: 270, img: "chesse1.jpg" }
        ],
        shakes: [
            { name: "Mango Shake", price: 120, img: "mango.jpg" },
            { name: "Strawberry Shake", price: 130, img: "str.jpg" }
        ],
        chicken: [
            { name: "Grilled Chicken", price: 299, img: "chrill.jpg" },
            { name: "Fried Chicken", price: 259, img: "fry.jpg" }
        ]
    };

    categories.forEach(category => {
        category.addEventListener("click", () => {
            const categoryType = category.dataset.category;
            category.classList.add("active");
            setTimeout(() => category.classList.remove("active"), 200);
            displayMenuItems(categoryType);
            document.querySelector(".menu-items").scrollIntoView({ behavior: "smooth" });
        });
    });

    function displayMenuItems(category) {
        itemsList.innerHTML = "";
        if (menuItems[category]) {
            menuItems[category].forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.classList.add("item");
                itemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.name}"
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                    <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
                `;
                itemsList.appendChild(itemDiv);
            });
        }
        setupCartButtons();
    }

    function setupCartButtons() {
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                const name = button.dataset.name;
                const price = parseInt(button.dataset.price);
                addToCart(name, price);
            });
        });
    }

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.innerHTML = `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`;
            cartList.appendChild(li);
        });
        cartTotal.textContent = total;
    }

    checkoutButton.addEventListener("click", () => {
        if (cart.length > 0) {
            alert("Order placed successfully!");
            cart = [];
            updateCart();
        } else {
            alert("Your cart is empty!");
        }
    });

    function filterCategories() {
        document.querySelectorAll(".category").forEach(category => {
            const categoryType = category.dataset.category;
            if (!menuItems[categoryType]) {
                category.style.display = "none";
            }
        });
    }
    filterCategories();
});
