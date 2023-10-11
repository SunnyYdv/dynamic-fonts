import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useGoogleFonts from '@/hooks/useGoogleFonts'
import FontCard from './FontCard'
import { useEffect, useState } from 'react'

function App() {
  const [familySearch, setFamilySearch] = useState('Ubuntu')

  const { mutate: fetchFonts, data: fontsData, isLoading, isError, error } = useGoogleFonts()
  console.log('data: ', fontsData)

  const fonts = fontsData?.items.slice(0, 30)

  useEffect(() => {
    fetchFonts({ family: familySearch })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className={'flex h-screen w-screen'}>
      <div className={'flex h-full w-full items-center justify-center bg-neutral-100 p-8'}>
        <Card className={'flex h-full w-full flex-col items-start gap-3'}>
          <CardHeader className={'flex flex-row w-full justify-between'}>
            <div className={'flex h-fit items-center justify-center gap-4'}>
              <Input
                className={'w-full'}
                placeholder={'Font family'}
                value={familySearch}
                onChange={e => setFamilySearch(e.target.value)}
              />
              <Button
                className={'w-40 whitespace-nowrap'}
                onClick={() => {
                  if (!familySearch) {
                    fetchFonts({})
                    return
                  }
                  fetchFonts({ family: familySearch })
                }}
              >
                {familySearch ? 'Fetch family' : 'Fetch all'}
              </Button>
            </div>
            <a className={'hover:underline'} href={'https://github.com/SunnyYdv/dynamic-fonts'}>Github source</a>
          </CardHeader>
          <CardContent className={'flex h-full w-full flex-col gap-6 overflow-auto'}>
            {isError && <h4 className={'w-full text-center text-red-400'}>{error.message}</h4>}
            {isLoading && (
              <div
                className={
                  'm-auto h-10 w-10 animate-spin rounded-full border-4 border-primary-foreground border-r-primary'
                }
              />
            )}
            {!isLoading &&
              fonts &&
              fonts.map(font => {
                return <FontCard key={font.family} font={font} />
              })}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default App
