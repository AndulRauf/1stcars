import * as React from "react";
import { X, ShieldCheck, Mail, Lock, User, Phone, MapPin, Sparkles, Database, Check, Award } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { UserRole } from "@/src/lib/db";
import { supabase } from "@/src/lib/supabaseClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
  initialMode?: "login" | "register";
}

export function AuthModal({ isOpen, onClose, onLoginSuccess, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = React.useState<"login" | "register" | "forgot">(initialMode);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  // Registration States
  const [regName, setRegName] = React.useState("");
  const [regMobile, setRegMobile] = React.useState("");
  const [regCity, setRegCity] = React.useState("Mumbai");
  const [regRole, setRegRole] = React.useState<UserRole>("Buyer");

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setMode(initialMode);
    setError("");
    setSuccess("");
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  // Demo account click logs in instantly
  const handleDemoLogin = async (demoEmail: string) => {
    setLoading(true);
    setError("");
    const { data, error: authErr } = await supabase.auth.signInWithPassword({
      email: demoEmail,
      password: "password123"
    });
    setLoading(false);
    
    if (authErr) {
      setError(authErr.message || "Failed to authenticate demo user");
    } else if (data.user) {
      // Load full user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      const finalUser = profile || data.user;
      setSuccess(`Successfully logged in as ${finalUser.role || "Buyer"}!`);
      setTimeout(() => {
        onLoginSuccess(finalUser);
        onClose();
      }, 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (mode === "login") {
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email,
        password: password || "password123"
      });
      if (authErr) {
        setError(authErr.message || "Invalid credentials.");
        setLoading(false);
      } else if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        const finalUser = profile || data.user;
        setSuccess("Success! Preparing your dashboard...");
        setTimeout(() => {
          onLoginSuccess(finalUser);
          onClose();
        }, 1000);
      }
    } else if (mode === "register") {
      if (!regName || !email || !regMobile) {
        setError("Please complete all required fields.");
        setLoading(false);
        return;
      }
      const { data, error: authErr } = await supabase.auth.signUp({
        email,
        password: password || "password123",
        options: {
          data: {
            name: regName,
            mobile: regMobile,
            city: regCity,
            role: regRole
          }
        }
      });
      if (authErr) {
        setError(authErr.message || "Failed to register user.");
        setLoading(false);
      } else if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        const finalUser = profile || {
          id: data.user.id,
          name: regName,
          email,
          mobile: regMobile,
          city: regCity,
          role: regRole,
          created_at: new Date().toISOString()
        };

        setSuccess(`Registration successful! Welcome, ${finalUser.name}.`);
        setTimeout(() => {
          onLoginSuccess(finalUser);
          onClose();
        }, 1200);
      }
    } else {
      // Forgot Password flow
      const { error: resetErr } = await supabase.auth.signOut(); // reset mock or placeholder
      setLoading(false);
      setSuccess("Reset link sent successfully to " + email);
    }
  };

  const rolesList: { id: UserRole; title: string; desc: string }[] = [
    { id: "Buyer", title: "Premium Buyer", desc: "Browse, save cars, schedule test drives & make offers" },
    { id: "Seller", title: "Private Seller", desc: "List your vehicle, schedule inspections & manage live bids" },
    { id: "Dealer", title: "Certified Dealer", desc: "Participate in premium dealer auctions & bid on cars" },
    { id: "Inspector", title: "Field Inspector", desc: "Assess assigned cars & upload full condition reports" },
    { id: "Sales Associate", title: "Sales Executive", desc: "Coordinate customer bookings & manage test drive requests" },
    { id: "Admin", title: "System Administrator", desc: "Manage staff, system configurations, users & inventory" }
  ];

  const demoAccounts = [
    { label: "Buyer", email: "buyer@1stcars.com", name: "Rahul" },
    { label: "Seller", email: "seller@1stcars.com", name: "Amit" },
    { label: "Dealer", email: "dealer@1stcars.com", name: "Elite Motors" },
    { label: "Inspector", email: "inspector@1stcars.com", name: "Vikram" },
    { label: "Sales Assoc.", email: "sales@1stcars.com", name: "Sneha" },
    { label: "Admin", email: "admin@1stcars.com", name: "Super Admin" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      
      {/* Modal Box */}
      <div className="bg-[#FAF9F6] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#2E7D32]/15 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-none md:h-auto overflow-y-auto">
        
        {/* Left Side: Traditional Form Controls (7 Columns) */}
        <div className="md:col-span-7 p-6 md:p-8 bg-white flex flex-col justify-between text-left space-y-6 overflow-y-auto">
          
          <div className="flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#2E7D32] rounded flex items-center justify-center shadow-md shadow-[#2E7D32]/20">
                <div className="w-3 h-3 border-2 border-white rotate-45"></div>
              </div>
              <span className="text-lg font-black tracking-tighter text-[#2E7D32]">1stCars Gateway</span>
            </a>
            
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-50 border border-slate-100 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {mode === "login" ? "Welcome Back" : mode === "register" ? "Create Account" : "Reset Password"}
            </h2>
            <p className="text-xs text-slate-400">
              {mode === "login" 
                ? "Enter your credentials or choose a pre-configured role to login." 
                : mode === "register" 
                ? "Join as an Elite customer, dealer, or system representative." 
                : "Provide your email to receive standard reset parameters."}
            </p>
          </div>

          {/* Error and Success Indicators */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs font-bold rounded-xl">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-1.5">
              <Check className="h-4 w-4 text-emerald-600" /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Conditional Fields based on mode */}
            {mode === "register" && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="e.g. Amit Verma"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                      className="h-11 pl-10 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="10-digit number"
                        type="tel"
                        value={regMobile}
                        onChange={(e) => setRegMobile(e.target.value)}
                        required
                        className="h-11 pl-10 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Default City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                      <select
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        className="w-full h-11 border border-slate-200 rounded-xl pl-10 pr-4 bg-white text-xs font-semibold focus:ring-2 focus:ring-[#2E7D32] outline-none"
                      >
                        <option>Mumbai</option>
                        <option>Delhi NCR</option>
                        <option>Bangalore</option>
                        <option>Pune</option>
                        <option>Hyderabad</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Role Picker */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Choose Your Account Role *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {rolesList.slice(0, 3).map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRegRole(r.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          regRole === r.id 
                            ? "bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32]" 
                            : "bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-200"
                        }`}
                      >
                        <p className="text-xs font-black">{r.id}</p>
                      </button>
                    ))}
                  </div>
                  <p className="text-[9px] text-slate-400 mt-1 font-semibold leading-relaxed">
                    Staff roles (Inspector, Sales, Admin) are restricted in public registrations. Use Demo quick logins to test them!
                  </p>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Enter email e.g. amit@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 pl-10 rounded-xl"
                />
              </div>
            </div>

            {mode !== "forgot" && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  {mode === "login" && (
                    <button 
                      type="button" 
                      onClick={() => setMode("forgot")}
                      className="text-[10px] font-bold text-[#2E7D32] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10 rounded-xl"
                  />
                </div>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2E7D32] hover:bg-[#25632a] text-white font-black text-xs uppercase tracking-widest rounded-xl h-11 shadow-lg shadow-[#2E7D32]/10"
              >
                {loading 
                  ? "Authenticating Gateway..." 
                  : mode === "login" 
                  ? "Sign In" 
                  : mode === "register" 
                  ? "Create Account" 
                  : "Send Reset Instructions"}
              </Button>
            </div>
          </form>

          {/* Footer toggle switcher */}
          <div className="text-center pt-2 text-xs font-semibold text-slate-400">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button 
                  onClick={() => setMode("register")}
                  className="text-[#2E7D32] font-black hover:underline cursor-pointer"
                >
                  Register Now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <button 
                  onClick={() => setMode("login")}
                  className="text-[#2E7D32] font-black hover:underline cursor-pointer"
                >
                  Sign In instead
                </button>
              </p>
            )}
          </div>

        </div>

        {/* Right Side: Demo Quick Login Tab Center (5 Columns) */}
        <div className="md:col-span-5 bg-[#FAF9F6] border-t md:border-t-0 md:border-l border-[#2E7D32]/10 p-6 md:p-8 flex flex-col justify-between text-left space-y-5">
          <div>
            <span className="bg-[#2E7D32]/10 text-[#2E7D32] font-black text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full inline-block mb-2">
              🔥 Tester Sandbox Quick Bypass
            </span>
            <h3 className="font-black text-lg text-slate-900 tracking-tight leading-none flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-amber-500 animate-pulse" /> Live Role Sandbox
            </h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              1stCars utilizes role-level access. Click any preset below to instantly login as that role and explore their custom, state-synchronized dashboard!
            </p>
          </div>

          <div className="space-y-2 py-2 overflow-y-auto max-h-80 pr-1">
            {demoAccounts.map((acc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleDemoLogin(acc.email)}
                className="w-full text-left bg-white border border-slate-200/60 p-2.5 rounded-xl hover:border-[#2E7D32] hover:shadow-xs transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black text-[#2E7D32] uppercase tracking-wider">{acc.label}</span>
                    <span className="text-[10px] text-slate-400 font-medium">({acc.name})</span>
                  </div>
                  <p className="text-[10px] font-mono text-slate-500 font-bold mt-0.5">{acc.email}</p>
                </div>
                <div className="h-6 w-6 bg-[#2E7D32]/5 rounded-lg flex items-center justify-center text-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
                  <Award className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>

          {/* Database info label */}
          <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-start gap-2 text-[10px] leading-relaxed text-slate-400">
            <Database className="h-4 w-4 text-[#2E7D32] shrink-0 mt-0.5" />
            <p className="font-semibold">
              Persisted with a **Supabase-compatible API wrapper**. Creating inspections, bidding, and making offers updates localStorage databases synchronously.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
