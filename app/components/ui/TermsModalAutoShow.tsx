// "use client";

// import { useEffect, useState } from "react";
// import TermsModal from "./TermsModal";

// export default function TermsModalAutoShow() {
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (sessionStorage.getItem("terms-seen") !== "true") {
//       setOpen(true);
//     }
//   }, []);

//   function dismiss() {
//     sessionStorage.setItem("terms-seen", "true");
//     setOpen(false);
//   }

//   return <TermsModal open={open} onClose={dismiss} onAccept={dismiss} />;
// }
