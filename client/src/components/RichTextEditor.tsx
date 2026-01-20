import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Code,
  Undo2,
  Redo2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Digite o conteúdo...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-border rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-muted p-2 border-b border-border flex flex-wrap gap-1">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "default" : "outline"}
          size="sm"
          className="gap-1"
        >
          <Bold className="w-4 h-4" />
          <span className="hidden sm:inline">Negrito</span>
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          variant={editor.isActive("italic") ? "default" : "outline"}
          size="sm"
          className="gap-1"
        >
          <Italic className="w-4 h-4" />
          <span className="hidden sm:inline">Itálico</span>
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
          size="sm"
          className="gap-1"
        >
          <Heading2 className="w-4 h-4" />
          <span className="hidden sm:inline">Título</span>
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          size="sm"
          className="gap-1"
        >
          <List className="w-4 h-4" />
          <span className="hidden sm:inline">Lista</span>
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          size="sm"
          className="gap-1"
        >
          <ListOrdered className="w-4 h-4" />
          <span className="hidden sm:inline">Numerada</span>
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          variant={editor.isActive("blockquote") ? "default" : "outline"}
          size="sm"
          className="gap-1"
        >
          <Quote className="w-4 h-4" />
          <span className="hidden sm:inline">Citação</span>
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          variant={editor.isActive("codeBlock") ? "default" : "outline"}
          size="sm"
          className="gap-1"
        >
          <Code className="w-4 h-4" />
          <span className="hidden sm:inline">Código</span>
        </Button>

        <div className="flex-1" />

        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <Undo2 className="w-4 h-4" />
        </Button>

        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose prose-invert max-w-none p-3 min-h-[200px] bg-background text-foreground focus:outline-none"
      />
    </div>
  );
}
