'use client'

import { useState, useTransition } from 'react'
import { toggleTagActive } from '@/lib/actions/tagActions'

interface TagActiveSwitchProps {
  tagId: string
  initialActive: boolean
}

export function TagActiveSwitch({ tagId, initialActive }: TagActiveSwitchProps) {
  const [isActive, setIsActive] = useState(initialActive)
  const [isPending, startTransition] = useTransition()

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked
    setIsActive(newValue) // Optimistic update
    
    startTransition(async () => {
      try {
        await toggleTagActive(tagId, newValue)
      } catch (error) {
        // Revertir en caso de error
        setIsActive(!newValue)
        console.error('Error al actualizar tag:', error)
      }
    })
  }

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isActive}
        onChange={handleToggle}
        disabled={isPending}
        className="sr-only peer"
      />
      <div className={`
        relative w-11 h-6 bg-gray-300 rounded-full peer
        peer-checked:bg-amber-900
        peer-focus:ring-2 peer-focus:ring-amber-300
        peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
        transition-colors duration-200
        after:content-[''] after:absolute after:top-0.5 after:left-[2px]
        after:bg-white after:rounded-full after:h-5 after:w-5
        after:transition-all after:duration-200
        peer-checked:after:translate-x-full peer-checked:after:left-[2px]
      `}></div>
    </label>
  )
}