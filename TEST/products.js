document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("product-container");
            container.innerHTML = ""; // Clear loading message
            
            for (const category in data) {
                // Create Category Title
                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                container.appendChild(categoryTitle);

                // Create Product Grid
                const productGrid = document.createElement("div");
                productGrid.classList.add("product-grid");

                data[category].forEach(product => {
                    const productDiv = document.createElement("div");
                    productDiv.classList.add("product");

                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" width="150">
                        <h3>${product.name}</h3>
                        ${product.author ? `<p>Author: ${product.author}</p>` : ""}
                        ${product.brand ? `<p>Brand: ${product.brand}</p>` : ""}
                        <p>Price: ${product.price} CHF</p>
                        <a href="${product.link}">View Product</a>
                    `;

                    productGrid.appendChild(productDiv);
                });

                container.appendChild(productGrid);
            }
        })
        .catch(error => {
            console.error("Error loading products:", error);
            document.getElementById("product-container").textContent = "Failed to load products.";
        });
});
