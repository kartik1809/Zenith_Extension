const textualContent = document.body.innerText;
const url = window.location.href;
const date = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

const data = {
  url,
  content: textualContent,
  date,
};

chrome.storage.local.get(["user_id"], function (result) {
  if (result.user_id) {
    fetch("https://hackfest-server-3lwd.onrender.com/ext/tracktext", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({uuid: result.user_id, content: data}),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Textual data sent successfully:", responseData);
      })
      .catch((error) => {
        console.error("Error sending textual data:", error);
      });
  } else {
    console.log("User ID not found in local storage.");
  }
});
