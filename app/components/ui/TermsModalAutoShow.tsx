"use client";

import { useState } from "react";
import TermsModal from "./TermsModal";

export default function TermsModalAutoShow() {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("terms-seen") !== "true";
  });

  function dismiss() {
    sessionStorage.setItem("terms-seen", "true");
    setOpen(false);
  }

  return <TermsModal open={open} onClose={dismiss} onAccept={dismiss} />;
}
