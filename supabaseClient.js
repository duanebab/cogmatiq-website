// supabaseClient.js

// --- 1. DEFINE API & SUPABASE CREDENTIALS ---
const apiBaseUrlProd = 'https://cogmatiq-api-849853960395.us-central1.run.app';
const supabaseUrlProd = 'https://wzekdxvvynpvisbvkiqg.supabase.co';
const supabaseAnonKeyProd = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6ZWtkeHZ2eW5wdmlzYnZraXFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NzA5NzAsImV4cCI6MjA3NjA0Njk3MH0.CGXF6Txv-OATQdaus08GohMHRyytye59hqaD0Q4BOSU'; // *** REPLACE THIS! ***

const apiBaseUrlStaging = 'https://cogmatiq-api-staging-xdw7ikkfbq-uc.a.run.app';
const supabaseUrlStaging = 'https://qcsjjhmbjajgidhqpgdj.supabase.co';
const supabaseAnonKeyStaging = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjc2pqaG1iamFqZ2lkaHFwZ2RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MTI3NzYsImV4cCI6MjA3NjM4ODc3Nn0.QI4JyOoRc-FBxrZXZHo3EpS7okrXRssuCAW_ZzYjMuA';

// --- 2. DETECT ENVIRONMENT ---
const useStaging = window.location.hostname === 'staging.cogmatiq.com' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const apiBaseUrl = useStaging ? apiBaseUrlStaging : apiBaseUrlProd;
const finalSupabaseUrl = useStaging ? supabaseUrlStaging : supabaseUrlProd;
const finalSupabaseAnonKey = useStaging ? supabaseAnonKeyStaging : supabaseAnonKeyProd;

console.log(`Environment: ${useStaging ? 'Staging' : 'Production'}`);
console.log(`API URL: ${apiBaseUrl}`);
console.log(`Supabase URL: ${finalSupabaseUrl}`);

// --- 3. INITIALIZE AND EXPORT CLIENT ---
const { createClient } = supabase;
const supabaseClient = createClient(finalSupabaseUrl, finalSupabaseAnonKey);

// --- 4. AUTH HELPER (Redirects if not logged in) ---
async function getSessionOrRedirect() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) {
        console.error("Error getting session:", error);
        window.location.href = '/login.html';
        return null;
    }
    if (!session) {
        console.log("No active session found, redirecting to login.");
        window.location.href = '/login.html';
        return null;
    }
    console.log("Session verified.");
    return session;
}
