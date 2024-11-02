import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <>
      <h1 className={'text-center font-semibold text-lg'}>
        Dashboard de investimentos
      </h1>
      <div className={'flex flex-col'}>
        <span className={'text-center font-medium text-base'}>
          Importe a carteira no formato informado no placeholder e veja
          informações organizadas
        </span>
        <div className={'text-center space-x-2'}>
          <span>Desenvolvido por:</span>
          <Link
            target={'_blank'}
            href={'https://github.com/carlosedof'}
            className={'text-center font-medium text-base underline'}
          >
            Cadu Olivera
          </Link>
        </div>
      </div>
    </>
  )
}
