let all_link = []; // actualise la liste actuelle + les ajouts de liens
// récupere les favoris a la racine
function get_fav_link(callback) {
  // appel API Chrome Bookmarks
  chrome.bookmarks.getChildren('1', function(bookmarks) {
    callback(bookmarks);
  });
}
// Affichage HTML
function fav_link(bookmarks) {
  const favoritesList = document.getElementById('favorites-list'); // Liste des favoris dans le DOM
  favoritesList.innerHTML = ''; // Réinitialise le contenu de la liste

  // Check les favoris
  for (let i = 0; i < bookmarks.length; i++) {
    const bookmark = bookmarks[i];

    // Création et affichage HTML
    const li = document.createElement('li');
    li.innerHTML = `
      <a href="${bookmark.url || '#'}" target="_blank">${bookmark.title || '(Sans titre)'}</a>
    `;
    favoritesList.appendChild(li); // Ajoute l'élément à la liste
  }
}

// ajouter un nouveau favori
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

// rafraîchir et afficher les favoris
function refreshlink() {
  // Utilisation de l'API Chrome Bookmarks pour récupérer et mettre à jour les favoris
  get_fav_link(function(bookmarks) {
    all_link = bookmarks; // Met à jour la liste locale
    fav_link(all_link); // Affiche les favoris
  });
}

// Initialisation de l'application
function initialize() {

  const add_enter = document.getElementById('add_enter');
  const titleInput = document.getElementById('new-favorite-title');
  const urlInput = document.getElementById('new-favorite-url');

  refreshlink();

  // Gère l'ajout de favoris
  add_enter.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    const title = titleInput.value;
    const url = urlInput.value;
    add_link(title, url, refreshlink);
    titleInput.value = ''; // efface le champ
    urlInput.value = ''; // idem
  });
}
document.addEventListener('DOMContentLoaded', initialize);