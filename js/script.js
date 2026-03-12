// DOM Elements
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const controlsPanel = document.getElementById('controlsPanel');
const resultsPanel = document.getElementById('resultsPanel');
const originalFileName = document.getElementById('originalFileName');
const originalFileSize = document.getElementById('originalFileSize');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const compressBtn = document.getElementById('compressBtn');
const oldSizeDisplay = document.getElementById('oldSizeDisplay');
const newSizeDisplay = document.getElementById('newSizeDisplay');
const downloadLink = document.getElementById('downloadLink');
const resetBtn = document.getElementById('resetBtn');

let currentFile = null;

// Format bytes to MB/KB
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Handle File Selection
uploadZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    currentFile = file;
    originalFileName.textContent = file.name;
    originalFileSize.textContent = formatBytes(file.size);
    oldSizeDisplay.textContent = formatBytes(file.size);

    uploadZone.classList.add('hidden');
    controlsPanel.classList.remove('hidden');
});

// Update Slider Value
qualitySlider.addEventListener('input', function() {
    qualityValue.textContent = Math.round(this.value * 100) + '%';
});

// Compress Logic using HTML5 Canvas
compressBtn.addEventListener('click', () => {
    if (!currentFile) return;

    compressBtn.innerHTML = '<span class="material-icons-round">hourglass_empty</span> Compressing...';
    compressBtn.disabled = true;

    const reader = new FileReader();
    reader.readAsDataURL(currentFile);
    
    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = function() {
            // Create a hidden canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw original image on canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Extract with new quality setting (works for JPG/WebP)
            const quality = parseFloat(qualitySlider.value);
            
            canvas.toBlob((blob) => {
                const newSize = blob.size;
                newSizeDisplay.textContent = formatBytes(newSize);
                
                // Create download link
                const compressedUrl = URL.createObjectURL(blob);
                downloadLink.href = compressedUrl;
                
                // Set the download filename
                const newName = currentFile.name.replace(/\.[^/.]+$/, "") + "_compressed.jpg";
                downloadLink.download = newName;

                // Update UI
                controlsPanel.classList.add('hidden');
                resultsPanel.classList.remove('hidden');
                
                // Reset button
                compressBtn.innerHTML = '<span class="material-icons-round">compress</span> Compress Image';
                compressBtn.disabled = false;
                
            }, 'image/jpeg', quality);
        }
    }
});

// Reset App
resetBtn.addEventListener('click', () => {
    resultsPanel.classList.add('hidden');
    uploadZone.classList.remove('hidden');
    fileInput.value = '';
    currentFile = null;
});
