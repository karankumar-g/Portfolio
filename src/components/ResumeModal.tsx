import React, { useState } from 'react';
import { X, Printer, Copy, Check, Sparkles, MapPin, Mail, Phone, Globe } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, PROJECTS, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const textResume = `
KARANKUMAR G
Full Stack & AI Engineer
Location: ${PERSONAL_INFO.location} | Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.bio}

EXPERIENCE
Software Engineer — Data Aces (${EXPERIENCES[0].period}) | Chennai
${EXPERIENCES[0].responsibilities.map(r => `• ${r.point}`).join('\n')}

EDUCATION
• Master of Computer Applications (MCA) - DG Vaishnav College, Chennai (Distinction)
• Bachelor of Science - Computer Science - Thiruthangal Nadar College, Chennai (First Class with Distinction)

KEY PROJECTS
• AceAI: Enterprise RAG platform, LangGraph agent workflows, and Weaviate hybrid semantic search.
• ACE-ETL: Cloud SDK data pipelines (AWS/Azure) and automated DBT SQL transformations scheduled with Prefect.
• Salesforce & WhatsApp CRM: Automated sales workflows with WhatsApp Cloud API and Salesforce CRM.
• Pharma Data Prep & Analytics: Healthcare data preparation and custom dashboards for HCP and patient journeys.
• Proctor Point: AI proctoring platform with YOLOv8 object detection and facial verification.

CERTIFICATIONS
${CERTIFICATIONS.map(c => `• ${c.title} (${c.issuer})`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-bg-card rounded-2xl border border-white/15 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-bg-darker/90">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-cyan" />
            <span className="font-display font-semibold text-sm">Karankumar G — Resume</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-xs font-medium transition-colors cursor-pointer"
              title="Copy as plain text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-violet hover:bg-accent-violet/90 text-white text-xs font-medium transition-colors shadow-sm cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-300 font-sans text-xs sm:text-sm print:bg-white print:text-black print:p-0">
          {/* Header */}
          <div className="border-b border-white/10 pb-5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight font-display">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-accent-teal font-mono text-xs">
                  {PERSONAL_INFO.roleTitle}
                </p>
              </div>
              <div className="text-left sm:text-right space-y-0.5 text-slate-400 font-mono text-xs">
                <span className="flex items-center sm:justify-end gap-1">
                  <MapPin className="w-3 h-3 text-accent-amber" /> {PERSONAL_INFO.location}
                </span>
                <span className="flex items-center sm:justify-end gap-1">
                  <Mail className="w-3 h-3 text-accent-cyan" /> {PERSONAL_INFO.email}
                </span>
                <span className="flex items-center sm:justify-end gap-1">
                  <Phone className="w-3 h-3 text-accent-violet" /> {PERSONAL_INFO.phone}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-mono pt-2 text-slate-400">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-accent-teal hover:underline flex items-center gap-1">
                <Globe className="w-3 h-3" /> github.com/{PERSONAL_INFO.githubHandle}
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-accent-teal hover:underline flex items-center gap-1">
                <Globe className="w-3 h-3" /> linkedin.com/{PERSONAL_INFO.linkedinHandle}
              </a>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold">
              Summary
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold">
              Experience
            </h2>
            {EXPERIENCES.map(exp => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="font-semibold text-white">
                    {exp.role} — <span className="text-accent-teal">{exp.company}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {exp.period} | {exp.location}
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {resp.point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold">
              Featured Projects
            </h2>
            <div className="space-y-3">
              {PROJECTS.map(proj => (
                <div key={proj.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="font-semibold text-white">
                    {proj.title} <span className="text-slate-400 text-xs font-normal">({proj.stack.slice(0, 4).join(', ')})</span>
                  </span>
                  <ul className="list-disc list-inside text-slate-300 space-y-0.5 pt-1">
                    {proj.bullets.map((b, idx) => (
                      <li key={idx} className="leading-relaxed">{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold">
              Education
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EDUCATION.map(edu => (
                <div key={edu.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="font-semibold text-white text-xs sm:text-sm">{edu.degree}</div>
                  <div className="text-slate-400 text-xs">{edu.institution}</div>
                  <div className="flex items-center justify-between pt-0.5 font-mono text-xs text-accent-teal">
                    <span>{edu.scoreLabel}</span>
                    <span className="text-slate-500">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-bold">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2">
              {CERTIFICATIONS.map(cert => (
                <span key={cert.id} className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
                  {cert.title} ({cert.issuer})
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
