import { Viewer } from './lib/components/Viewer';
//import { pdf_data } from './examples/pdf/samplePDF'
import { pdf_data } from './examples/pdf/latexSamplePDF';
import { exampleShareFunction } from './examples/function/sharedFunction';
import { exampleCitation } from './examples/citation/citation';

interface IExample {
  theme?: 'dark' | 'light';
  lang?: string;
  citationBib?: string | null;
  shareFunction?: ((pages: string | null, expaireDate: string) => Promise<string>) | null,
  id?: string | null,
}

const inputOptions: IExample = {
  citationBib: exampleCitation,
  shareFunction: exampleShareFunction,
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
