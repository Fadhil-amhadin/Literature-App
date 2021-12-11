import React from 'react'
import { Modal } from 'react-bootstrap'

function DeleteLiteratureUser(props) {
    return (
        <Modal show={props.props.active}>
        <div className="deleteContainer">
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

export default DeleteLiteratureUser
