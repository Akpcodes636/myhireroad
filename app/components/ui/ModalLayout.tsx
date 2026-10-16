"use client";

import { X } from "lucide-react";
import React, { useEffect } from "react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heading: string;
  className?: string;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  isOpen,
  onClose,
  children,
  heading,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-[100px]">
      {/* Overlay */}
      <div
        className="absolute inset-0 h-[100vh] bg-[#0909097f] overflow-hidden"
        onClick={onClose}
      />

      {/* Card */}
      <div className={`${className} z-10 flex w-full max-w-[777px] max-h-[90vh] flex-col rounded-lg bg-white`}>
        {/* Sticky header */}
        <div className="flex shrink-0 items-center gap-4 p-5">
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4 text-[#00000066]" />
          </button>
          <h3 className="text-xl line-clamp-1 font-semibold text-text-strong">
            {heading}
          </h3>
        </div>
        <div className="h-px w-full shrink-0 border border-[#0000001A]" />

        {/* Scrollable content */}
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default ModalLayout;
