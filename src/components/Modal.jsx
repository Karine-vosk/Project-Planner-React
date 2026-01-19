import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.jsx';

const Modal = ({ children, buttonCaption, ref }) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
    close() {
      dialog.current.close();
    },
  }));

  return createPortal(
    <dialog
      ref={dialog}
      className='backdrop:bg-stone-900/90 p-4 rounded-md shadow-md'
    >
      {children}

      <div className='mt-4 text-right'>
        <Button onClick={() => dialog.current.close()}>{buttonCaption}</Button>
      </div>
    </dialog>,
    document.getElementById('modal-root')
  );
};

export default Modal;
