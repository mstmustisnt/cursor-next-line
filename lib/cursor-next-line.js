'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'cursor-next-line:move': () => this.move()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  move() {
    const editor = atom.workspace.getActiveTextEditor();

    if (!editor) {
      return;
    }

    const currentPosition = editor.getCursorBufferPosition();
    const newPosition = { ...currentPosition, row: currentPosition.row + 1 };

    editor.setCursorBufferPosition(newPosition);
  }
};
