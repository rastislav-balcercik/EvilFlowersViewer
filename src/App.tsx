import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import Viewer from './components/Viewer'
import { pdf_data } from './examples_PDF/samplePDF'

export function App() {
  return (
    <div className="App">
      <Viewer data={pdf_data} />
    </div>
  )
}

export const render = (rootID: string) => {
  const root = createRoot(document.getElementById(rootID)!);
    root.render(createElement(App));
}

export default App