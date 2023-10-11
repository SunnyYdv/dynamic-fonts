import { useEffect } from 'react'
import { Font } from './hooks/useGoogleFonts'
import { Card, CardContent, CardHeader } from './components/ui/card'

type Props = {
  font: Font
}

const removeHttp = (url: string) => {
  return url.replace('http:', '')
}

async function loadFontStyles(font: Font) {
  const { family, files } = font

  if (files.regular) {
    const fontFace = new FontFace(family, `url(https:${removeHttp(files.regular)})`, { style: 'normal', weight: '400' })
    const loadedFont = await fontFace.load()
    document.fonts.add(loadedFont)
  }
  if (files.italic) {
    const fontFace = new FontFace(family, `url(https:${removeHttp(files.italic)})`, { style: 'italic', weight: '400' })
    const loadedFont = await fontFace.load()
    document.fonts.add(loadedFont)
  }
}

export default function FontCard(props: Props) {
  const { font } = props

  const { family, files } = font
  useEffect(() => {
    loadFontStyles(font)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardHeader
        style={{
          fontFamily: family,
          fontStyle: 'regular'
        }}
      >
        {family}
      </CardHeader>
      <CardContent
        style={{
          fontFamily: family,
          fontStyle: 'regular'
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </CardContent>

      {files.italic && (
        <>
          <div className={'mx-6 h-[1px] w-auto bg-border'} />
          <CardContent
            className={'pt-6'}
            style={{
              fontFamily: family,
              fontStyle: 'italic'
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </CardContent>
        </>
      )}
    </Card>
  )
}
