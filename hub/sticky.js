const note = document.getElementById("note");

function loadNote() {
  const savedNote = localStorage.getItem("singleNote");
  if (savedNote) {
    note.value = savedNote;
  }
}

function saveNote() {
  localStorage.setItem("singleNote", note.value);
}

document.addEventListener("DOMContentLoaded", loadNote);

note.addEventListener("input", saveNote);
