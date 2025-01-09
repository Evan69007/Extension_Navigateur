let all_link = []; // Stocke les favoris récupérés

// Récupère les favoris à la racine
function get_fav_link(callback) {
  chrome.bookmarks.getChildren('1', function(bookmarks) {
    callback(bookmarks); // Récupère les favoris via un callback
  });
}

// Affichage HTML des favoris
function fav_link(bookmarks) {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';

  for (let i = 0; i < bookmarks.length; i++) {
    const bookmark = bookmarks[i];
    const li = document.createElement('li');

    if (bookmark.url) {
      li.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.title || '(Sans titre)'}</a>`;
    } else {
      li.textContent = bookmark.title || '(Sans titre)';
    }

    // Bouton de suppression
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Supprimer';
    deleteButton.setAttribute('data-id', bookmark.id);

    // Ajoute les éléments au DOM
    li.appendChild(deleteButton);
    favoritesList.appendChild(li);
  }

  addDeleteEvent(); // Ajoute les événements pour les boutons "Supprimer"
}

// Appel gestionnaire d'événement "supprimer"
function addDeleteEvent() {
  const deleteButtons = document.querySelectorAll('#favorites-list button');

  for (let i = 0; i < deleteButtons.length; i++) {
    const button = deleteButtons[i];
    button.addEventListener('click', BtnDeleteClick);
  }
}

// Fonction appelée au click supprimer
function BtnDeleteClick(event) {
  const bookmarkId = event.target.getAttribute('data-id');
  deleteBookmark(bookmarkId);
}

// Supprimer un favori
function deleteBookmark(bookmarkId) {
  chrome.bookmarks.remove(bookmarkId, refreshlink);
}

// rafraîchir et afficher les favoris
function refreshlink() {
  get_fav_link(function(bookmarks) {
    all_link = bookmarks; // Met à jour la liste locale
    fav_link(all_link); // Affiche les favoris
  });
}

function searchFavorites() {
  const searchInput = document.getElementById('search').value.toLowerCase();

  const filteredBookmarks = [];
  for (let i = 0; i < all_link.length; i++) {
    const bookmark = all_link[i];
    if (bookmark.title && bookmark.title.toLowerCase().includes(searchInput)) {
      filteredBookmarks.push(bookmark);
    }
  }

  // Affiche favoris filtrés uniquement
  fav_link(filteredBookmarks);
}


// Initialisation
function initialize() {
  refreshlink(); // Charge et affiche les favoris

  // Ecouteur recherche
  const searchField = document.getElementById('search');
  searchField.addEventListener('input', searchFavorites);
}

// lancement après le chargement du DOM
document.addEventListener('DOMContentLoaded', initialize);