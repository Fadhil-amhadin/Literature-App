import React from 'react'
import { Modal } from 'react-bootstrap'

function DeleteLiterature(props) {
    return (
        <Modal show={props.props.active}>
            <div className="deleteContainer">
                <p>Before deleting the literature, make sure you have alerted the user.</p>
                <p>Are you sure want to delete?</p>
                <div>
                    <span style={{flex:1}}/>
                    <button className="yes" onClick={() => props.props.handleDelete()}>yes</button>
                    <button className="no" onClick={() => props.props.changeActive(false)}>no</button>
                    <span style={{flex:1}}/>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteLiterature
