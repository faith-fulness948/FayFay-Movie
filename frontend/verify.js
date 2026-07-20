const verifyForm = document.getElementById("verifyForm");

verifyForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const code = document
        .getElementById("verificationToken")
        .value
        .trim();

    console.log("Code from input:", code);

    try {

        const response = await fetch(
            "https://fayfay-movie.onrender.com/api/auth/verify-email",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    code: code
                })
            }
        );

        const data = await response.json();

        console.log("Response:", data);

        if (data.success) {

            alert("Email verified successfully!");

            window.location.href = "/index.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error("Verification error:", error);

    }

});