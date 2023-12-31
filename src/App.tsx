import { Button } from '@/components/ui/button'
import { CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import useGoogleFonts from '@/hooks/useGoogleFonts'
import FontCard from './FontCard'
import { useEffect, useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from './components/ui/tooltip'

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
      <div className={'flex-col flex h-full w-full items-start justify-center bg-background gap-3 p-8'}>
        <CardHeader className={'flex w-full flex-row justify-between gap-4'}>
          <div className={'flex h-fit items-center justify-center gap-y-4'}>
            <Tooltip>
              <TooltipTrigger>
                <Input
                  className={'w-full'}
                  placeholder={'Font family'}
                  value={familySearch}
                  onChange={e => setFamilySearch(e.target.value)}
                />
              </TooltipTrigger>
              <TooltipContent className={'mb-2'} align={'start'}>
                Exact font family name from Google Fonts
              </TooltipContent>
            </Tooltip>
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
          <a className={'whitespace-nowrap hover:underline'} href={'https://github.com/SunnyYdv/dynamic-fonts'}>
            Github source
          </a>
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
      </div>
    </main>
  )
}

export default App
