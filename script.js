async function checkURL() {
  const url = document.getElementById("urlInput").value;
  const resultDiv = document.getElementById("result");

  if (!url) {
    resultDiv.textContent = "Please enter a URL.";
    return;
  }

  try {
    const response = await fetch("https://phishguard-x-lprx.onrender.com/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (data.prediction === "phishing") {
      resultDiv.textContent = "⚠️ Warning: This URL is potentially a phishing site!";
      resultDiv.style.color = "red";
    } else {
      resultDiv.textContent = "✅ This URL appears to be safe.";
      resultDiv.style.color = "green";
    }
  } catch (error) {
    console.error("Error:", error);
    resultDiv.textContent = "Error checking the URL.";
    resultDiv.style.color = "orange";
  }
}
