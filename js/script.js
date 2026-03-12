/* ============================================
   Local Image Compressor — script.js
   Author: gorupa (https://github.com/gorupa)
   License: MIT
   ============================================ */

// ── DOM References ──
const uploadZone       = document.getElementById('uploadZone');
const fileInput        = document.getElementById('fileInput');
const controlsPanel    = document.getElementById('controlsPanel');
const resultsPanel     = document.getElementById('resultsPanel');
const originalFileName = document.getElementById('originalFileName');
const originalFileSize = document.getElementById('originalFileSize');
const qualitySlider    = document.getElementById('qualitySlider');
const qualityValue     = document.getElementById('qualityValue');
const compressBtn      = document.getElementById('compressBtn');
const oldSizeDisplay   = document.getElementById('oldSizeDisplay');
const newSizeDisplay   = document.getElementById('newSizeDisplay');
const savingsDisplay   = document.getElementById('savingsDisplay');
const downloadLink     = document.getElementById('downloadLink');
const resetBtn         = document.getElementById('resetBtn');
const previewOriginal  = document.getElementById('previewOriginal');
const previewEstimated = document.getElementById('previewEstimated');
const previewSaving    = document.getElementById('previewSaving');

let currentFile = null;
let currentImg  = null;   // cached HTMLImageElement for live estimation
let liveCanvas  = null;   // offscreen canvas for size estimates

// ── Utilities ──

/**
 * Formats a byte count into a human-readable string (B, KB, or MB).
 * @param {number} bytes
 * @returns {string}
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Updates the slider track fill color to match the current value.
 */
function updateSliderFill() {
    const min = qualitySlider.min;
    const max = qualitySlider.max;
    const val = qualitySlider.value;
    const pct = ((val - min) / (max - min)) * 100;
    qualitySlider.style.background =
        `linear-gradient(to right, var(--primary) 0%, var(--primary) ${pct}%, var(--border) ${pct}%)`;
}

// ── Live Size Estimation ──

/**
 * Runs a quick canvas-to-blob compression at the current quality setting
 * and updates the live preview panel with the estimated output size.
 */
function estimateSize() {
    if (!liveCanvas || !currentFile) return;
    const quality = qualitySlider.value / 100;
    liveCanvas.toBlob((blob) => {
        if (!blob) return;
        const estimated = blob.size;
        const original  = currentFile.size;
        const saved     = Math.max(0, Math.round((1 - estimated / original) * 100));

        previewOriginal.textContent  = formatBytes(original);
        previewEstimated.textContent = formatBytes(estimated);
        previewSaving.textContent    = `~${saved}% saved`;
    }, 'image/jpeg', quality);
}

// ── File Handling ──

/**
 * Accepts a File object, validates its type, renders it to an offscreen
 * canvas for estimation, and switches the UI to the controls panel.
 * @param {File} file
 */
function handleFile(file) {
    if (!file) return;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return;

    currentFile = file;

    // Update file info display
    originalFileName.textContent = file.name;
    originalFileSize.textContent = formatBytes(file.size);
    oldSizeDisplay.textContent   = formatBytes(file.size);
    previewOriginal.textContent  = formatBytes(file.size);

    // Read and cache the image in an offscreen canvas
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            currentImg         = img;
            liveCanvas         = document.createElement('canvas');
            liveCanvas.width   = img.width;
            liveCanvas.height  = img.height;
            liveCanvas.getContext('2d').drawImage(img, 0, 0);
            estimateSize(); // show initial estimate immediately
        };
    };

    uploadZone.classList.add('hidden');
    controlsPanel.classList.remove('hidden');
}

// Click to select file
uploadZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

// Drag-and-drop support
uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadZone.classList.add('drag-over');
});
uploadZone.addEventListener('dragleave', () => {
    uploadZone.classList.remove('drag-over');
});
uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadZone.classList.remove('drag-over');
    handleFile(e.dataTransfer.files[0]);
});

// ── Slider ──
qualitySlider.addEventListener('input', function () {
    qualityValue.textContent = this.value + '%';
    updateSliderFill();
    estimateSize(); // re-estimate on every slider move
});
updateSliderFill(); // initialise fill on page load

// ── Compress ──
compressBtn.addEventListener('click', () => {
    if (!liveCanvas || !currentFile) return;

    // Show loading state
    compressBtn.innerHTML = `<span class="material-icons-round" style="animation:spin 0.8s linear infinite">hourglass_empty</span> Compressing…`;
    compressBtn.disabled  = true;

    const quality = qualitySlider.value / 100;

    // Re-use the cached canvas for the final compression
    liveCanvas.toBlob((blob) => {
        const newSize  = blob.size;
        const origSize = currentFile.size;
        const savedPct = Math.max(0, Math.round((1 - newSize / origSize) * 100));

        // Populate results panel
        newSizeDisplay.textContent = formatBytes(newSize);
        savingsDisplay.textContent = `↓ saved ${savedPct}%`;

        // Create object URL and set download link
        downloadLink.href     = URL.createObjectURL(blob);
        downloadLink.download = currentFile.name.replace(/\.[^/.]+$/, '') + '_compressed.jpg';

        // Switch panels
        controlsPanel.classList.add('hidden');
        resultsPanel.classList.remove('hidden');

        // Restore button state
        compressBtn.innerHTML = `<span class="material-icons-round">compress</span> Compress Image`;
        compressBtn.disabled  = false;

    }, 'image/jpeg', quality);
});

// ── Reset ──
resetBtn.addEventListener('click', () => {
    resultsPanel.classList.add('hidden');
    uploadZone.classList.remove('hidden');
    fileInput.value          = '';
    currentFile = currentImg = liveCanvas = null;
});
