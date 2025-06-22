import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import 'draft-js/dist/Draft.css';

function RichTextEditor() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '200px' }}>
      {/* Toolbar */}
      <div style={{ marginBottom: '10px' }}>
        <button onMouseDown={(e) => { e.preventDefault(); toggleInlineStyle('BOLD'); }}>Bold</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleInlineStyle('ITALIC'); }}>Italic</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleInlineStyle('UNDERLINE'); }}>Underline</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleBlockType('unordered-list-item'); }}>• List</button>
        <button onMouseDown={(e) => { e.preventDefault(); toggleBlockType('ordered-list-item'); }}>1. List</button>
      </div>

      {/* Editor */}
      <div style={{ minHeight: '150px', cursor: 'text' }} onClick={() => this.editor.focus()}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={setEditorState}
          ref={(element) => { this.editor = element; }}
        />
      </div>
    </div>
  );
}

export default RichTextEditor;
