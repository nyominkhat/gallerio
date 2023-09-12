"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

import { Button } from "./ui/button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <article className="justify-center items-center flex overflow-hidden top-0 left-0 right-0 bottom-0 w-screen h-screen fixed inset-0 z-50 outline-none focus:outline-none bg-foreground/20">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/*content*/}
        <div
          className={`translate duration-300 h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 sm:rounded-lg shadow-lg relative flex flex-col w-full py-6 bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center px-6 pb-4 sm:rounded-t justify-between relative">
              <p className="text-sm">{title}</p>
              <Button variant={"outline"} onClick={handleClose}>
                <X size={15} />
              </Button>
            </div>

            {/*body*/}
            <div className="relative px-6 space-y-4">{children}</div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Modal;
