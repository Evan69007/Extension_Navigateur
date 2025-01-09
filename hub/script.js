let all_link = []; // Stocke les favoris récupérés

// récupère les favoris à la racine
function get_fav_link(callback) {
  // appel API Chrome Bookmarks
  chrome.bookmarks.getChildren('1', function(bookmarks) {
    callback(bookmarks); // chrome.bookmarks.getChildren est asynchrone. Elle nécessite une fonction de rappel (callback) pour traiter les résultats après la récupération des données.
  });
}

// Affichage HTML
function fav_link(bookmarks) {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';

  // Check les favoris
  for (let i = 0; i < bookmarks.length; i++) {
    const bookmark = bookmarks[i];
    const li = document.createElement('li');

    if (bookmark.url) {
      li.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.title || '(Sans titre)'}</a>`;
    }



  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  deleteButton.setAttribute('data-id', bookmark.id);


 
  li.appendChild(deleteButton);
  favoritesList.appendChild(li); // Ajoute l'élément à la liste
  }


  addDeleteEvent();
}

// Fonction pour ajouter les gestionnaires d'événements "supprimer"
function addDeleteEvent() {
  const deleteButtons = document.querySelectorAll('#favorites-list button');

  for (let i = 0; i < deleteButtons.length; i++) {
    const button = deleteButtons[i];
    button.addEventListener('click', BtnDeleteClick);
  }
}


function BtnDeleteClick(event) {
  const bookmarkId = event.target.getAttribute('data-id'); // Récupère l'ID du favori
  deleteBookmark(bookmarkId);
}


function deleteBookmark(bookmarkId) {
  chrome.bookmarks.remove(bookmarkId, refreshlink); // Supprime et rafraîchit les favoris
}

// rafraîchir et afficher les favoris
function refreshlink() {
  // Appel API pour mettre à jour les favoris // a utiliser ac les nouveaux liens
  get_fav_link(function(bookmarks) {
    all_link = bookmarks; // Met à jour la liste locale // a utiliser ac les nouveaux liens
    fav_link(all_link); // Affiche les favoris
  });
}

// Initialisation de l'application
function initialize() {
  refreshlink(); // Charge et affiche les favoris
}

// Lancement après le chargement du DOM
document.addEventListener('DOMContentLoaded', initialize);