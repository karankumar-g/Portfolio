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
  MessageSquare 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

const fadeUp = {
  hidden: { opacity: 0, y: 25, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundManager.playSuccess();

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#22D3EE', '#F59E0B', '#10B981']
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 space-y-16">
      {/* Header */}
      <motion.div 
        className="space-y-4 max-w-3xl"
        initial={{ opacity: 0, y: 30, rotateX: 3 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: '1200px' }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-subtle text-xs font-mono text-accent-teal">
          <Mail className="w-3.5 h-3.5" /> Get in Touch
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Let's Build Something <span className="text-gradient-violet-cyan">Together</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
          Whether you want to discuss AI systems, backend development, or explore opportunities — reach out directly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Direct Info & Quick Cards */}
        <motion.div 
          className="lg:col-span-5 space-y-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Contact Direct Box */}
          <div className="glass-card shimmer-border rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-teal" /> Direct Details
            </h2>

            <div className="space-y-4 text-xs font-mono">
              {/* Email */}
              <div className="p-4 rounded-2xl glass-subtle space-y-2">
                <div className="text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-accent-cyan" /> Email
                  </span>
                  <button
                    onClick={() => handleCopy('email', PERSONAL_INFO.email)}
                    className="text-accent-teal hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'email' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  onClick={() => soundManager.playPop()}
                  className="block text-sm text-white font-semibold hover:text-accent-teal transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-2xl glass-subtle space-y-2">
                <div className="text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-accent-violet" /> Phone
                  </span>
                  <button
                    onClick={() => handleCopy('phone', PERSONAL_INFO.phone)}
                    className="text-accent-teal hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedField === 'phone' ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  onClick={() => soundManager.playPop()}
                  className="block text-sm text-white font-semibold hover:text-accent-teal transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl glass-subtle space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent-amber" /> Location
                </div>
                <div className="text-sm text-white font-semibold">
                  {PERSONAL_INFO.location}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {PERSONAL_INFO.coordinates} (IST UTC+5:30)
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Social
              </div>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playPop()}
                  className="p-3 rounded-xl glass-subtle hover:bg-white/10 text-center space-y-1 transition-all group card-3d"
                >
                  <Github className="w-4 h-4 mx-auto text-slate-300 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-slate-400 block truncate">GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playPop()}
                  className="p-3 rounded-xl glass-subtle hover:bg-white/10 text-center space-y-1 transition-all group card-3d"
                >
                  <Linkedin className="w-4 h-4 mx-auto text-accent-cyan group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-slate-400 block truncate">LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.medium}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playPop()}
                  className="p-3 rounded-xl glass-subtle hover:bg-white/10 text-center space-y-1 transition-all group card-3d"
                >
                  <BookOpen className="w-4 h-4 mx-auto text-accent-amber group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-mono text-slate-400 block truncate">Medium</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Contact Form */}
        <motion.div 
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-card shimmer-border rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent-cyan" /> Send a Message
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                I'll get back to you soon
              </p>
            </div>

            {submitted ? (
              <motion.div 
                className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white font-display">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thanks for reaching out, {formData.name}! I'll reply to <span className="text-accent-teal">{formData.email}</span> shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    soundManager.playPop();
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl glass-subtle hover:bg-white/10 text-xs font-mono text-slate-300 transition-colors"
                >
                  Send another message
                </button>
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
                      className="w-full px-4 py-3 rounded-xl glass-subtle border border-white/10 text-slate-100 placeholder:text-slate-600 outline-none focus:border-accent-violet/50 transition-all font-sans text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl glass-subtle border border-white/10 text-slate-100 placeholder:text-slate-600 outline-none focus:border-accent-violet/50 transition-all font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-xl glass-subtle border border-white/10 text-slate-100 placeholder:text-slate-600 outline-none focus:border-accent-violet/50 transition-all font-sans text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold">Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or idea..."
                    className="w-full px-4 py-3 rounded-xl glass-subtle border border-white/10 text-slate-100 placeholder:text-slate-600 outline-none focus:border-accent-violet/50 transition-all font-sans text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-violet to-accent-indigo hover:opacity-95 text-white font-medium text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-accent-violet/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
