const DnDContainer = document.getElementById('DnDContainer');
const fileInfo = document.getElementById('fileInfo');
const fileInput = document.getElementById('fileInput');

if (!DnDContainer || !fileInfo || !fileInput) {
    throw new Error('Missing DOM elements');
}
const preventDefaultEvents = (event) => event.preventDefault();

function handleFileSelection(file) {
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (event) {
            DnDContainer.style.backgroundImage = `url('${event.target.result}')`;
        };
        reader.readAsDataURL(file);
    } else {
        fileInfo.innerHTML = `<p>Selected file: ${file.name}. File size: ${file.size} bytes</p>`;
        DnDContainer.style.backgroundImage = '';
    }
}

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    handleFileSelection(file);
});

DnDContainer.addEventListener('dragover', (event) => {
    preventDefaultEvents(event);
    DnDContainer.classList.add('dragging');
});

DnDContainer.addEventListener('dragleave', () => {
    DnDContainer.classList.remove('dragging');
});

DnDContainer.addEventListener('drop', (event) => {
    preventDefaultEvents(event);
    DnDContainer.classList.remove('dragging');
    const file = event.dataTransfer.files[0];
    if (!file) return;
    handleFileSelection(file);
});

document.addEventListener('dragover', preventDefaultEvents);
document.addEventListener('dragleave', preventDefaultEvents);
document.addEventListener('drop', preventDefaultEvents);