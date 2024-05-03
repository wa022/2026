// Function to fetch book data from Google Sheets API
async function fetchBookData() {
    try {
        const response = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1eFNyOTc1sjFwoBYA5FzB4f-ecGs0w-COjOZ_mXLWBbo/values/Sheet1!A1:I100?key=AIzaSyB5WTjIR5OZt108xl9uQApzeoNRWuMyYRE");
        const data = await response.json();
        return data.values;
    } catch (error) {
        console.error("Error fetching book data:", error);
        return [];
    }
}

// Function to display book gallery on the home page
async function displayBookGallery() {
    const bookGallery = document.getElementById("book-gallery");
    const booksData = await fetchBookData();

    if (booksData.length === 0) {
        bookGallery.innerHTML = "<p>No books available.</p>";
        return;
    }

    bookGallery.innerHTML = ""; // Clear previous entries

    booksData.forEach(book => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");

        const title = book[0];
        const cover = book[1];
        const author = book[2];

        const bookTitle = document.createElement("h2");
        bookTitle.textContent = title;
        bookContainer.appendChild(bookTitle);

        const bookCover = document.createElement("img");
        bookCover.src = cover;
        bookCover.alt = title + " cover";
        bookContainer.appendChild(bookCover);

        const bookAuthor = document.createElement("p");
        bookAuthor.textContent = "Author: " + author;
        bookContainer.appendChild(bookAuthor);

        const reviewButton = document.createElement("button");
        reviewButton.textContent = "Read Review";
        reviewButton.onclick = function() {
            window.open("review.html?title=" + encodeURIComponent(title) + "&author=" + encodeURIComponent(author) + "&cover=" + encodeURIComponent(cover), "_blank");
        };
        bookContainer.appendChild(reviewButton);

        bookGallery.appendChild(bookContainer);
    });
}

// Call displayBookGallery() when the page loads
window.onload = displayBookGallery;
