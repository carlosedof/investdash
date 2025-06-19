// pages/api/upload.ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { IncomingForm } from 'formidable'
import xlsx from 'xlsx'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const form = new IncomingForm({ uploadDir: '/tmp', keepExtensions: true })

  form.parse(req, (err: any, fields: any, files: any) => {
    if (err || !files.file) {
      return res.status(400).send('Erro no upload.')
    }

    const filePath = Array.isArray(files.file)
      ? files.file[0].filepath
      : files.file.filepath
    const workbook = xlsx.readFile(filePath)
    const sheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 })

    try {
      const result = processPlanilha(data as any)
      res.status(200).send(result)
    } catch (e: any) {
      res.status(500).send(`Erro ao processar planilha. ${e.message}`)
    }
  })
}

function processPlanilha(data: any[][]): string {
  function findIndex(term: string) {
    return data.findIndex((row) =>
      String(row[0] || '')
        .toLowerCase()
        .includes(term.toLowerCase()),
    )
  }

  function extractSection(start: number, precoIdx: number, qtdIdx: number) {
    const end =
      data
        .slice(start + 3)
        .findIndex((row) => !row[0] || String(row[0]).trim() === '') +
      start +
      3
    return data
      .slice(start + 3, end)
      .map((row) => ({
        Ticker: row[0],
        PrecoMedio: parseFloat(
          String(row[precoIdx])
            .replace('R$', '')
            .replace('.', '')
            .replace(',', '.'),
        ),
        QtdTotal: parseInt(String(row[qtdIdx]).replace(/\./g, ''), 10),
      }))
      .filter((e) => !isNaN(e.PrecoMedio) && !isNaN(e.QtdTotal))
  }

  const idxAcoes = findIndex('ações')
  const idxFiis = findIndex('fundos imobiliários')

  const acoes = idxAcoes >= 0 ? extractSection(idxAcoes, 4, 6) : []
  const fiis = idxFiis >= 0 ? extractSection(idxFiis, 5, 7) : []

  const final = [...acoes, ...fiis]
  return final
    .map((row) => `${row.Ticker}/${row.QtdTotal}/${row.PrecoMedio.toFixed(2)}`)
    .join(';')
}
