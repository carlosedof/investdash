'use client'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  parseAssets: (assets: string) => void
  setInput: Dispatch<SetStateAction<string>>
}

export default function ExampleButton({ parseAssets, setInput }: Props) {
  return (
    <div className={'flex justify-center'}>
      <button
        className={
          'bg-emerald-400 rounded px-2 text-white my-1.5 font-semibold'
        }
        onClick={() => {
          const exampleInput =
            'BBAS3/ 500/ 23.43;STBP3/ 1000/ 9.40;TRPL4/ 500/ 23.96;ITSA4/ 1115/ 9.43;CSMG3/ 500/ 19.27;'
          setInput(exampleInput)
          parseAssets(exampleInput)
        }}
      >
        Ver exemplo de uso
      </button>
    </div>
  )
}
