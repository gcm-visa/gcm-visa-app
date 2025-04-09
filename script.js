let deferredPrompt; // To hold the event for the install prompt
const installBtn = document.getElementById('installBtn');
const pwaModal = document.getElementById('pwaModal');
const closePwaModal = document.getElementById('closePwaModal');

// Handle the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Prevent the default prompt from showing
  deferredPrompt = e; // Store the event for later use

  // Show the modal for the user to install the app
  pwaModal.style.display = "block";
});

// When the user clicks the "Install PWA" button
installBtn.addEventListener('click', (e) => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Show the native install prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log(choiceResult.outcome); // Log the user's choice
      deferredPrompt = null; // Reset the prompt
    });
    pwaModal.style.display = "none"; // Close the modal
  }
});

// Close the modal when the "X" button is clicked
closePwaModal.onclick = function() {
  pwaModal.style.display = "none";
};

// Close the modal if the user clicks outside the modal content
window.onclick = function(event) {
  if (event.target == pwaModal) {
    pwaModal.style.display = "none";
  }
};
