import * as React from "react";
import { 
  Car, ShieldCheck, Clock, Calendar, CheckCircle2, 
  Sparkles, ShieldAlert, ChevronRight, User, Phone, 
  MapPin, HelpCircle, FileText, ArrowRight, ClipboardCheck 
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { supabase } from "@/src/lib/supabaseClient";
import { notificationService } from "@/src/lib/notifications";

interface SellCarViewProps {
  onNavigateToDashboard: () => void;
  onBackToHome: () => void;
}

export function SellCarView({ onNavigateToDashboard, onBackToHome }: SellCarViewProps) {
  // Form State
  const [formData, setFormData] = React.useState({
    name: "",
    mobile: "",
    regNumber: "",
    brand: "",
    model: "",
    variant: "",
    fuel: "Petrol",
    transmission: "Automatic",
    year: new Date().getFullYear() - 3,
    kmDriven: "",
    city: "Mumbai",
    address: "",
    preferredDate: "",
    preferredTime: "10:00 AM - 12:00 PM"
  });

  const [formStep, setFormStep] = React.useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [createdRequest, setCreatedRequest] = React.useState<any>(null);

  // Autofill if logged in
  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFormData(prev => ({
          ...prev,
          name: user.user_metadata?.name || user.email?.split("@")[0] || "",
          mobile: user.user_metadata?.mobile || "",
          city: user.user_metadata?.city || "Mumbai"
        }));
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.regNumber || !formData.brand || !formData.model || !formData.kmDriven || !formData.address || !formData.preferredDate) {
      alert("Please fill out all required fields to schedule your inspection.");
      return;
    }

    setIsSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();
    const inspectionRecord = {
      seller_id: user ? user.id : "u-seller",
      seller_name: formData.name,
      seller_mobile: formData.mobile,
      reg_number: formData.regNumber.toUpperCase(),
      brand: formData.brand,
      model: formData.model,
      variant: formData.variant || "Standard",
      fuel: formData.fuel,
      transmission: formData.transmission,
      year: Number(formData.year),
      km_driven: Number(formData.kmDriven),
      city: formData.city,
      address: formData.address,
      preferred_date: formData.preferredDate,
      preferred_time: formData.preferredTime,
      status: "pending" as const,
      notes: "Newly requested inspection from Spinny sell car flow."
    };

    try {
      // Create inspection request in Supabase
      const { data, error } = await supabase.from("inspections").insert([inspectionRecord]);
      const inserted = data && Array.isArray(data) ? data[0] : (data || inspectionRecord);
      setCreatedRequest(inserted);

      // Trigger Notification Rule 1: Seller submits inspection → Notify Inspector.
      await notificationService.triggerInspectionSubmitted({
        id: inserted.id || "insp-temp-id",
        sellerName: formData.name,
        brand: formData.brand,
        model: formData.model,
        city: formData.city,
        preferred_date: formData.preferredDate
      });

      setFormStep("success");
    } catch (error) {
      console.error("Error creating inspection request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { title: "1. Details & Booking", desc: "Share details & select appointment date" },
    { title: "2. Free Inspection", desc: "Expert inspection at your doorstep" },
    { title: "3. Dealer Auction Bidding", desc: "We host competitive live dealer auctions" },
    { title: "4. Best Price & Payment", desc: "Approve premium offer & get instant payment" }
  ];

  const popularBrands = ["Maruti Suzuki", "Hyundai", "Honda", "Toyota", "Tata", "Mahindra", "BMW", "Audi", "Mercedes-Benz"];
  const popularCities = ["Mumbai", "Delhi NCR", "Bangalore", "Pune", "Hyderabad", "Chennai", "Kolkata"];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-28 pb-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-br from-[#1C3E24] to-[#2E7D32] text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden mb-12">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#ffffff10] via-transparent to-transparent pointer-events-none hidden md:block" />
          
          <div className="max-w-2xl space-y-4">
            <span className="bg-white/10 text-emerald-300 font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full inline-block">
              ⚡ Spinny-Inspired Premium Experience
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
              Sell Your Car Instantly From <span className="text-emerald-300">Home</span>
            </h1>
            <p className="text-sm md:text-base text-emerald-100 max-w-xl font-medium leading-relaxed">
              Book a 100% free home inspection, receive live bids from our verified dealer network, and complete the sale in 24 hours with free RC transfer.
            </p>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form & Flow */}
          <div className="lg:col-span-8">
            
            {formStep === "form" ? (
              <div className="bg-white border border-[#2E7D32]/10 rounded-3xl p-6 md:p-8 shadow-sm">
                
                <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-5">
                  <div className="h-10 w-10 bg-[#2E7D32]/10 rounded-xl flex items-center justify-center text-[#2E7D32]">
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-black text-xl text-slate-900 tracking-tight">Schedule Your Free Doorstep Inspection</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Please share accurate details. We do not provide public estimates to secure the highest custom bidding prices from premium dealers.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Section 1: Customer Info */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#2E7D32] flex items-center gap-2">
                      <User className="h-4 w-4" /> 1. Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                        <Input
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="h-11 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mobile Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                          <Input
                            placeholder="Enter 10-digit mobile number"
                            type="tel"
                            value={formData.mobile}
                            onChange={(e) => handleInputChange("mobile", e.target.value)}
                            required
                            className="h-11 rounded-xl pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 my-6" />

                  {/* Section 2: Vehicle Specs */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#2E7D32] flex items-center gap-2">
                      <Car className="h-4 w-4" /> 2. Vehicle Details
                    </h3>

                    {/* Quick Brand Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Brand *</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {popularBrands.map(b => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => handleInputChange("brand", b)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              formData.brand === b 
                                ? "bg-[#2E7D32] border-[#2E7D32] text-white" 
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Car Model *</label>
                        <Input
                          placeholder="e.g. Swift, Creta, City"
                          value={formData.model}
                          onChange={(e) => handleInputChange("model", e.target.value)}
                          required
                          className="h-11 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Variant / Edition</label>
                        <Input
                          placeholder="e.g. VXI, SX, Premium"
                          value={formData.variant}
                          onChange={(e) => handleInputChange("variant", e.target.value)}
                          className="h-11 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Registration Number *</label>
                        <Input
                          placeholder="e.g. MH12-AB-1234"
                          value={formData.regNumber}
                          onChange={(e) => handleInputChange("regNumber", e.target.value)}
                          required
                          className="h-11 rounded-xl uppercase font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fuel Type *</label>
                        <select
                          value={formData.fuel}
                          onChange={(e) => handleInputChange("fuel", e.target.value)}
                          className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white text-sm font-semibold focus:ring-2 focus:ring-[#2E7D32] outline-none"
                        >
                          <option>Petrol</option>
                          <option>Diesel</option>
                          <option>Electric</option>
                          <option>Hybrid</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Transmission *</label>
                        <select
                          value={formData.transmission}
                          onChange={(e) => handleInputChange("transmission", e.target.value)}
                          className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white text-sm font-semibold focus:ring-2 focus:ring-[#2E7D32] outline-none"
                        >
                          <option>Manual</option>
                          <option>Automatic</option>
                          <option>AWD</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Year of Manufacture *</label>
                        <input
                          type="number"
                          min="1995"
                          max={new Date().getFullYear() + 1}
                          value={formData.year}
                          onChange={(e) => handleInputChange("year", e.target.value)}
                          required
                          className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white text-sm font-semibold focus:ring-2 focus:ring-[#2E7D32] outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">KM Driven *</label>
                        <Input
                          type="number"
                          placeholder="e.g. 45000"
                          value={formData.kmDriven}
                          onChange={(e) => handleInputChange("kmDriven", e.target.value)}
                          required
                          className="h-11 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 my-6" />

                  {/* Section 3: Appointment Location & Inspection Booking */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#2E7D32] flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> 3. Appointment Slot & Address
                    </h3>

                    {/* Quick City Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Inspection City *</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {popularCities.map(c => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => handleInputChange("city", c)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                              formData.city === c 
                                ? "bg-[#2E7D32] border-[#2E7D32] text-white" 
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Doorstep Address for Inspection *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Enter complete house no, building, street, and landmark details"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          required
                          className="h-11 rounded-xl pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Preferred Inspection Date *</label>
                        <input
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.preferredDate}
                          onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                          required
                          className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white text-sm font-semibold focus:ring-2 focus:ring-[#2E7D32] outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Preferred Time Slot *</label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                          className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white text-sm font-semibold focus:ring-2 focus:ring-[#2E7D32] outline-none"
                        >
                          <option>09:00 AM - 11:00 AM</option>
                          <option>11:00 AM - 01:00 PM</option>
                          <option>01:00 PM - 03:00 PM</option>
                          <option>03:00 PM - 05:00 PM</option>
                          <option>05:00 PM - 07:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#2E7D32] hover:bg-[#25632a] text-white py-4 text-sm font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-[#2E7D32]/20 h-13"
                    >
                      {isSubmitting ? "Generating Inspection Lead..." : "Book Doorstep Inspection"}
                    </Button>
                    <p className="text-[10px] text-slate-400 text-center mt-3 font-semibold">
                      By clicking above, you agree to receive verification calls. A dedicated 1stCars representative will verify details before inspector dispatch.
                    </p>
                  </div>

                </form>
              </div>
            ) : (
              <div className="bg-white border border-[#2E7D32]/10 rounded-3xl p-8 md:p-12 text-center shadow-md space-y-6">
                <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                
                <div className="space-y-2">
                  <span className="text-[#2E7D32] font-black text-xs uppercase tracking-widest">Appointment Confirmed</span>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Your Inspection Request has been created!</h2>
                  <p className="text-xs text-slate-500 max-w-lg mx-auto">
                    We have successfully registered your vehicle <strong>{createdRequest?.reg_number}</strong> ({createdRequest?.brand} {createdRequest?.model}) in the database.
                  </p>
                </div>

                <div className="max-w-md mx-auto bg-[#FAF9F6] border border-slate-100 rounded-2xl p-6 text-left space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-200/50 pb-2 text-xs font-black text-slate-900 uppercase tracking-wider">
                    <ClipboardCheck className="h-4.5 w-4.5 text-[#2E7D32]" /> Lead Confirmation Details
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-bold text-slate-600">
                    <div>Seller Name:</div>
                    <div className="text-slate-800 text-right">{createdRequest?.seller_name}</div>
                    
                    <div>Mobile:</div>
                    <div className="text-slate-800 text-right">{createdRequest?.seller_mobile}</div>

                    <div>Inspection Slot:</div>
                    <div className="text-[#2E7D32] text-right">{createdRequest?.preferred_date} ({createdRequest?.preferred_time})</div>

                    <div>Address:</div>
                    <div className="text-slate-800 text-right line-clamp-1">{createdRequest?.address}</div>

                    <div>Status:</div>
                    <div className="text-right">
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-black">
                        Pending Inspector Assign
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-2xl max-w-md mx-auto space-y-2">
                  <p className="text-[10px] font-black text-[#2E7D32] uppercase tracking-widest flex items-center justify-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Next Steps & Timeline
                  </p>
                  <ul className="text-xs text-slate-600 space-y-2 font-medium">
                    <li className="flex gap-2 text-left">
                      <span className="text-[#2E7D32] font-bold">1.</span>
                      <span>An Inspector has been automatically notified in the region of {createdRequest?.city}.</span>
                    </li>
                    <li className="flex gap-2 text-left">
                      <span className="text-[#2E7D32] font-bold">2.</span>
                      <span>The inspector will call you to confirm your exact doorstep coordinates.</span>
                    </li>
                    <li className="flex gap-2 text-left">
                      <span className="text-[#2E7D32] font-bold">3.</span>
                      <span>Post-inspection, verified elite dealers will compete in live bidding auctions.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button
                    onClick={onNavigateToDashboard}
                    className="bg-[#2E7D32] hover:bg-[#25632a] text-white text-xs font-bold uppercase tracking-wider px-6 rounded-xl h-11"
                  >
                    Go to Seller Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onBackToHome}
                    className="border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider px-6 rounded-xl h-11 bg-white"
                  >
                    Back to Browse Cars
                  </Button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Spinny Trust Badges & FAQ */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Trust Badges */}
            <div className="bg-white border border-[#2E7D32]/10 rounded-3xl p-6 shadow-sm space-y-5">
              <h3 className="font-black text-slate-900 text-base tracking-tight border-b border-slate-100 pb-3 uppercase text-[11px] tracking-widest text-[#2E7D32]">
                Why Sell with 1stCars?
              </h3>

              <div className="space-y-4">
                {[
                  { 
                    icon: ShieldCheck, 
                    title: "Free Doorstep Inspection", 
                    desc: "No hidden checklist fees. Completely free scheduling at your convenience." 
                  },
                  { 
                    icon: Clock, 
                    title: "Offers in 2 Hours", 
                    desc: "Once inspected, your vehicle goes into live custom bidding with 1000+ certified dealers." 
                  },
                  { 
                    icon: Sparkles, 
                    title: "Instant Secure Payment", 
                    desc: "No payment delay. Funds transferred directly to your bank account before handover." 
                  },
                  { 
                    icon: FileText, 
                    title: "Free RC Transfer & Paperwork", 
                    desc: "100% legal coverage. All paperwork, registration transfers, and liabilities handled by us." 
                  }
                ].map((badge, idx) => (
                  <div key={idx} className="flex gap-3 text-left">
                    <div className="h-9 w-9 bg-emerald-50 text-[#2E7D32] rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <badge.icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{badge.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed font-semibold">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Pricing Alert */}
            <div className="bg-amber-50/70 border border-amber-200/50 rounded-2xl p-5 space-y-2 text-left">
              <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-1">
                <ShieldAlert className="h-4 w-4" /> Bypassing Auto-Estimates
              </p>
              <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                Unlike primitive portals, <strong>1stCars does not use algorithmic price estimates</strong>. Auto-estimates often devalue high-spec features. Real market bidding from verified local dealers ensures you secure the actual true valuation of your car!
              </p>
            </div>

            {/* FAQ Box */}
            <div className="bg-white border border-[#2E7D32]/10 rounded-3xl p-6 shadow-sm space-y-4 text-left">
              <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest text-[#2E7D32] flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4" /> Selling FAQs
              </h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800">Q: How long does the sale take?</h4>
                  <p className="text-slate-500 mt-0.5">A: Free doorstep inspection takes 45 minutes. Live bidding auctions happen within 2 hours, and payment is instantaneous.</p>
                </div>
                <div className="h-px bg-slate-50" />
                <div>
                  <h4 className="font-bold text-slate-800">Q: Do I need to clean the car?</h4>
                  <p className="text-slate-500 mt-0.5">A: A clean exterior helps inspectors log body health easily, which drives higher bids during competitive auctions.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
