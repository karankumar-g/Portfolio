import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  Copy, 
  Github, 
  Linkedin, 
  BookOpen, 
  Sparkles, 
  MessageSquare,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (field: string, text: string) => {
    soundManager.playPop();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getMailtoLink = () => {
    const subject = formData.subject.trim() || `Portfolio Message from ${formData.name}`;
    const body = `Hi Karankumar,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nBest regards,\n${formData.name}`;
    return `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    soundManager.playSuccess();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#60A5FA']
    });

    const mailtoUrl = getMailtoLink();

    // Trigger user's default email client (Outlook, Apple Mail, Gmail client, etc.)
    window.location.href = mailtoUrl;

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-16">
      {/* Header */}
      <motion.div 
        className="space-y-4 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full apple-glass text-xs font-mono text-accent-sky">
          <Mail className="w-3.5 h-3.5" /> Get in Touch
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Let's Build Something <span className="text-gradient-blue-emerald">Together</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Have an engineering opportunity, AI project, or question? Send a message directly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Info & Quick Cards */}
        <motion.div 
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="apple-glass shimmer-border rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-sky" /> Direct Details
            </h2>

            <div className="space-y-3.5 text-xs font-mono">
              {/* Email */}
              <div className="p-4 rounded-2xl glass-subtle space-y-2 border border-white/5">
                <div className="text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-accent-sky" /> Email
                  </span>
                  <button
                    onClick={() => handleCopy('email', PERSONAL_INFO.email)}
                    className="text-accent-sky hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'email' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => soundManager.playPop()}
                  className="block text-sm text-white font-semibold hover:text-accent-sky transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl glass-subtle space-y-2 border border-white/5">
                <div className="text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-accent-teal" /> Phone
                  </span>
                  <button
                    onClick={() => handleCopy('phone', PERSONAL_INFO.phone)}
                    className="text-accent-sky hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'phone' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  onClick={() => soundManager.playPop()}
                  className="block text-sm text-white font-semibold hover:text-accent-sky transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl glass-subtle space-y-1 border border-white/5">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-amber" /> Location
                </div>
                <div className="text-sm text-white font-semibold">
                  {PERSONAL_INFO.location}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  13.0827° N, 80.2707° E (IST UTC+5:30)
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Social Profiles
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playPop()}
                  className="p-3 rounded-xl glass-subtle hover:bg-white/10 text-center space-y-1 transition-all group card-3d border border-white/5"
                >
                  <Github className="w-4 h-4 mx-auto text-slate-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-slate-400 block truncate">GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playPop()}
                  className="p-3 rounded-xl glass-subtle hover:bg-white/10 text-center space-y-1 transition-all group card-3d border border-white/5"
                >
                  <Linkedin className="w-4 h-4 mx-auto text-accent-sky group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-slate-400 block truncate">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="apple-glass shimmer-border rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent-sky" /> Send a Message
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Opens directly in your email app with all your details pre-filled.
              </p>
            </div>

            {submitted ? (
              <motion.div 
                className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <Check className="w-6 h-6" />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white font-display">
                    Email Draft Ready! 🚀
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your email app has been opened with your pre-filled message addressed to <strong className="text-white">{PERSONAL_INFO.email}</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={getMailtoLink()}
                    onClick={() => soundManager.playPop()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-medium text-xs font-mono flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Re-open Email App</span>
                  </a>

                  <button
                    onClick={() => {
                      soundManager.playPop();
                      navigator.clipboard.writeText(
                        `To: ${PERSONAL_INFO.email}\nSubject: ${formData.subject || `Message from ${formData.name}`}\n\n${formData.message}`
                      );
                      setCopiedField('draft');
                      setTimeout(() => setCopiedField(null), 2000);
                    }}
                    className="px-4 py-2.5 rounded-xl glass-subtle hover:bg-white/10 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
                  >
                    {copiedField === 'draft' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-accent-sky" />}
                    <span>{copiedField === 'draft' ? 'Draft Copied!' : 'Copy Draft Text'}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundManager.playPop();
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2.5 rounded-xl glass-subtle hover:bg-white/10 text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Send Another</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3 rounded-xl glass-subtle border border-white/10 text-slate-100 placeholder:text-slate-500 outline-none focus:border-accent-sky/50 transition-all font-sans text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl glass-subtle border border-white/10 text-slate-100 placeholder:text-slate-500 outline-none focus:border-accent-sky/50 transition-all font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project inquiry / discussion topic"
                    className="w-full px-4 py-3 rounded-xl glass-subtle border border-white/10 text-slate-100 placeholder:text-slate-500 outline-none focus:border-accent-sky/50 transition-all font-sans text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or questions..."
                    className="w-full px-4 py-3 rounded-xl glass-subtle border border-white/10 text-slate-100 placeholder:text-slate-500 outline-none focus:border-accent-sky/50 transition-all font-sans text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-medium text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Email App</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
