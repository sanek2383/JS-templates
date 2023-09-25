const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.note-add');
const notesDataKey = 'notesData';

// Функция для сохранения данных в локальном хранилище
function saveNotesToLocalStorage() {
  const notes = [...notesEl.querySelectorAll('.note')].map((noteEl) => {
    const title = noteEl.querySelector('#note-title').textContent;
    const text = noteEl.querySelector('#note-text').textContent;
    return { title, text };
  });

  localStorage.setItem(notesDataKey, JSON.stringify(notes));
}

// Функция для загрузки данных из локального хранилища и создания заметок
function loadNotesFromLocalStorage() {
  const notesData = JSON.parse(localStorage.getItem(notesDataKey)) || [];

  notesData.forEach(({ title, text }) => {
    const el = createNote(title, text);
    notesEl.appendChild(el);
  });
}

function createNote(title, text) {
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.innerHTML = `
    <div class="note-header">
      <p id="note-title">${title}</p>
      <textarea id="note-title-input" class="hidden">${title}</textarea>
      <div>
        <button class="note-edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="note-delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    <p id="note-text">${text}</p>
    <textarea id="note-textarea" class="hidden">${text}</textarea>
  `;

  const editBtn = noteEl.querySelector('.note-edit');
  const deleteBtn = noteEl.querySelector('.note-delete');
  const titleEl = noteEl.querySelector('#note-title');
  const textEl = noteEl.querySelector('#note-text');
  const titleInputEl = noteEl.querySelector('#note-title-input');
  const textInputEl = noteEl.querySelector('#note-textarea');

  editBtn.addEventListener('click', (e) => {
    titleEl.classList.toggle('hidden');
    textEl.classList.toggle('hidden');

    titleInputEl.classList.toggle('hidden');
    textInputEl.classList.toggle('hidden');
    saveNotesToLocalStorage();
  });

  deleteBtn.addEventListener('click', (e) => {
    noteEl.remove();
    saveNotesToLocalStorage();
  });

  titleInputEl.addEventListener('input', (e) => {
    titleEl.innerText = e.target.value;
  });

  textInputEl.addEventListener('input', (e) => {
    textEl.innerText = e.target.value;
  });

  return noteEl;
}

addBtn.addEventListener('click', () => {
  const el = createNote('Заголовок', 'Текст');
  notesEl.appendChild(el);
  saveNotesToLocalStorage();
});

loadNotesFromLocalStorage();
