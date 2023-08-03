const HIDDEN_TIME = 3000;

// todo: clean up and document css!

export function createStatusbar(text = '', buttons = []) {
  let lastText = text;
  let lastSubText = '';

  const history = text ? [{ text, date: new Date() }] : [];

  const statusbar = document.createElement('div');

  statusbar.id = 'hx-statusbar';
  statusbar.className = 'hx-statusbar info';

  const left = document.createElement('div');
  left.id = 'hx-statusbar-left';
  const statusbarText = document.createElement('span');
  statusbarText.innerText = text;
  left.append(statusbarText);

  const right = document.createElement('div');
  right.id = 'hx-statusbar-right';
  buttons.forEach((button) => {
    right.append(button);
  });

  statusbar.append(left);
  statusbar.append(right);

  statusbar.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      return;
    }
    statusbar.classList.toggle('hidden');
    setTimeout(() => {
      statusbar.classList.toggle('hidden');
    }, HIDDEN_TIME);
  });

  const oldStatusbar = document.querySelector('[id="hx-statusbar"]');
  if (oldStatusbar) {
    oldStatusbar.replaceWith(statusbar);
  } else {
    document.body.append(statusbar);
  }

  return {
    statusbar,
    left,
    right,
    statusbarText,

    add: (text, className = null) => {
      history.push({ text, date: new Date() });
      statusbar.title = history
        .map((x) => `${x.text} [${x.date.toLocaleTimeString()}]`)
        .reverse()
        .join('\n');
      const fullText = text + (lastSubText?.length ? ` (${lastSubText})` : '');
      statusbarText.innerText = fullText;
      lastText = text;
      if (className) {
        statusbar.className = `hx-statusbar ${className}`;
      }
    },

    addSubText: (text) => {
      lastSubText = text;
      const fullText = lastText + (text?.length ? ` (${text})` : '');
      statusbarText.innerText = fullText;
    },

    setButtons: (buttons) => {
      // console.log('buttons', buttons);
      document.getElementById('hx-statusbar-right').replaceChildren(...buttons);
      // console.log('setButtons, statusbar', statusbar);
    },

    addButtons: (buttons) => {
      buttons.forEach((button) => {
        right.prepend(button);
      });
      // console.log('addButtons, statusbar', statusbar);
    },
  };
}
