'use babel';

import CursorNextLine from '../lib/cursor-next-line';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('CursorNextLine', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('cursor-next-line');
  });

  describe('when the cursor-next-line:move event is triggered', () => {
    const position = { row: 1, column: 2 };
    const fakeEditor = {
      getCursorBufferPosition() {
        return position;
      },
      setCursorBufferPosition() {}
    };
    beforeEach(() => {
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn(fakeEditor);
      spyOn(fakeEditor, 'setCursorBufferPosition').andReturn(fakeEditor);
    });

    it('moves cursor to a new line', () => {
      atom.commands.dispatch(workspaceElement, 'cursor-next-line:move');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(fakeEditor.setCursorBufferPosition).toHaveBeenCalledWith({ ...position, row: position.row + 1 });
      });
    });
  });
});
