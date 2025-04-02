import { useState, useRef } from "react";

export default function OutlineEditor({ input, setInput }) {
    const textareaRef = useRef(null);

    const handleKeyDown = (e) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentinput = input;

        // Helper: Get current line info
        const lineStart = currentinput.lastIndexOf("\n", start - 1) + 1;
        const lineEnd = currentinput.indexOf("\n", start);
        const currentLine = currentinput.substring(lineStart, lineEnd === -1 ? currentinput.length : lineEnd);

        // ENTER key: Insert a new bullet line preserving current indent.
        if (e.key === "Enter") {
            e.preventDefault();
            // Match the current bullet with its indentation (e.g., "  - ")
            const match = currentLine.match(/^(\s*- )/);
            const bullet = match ? match[1] : "- ";
            const newText = currentinput.slice(0, end) + "\n" + bullet + currentinput.slice(end);
            setInput(newText);
            // Move caret to after the new bullet.
            setTimeout(() => {
                const pos = end + 1 + bullet.length;
                textarea.selectionStart = textarea.selectionEnd = pos;
            }, 0);
        }

        // TAB key: Increase or decrease indent.
        if (e.key === "Tab") {
            e.preventDefault();
            if (e.shiftKey) {
                // Decrease indent: Remove two spaces before the bullet if present.
                const pattern = /^(\s{4,})(- )/;
                const match = currentLine.match(pattern);
                if (match) {
                    const newLine = currentLine.replace(/^(\s{4})/, "");
                    const newText =
                        currentinput.substring(0, lineStart) +
                        newLine +
                        currentinput.substring(lineEnd === -1 ? currentinput.length : lineEnd);
                    setInput(newText);
                    setTimeout(() => {
                        const pos = start - 4; // remove 2 spaces
                        textarea.selectionStart = textarea.selectionEnd = pos;
                    }, 0);
                }
            } else {
                // Increase indent: Add two spaces before the bullet.
                const pattern = /^(\s*)(- )/;
                const match = currentLine.match(pattern);
                if (match) {
                    const newIndent = match[1] + "  ";
                    const newLine = currentLine.replace(/^(\s*)(- )/, newIndent + "- ");
                    const newText =
                        currentinput.substring(0, lineStart) +
                        newLine +
                        currentinput.substring(lineEnd === -1 ? currentinput.length : lineEnd);
                    setInput(newText);
                    setTimeout(() => {
                        const pos = start + 4; // move caret after added spaces
                        textarea.selectionStart = textarea.selectionEnd = pos;
                    }, 0);
                }
            }
        }

        // Arrow keys: Ensure the cursor never goes before the bullet.
        if (["ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
            setTimeout(() => {
                const pos = textarea.selectionStart;
                const curLineStart = input.lastIndexOf("\n", pos - 1) + 1;
                const lineEnd = input.indexOf("\n", curLineStart);
                const curLine = input.substring(curLineStart, lineEnd === -1 ? input.length : lineEnd);

                // Match indentation and bullet ("  - ")
                const bulletMatch = curLine.match(/^(\s*- )/);
                if (bulletMatch) {
                    const minPos = curLineStart + bulletMatch[0].length;
                    if (pos < minPos) {
                        textarea.selectionStart = textarea.selectionEnd = minPos;
                    }
                }
            }, 0);
        }
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className="p-4">
      <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-80 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-x-auto whitespace-nowrap"
      />
        </div>
    );
}
