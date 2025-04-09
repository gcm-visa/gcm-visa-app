let deferredPrompt;
const installBtn = document.getElementById('installBtn');
const pwaModal = document.getElementById('pwaModal');
const closePwaModal = document.getElementById('closePwaModal');

// PWA prompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  pwaModal.style.display = "block";
});

if (installBtn) {
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
}

if (closePwaModal) {
  closePwaModal.onclick = () => pwaModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == pwaModal) {
    pwaModal.style.display = "none";
  }
};

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/gcm-visa-app/service-worker.js')
      .then(reg => console.log('ServiceWorker registered:', reg.scope))
      .catch(err => console.error('SW registration failed:', err));
  });
}
