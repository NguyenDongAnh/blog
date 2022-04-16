import React from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/monokai.css";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

const code = "const a = 0;";

export default function MarkdownEditor() {
  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions: [markdown({ base: markdownLanguage, codeLanguages: languages })],
    value: code
  });
  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor.current]);
  return <div ref={editor} />;
}