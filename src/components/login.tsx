import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoError, setLogoError] = useState(false);
  const [boaLogoError, setBoaLogoError] = useState(false);
  const [trumpLogoError, setTrumpLogoError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!email || !password) {
        setError("Please enter email and password");
        return;
      }

      console.log("Attempting login with:", email);

      // First try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // If sign in fails, check if it's an invalid credentials error
      if (signInError) {
        console.log("Sign in failed:", signInError.message);
        
        // Check if user exists by attempting to sign up
        if (signInError.message.includes("Invalid login credentials")) {
          // Try to sign up to see if user already exists
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          });

          // If signup fails with "User already registered", it means wrong password
          if (signUpError && signUpError.message.includes("User already registered")) {
            setError("Wrong password. Please try again.");
            return;
          }

          // If signup succeeds, user was created and logged in
          if (!signUpError) {
            console.log("Auto sign-up successful, navigating to dashboard");
            navigate("/dashboard");
            return;
          }

          // Other signup errors
          setError(signUpError?.message || "An error occurred. Please try again.");
          return;
        }

        // Other sign in errors
        setError(signInError.message);
        return;
      }

      if (signInData.user) {
        console.log("Login successful, navigating to dashboard");
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-700 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image on Right */}
      <div 
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 bg-contain bg-right bg-no-repeat opacity-70"
        style={{ backgroundImage: 'url(https://gettrumpmemes.com/images/T-Fight-Figure-3_1T-Fight-Figure-3.webp)' }}
      ></div>

      {/* Center - Login Form */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 sm:p-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          {/* Logo */}
          {!logoError ? (
            <img 
              src="https://cust-aff-login.onrender.com/static/images/beloLogo-removebg-preview.png" 
              alt="TrumpFinance Logo"
              className="h-10 sm:h-12 w-auto mx-auto mb-3 sm:mb-4"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="h-10 sm:h-12 w-10 sm:w-12 mx-auto mb-3 sm:mb-4 bg-red-600 rounded flex items-center justify-center text-white font-bold text-sm sm:text-base">TF</div>
          )}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">TrumpFinance</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Member Login</p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <a 
              href="https://www.bankofamerica.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              {!boaLogoError ? (
                <img 
                  src="https://cust-aff-login.onrender.com/static/images/soPozadinaBankOfAmerica-removebg-preview.png" 
                  alt="Bank of America"
                  className="h-10 sm:h-12 w-auto"
                  onError={() => setBoaLogoError(true)}
                />
              ) : (
                <span className="text-gray-600 text-xs sm:text-sm font-semibold">Bank of America</span>
              )}
            </a>
            <a 
              href="https://gettrumpmemes.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              {!trumpLogoError ? (
                <img 
                  src="https://i.imgur.com/AOVLAFU.png" 
                  alt="$TRUMP Token"
                  className="h-8 sm:h-10 w-auto"
                  onError={() => setTrumpLogoError(true)}
                />
              ) : (
                <span className="text-gray-600 text-xs sm:text-sm font-semibold">$TRUMP</span>
              )}
            </a>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
              className="text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={loading}
              className="text-sm sm:text-base"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}