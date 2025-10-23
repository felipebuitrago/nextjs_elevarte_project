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
  AlignRight, AlignJustify, Highlighter, ImageIcon, Link2, Table2, Heading1, Heading2, Heading3,
} from 'lucide-react'
import { useActionState, useState } from 'react'
import { saveAndCreatePost, saveAsDraft } from '@/app/blog/new/actions'

const Tiptap = () => {

  const [htmlContent, setHtmlContent] = useState('')
  const [actionType, setActionType] = useState<'publish' | 'draft'>('publish')

  // Estados para ambas actions
  const [publishState, publishAction, publishPending] = useActionState(saveAndCreatePost, null)
  const [draftState, draftAction, draftPending] = useActionState(saveAsDraft, null)

  // El pending combinado para deshabilitar el form
  const isPending = publishPending || draftPending

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
    content: `
      <blockquote>
        Nothing is impossible, the word itself says “I’m possible!”
      </blockquote>
      <p>Audrey Hepburn</p>
      <ul>
          <li>A list item</li>
          <li>And another one</li>
        </ul>
    `,
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
    <>
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <form
          action={(formData) => {
            // Añadir el contenido HTML al FormData
            formData.set('content', htmlContent)

            // Ejecutar la action según el tipo
            if (actionType === 'publish') {
              publishAction(formData)
            } else {
              draftAction(formData)
            }
          }}
          className="space-y-6"
        >
          {/* Campos del formulario */}
          <div className="space-y-4 bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <div>
              <label htmlFor="title">Título</label>
              <input
                id="title"
                name="title"
                placeholder="Título del post"
                required
                disabled={isPending}
              />
            </div>

            <div>
              <label htmlFor="slug">Slug (URL)</label>
              <input
                id="slug"
                name="slug"
                placeholder="titulo-del-post"
                className="text-2xl font-bold"
              />
            </div>

            <div>
              <label htmlFor="slug">Slug (URL)</label>
              <input
                id="slug"
                name="slug"
                placeholder="titulo-del-post"
                required
                disabled={isPending}
              />
            </div>

            <div>
              <label htmlFor="excerpt">Extracto</label>
              <input
                id="excerpt"
                name="excerpt"
                placeholder="Breve descripción del post"
                disabled={isPending}
              />
            </div>

            <div>
              <label htmlFor="coverImage">URL Imagen de portada</label>
              <input
                id="coverImage"
                name="coverImage"
                placeholder="https://..."
                disabled={isPending}
              />
            </div>

            <div>
              <label htmlFor="tagId">Tag</label>
              <select
                id="tagId"
                name="tagId"
                disabled={isPending}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Sin tag</option>
                {/* Aquí mapearías tus tags */}
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

              {/* Insert */}
              <div className="flex gap-1">
                <button className="p-2 rounded hover:bg-gray-200 transition-colors" title="Insertar enlace">
                  <Link2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded hover:bg-gray-200 transition-colors" title="Insertar imagen">
                  <ImageIcon className="w-4 h-4" />
                </button>
                <button className="p-2 rounded hover:bg-gray-200 transition-colors" title="Insertar tabla">
                  <Table2 className="w-4 h-4" />
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
              disabled={isPending}
              onClick={() => setActionType('draft')}
              className="p-3 h-full bg-amber-800 text-white text-lg rounded-lg font-Zain hover:bg-amber-900 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {draftPending ? 'Guardando...' : (
                'Guardar Borrador'
              )}
            </button>

            <button
              type="submit"
              disabled={isPending}
              onClick={() => setActionType('publish')}
              className="p-3 h-full bg-amber-800 text-white text-lg rounded-lg font-Zain hover:bg-amber-900 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {publishPending ? 'Publicando...' : (
                'Publicar'
              )}
            </button>
          </div>
        </form>
      </div>
      
    </>
  )
}

export default Tiptap
