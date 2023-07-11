var EMAILStatus = "";
document.addEventListener("DOMContentLoaded", function () {
  
  console.log("MEV Inject");
  var styleElement = document.createElement("style");
  var cssCode = `
          #myemailverifyerdiv {}
          .mevLodingdiv {
            display: flex; 
            margin-top: 17px; 
            padding: 1em; 
            border-radius: 4px; 
            background-color: transparent; 
            color: #b2b2b2; 
            border: 1px solid #b2b2b2 !important; 
            justify-content: space-between;
          }
          .mevValiddiv {
            display: flex; 
            margin-top: 17px; 
            padding: 1em; 
            border-radius: 4px; 
            background-color: transparent; 
            color: #17672c; 
            border: 1px solid #17672c !important; 
            justify-content: space-between;
          }
          .mevInvaliddiv {
            display: flex; 
            margin-top: 17px; 
            padding: 1em; 
            border-radius: 4px; 
            background-color: transparent; 
            color: #9e1511; 
            border: 1px solid  #9e1511 !important; 
            justify-content: space-between;
          } 
          .mevCatchalldiv{
            display: flex; 
            margin-top: 17px; 
            padding: 1em; 
            border-radius: 4px; 
            background-color: transparent; 
            color: #c39405; 
            border: 1px solid  #c39405 !important; 
            justify-content: space-between;
          }
          .mevElsediv{
            display: flex; 
            margin-top: 17px; 
            padding: 1em; 
            border-radius: 4px; 
            background-color: transparent; 
            color: #b2b2b2; 
            border: 1px solid  rgb(178, 178, 178) !important; 
            justify-content: space-between;
          }
          .mev-img {
            width: 100%;
            max-width: 140px;
          } 
           .mev-close-button {
            background-color: transparent;
            border: none;
            font-size: 16px;
            color: #888;
            cursor: pointer;
          }
          
          .mev-close-button:hover {
            color: #000;
          }
        `;
  styleElement.textContent = cssCode;
  document.head.appendChild(styleElement);

  closemev();

  let inputElement = document.querySelector("input[myemailverify]");
  if (inputElement) {
    inputElement.addEventListener("change", function (event) {
      var value = event.target.value;

      closemev();

      let implement = document.querySelector("input[myemailverify]");
      let newElement = document.createElement("div");
      newElement.setAttribute("id", "myemailverifyerdiv");
      newElement.innerHTML = "";

      newElement.innerHTML =
        '<div class="mevLodingdiv"><span>Loding ...</span></div>';
      implement.insertAdjacentElement("afterend", newElement);

      const url = "https://myemailverifier.com/core/javascript";
      // const url = "http://myemailverifier.pravin/core/javascript.php";
      const formData = new FormData();

      formData.append("apikey", MEVkey);
      formData.append("email", value);

      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed.");
        })
        .then(function (data) {
          closemev();
          if(data.userstatus == "paid"){
            if (data.status == "Valid") {
              newElement.innerHTML =
                '<div class="mevValiddiv"><span>Valid</span><span> <button class="mev-close-button" onclick="closemev()">&#x2715</button></span></div>';
            } else if (data.status == "Catch-all") {
              newElement.innerHTML =
                '<div class="mevCatchalldiv"><span>Catch all</span><span> <button class="mev-close-button" onclick="closemev()">&#x2715</button></span></div>';
            } else if (data.status == "Invalid") {
              newElement.innerHTML =
                '<div class="mevInvaliddiv"><span>Invalid</span><span>  <button class="mev-close-button" onclick="closemev()">&#x2715</button></span></div>';
            } else {
              newElement.innerHTML =
                '<div class="mevElsediv"><span>Unknown</span><span>  <button class="mev-close-button" onclick="closemev()">&#x2715</button></span></div>';
            }
          }
          else{
            if (data.status == "Valid") {
              newElement.innerHTML =
                '<div class="mevValiddiv"><span>Valid</span><span><a href="https://myemailverifier.com/"><img class="mev-img " src="https://myemailverifier.com/images/myemailverifier-tool-logo.svg" alt="MyEmailVerifier Logo"></a>  <button class="mev-close-button" onclick="closemev()">&#x2715</button></span></div>';
            } else if (data.status == "Catch-all") {
              newElement.innerHTML =
                '<div class="mevCatchalldiv"><span>Catch all</span><span><a href="https://myemailverifier.com/"><img class="mev-img " src="https://myemailverifier.com/images/myemailverifier-tool-logo.svg" alt="MyEmailVerifier Logo"></a>  <button class="mev-close-button" onclick="closemev()">&#x2715</button></span></div>';
            } else if (data.status == "Invalid") {
              newElement.innerHTML =
                '<div class="mevInvaliddiv"><span>Invalid</span><span> <a href="https://myemailverifier.com/"><img class="mev-img " src="https://myemailverifier.com/images/myemailverifier-tool-logo.svg" alt="MyEmailVerifier Logo"></a>  <button class="mev-close-button" onclick="closemev()">&#x2715</button></span></div>';
            } else {
              newElement.innerHTML =
                '<div class="mevElsediv"><span>Unknown</span><span> <a href="https://myemailverifier.com/"><img class="mev-img " src="https://myemailverifier.com/images/myemailverifier-tool-logo.svg" alt="MyEmailVerifier Logo"></a>  <button class="mev-close-button" onclick="closemev()">&#x2715</button></span></div>';
            }
          }

          

          implement.insertAdjacentElement("afterend", newElement);
          EMAILStatus = data.status;
          console.log(EMAILStatus);
        })
        .catch(function (error) {
          console.log("Error:", error.message);
        });
    });
  } else {
    console.log("Input element not found.");
  }
});

function closemev() {
  let previousElement = document.getElementById("myemailverifyerdiv");
  if (previousElement) {
    previousElement.remove();
  } else {
  }
}

function MEVStatus() {
  return EMAILStatus;
}
