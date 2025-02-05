// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (productId) {
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            const [category, index] = productId.split("_");
            const product = data[category][index];

            if (product) {
                document.getElementById("product-name").textContent = product.name;
                document.getElementById("product-brand").textContent = product.brand || "";
                document.getElementById("product-image").src = product.image;
                document.getElementById("product-description").textContent = product.description;
                document.getElementById("product-price").textContent = product.price;
            } else {
                document.body.innerHTML = "<h1>Product not found</h1>";
            }
        })
        .catch(error => console.error("Error loading product:", error));
} else {
    document.body.innerHTML = "<h1>No product selected</h1>";
}
