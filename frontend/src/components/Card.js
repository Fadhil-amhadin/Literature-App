import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

function Card(props) {
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
    return (
        <div className="cardContainer">
            <Document
                file={`http://localhost:5000/uploads/${props.props.attachment}`}>
                <Page pageNumber={1} />
            </Document>
            <div className="cardContent">
                <h4>{props.props.title}</h4>
                <div className="cardFooter">
                    <p>{props.props.author}</p>
                    <p>{props.props.publication_date}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
