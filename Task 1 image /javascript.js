const images = [

    {
        src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90",
        title: "Mountain Escape",
        category: "Nature"
    },

    {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90",
        title: "Ocean Breeze",
        category: "Travel"
    },

    {
        src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=90",
        title: "City Lights",
        category: "City"
    },

    {
        src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=90",
        title: "Forest Walk",
        category: "Nature"
    },

    {
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=90",
        title: "Road Trip",
        category: "Travel"
    },

    {
        src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=90",
        title: "Downtown",
        category: "City"
    }

];


const cards =
    document.querySelectorAll(".image-card");

const items =
    document.querySelectorAll(".gallery-item");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


let currentIndex = 0;


/* OPEN IMAGE */

function showImage(index) {

    currentIndex =
        (index + images.length) %
        images.length;

    const image =
        images[currentIndex];

    lightboxImage.src =
        image.src;

    lightboxImage.alt =
        image.title;

    lightboxTitle.textContent =
        image.title;

    lightboxCategory.textContent =
        image.category;

    lightbox.classList.add("open");

    document.body.style.overflow =
        "hidden";
}


/* CLOSE IMAGE */

function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.style.overflow =
        "";
}


/* IMAGE CLICK */

cards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const index =
                Number(card.dataset.index);

            showImage(index);
        }
    );

});


/* NEXT */

nextBtn.addEventListener(
    "click",
    () => {

        showImage(
            currentIndex + 1
        );

    }
);


/* PREVIOUS */

prevBtn.addEventListener(
    "click",
    () => {

        showImage(
            currentIndex - 1
        );

    }
);


/* CLOSE */

closeBtn.addEventListener(
    "click",
    closeLightbox
);


/* CLICK OUTSIDE */

lightbox.addEventListener(
    "click",
    event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    }
);


/* KEYBOARD */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains("open")
        ) {
            return;
        }

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            showImage(
                currentIndex + 1
            );

        }

        if (event.key === "ArrowLeft") {

            showImage(
                currentIndex - 1
            );

        }

    }
);


/* FILTER */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                btn =>
                    btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            items.forEach(item => {

                if (
                    filter === "all" ||
                    item.dataset.category === filter
                ) {

                    item.classList.remove("hide");

                } else {

                    item.classList.add("hide");

                }

            });

        }
    );

});