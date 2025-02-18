// Referenced the below and improved logic with current concepts found in our book Mastering Node.js
// https://stackoverflow.com/questions/11722400/programmatically-change-the-src-of-an-img-tag
// https://stackoverflow.com/questions/11073693/button-click-iterate-through-images

const images = ["auspicious.jpg", "grotto.jpg", "shin-okubo.jpg", "kittens.jpg", "kyoto.jpg", "nippon.jpg"];
let currentImageIndex = 0; //defaults to first item in array: auspicious.jpg

const nextImage = () => {
    currentImageIndex ++;

    // Starting over once all images are iterated through
    if(currentImageIndex == images.length) {
        currentImageIndex = 0;
    }

    // Updating the currImage element's source to images/<the next image name>
    document.getElementById("currImage").src = "images/" + images[currentImageIndex];
}

const loop = () => {
    console.log("test");
    fetch("http://localhost:8000/loop",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
    
}
