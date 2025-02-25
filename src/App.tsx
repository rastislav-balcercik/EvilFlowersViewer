import { Viewer } from './lib/components/Viewer'
//import { pdf_data } from './examples/pdf/samplePDF'
import { pdf_data } from './examples/pdf/latexSamplePDF'
import { exampleShareFunction } from './examples/function/sharedFunction'
import { exampleCitation } from './examples/citation/citation'
import Introduction from './lib/components/helpers/introduction/Introduction'
import { useState } from 'react'

const homeFunction = () => {
  console.log('home')
}

interface IExample {
  theme?: 'dark' | 'light'
  lang?: string
  citationBib?: string | null
  shareFunction?:
    | ((pages: string | null, expaireDate: string) => Promise<string>)
    | null
  homeFunction?: (() => void) | null
}

const inputOptions: IExample = {
  citationBib: exampleCitation,
  shareFunction: exampleShareFunction,
  homeFunction: homeFunction,
  // theme: 'light',
}

/**
 *
 * @returns The App component that renders the Viewer component
 */
export function App() {
  return (
    <div className="App">
      <Viewer data={pdf_data} options={inputOptions} />
    </div>
  )
}

export default App
