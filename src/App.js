import './App.css';
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';
import {useCallback, useState} from "react";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [highlightedText, setHighlightedText] = useState(null);

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

  function onHighlighted(event) {
    setHighlightedText(document.getSelection().toString())
  }

  const textRenderer = ({str, itemIndex}) => {
    return (<span onMouseUp={onHighlighted}>{str}</span>)
  }

  return (
    <div className="App" style={{"display": "flex"}}>
      <Document file="http://localhost:3000/davidgreen.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} customTextRenderer={textRenderer}/>
      </Document>
      <div className="Meta">
        <h2>Highlighted text</h2>
        <div>{highlightedText || 'Nothing is highlighted :('}</div>
        <div>
          Page {pageNumber} of {numPages}
        </div>
      </div>
    </div>
  );
}

export default App;
