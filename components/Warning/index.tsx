'use client'
import React from 'react'
import { Warning } from 'phosphor-react'

export default function WarningBlock() {
  return (
    <div
      className={
        'flex items-center bg-amber-50 border border-amber-200 rounded p-1'
      }
    >
      <Warning
        size={24}
        className={'text-yellow-400 inline-block mr-2'}
        weight={'fill'}
      />
      <div className={'flex flex-col items-start'}>
        <span
          className={'text-center font-semibold text-amber-600 text-sm italic'}
        >
          Nenhum dado é enviado para servidores externos
        </span>
        <span
          className={'text-center font-semibold text-amber-600 text-sm italic'}
        >
          Isto não é uma página de recomendação de investimentos
        </span>
      </div>
    </div>
  )
}
