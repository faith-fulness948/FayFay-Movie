const form = document.getElementById("forgotPasswordForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    message.textContent = "Sending reset link...";

    try {
        const response = await fetch(
            "https://fayfay-movie.onrender.com/api/auth/forgot-password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            message.textContent =
                data.message || "Something went wrong.";

            return;
        }

        message.textContent = data.message;

        form.reset();

    } catch (error) {
        console.error("Forgot password error:", error);

        message.textContent =
            "Something went wrong. Please try again.";
    }
});