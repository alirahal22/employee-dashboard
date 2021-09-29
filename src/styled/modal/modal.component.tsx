import React, { PropsWithChildren } from "react";
import Modal, { ModalProps } from "antd/lib/modal/Modal";

import "./modal.styled.css";

const FullScreenModal = ({
  children,
  ...props
}: ModalProps & PropsWithChildren<any>) => (
  <Modal
    className="modal-fullscreen"
    zIndex={1200}
    visible={true}
    footer={null}
    closable={false}
    {...props}
  >
    {children}
  </Modal>
);

const RegularModal = ({
  children,
  ...props
}: ModalProps & PropsWithChildren<any>) => (
  <Modal
    className="modal-regular"
    title={null}
    zIndex={1200}
    closable={false}
    footer={null}
    {...props}
  >
    {children}
  </Modal>
);

export { FullScreenModal, RegularModal };
