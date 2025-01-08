document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const addTaskBtn = document.getElementById("addTaskBtn");
  
    const MAX_TASKS = 4; // Nombre maximum de tâches autorisées
    const MAX_CHARACTERS = 30; // Nombre maximum de caractères par tâche
    const STORAGE_KEY = "tasks"; // Clé pour stocker les tâches dans localStorage
  
    /**
     * Charge les tâches depuis le localStorage
     * @returns {Array} Liste des tâches sauvegardées
     */
    const loadTasks = () => {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : [];
    };
  
    /**
     * Sauvegarde les tâches actuelles dans le localStorage
     */
    const saveTasks = () => {
      const tasks = Array.from(taskList.children).map((task) => ({
        text: task.textContent.replace("✔", "").trim(),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    };
  
    /**
     * Crée une nouvelle tâche
     * @param {string} text - Le contenu de la tâche
     * @returns {HTMLLIElement|null} L'élément de la tâche ou null si la limite est atteinte
     */
    const createTask = (text = "New task...") => {
      if (taskList.children.length >= MAX_TASKS) {
        return null;
      }
  
      const li = document.createElement("li");
      li.contentEditable = "true";
      li.className = "task";
      li.textContent = text;
  
      // Ajouter la croix de suppression
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML = "✔";
  
      // Événement pour supprimer la tâche
      deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
  
      li.appendChild(deleteBtn);
  
      // Empêcher d'ajouter plus de caractères que la limite
      li.addEventListener("keydown", (e) => {
        if (li.textContent.length >= MAX_CHARACTERS && e.key !== "Backspace") {
          e.preventDefault(); // Empêche l'ajout de nouveaux caractères
        }
      });
  
      // Ajouter un événement pour créer une nouvelle tâche avec "Entrée"
      li.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // Empêche le saut de ligne
          const newTask = createTask();
          if (newTask) {
            taskList.insertBefore(newTask, li.nextSibling);
            newTask.focus();
            saveTasks();
          }
        }
      });
  
      // Supprimer les tâches vides et sauvegarder les modifications
      li.addEventListener("blur", () => {
        if (li.textContent.trim() === "" && li.parentElement) {
          li.remove();
        }
        saveTasks();
      });
  
      li.addEventListener("input", saveTasks); // Sauvegarder à chaque modification
  
      return li;
    };
  
    // Charger les tâches sauvegardées et les afficher
    const init = () => {
      const tasks = loadTasks();
      tasks.forEach((task) => {
        const newTask = createTask(task.text);
        if (newTask) {
          taskList.appendChild(newTask);
        }
      });
  
      // Ajouter une tâche initiale si aucune n'est enregistrée
      if (taskList.children.length === 0) {
        const initialTask = createTask("Write your first task (click on the pen)");
        taskList.appendChild(initialTask);
      }
    };
  
    // Ajouter une tâche en cliquant sur le bouton "+"
    addTaskBtn.addEventListener("click", () => {
      const newTask = createTask();
      if (newTask) {
        taskList.appendChild(newTask);
        newTask.focus();
        saveTasks();
      }
    });

    // Initialiser l'application
    init();
  }); 