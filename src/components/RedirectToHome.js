import React, { useEffect } from "react";

function RedirectToHome() {
  useEffect(() => {
    window.location.hash = "/";
  }, []);

  return <div></div>;
}

export default RedirectToHome;
