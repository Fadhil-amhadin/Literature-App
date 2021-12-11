import React from 'react'
import { Modal } from 'react-bootstrap'

function ConfirmAdd(props) {
    return (
        <Modal show={props.props.active}>
            <div className="modalContainerConfirm">
                <h4>You will add literature</h4>
                {console.log(props.props.form)}
                <div className="confirmContent">
                    <p><b>Title:</b> {props.props.form.title}</p>
                    <p><b>Author:</b> {props.props.form.author}</p>
                    <p><b>Publication Date:</b> {props.props.form.publication_date}</p>
                    <p><b>Pages:</b> {props.props.form.pages}</p>
                    <p><b>ISBN:</b> {props.props.form.ISBN}</p>
                    <p><b>Attachment:</b> {props.props.form.attachment[0].name}</p>
                </div>
                <h5>Are you sure?</h5>
                <div className="btnConfirmCont">
                    <div style={{flex: 1}}></div>
                    <button className="confirmYes" onClick={() => props.props.submitLiterature()}>Yes</button>
                    <button className="confirmNo" onClick={() => props.props.changeActive(false)}>No</button>
                    <div style={{flex: 1}}></div>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmAdd
