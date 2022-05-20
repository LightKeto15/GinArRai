import {Modal, Spinner} from 'native-base';
import React from 'react';

export function LoadModel({visible}: {visible: boolean}) {
  return (
    <Modal bg="rgba(50, 51, 51,.5)" onClose={() => null} isOpen={visible}>
      <Modal.Content maxWidth="80%">
        <Modal.Header _text={{ fontSize:22}}>Please wait a moment...</Modal.Header>
        <Modal.Body>
          <Spinner size={80}></Spinner>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}