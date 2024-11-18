'use client'
import React from 'react'
import { CheckCircle, X } from 'phosphor-react'

type Props = {
  content?: string
  onClose: () => void
}

export default function InfoBlock({ content, onClose }: Props) {
  if (!content) return null
  return (
    <div
      className={
        'flex items-center bg-emerald-50 border border-emerald-200 rounded py-1 px-4 justify-between'
      }
    >
      <div className={'flex space-x-3 items-center'}>
        <CheckCircle
          size={24}
          className={'text-emerald-400 inline-block mr-2'}
          weight={'fill'}
        />
        <div className={'flex flex-col items-start'}>
          <span
            className={
              'text-center font-semibold text-emerald-500 text-sm italic'
            }
          >
            {content}
          </span>
        </div>
      </div>
      <X
        size={18}
        className={'text-emerald-500 cursor-pointer'}
        onClick={onClose}
      />
    </div>
  )
}
