document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("products-container");

            for (const category in data) {
                // Create section for each category
                const section = document.createElement("div");
                section.className = "w3-container w3-margin-top";
                section.innerHTML = `<h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>`;

                const row = document.createElement("div");
                row.className = "w3-row-padding";

                data[category].forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.className = "w3-col s12 m4";

                    productCard.innerHTML = `
                        <div class="w3-card product-card">
                            <div class="hover-container">
                                <a href="${product.link}">
                                    <img class="w3-margin-top product-image" src="${product.image}" alt="${product.name}">
                                </a>
                                <div class="hover-description">${product.hover || ""}</div>
                            </div>
                            <div class="w3-container w3-center">
                                <p>
                                    <a href="${product.link}" class="product-link">${product.name} <br>
                                        <span style="color:lightgrey">${product.author || product.brand || ""}</span>
                                    </a>
                                </p>
                                <p><b>${product.price} CHF</b></p>
                                <button class="w3-button w3-light-blue w3-margin add-to-basket"
                                    data-product="${product.name}"
                                    data-price="${product.price}">
                                    Add to Basket
                                </button>
                            </div>
                        </div>
                    `;

                    row.appendChild(productCard);
                });

                section.appendChild(row);
                container.appendChild(section);
            }
        })
        .catch(error => console.error("Error loading products:", error));
});
