import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useQuery, useMutation } from 'react-query'
import { API } from '../config/api';
import jwt_decode from "jwt-decode"
import { useParams } from 'react-router-dom'
// const pdfjs = await import('pdfjs-dist/build/pdf');
// const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
// import './pdf.css'

//PDFjs worker from an external cdn
const url = `http://localhost:5000/uploads/1637915568676-bakker-et-al2011IJER-TmLboundaries.pdf`
// "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"

export default function Test() {
    const {id} = useParams()
    // const [url, setUrl] = useState(null)

    const {data: literature} = useQuery("literatureTestCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const response = await API().get(`/literatures/${id}`, config)
        return response.data
    })

    // useEffect(() => {
    //     setUrl(`http://localhost:5000/api/v1/${literature?.attachment}`)
    //     console.log(literature?.attachment)
    // },)
	
    console.log(pdfjs.version)

	pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
	// `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
	setNumPages(numPages);
	setPageNumber(1);
}
return (
	<>
	<div className="main">
	<Document
		file={url}
		onLoadSuccess={onDocumentLoadSuccess}
		>
		<Page pageNumber={pageNumber} />
	</Document>
	</div>
	</>
);
}
//npm i pdfjs-dist@2.9.359