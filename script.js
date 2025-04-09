let deferredPrompt; // To hold the event for the install prompt
const installBtn = document.getElementById('installBtn');
const pwaModal = document.getElementById('pwaModal');
const closePwaModal = document.getElementById('closePwaModal');

// Handle the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Prevent the default prompt from showing
  deferredPrompt = e; // Store the event for later use
  pwaModal.style.display = "block"; // Show the modal
});

// Install PWA when user clicks the button
installBtn.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log(choiceResult.outcome);
      deferredPrompt = null;
    });
    pwaModal.style.display = "none";
  }
});

// Close modal handlers
closePwaModal.onclick = function() {
  pwaModal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === pwaModal) {
    pwaModal.style.display = "none";
  }
};

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('DOMContentLoaded', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.error('SW registration failed:', err));
  });
}
