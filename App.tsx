
import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  ChevronRight, 
  Code, 
  Cpu, 
  Database, 
  Layout, 
  Download,
  Menu,
  X,
  FileText,
  Star,
  Terminal,
  MessageSquare,
  Send,
  Loader2,
  MapPin,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { 
  PERSONAL_INFO, 
  EXPERIENCES, 
  PROJECTS, 
  SKILL_GROUPS, 
  EDUCATION, 
  REPOS, 
  CERTIFICATIONS 
} from './constants';

// --- AI Chatbot Component ---
const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hi! I'm Vikas's AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        You are a helpful AI assistant representing Vikas, a Software and AI Engineer.
        Background: Final-year CS student at MSIT (CGPA 8.2).
        Experience: Outlier AI (AI Contributor), IBM SkillBuild (Data Analyst), Innovate (SDE Intern).
        Key Projects: EchoClean (AI Toxic Voice Filter), NetGuard (Secure Communication).
        Skills: Java, C++, Python, React, AI/ML, System Design.
        Tone: Professional, intelligent, concise, and helpful.
        Respond in markdown if helpful. Keep answers under 100 words.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Context: ${context}\n\nUser Question: ${userMsg}`,
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to my neural network. Please try again later!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 h-[500px] bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-4 bg-[#00BFFF] text-[#0D1117] flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Cpu size={20} />
              <span className="font-heading font-bold">Vikas AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0D1117]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-[#00BFFF] text-[#0D1117] rounded-tr-none' : 'bg-[#161b22] border border-[#30363d] text-white rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#161b22] border border-[#30363d] p-3 rounded-xl rounded-tl-none flex items-center gap-2">
                  <Loader2 className="animate-spin text-[#00BFFF]" size={16} />
                  <span className="text-xs text-[#8B949E]">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-[#30363d] bg-[#161b22] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about my projects..."
              className="flex-1 bg-[#0D1117] border border-[#30363d] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00BFFF]"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-[#00BFFF] text-[#0D1117] rounded-lg hover:bg-white transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#00BFFF] text-[#0D1117] rounded-full flex items-center justify-center shadow-[0_0_20px_#00BFFF] hover:scale-110 transition-transform duration-300 active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
};

// --- Navbar ---
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[80] transition-all duration-300 ${isScrolled ? 'bg-[#0D1117]/90 backdrop-blur-md border-b border-[#30363d] py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-heading font-bold text-2xl tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#00BFFF] rounded flex items-center justify-center text-[#0D1117] group-hover:rotate-12 transition-transform">V</div>
          <span className="text-white">VIKAS</span>
        </a>

        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-[#8B949E] hover:text-[#00BFFF] transition-colors relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00BFFF] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-[#161b22] border border-[#30363d] rounded-lg text-white hover:border-[#00BFFF] hover:text-[#00BFFF] transition-all">
            <Github size={20} />
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0D1117] border-b border-[#30363d] p-6 space-y-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-xl font-heading font-bold hover:text-[#00BFFF]">{link.name}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- Hero ---
const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: any[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    class Particle {
      x = Math.random() * canvas!.width; y = Math.random() * canvas!.height;
      size = Math.random() * 2 + 1; speedX = Math.random() * 0.5 - 0.25; speedY = Math.random() * 0.5 - 0.25;
      update() { this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > canvas!.width) this.speedX *= -1; if (this.y < 0 || this.y > canvas!.height) this.speedY *= -1; }
      draw() { ctx!.fillStyle = 'rgba(0, 191, 255, 0.15)'; ctx!.beginPath(); ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx!.fill(); }
    }
    const init = () => { particles = Array.from({ length: 100 }, () => new Particle()); };
    const animate = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); };
    window.addEventListener('resize', resize); resize(); init(); animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0D1117]">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 items-center pointer-events-none">
        <div className="w-full aspect-square bg-[#00BFFF]/5 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-full text-sm font-mono text-[#00BFFF] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BFFF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00BFFF]"></span>
            </span>
            Available for Internships 2026 and Full Time Job
          </div>
          
          <h1 className="text-6xl md:text-9xl font-heading font-bold mb-8 leading-[0.9] tracking-tighter">
            I build <span className="text-[#00BFFF]">AI</span> systems.<br />
            <span className="text-white">I am Vikas.</span>
          </h1>

          <div className="h-14 mb-8">
            <p className="text-3xl md:text-4xl font-heading font-medium text-[#8B949E] flex items-center gap-4">
              <Terminal size={32} className="text-[#00BFFF]" />
              <span className="animate-in fade-in slide-in-from-bottom-2 duration-700 key={roleIndex}">
                {PERSONAL_INFO.roles[roleIndex]}
              </span>
            </p>
          </div>

          <p className="text-xl text-[#8B949E] mb-12 leading-relaxed max-w-2xl font-light">
            {PERSONAL_INFO.tagline}
          </p>
          
          <div className="flex flex-wrap gap-5">
            <a href="#projects" className="px-10 py-5 bg-[#00BFFF] text-[#0D1117] font-bold rounded-xl hover:bg-white hover:-translate-y-1 transition-all flex items-center gap-3 shadow-lg shadow-[#00BFFF]/20">
              Explore Projects <ChevronRight size={20} />
            </a>
            <a href="#contact" className="px-10 py-5 bg-transparent border border-[#30363d] text-white font-bold rounded-xl hover:border-[#00BFFF] transition-all">
              Contact Me
            </a>
            <a
  href="https://drive.google.com/file/d/1piRN95BOKcQpOUmkWK71Sh2KHKZbDh7G/view?usp=sharing"

  className="p-5 bg-[#161b22] border border-[#30363d] text-white rounded-xl hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all flex items-center gap-2"
>
  <Download size={20} />
  CV
</a>

          </div>
        </div>
      </div>
    </section>
  );
};

// --- Components ---
const SectionTitle: React.FC<{ title: string; desc?: string }> = ({ title, desc }) => (
  <div className="mb-20">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-1 bg-[#00BFFF]"></div>
      <h2 className="text-sm font-mono text-[#00BFFF] uppercase tracking-[0.3em]">{title}</h2>
    </div>
    <h3 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight max-w-3xl">{desc}</h3>
  </div>
);

const About: React.FC = () => (
  <section id="about" className="py-32 bg-[#0D1117] border-y border-[#30363d]/50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-7">
          <SectionTitle title="The Architect" desc="Bridging Software Maturity and AI Innovation." />
          <div className="space-y-8 text-xl text-[#8B949E] leading-relaxed font-light">
            <p>
              Currently pursuing Computer Science at MSIT, I focus on building <span className="text-white font-medium">high-impact, scalable software</span>. My technical journey is driven by a curiosity for how data and algorithms can solve real-world problems.
            </p>
            <p>
              From internship at IBM SkillBuild to AI contributions at Outlier AI, I've honed a skill set that combines deep analytical thinking with clean, efficient code. I specialize in <span className="text-white font-medium">Java, Python, and modern AI/ML frameworks</span>.
            </p>
            <div className="flex flex-wrap gap-12 pt-10">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-heading font-bold text-white">8.2</div>
                <div className="text-sm uppercase tracking-widest text-[#8B949E]">CGPA<br/>Score</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-heading font-bold text-white">3+</div>
                <div className="text-sm uppercase tracking-widest text-[#8B949E]">Industry<br/>Internships</div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#00BFFF] to-[#0D1117] opacity-20 blur-2xl group-hover:opacity-30 transition-all"></div>
            <div className="relative bg-[#161b22] border border-[#30363d] p-10 rounded-3xl">
              <h4 className="text-2xl font-heading font-bold text-white mb-8 flex items-center gap-3">
                <GraduationCap className="text-[#00BFFF]" /> Education Roadmap
              </h4>
              <div className="space-y-10 border-l-2 border-[#30363d] pl-8">
                <div className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 bg-[#00BFFF] rounded-full border-4 border-[#0D1117] shadow-[0_0_10px_#00BFFF]"></div>
                  <h5 className="text-lg font-bold text-white mb-1">{EDUCATION.institution}</h5>
                  <p className="text-[#00BFFF] mb-3 text-sm">{EDUCATION.degree}</p>
                  <p className="text-sm text-[#8B949E] mb-6 flex items-center gap-2">
                    <MapPin size={14} /> {EDUCATION.location} | {EDUCATION.duration}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {EDUCATION.coursework.slice(0, 4).map(c => (
                      <span key={c} className="px-3 py-1 bg-[#0D1117] border border-[#30363d] rounded text-[10px] font-mono text-[#8B949E]">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Experience: React.FC = () => (
  <section id="experience" className="py-32 bg-[#0D1117]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle title="Experience" desc="Industrial Footprint & Contribution." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="group flex flex-col h-full bg-[#161b22] border border-[#30363d] p-10 rounded-3xl hover:border-[#00BFFF]/50 hover:bg-[#161b22]/50 transition-all duration-500">
            <div className="flex justify-between items-start mb-10">
              <div className="w-12 h-12 bg-[#00BFFF]/10 text-[#00BFFF] rounded-2xl flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <span className="text-xs font-mono text-[#8B949E] uppercase">{exp.duration}</span>
            </div>
            <h4 className="text-2xl font-heading font-bold text-white mb-1">{exp.role}</h4>
            <p className="text-[#00BFFF] font-medium mb-8 text-lg">{exp.company}</p>
            <ul className="space-y-4 mb-10 flex-1">
              {exp.bullets.map((b, bi) => (
                <li key={bi} className="text-sm text-[#8B949E] leading-relaxed flex gap-3">
                  <div className="w-1.5 h-1.5 bg-[#00BFFF] rounded-full mt-1.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-auto">
              {exp.tech.map(t => (
                <span key={t} className="px-2 py-1 bg-[#0D1117] text-[10px] font-mono text-white/50 border border-white/10 rounded group-hover:border-[#00BFFF]/30 transition-all uppercase">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Projects: React.FC = () => (
  <section id="projects" className="py-32 bg-[#0D1117] border-t border-[#30363d]/30">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle title="Projects" desc="Engineering Intelligent Solutions." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {PROJECTS.map((p, i) => (
          <div key={i} className="group relative overflow-hidden bg-[#161b22] border border-[#30363d] rounded-3xl hover:border-[#00BFFF] transition-all duration-500">
            <div className="aspect-video overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100" />
            </div>
            <div className="p-10">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-3xl font-heading font-bold text-white">{p.title}</h4>
                <a href={p.github} className="p-3 bg-[#0D1117] border border-[#30363d] rounded-full text-white hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all">
                  <Github size={20} />
                </a>
              </div>
              <p className="text-[#00BFFF] font-medium mb-6">{p.description}</p>
              <div className="space-y-3 mb-10">
                {p.longDescription.map((d, di) => (
                  <p key={di} className="text-sm text-[#8B949E] flex gap-3">
                    <span className="text-[#00BFFF] mt-1 shrink-0">→</span> {d}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {p.tech.map(t => (
                  <span key={t} className="px-3 py-1.5 bg-[#0D1117] border border-[#30363d] text-[10px] font-mono text-[#8B949E] uppercase rounded tracking-wider">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20">
        <div className="flex items-center gap-4 mb-10">
          <Terminal size={24} className="text-[#00BFFF]" />
          <h4 className="text-2xl font-heading font-bold text-white uppercase tracking-tighter">OSS Repositories</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REPOS.map((r, i) => (
            <a key={i} href={r.url} className="p-8 bg-[#161b22] border border-[#30363d] rounded-2xl hover:bg-[#1c222a] hover:border-[#00BFFF] transition-all flex flex-col h-full group">
              <div className="flex justify-between items-start mb-6">
                <Star className="text-yellow-500" size={18} />
                <span className="text-[10px] font-mono text-[#00BFFF] uppercase tracking-widest">{r.language}</span>
              </div>
              <h5 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-[#00BFFF]">{r.name}</h5>
              <p className="text-sm text-[#8B949E] mb-10 line-clamp-2 flex-1 font-light leading-relaxed">{r.description}</p>
              <div className="text-[#00BFFF] font-mono text-[10px] flex items-center gap-2 font-bold group-hover:translate-x-2 transition-transform">
                GITHUB_URI <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Skills: React.FC = () => (
  <section id="skills" className="py-32 bg-[#0D1117]">
    <div className="max-w-7xl mx-auto px-6">
      <SectionTitle title="Skills" desc="Core Competencies." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {SKILL_GROUPS.map((sg, i) => (
          <div key={i} className="relative">
            <h4 className="text-lg font-heading font-bold text-white mb-8 border-b border-[#30363d] pb-4 flex items-center gap-3">
              {i === 0 && <Code size={20} className="text-[#00BFFF]" />}
              {i === 1 && <Layout size={20} className="text-[#00BFFF]" />}
              {i === 2 && <Cpu size={20} className="text-[#00BFFF]" />}
              {i === 3 && <Database size={20} className="text-[#00BFFF]" />}
              {sg.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {sg.skills.map(s => (
                <span key={s} className="px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-xl text-xs font-mono text-[#8B949E] hover:text-[#00BFFF] hover:border-[#00BFFF] transition-all cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-32 p-12 bg-gradient-to-r from-[#161b22] to-[#0D1117] border border-[#30363d] rounded-[2.5rem]">
        <h4 className="text-2xl font-heading font-bold text-white mb-10 text-center uppercase tracking-[0.3em]">Industry Certifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CERTIFICATIONS.map((c, i) => (
            <div key={i} className="p-6 bg-[#0D1117]/50 rounded-2xl flex items-center gap-5 group hover:bg-[#0D1117] transition-all">
              <div className="w-12 h-12 bg-[#00BFFF]/10 rounded-xl flex items-center justify-center text-[#00BFFF]">
                <FileText size={24} />
              </div>
              <div>
                <p className="text-white font-bold text-sm mb-1">{c.title}</p>
                <p className="text-[10px] text-[#8B949E] font-mono">{c.issuer} | {c.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => (
  <section id="contact" className="py-32 bg-[#0D1117]">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionTitle title="Connect" desc="Let's build the future together." />
          <p className="text-xl text-[#8B949E] mb-12 font-light leading-relaxed">
            I'm currently looking for internships and collaborative research projects in AI and Software Engineering. 
            Feel free to reach out via any of these channels.
          </p>
          <div className="space-y-6">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-6 p-6 bg-[#161b22] border border-[#30363d] rounded-2xl hover:border-[#00BFFF] transition-all group">
              <div className="w-12 h-12 bg-[#00BFFF]/10 text-[#00BFFF] rounded-xl flex items-center justify-center group-hover:bg-[#00BFFF] group-hover:text-black transition-all">
                <Mail size={24} />
              </div>
              <span className="text-lg font-medium">{PERSONAL_INFO.email}</span>
            </a>
            <div className="flex gap-4">
              <a href={PERSONAL_INFO.linkedin} className="flex-1 flex items-center gap-6 p-6 bg-[#161b22] border border-[#30363d] rounded-2xl hover:border-[#00BFFF] transition-all group">
                <Linkedin size={24} className="text-[#00BFFF]" />
                <span className="text-sm font-bold uppercase tracking-widest">LinkedIn</span>
              </a>
              <a href={PERSONAL_INFO.github} className="flex-1 flex items-center gap-6 p-6 bg-[#161b22] border border-[#30363d] rounded-2xl hover:border-[#00BFFF] transition-all group">
                <Github size={24} className="text-[#00BFFF]" />
                <span className="text-sm font-bold uppercase tracking-widest">GitHub</span>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-[#161b22] p-12 rounded-[2.5rem] border border-[#30363d] shadow-2xl relative">
          <div className="absolute top-0 right-0 p-8 text-[#30363d] select-none pointer-events-none">
            <Terminal size={120} />
          </div>
          
        </div>
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  return (
    <div className="bg-[#0D1117] text-[#E6EDF3] selection:bg-[#00BFFF]/30">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <footer className="py-20 bg-[#0D1117] border-t border-[#30363d]/30 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h4 className="font-heading font-bold text-2xl text-white mb-6">VIKAS<span className="text-[#00BFFF]">.SYS</span></h4>
          <p className="text-sm text-[#8B949E] mb-8 max-w-sm mx-auto">
            Engineered with precision using React, TailwindCSS. 
            © {new Date().getFullYear()} Vikas 
          </p>
          <div className="flex justify-center gap-8">
        
            <a href="https://github.com/vikas0026" className="text-[#8B949E] hover:text-white transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/vikas-%E2%80%8E-1b40a9294/" className="text-[#8B949E] hover:text-white transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </footer>
     
    </div>
  );
};

// Lucide placeholder fix
const Twitter = ({ size, className }: any) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;

export default App;
