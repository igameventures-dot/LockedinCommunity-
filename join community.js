const applicationForm = document.getElementById("applicationForm");

// Get existing applications from localStorage
let applications = JSON.parse(localStorage.getItem("lockInApplications")) || [];

applicationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(applicationForm);

    const application = {
        id: Date.now(),
        fullname: formData.get("fullname"),
        whatsapp: formData.get("whatsapp"),
        email: formData.get("email"),
        occupation: formData.get("occupation"),
        age_range: formData.get("age_range"),
        country: formData.get("country"),
        why_join: formData.get("why_join"),
        challenge: formData.get("challenge"),
        goal_12months: formData.get("goal_12months"),
        referral: formData.get("referral"),
        status: "Pending", // <--- This is what you'll change to Approved later
        submittedAt: new Date().toLocaleString()
    };

    applications.push(application);
    localStorage.setItem("lockInApplications", JSON.stringify(applications));

    // Save just this applicant so waiting page can show their info
    localStorage.setItem("currentApplicant", JSON.stringify(application));

    applicationForm.reset();

    // SEND THEM TO WAITING PAGE
    window.location.href = "waiting.html"; 
});