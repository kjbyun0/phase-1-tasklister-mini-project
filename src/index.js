// Index : red = 0, yellow = 1, green = 2
const arrToDo = [[],[],[]];

document.addEventListener("DOMContentLoaded", () => {
  // your code here
  // add priority select options
  const form = document.getElementById('create-task-form');
  const formElems = [...form.children];
  form.removeChild(form.children[form.children.length-1]);

  const select = document.createElement('select');
  const opt1 = document.createElement('option');
  opt1.value = 'red';
  opt1.textContent = 'Red';
  const opt2 = document.createElement('option');
  opt2.value = 'yellow';
  opt2.textContent = 'Yellow';
  const opt3 = document.createElement('option');
  opt3.value = 'green';
  opt3.textContent = 'Geen';
  select.append(opt1, opt2, opt3);
  form.appendChild(select);
  form.appendChild(formElems[form.children.length-1]);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addToDo(e);
    form.reset();
  });
});

function addToDo(e) {
  let colorIdx;
  switch (e.target.children[2].value) {
    case 'red': 
      colorIdx = 0;
      break;
    case 'yellow': 
      colorIdx = 1;
      break;
    case 'green':
      colorIdx = 2;
      break;
  }

  if (isTodoExist(e.target.children[1].value)) {
    alert('Duplicate Item. Don\'t need to add it')
    return;
  }
  arrToDo[colorIdx].push(e.target.children[1].value);

  const ul = document.getElementById('tasks');
  // Delete all the existing list items
  const ulChildren = ul.children;
  while (ulChildren.length > 0) {
    ul.removeChild(ulChildren[ulChildren.length-1]);
  }

  // Add all the list items
  for (let idx = 0; idx < 3; idx++) {
    for (const elem of arrToDo[idx]) {
      const li = document.createElement('li');
      li.textContent = `${elem} `;
      switch (idx) {
        case 0:
          li.style.color = '#FF0000';
          break;
        case 1:
          li.style.color = '#FFFF00';
          break;
        case 2:
          li.style.color = '#00FF00';
          break;
      }

      const btn = document.createElement('button');
      btn.textContent = 'X';
      btn.addEventListener('click', btnCB);
      li.appendChild(btn);
      ul.appendChild(li);
    }
  }
}

function btnCB(e) {
  const li = e.target.parentNode;
  for (let colorIdx = 0; colorIdx < 3; colorIdx++) {
    for (let idx = 0; idx < arrToDo[colorIdx].length; idx++) {
      if (arrToDo[colorIdx][idx] === e.target.parentNode.textContent.slice(0, -2)) {
        arrToDo[colorIdx] = [...arrToDo[colorIdx].slice(0, idx), ...arrToDo[colorIdx].slice(idx+1)];
        break;
      }
    }
  }

  e.target.parentNode.remove();
}

function isTodoExist(item) {
  for (const arrElem of arrToDo) {
    for (const elem of arrElem) {
      if (elem === item) {
        return true;
      }
    }
  }
  return false;
}