import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "@tiptap/extension-font-size";
import { Bold, Italic, List, ListOrdered, CornerDownLeft } from "lucide-react";

function Tiptap({ onContentChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle, // Required for font size
      FontSize.configure({
        types: ["textStyle"], // Enables font size on paragraphs and headings
      }),
    ],
    content: "Write something...",
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  const iconBtnStyle =
    "p-2 border rounded hover:bg-gray-100 transition text-black";

  const handleHeadingChange = (e) => {
    const value = e.target.value;
    if (value === "paragraph") {
      editor?.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.replace("h", ""));
      editor?.chain().focus().toggleHeading({ level }).run();
    }
  };

  const handleFontSizeChange = (e) => {
    const size = e.target.value;
    if (size === "default") {
      editor?.chain().focus().unsetFontSize().run();
    } else {
      editor?.chain().focus().setFontSize(size).run();
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-md p-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <button
          type="button"
          title="Bold"
          className={iconBtnStyle}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold size={18} />
        </button>

        <button
          type="button"
          title="Italic"
          className={iconBtnStyle}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic size={18} />
        </button>

        <button
          type="button"
          title="Bullet List"
          className={iconBtnStyle}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List size={18} />
        </button>

        <button
          type="button"
          title="Ordered List"
          className={iconBtnStyle}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={18} />
        </button>

        <button
          type="button"
          title="Line Break"
          className={iconBtnStyle}
          onClick={() => editor?.chain().focus().setHardBreak().run()}
        >
          <CornerDownLeft size={18} />
        </button>

        {/* Font Size Dropdown */}
        <select
          onChange={handleFontSizeChange}
          defaultValue="default"
          className="p-2 border rounded text-sm bg-white appearance-none focus:outline-none"
        >
          <option value="default">Font Size</option>
          <option value="12px">Small</option>
          <option value="16px">Medium</option>
          <option value="20px">Large</option>
          <option value="24px">Extra Large</option>
          <option value="32px">Huge</option>
        </select>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        className="min-h-[250px] prose prose-sm sm:prose-base focus:outline-none"
      />
    </div>
  );
}

export default Tiptap;
