import { useRef } from "react";

export default function OutlineEditor({ input, setInput, topic, setTopic }) {
    // Separate refs for each field.
    const topicRef = useRef(null);
    const outlineRef = useRef(null);

    // Handler for the outline textarea's key events.
    const handleOutlineKeyDown = (e) => {
        const textarea = outlineRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentInput = input;

        // Get current line info
        const lineStart = currentInput.lastIndexOf("\n", start - 1) + 1;
        const lineEnd = currentInput.indexOf("\n", start);
        const currentLine = currentInput.substring(
            lineStart,
            lineEnd === -1 ? currentInput.length : lineEnd
        );

        if (e.key === "Enter") {
            e.preventDefault();
            const match = currentLine.match(/^(\s*- )/);
            const bullet = match ? match[1] : "- ";
            const newText =
                currentInput.slice(0, end) + "\n" + bullet + currentInput.slice(end);
            setInput(newText);
            setTimeout(() => {
                const pos = end + 1 + bullet.length;
                textarea.selectionStart = textarea.selectionEnd = pos;
            }, 0);
        }

        if (e.key === "Tab") {
            e.preventDefault();
            if (e.shiftKey) {
                // Decrease indent
                const pattern = /^(\s{4,})(- )/;
                const match = currentLine.match(pattern);
                if (match) {
                    const newLine = currentLine.replace(/^(\s{4})/, "");
                    const newText =
                        currentInput.substring(0, lineStart) +
                        newLine +
                        currentInput.substring(
                            lineEnd === -1 ? currentInput.length : lineEnd
                        );
                    setInput(newText);
                    setTimeout(() => {
                        const pos = start - 4;
                        textarea.selectionStart = textarea.selectionEnd = pos;
                    }, 0);
                }
            } else {
                // Increase indent
                const pattern = /^(\s*)(- )/;
                const match = currentLine.match(pattern);
                if (match) {
                    const newIndent = match[1] + "  ";
                    const newLine = currentLine.replace(/^(\s*)(- )/, newIndent + "- ");
                    const newText =
                        currentInput.substring(0, lineStart) +
                        newLine +
                        currentInput.substring(
                            lineEnd === -1 ? currentInput.length : lineEnd
                        );
                    setInput(newText);
                    setTimeout(() => {
                        const pos = start + 4;
                        textarea.selectionStart = textarea.selectionEnd = pos;
                    }, 0);
                }
            }
        }

        if (["ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
            setTimeout(() => {
                const pos = textarea.selectionStart;
                const curLineStart = currentInput.lastIndexOf("\n", pos - 1) + 1;
                const lineEnd = currentInput.indexOf("\n", curLineStart);
                const curLine = currentInput.substring(
                    curLineStart,
                    lineEnd === -1 ? currentInput.length : lineEnd
                );
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

    // Handler for the outline textarea's change events.
    const handleOutlineChange = (e) => {
        setInput(e.target.value);
    };

    // Handler for the topic input's change events.
    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    return (
        <div className="p-4">
            <div className="my-4">
                <label className="font-bold">Topic Name</label>
                <input
                    type="text"
                    ref={topicRef}
                    value={topic}
                    onChange={handleTopicChange}
                    placeholder="Enter the topic name here..."
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-x-auto whitespace-nowrap"
                />
            </div>
            <div className="my-4">
                <label className="font-bold">Outline</label>
                <textarea
                    ref={outlineRef}
                    value={input}
                    onChange={handleOutlineChange}
                    onKeyDown={handleOutlineKeyDown}
                    className="w-full h-80 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-x-auto whitespace-nowrap"
                />
            </div>
        </div>
    );
}
