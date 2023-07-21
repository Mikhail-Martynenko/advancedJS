document.addEventListener('DOMContentLoaded', function () {
    const firstSquare = document.getElementById('firstSquare');
    const secondSquare = document.getElementById('secondSquare');
    const squaresBlock = document.querySelector('.squaresBlock');

    const blockHeight = squaresBlock.offsetHeight;
    const scrollHeight = squaresBlock.scrollHeight;

    const viewportHeight = window.innerHeight;

    const firstSquareHeight = firstSquare.offsetHeight;
    const secondSquareHeight = secondSquare.offsetHeight;

    const maxOffset = viewportHeight - Math.max(firstSquareHeight, secondSquareHeight);

    squaresBlock.addEventListener('scroll', function () {
        const scrollTop = squaresBlock.scrollTop;
        const scrollFraction = scrollTop / (scrollHeight - blockHeight);

        const secondSquareOffset = maxOffset * scrollFraction;
        secondSquare.style.transform = `translateY(${secondSquareOffset}px)`;

        const firstScrollFraction = Math.min(scrollFraction * 1.2, 1); // Коэффициент 1.2 можно изменить для более медленного или более быстрого движения
        const firstSquareOffset = maxOffset * firstScrollFraction;
        firstSquare.style.transform = `translateY(${firstSquareOffset}px)`;

        if (scrollFraction !== 1) return
        firstSquare.style.transform = `translateY(${maxOffset}px)`;
    });

    document.querySelector("input[type='file']").addEventListener("change", (event) => {
        const selectedSquareId = document.querySelector('input[name="squareId"]:checked').value;
        const selectedFile = event.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = function () {
            const imageUrl = fileReader.result;
            const selectedSquare = document.getElementById(selectedSquareId);
            selectedSquare.style.backgroundImage = `url(${imageUrl})`;
        };

        if (selectedFile) {
            fileReader.readAsDataURL(selectedFile);
        }
    });
});


