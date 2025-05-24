async function checkURL() {
  const url = document.getElementById("url").value;
  const resultDiv = document.getElementById("result");

  if (!url) {
    resultDiv.textContent = "Please enter a URL.";
    resultDiv.style.color = "orange";
    return;
  }

  // Show animation
  resultDiv.innerHTML = `
    <p>Analyzing URL: ${url}</p>
    <div class="loader-bar"></div>
  `;
  resultDiv.style.color = "#fff";

  try {
    const response = await fetch("https://phishguard-x-lprx.onrender.com/api/scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    // Delay slightly for animation effect
    setTimeout(() => {
      if (data.prediction === "phishing") {
        resultDiv.innerHTML = "⚠️ Warning: This URL is potentially a phishing site!";
        resultDiv.style.color = "red";
      } else {
        resultDiv.innerHTML = "✅ This URL appears to be safe.";
        resultDiv.style.color = "green";
      }
    }, 1500);
  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = "Error checking the URL.";
    resultDiv.style.color = "orange";
  }
}
