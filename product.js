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
                document.getElementById("product-title").textContent = product.name;
                document.getElementById("product-brand").textContent = product.brand || "";
                document.getElementById("product-description").innerHTML = product.description;
                document.getElementById("product-price").textContent = product.price;

                // Load all available images dynamically
                const imageContainer = document.getElementById("image-slideshow");
                const thumbnailContainer = document.getElementById("thumbnail-container");

                let imageIndex = 1;
                let foundImages = [];

                function loadImages() {
                    let imageUrl = `${product.image}${imageIndex}.webp`;
                    let img = new Image();
                    img.src = imageUrl;
                    img.onload = function () {
                        foundImages.push(imageUrl);
                        imageIndex++;
                        loadImages();
                    };
                    img.onerror = function () {
                        if (foundImages.length > 0) {
                            displayImages(foundImages);
                        } else {
                            imageContainer.innerHTML = `<p>No images found.</p>`;
                        }
                    };
                }

                function displayImages(images) {
                    images.forEach((imgSrc, index) => {
                        let imgElement = document.createElement("img");
                        imgElement.className = "product-slide w3-animate-opacity";
                        imgElement.src = imgSrc;
                        imgElement.style.width = "100%";
                        imageContainer.appendChild(imgElement);

                        let thumbElement = document.createElement("img");
                        thumbElement.className = "thumbnail";
                        thumbElement.src = imgSrc;
                        thumbElement.onclick = function () {
                            currentSlide(index);
                        };
                        thumbnailContainer.appendChild(thumbElement);
                    });

                    showDivs(0);
                    setTimeout(autoSlide, 6000);
                }

                loadImages();
            } else {
                document.body.innerHTML = "<h1>Product not found</h1>";
            }
        })
        .catch(error => console.error("Error loading product:", error));
} else {
    document.body.innerHTML = "<h1>No product selected</h1>";
}

// Slideshow logic
var slideIndex = 0;

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var slides = document.getElementsByClassName("product-slide");
    var thumbnails = document.getElementsByClassName("thumbnail");

    if (slides.length === 0) return;

    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        thumbnails[i].classList.remove("active-thumbnail");
    }

    slides[slideIndex].style.display = "block";
    thumbnails[slideIndex].classList.add("active-thumbnail");
}

function autoSlide() {
    plusDivs(1);
    setTimeout(autoSlide, 6000);
}

function currentSlide(n) {
    showDivs(slideIndex = n);
}
