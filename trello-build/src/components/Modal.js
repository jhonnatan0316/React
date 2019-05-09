import React from 'react';
import TrelloCard from "./TrelloCard";
import './Modal.css';

const modal = (props, cards) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>Card</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
               
                                   </p>
                </div>
            </div>
        </div>
    )
}

export default modal;