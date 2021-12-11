import React from 'react'
import { Modal } from 'react-bootstrap'

function ProfileAlert(props) {
    return (
        <Modal show={props.props.alert}>
            <div className="profileAlertCont">
                <p>Your upload have been canceled</p>
                <p>it will be deleted in 24 hours</p>
                <p>or you can delete it now in <span>cancel</span> status below</p>
                <div><button onClick={() => props.props.changeAlert(false)}>OK</button></div>
            </div>
        </Modal>
    )
}

export default ProfileAlert
