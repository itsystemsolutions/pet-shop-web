import React from "react";

function Reciept() {
  const handleSubmit = event => {
    event.preventDefault();
    alert("You have submitted the form.");
  };
  return (
    <div className="wrapper">
      <h1>How About Them Apples</h1>
    </div>
  );
}

export default Reciept;
