const resetPasswordForm = document.getElementById("resetPasswordForm");

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

const message = document.getElementById("message");
const resetButton = document.querySelector(".reset-btn");


// GET TOKEN FROM URL

const urlParams = new URLSearchParams(window.location.search);

const token = urlParams.get("token");


// CHECK IF TOKEN EXISTS

if (!token) {
    message.textContent = "Invalid or missing password reset link.";
    message.style.color = "#ff4d4d";

    resetButton.disabled = true;
}


// SHOW / HIDE PASSWORD

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
    }

});


toggleConfirmPassword.addEventListener("click", () => {

    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        toggleConfirmPassword.textContent = "🙈";
    } else {
        confirmPasswordInput.type = "password";
        toggleConfirmPassword.textContent = "👁";
    }

});


// RESET PASSWORD

resetPasswordForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    if (!token) {
        message.textContent = "Invalid or missing password reset link.";
        message.style.color = "#ff4d4d";
        return;
    }


    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();


    // CHECK PASSWORD MATCH

    if (password !== confirmPassword) {

        message.textContent = "Passwords do not match.";
        message.style.color = "#ff4d4d";

        return;
    }


    // BASIC PASSWORD LENGTH CHECK

    if (password.length < 6) {

        message.textContent = "Password must be at least 6 characters.";
        message.style.color = "#ff4d4d";

        return;
    }


    resetButton.disabled = true;
    resetButton.textContent = "Resetting...";


    try {

        const response = await fetch(
            `https://fayfay-movie.onrender.com/api/auth/reset-password/${token}`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    password: password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            message.textContent =
                data.message || "Unable to reset password.";

            message.style.color = "#ff4d4d";

            resetButton.disabled = false;
            resetButton.textContent = "Reset Password";

            return;
        }


        // SUCCESS

        message.textContent =
            "Password reset successfully! Redirecting to login...";

        message.style.color = "#4caf50";


        resetPasswordForm.reset();


        setTimeout(() => {
            window.location.href = "/index.html";
        }, 2000);


    } catch (error) {

        console.error("Reset password error:", error);

        message.textContent =
            "Something went wrong. Please try again.";

        message.style.color = "#ff4d4d";

        resetButton.disabled = false;
        resetButton.textContent = "Reset Password";
    }

});