import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.jsx';

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal();
        },
        close() {
            dialog.current.close();
        }
    }));

    const handleBackdropClick = (e) => {
        if (dialog.current && !dialog.current.contains(e.target)) {
            dialog.current.close();
        }
    };

    return createPortal(
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <dialog ref={dialog} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
                {children}
                <form method="dialog" className="mt-4 text-right">
                    <Button>{buttonCaption}</Button>
                </form>
            </dialog>
        </div>,
        document.getElementById('modal-root')
    );
});

export default Modal;
