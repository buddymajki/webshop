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
                document.getElementById("product-title").innerHTML = `${product.name} <br> <span style="color:lightgrey">${product.brand}</span>`;
                document.getElementById("product-price").textContent = `CHF ${product.price}`;
                document.getElementById("product-description").innerHTML = product.description;
                
                // Create image slider
                const imageContainer = document.getElementById("image-container");
                const thumbnailContainer = document.getElementById("thumbnail-container");
                const baseImagePath = product.image.replace(/\/[^/]+$/, '/'); // Get base path
                
                const images = [
                    `${baseImagePath}3.jpg`,
                    `${baseImagePath}4.jpg`,
                    `${baseImagePath}5.jpg`,
                    `${baseImagePath}6.jpg`
                ];

                images.forEach((src, i) => {
                    let img = document.createElement("img");
                    img.className = "product-slide w3-animate-opacity";
                    img.src = src;
                    img.style.width = "100%";
                    imageContainer.appendChild(img);

                    let thumb = document.createElement("img");
                    thumb.className = "thumbnail";
                    thumb.src = src;
                    thumb.onclick = () => currentSlide(i);
                    thumbnailContainer.appendChild(thumb);
                });

                showDivs(0); // Show first image
            } else {
                document.body.innerHTML = "<h1>Product not found</h1>";
            }
        })
        .catch(error => console.error("Error loading product:", error));
} else {
    document.body.innerHTML = "<h1>No product selected</h1>";
}

// Image slider logic
let slideIndex = 0;

function plusDivs(n) {
    showDivs(slideIndex + n);
}

function currentSlide(n) {
    showDivs(n);
}

function showDivs(n) {
    let slides = document.getElementsByClassName("product-slide");
    if (n >= slides.length) n = 0;
    if (n < 0) n = slides.length - 1;
    slideIndex = n;
    
    for (let slide of slides) {
        slide.style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}
