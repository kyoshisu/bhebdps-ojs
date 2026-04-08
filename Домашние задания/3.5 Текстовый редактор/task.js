const editorEl = document.getElementById('editor');
const storageKey = 'text-editor:value';

function loadValue() {
  try {
    return localStorage.getItem(storageKey) ?? '';
  } catch {
    return '';
  }
}

function saveValue(value) {
  try {
    localStorage.setItem(storageKey, value);
  } catch {
  }
}

if (editorEl) {
  editorEl.value = loadValue();
  editorEl.addEventListener('input', () => {
    saveValue(editorEl.value);
  });
}

