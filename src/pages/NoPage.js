import React from "react";

function NoPage() {
  return (
    <div className="no-page-error">
      <div>
        <h1>Error 404</h1>
      </div>
      <br />
      <div>
        Click{" "}
        <a href="/" rel="noopener noreferrer">
          here
        </a>{" "}
        to return home
      </div>
    </div>
  );
}

export default NoPage;
