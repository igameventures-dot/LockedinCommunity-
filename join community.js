<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Join Lock In Community</title>
<link rel="stylesheet" href="join community.css">
</head>
<body>

  <div class="signup-box">
    <h1>LOCKED IN APPLICATION</h1>
    <p>WELCOME TO THE APPLICATION PAGE.</p>

    <form id="applicationForm">
      <div class="form-group">
        <label>1. Full Name</label>
        <input type="text" name="fullname" placeholder="John Doe" required>
      </div>
      <div class="form-group">
        <label>2. WhatsApp Number</label>
        <input type="tel" name="whatsapp" placeholder="+234 801 234 5678" required>
      </div>
      <div class="form-group">
        <label>3. Email [Optional]</label>
        <input type="email" name="email" placeholder="you@email.com">
      </div>
      <div class="form-group">
        <label>4. Occupation</label>
        <input type="text" name="occupation" placeholder="Student, Business Owner, 9-5" required>
      </div>
      <div class="form-group">
        <label>5. Age Range</label>
        <select name="age_range" required>
          <option value="">Select</option>
          <option>18-24</option>
          <option>25-34</option>
          <option>35-44</option>
          <option>45+</option>
        </select>
      </div>
      <div class="form-group">
        <label>6. Country</label>
        <input type="text" name="country" placeholder="Nigeria" required>
      </div>
      <div class="form-group">
        <label>7. Why do you want to join LOCK IN?</label>
        <textarea name="why_join" rows="3" placeholder="Be honest" required></textarea>
      </div>
      <div class="form-group">
        <label>8. What financial challenge are you currently facing?</label>
        <textarea name="challenge" rows="3" placeholder="e.g Debt, No income, No capital" required></textarea>
      </div>
      <div class="form-group">
        <label>9. What do you hope to achieve in the next 12 months?</label>
        <textarea name="goal_12months" rows="3" placeholder="Be specific" required></textarea>
      </div>
      <div class="form-group">
        <label>10. How did you hear about the community?</label>
        <select name="referral" required>
          <option value="">Select</option>
          <option>Instagram</option>
          <option>Facebook</option>
          <option>TikTok</option>
          <option>Friend / Referral</option>
          <option>Other</option>
        </select>
      </div>
      <div class="form-group checkbox">
        <input type="checkbox" name="agree" required>
        <label>I agree to show up, be accountable, and lock in daily.</label>
      </div>
      <button type="submit" class="join-btn">Submit Application</button>
    </form>
  </div>

<script type="module">
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://mllgwshzpvjqexorhoir.supabase.co'
const SUPABASE_KEY = 'sb_publishable_BaZT-LtVLabRUDfX0tRtvg_cVQR20wW'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const applicationForm = document.getElementById("applicationForm");
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

    // 1. Save to localStorage
    applications.push(application);
    localStorage.setItem("lockInApplications", JSON.stringify(applications));
    localStorage.setItem("currentApplicant", JSON.stringify(application));

    // 2. Save to Supabase
    const { error } = await supabase.from('contacts').insert([{
        name: application.fullname,
        whatsapp_number: application.whatsapp,
        email: application.email,
        occupation: application.occupation,
        country: application.country,
        age: application.age_range
    }]);

    if (error) {
        alert('Saved locally but Supabase error: ' + error.message + ' - Check if age column is TEXT and RLS policy is set');
        console.error(error);
        return;
    }

    applicationForm.reset();
    window.location.href = "waiting.html";
});
</script>
</body>
</html>
