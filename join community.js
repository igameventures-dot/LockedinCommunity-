import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://mllgwshzpvjqexorhoir.supabase.co'
const SUPABASE_KEY = 'sb_publishable_BaZT-LtVLabRUDfX0tRtvg_cVQR20wW'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const applicationForm = document.getElementById("applicationForm");

// Get existing applications from localStorage
let applications = JSON.parse(localStorage.getItem("lockInApplications")) || [];

applicationForm.addEventListener("submit", async function(event) {
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
        status: "Pending",
        submittedAt: new Date().toLocaleString()
    };

    // 1. Save to localStorage (your original code)
    applications.push(application);
    localStorage.setItem("lockInApplications", JSON.stringify(applications));
    localStorage.setItem("currentApplicant", JSON.stringify(application));

    // 2. Save to Supabase contacts table
    const { error } = await supabase.from('contacts').insert([{
        name: application.fullname,
        whatsapp_number: application.whatsapp,
        email: application.email,
        occupation: application.occupation,
        country: application.country,
        age: application.age_range
    }]);

    if (error) {
        console.error('Supabase error:', error);
        alert('Application saved locally but failed to save to Supabase: ' + error.message);
        return;
    }

    applicationForm.reset();
    // SEND THEM TO WAITING PAGE
    window.location.href = "waiting.html"; 
});
