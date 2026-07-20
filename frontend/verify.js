const verifyForm = document.getElementById("verifyForm");

const email = localStorage.getItem("verificationEmail");

verifyForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const code = document.getElementById("verificationToken").value.trim();
    try {

        const response = await fetch(
            "https://fayfay-movie.onrender.com/api/auth/verify-email",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    verificationToken: code
                })
            }
        );

        const data = await response.json();

        if (data.success) {

            alert("Email verified successfully!");

            localStorage.removeItem("verificationEmail");

            window.location.href = "/index.html";

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Something went wrong.");

    }

});