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
    deleteButton.textContent = '✖️';
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

function add_link(title, url, callback) {
	// Utilisation de l'API Chrome Bookmarks pour créer un nouveau favori
	chrome.bookmarks.create(
	  {
		parentId: '1', // Ajout dans la racine principale
		title: title,  
		url: url      
	  },
	  callback // Actualise
	);
}

// Initialisation
function initialize() {
	const add_enter = document.getElementById('add_enter');
 	 const titleInput = document.getElementById('new-favorite-title');
 	 const urlInput = document.getElementById('new-favorite-url');
 	 refreshlink(); // Charge et affiche les favoris

	  add_enter.addEventListener('submit', function(event) {
		event.preventDefault(); // Empêche le rechargement de la page
		const title = titleInput.value;
		const url = urlInput.value;
		add_link(title, url, refreshlink);
		titleInput.value = ''; // efface le champ
		urlInput.value = ''; // idem
	});
 	 // Ecouteur recherche
 	 const searchField = document.getElementById('search');
  	searchField.addEventListener('input', searchFavorites);

	// Ecouteur ajout favoris via chrome
    chrome.bookmarks.onCreated.addListener(function handleCreated(id, node) {
		refreshlink()
	  })
}



// lancement après le chargement du DOM
document.addEventListener('DOMContentLoaded', initialize);