import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MapPin, Phone, Mail, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function AdmissionsFunnel() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    toast.success("Thank you! Your message has been sent successfully.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section className="relative py-24 bg-transparent overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-purple-100/30 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[30%] left-[-10%] w-[350px] h-[350px] bg-pink-100/20 rounded-full blur-[110px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-slate-900 font-extrabold tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15 }}>
            Get In Touch With Us Today
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-base">
            Reach out to our experts to schedule a discussion and kickstart your project.
          </p>
        </motion.div>

        {/* Contact Info & Form Row */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-24">
          
          {/* Left Column: Indigo Contact details card */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-primary p-8 md:p-10 rounded-3xl text-white shadow-xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Ambient curves inside indigo card */}
            <div className="absolute top-[-30%] right-[-30%] w-60 h-60 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 rounded-full bg-pink-500/10 blur-xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-widest uppercase mb-6">
                CONTACT INFO
              </span>
              
              <h3 className="font-extrabold text-2xl md:text-3xl mb-4 leading-tight">
                Let's discuss how we can scale your brand
              </h3>
              
              <p className="text-white/80 text-sm leading-relaxed mb-8">
                Fill out the form to request a performance marketing analysis or custom application plan.
              </p>
            </div>

            {/* List details */}
            <div className="space-y-6 relative z-10">
              
              {/* Item 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white/90">Our Location</h4>
                  <p className="text-white/75 text-sm mt-1 leading-snug">Delhi NCR, India</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white/90">Phone Number</h4>
                  <p className="text-white/75 text-sm mt-1 leading-snug">+91 99915 40996</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white/90">Email Address</h4>
                  <p className="text-white/75 text-sm mt-1 leading-snug">webuildreach@gmail.com</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Clean White Form card */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white p-8 md:p-10 border border-slate-100 rounded-3xl shadow-xl flex flex-col justify-center"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* First Name & Last Name Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-800 focus:border-primary focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-800 focus:border-primary focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-800 focus:border-primary focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-800 focus:border-primary focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Service Type Select */}
              <div>
                <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                  Service Type
                </label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-800 focus:border-primary">
                    <SelectValue placeholder="Select interest" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-slate-200 text-slate-800">
                    <SelectItem value="seo">SEO & Marketing</SelectItem>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="crm">Custom CRM Solution</SelectItem>
                    <SelectItem value="erp">School ERP Software</SelectItem>
                    <SelectItem value="app">Mobile App Development</SelectItem>
                    <SelectItem value="ecom">E-commerce Solution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help you succeed?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-primary focus:bg-white text-sm"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="bg-primary hover:bg-primary/95 text-white rounded-full px-8 py-6 font-bold shadow-[0_4px_14px_rgba(90,69,253,0.3)] transition-all duration-300 flex items-center gap-2 group hover:scale-[1.02]"
              >
                Send Message
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-primary transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Button>

            </form>
          </motion.div>
        </div>

        {/* Full Width Violet Call-To-Action Banner at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary to-indigo-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Inner ambient light circles */}
          <div className="absolute top-[-50%] left-[-20%] w-[350px] h-[350px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[350px] h-[350px] bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-widest uppercase mb-4">
              READY TO SCALE?
            </span>
            <h3 className="font-extrabold mb-4 tracking-tight leading-none" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)' }}>
              Ready to Take Your SEO <br className="hidden sm:inline" /> to The Next Level?
            </h3>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
              Let's analyze your search traffic and Meta Ads campaigns. Schedule a strategy review session with our directors.
            </p>

            <Button
              onClick={() => {
                const form = document.querySelector("form");
                if (form) form.scrollIntoView({ behavior: "smooth" });
              }}
              size="lg"
              className="bg-white hover:bg-slate-50 text-primary hover:text-primary-hover rounded-full px-8 py-6 font-bold shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-[1.02]"
            >
              Free Consultation
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
