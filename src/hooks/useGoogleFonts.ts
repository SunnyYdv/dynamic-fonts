import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type FontFiles = {
  regular?: string
  italic?: string
}

export type Font = {
  family: string
  variants: string[]
  subsets: string[]
  files: FontFiles
}

type FontsResponse = {
  kind: 'webfonts#webfontList'
  items: Font[]
}

type FontsParams = {
  family?: string
}

async function getFonts(params?: FontsParams): Promise<FontsResponse> {
  const res = await axios.get('https://www.googleapis.com/webfonts/v1/webfonts', {
    params: {
      key: 'AIzaSyBa87SHYHrhrKW3eoGUBYyX4Y8l4dHKjyg',
      subset: 'latin',
      capability: 'WOFF2',
      ...params
    }
  })

  return res.data
}

export default function useGoogleFonts() {
  const result = useMutation<FontsResponse, { message: string }, FontsParams | undefined, unknown>({
    mutationKey: ['fonts:get'],
    mutationFn: (params?: FontsParams) => getFonts(params)
  })

  return result
}
