'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Blockquote from '@tiptap/extension-blockquote'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import { UndoRedo } from '@tiptap/extensions'
import Bold from '@tiptap/extension-bold'
import Highlight from '@tiptap/extension-highlight'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'

import {
  Bold as LucideBold, Italic as LucideItalic, Underline as LucideUnderline, Strikethrough, List, ListOrdered, Quote, Undo, Redo, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, Highlighter, Heading1, Heading2, Heading3,
} from 'lucide-react'
import { useActionState, useState } from 'react'
import { savePost } from '@/lib/actions/postActions'

interface TiptapProps {
  tags?: { id: string; name: string }[];
  post: { 
      id: string,
      title: string,
      slug: string,
      coverImage: string,
      tagId: string | null,
      content: string,
      excerpt: string,
      published: boolean,
  }
}
const EditPostPage = ({ tags, post }: TiptapProps) => {

  const [htmlContent, setHtmlContent] = useState('')

  // Estados para ambas actions
  const [state, action, pending] = useActionState(savePost, null)

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Blockquote,
      BulletList,
      ListItem,
      OrderedList,
      UndoRedo,
      Bold,
      Highlight,
      Italic,
      Underline,
      Strike,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: post?.content || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Actualizar el HTML cada vez que cambia el contenido
      setHtmlContent(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <form
        action={action}
        className="space-y-1"
      >
        {/* Campos del formulario */}
        <div className="space-y-4 ">
          <div>
            <label htmlFor="title" className="block text-amber-900 font-DMSans font-semibold mb-2">Título</label>
            <input
              id="title"
              name="title"
              defaultValue={post.title}
              placeholder="Título del post"
              required
              disabled={pending}
              className='w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans'
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-amber-900 font-DMSans font-semibold mb-2">Slug (URL)</label>
            <input
              id="slug"
              name="slug"
              placeholder="titulo-del-post"
              defaultValue={post.slug}
              required
              disabled={pending}
              className='w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans'
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-amber-900 font-DMSans font-semibold mb-2">Extracto</label>
            <input
              id="excerpt"
              name="excerpt"
              placeholder="Breve descripción del post"
              defaultValue={post.excerpt}
              disabled={pending}
              className='w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans'
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-amber-900 font-DMSans font-semibold mb-2">URL Imagen de portada</label>
            <input
              id="coverImage"
              name="coverImage"
              placeholder="https://..."
              defaultValue={post.coverImage}
              disabled={pending}
              className='w-full px-4 py-3 rounded-xl border border-white/20 text-amber-900 font-DMSans'
            />
          </div>

          <div>
            <label htmlFor="tagId" className="block text-amber-900 font-DMSans font-semibold mb-2">Tag</label>
            <select
              id="tagId"
              name="tagId"
              disabled={pending}
              defaultValue={post.tagId || ""}
              className="px-3 py-2 border rounded-md"
            >
              <option value="">Sin tag</option>
              {tags && tags.map((tag) => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Hidden input para el contenido HTML */}
        <input type="hidden" name="content" value={htmlContent} />

        {/* Editor Tiptap */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Toolbar */}
          <div className="border-b border-gray-200 p-2 bg-gray-50 rounded-t-lg flex flex-wrap gap-1">
            {/* Undo/Redo */}
            <div className="flex gap-1 border-r border-gray-300 pr-2">
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Deshacer"
                onClick={() => editor.chain().focus().undo().run()} type="button"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Rehacer"
                onClick={() => editor.chain().focus().redo().run()} type="button"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>

            {/* Text Formatting */}
            <div className="flex gap-1 border-r border-gray-300 pr-2">
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Negrita"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <LucideBold className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Cursiva"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <LucideItalic className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Subrayado"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <LucideUnderline className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Tachado"
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Resaltado"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
              >
                <Highlighter className="w-4 h-4" />
              </button>
            </div>

            {/* Headings */}
            <div className="flex gap-1 border-r border-gray-300 pr-2">
              <button
                title="Título 1"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`{ p-2 rounded hover:bg-gray-200 transition-colors} ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                title="Título 2"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`{ p-2 rounded hover:bg-gray-200 transition-colors} ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                title="Título 3"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`{ p-2 rounded hover:bg-gray-200 transition-colors} ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
              >
                <Heading3 className="w-4 h-4" />
              </button>
            </div>

            {/* Lists */}
            <div className="flex gap-1 border-r border-gray-300 pr-2">
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('bulletList') ? 'is-active' : ''}`}
                title="Lista con viñetas"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Lista numerada"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-200 transition-colors ${editor.isActive('blockquote') ? 'is-active' : ''}`}
                title="Cita"
              >
                <Quote className="w-4 h-4" />
              </button>
            </div>

            {/* Alignment */}
            <div className="flex gap-1 border-r border-gray-300 pr-2">
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Alinear izquierda"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Centrar"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Alinear derecha"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
              >
                <AlignRight className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-gray-200 transition-colors"
                title="Justificar"
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              >
                <AlignJustify className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div className="bg-white rounded-b-lg p-4 min-h-[400px]">
            <EditorContent editor={editor} />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={pending}
            className="p-3 h-full bg-amber-800 text-white text-lg rounded-lg font-Zain hover:bg-amber-900 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            {pending ? 'Guardando...' : (
              'Guardar'
            )}
          </button>

        </div>
      </form>
    </div>
  )
}

export default EditPostPage;
