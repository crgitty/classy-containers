import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root { --gold: #C9A96E; --dark: #0E0E0C; --charcoal: #1A1A17; --warm-white: #F5F0E8; --muted: #8A8578; --light-gray: #2A2A26; }
  html { scroll-behavior: smooth; }
  body { background: var(--dark); color: var(--warm-white); font-family: 'Jost', sans-serif; font-weight: 300; letter-spacing: 0.01em; overflow-x: hidden; }
  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 72px; transition: background 0.4s, border-bottom 0.4s; }
  nav.scrolled { background: rgba(14,14,12,0.96); border-bottom: 1px solid rgba(201,169,110,0.15); backdrop-filter: blur(12px); }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; letter-spacing: 0.12em; color: var(--warm-white); text-decoration: none; }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 36px; list-style: none; align-items: center; }
  .nav-links a { font-family: 'Jost'; font-size: 11px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.25s; }
  .nav-links a:hover { color: var(--warm-white); }
  .nav-cta { font-family: 'Jost'; font-size: 11px; font-weight: 400; letter-spacing: 0.18em; text-transform: uppercase; border: 1px solid var(--gold); color: var(--gold); padding: 10px 22px; text-decoration: none; cursor: pointer; background: transparent; display: inline-block; transition: background 0.25s, color 0.25s; }
  .nav-cta:hover { background: var(--gold); color: var(--dark); }
  .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 120px 80px 80px; position: relative; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; z-index: 0; background: linear-gradient(135deg, #0E0E0C 0%, #1a1a14 40%, #0f0e0a 100%); }
  .hero-pattern { position: absolute; inset: 0; z-index: 1; background-image: linear-gradient(rgba(201,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.04) 1px, transparent 1px); background-size: 64px 64px; }
  .hero-accent { position: absolute; right: 0; top: 0; bottom: 0; width: 38%; background: linear-gradient(180deg, rgba(201,169,110,0.06) 0%, transparent 60%); z-index: 1; }
  .hero-content { position: relative; z-index: 2; max-width: 820px; }
  .hero-eyebrow { font-size: 10px; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); display: flex; align-items: center; gap: 16px; margin-bottom: 36px; }
  .hero-eyebrow::before { content: ''; display: block; width: 40px; height: 1px; background: var(--gold); }
  .hero h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 7vw, 96px); font-weight: 300; line-height: 1.05; color: var(--warm-white); margin-bottom: 28px; letter-spacing: -0.01em; }
  .hero h1 em { font-style: italic; color: var(--gold); }
  .hero-sub { font-size: 16px; font-weight: 300; line-height: 1.7; color: var(--muted); max-width: 520px; margin-bottom: 56px; }
  .hero-actions { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
  .btn-primary { background: var(--gold); color: var(--dark); font-family: 'Jost'; font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; padding: 16px 36px; border: none; cursor: pointer; text-decoration: none; display: inline-block; transition: opacity 0.25s, transform 0.25s; }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-ghost { background: transparent; color: var(--warm-white); font-family: 'Jost'; font-size: 11px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; padding: 16px 36px; border: 1px solid rgba(245,240,232,0.25); cursor: pointer; text-decoration: none; display: inline-block; transition: border-color 0.25s; }
  .btn-ghost:hover { border-color: var(--warm-white); }
  .hero-scroll { position: absolute; bottom: 48px; left: 80px; z-index: 2; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--muted); display: flex; align-items: center; gap: 12px; }
  .scroll-line { width: 1px; height: 48px; background: linear-gradient(180deg, #C9A96E, transparent); }
  .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent); }
  section { padding: 120px 80px; }
  .eyebrow { font-size: 10px; font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
  .sec-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 4vw, 58px); font-weight: 300; line-height: 1.15; color: var(--warm-white); margin-bottom: 24px; }
  .sec-sub { font-size: 15px; line-height: 1.8; color: var(--muted); max-width: 560px; }
  .how { background: var(--charcoal); }
  .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid rgba(201,169,110,0.12); margin-top: 72px; }
  .step { padding: 56px 48px; border-right: 1px solid rgba(201,169,110,0.12); transition: background 0.3s; }
  .step:last-child { border-right: none; }
  .step:hover { background: rgba(201,169,110,0.04); }
  .step-num { font-family: 'Cormorant Garamond', serif; font-size: 72px; font-weight: 300; line-height: 1; color: rgba(201,169,110,0.2); margin-bottom: 32px; display: block; }
  .step h3 { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: var(--warm-white); margin-bottom: 16px; }
  .step p { font-size: 14px; line-height: 1.8; color: var(--muted); }
  .sizes-sec { background: var(--dark); }
  .sizes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 64px; }
  .size-card { background: var(--charcoal); border: 1px solid rgba(201,169,110,0.1); padding: 48px 40px; position: relative; overflow: hidden; transition: border-color 0.3s, transform 0.3s; cursor: default; }
  .size-card.featured { border-color: rgba(201,169,110,0.35); }
  .size-card:hover { border-color: rgba(201,169,110,0.35); transform: translateY(-4px); }
  .size-tag { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; display: block; }
  .size-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; color: var(--warm-white); margin-bottom: 8px; }
  .size-dims { font-size: 12px; color: var(--muted); letter-spacing: 0.1em; margin-bottom: 24px; }
  .size-card p { font-size: 14px; line-height: 1.75; color: var(--muted); margin-bottom: 24px; }
  .size-uses { display: flex; flex-wrap: wrap; gap: 8px; }
  .use-tag { font-size: 10px; letter-spacing: 0.1em; border: 1px solid rgba(201,169,110,0.2); color: rgba(201,169,110,0.7); padding: 5px 12px; }
  .most-req { margin-top: 24px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); }
  .why-sec { background: var(--dark); }
  .why-grid { display: grid; grid-template-columns: repeat(2, 1fr); border: 1px solid rgba(201,169,110,0.1); margin-top: 72px; }
  .why-item { padding: 56px 48px; border-bottom: 1px solid rgba(201,169,110,0.1); border-right: 1px solid rgba(201,169,110,0.1); transition: background 0.3s; }
  .why-item:hover { background: rgba(201,169,110,0.03); }
  .why-icon { font-size: 24px; color: var(--gold); margin-bottom: 24px; }
  .why-item h3 { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: var(--warm-white); margin-bottom: 14px; }
  .why-item p { font-size: 14px; line-height: 1.8; color: var(--muted); }
  .area-sec { background: var(--charcoal); }
  .area-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 96px; align-items: center; }
  .area-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; margin-top: 48px; }
  .area-list li { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 300; font-style: italic; color: var(--warm-white); padding: 18px 0; border-bottom: 1px solid rgba(201,169,110,0.1); display: flex; align-items: center; gap: 12px; }
  .area-dash { color: var(--gold); font-style: normal; }
  .area-note { margin-top: 32px; font-size: 13px; color: var(--muted); line-height: 1.7; }
  .map-box { aspect-ratio: 1; background: var(--light-gray); border: 1px solid rgba(201,169,110,0.12); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .map-label-text { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
  .map-sub-text { font-size: 10px; color: rgba(138,133,120,0.4); letter-spacing: 0.15em; margin-top: 4px; text-align: center; }
  .map-dot { position: absolute; border-radius: 50%; background: #C9A96E; box-shadow: 0 0 16px rgba(201,169,110,0.5); }
  .quote-sec { background: var(--dark); }
  .quote-inner { display: grid; grid-template-columns: 1fr 1.2fr; gap: 96px; align-items: start; }
  .contact-block { margin-top: 48px; padding-top: 48px; border-top: 1px solid rgba(201,169,110,0.12); }
  .contact-lbl { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
  .contact-info { font-size: 14px; color: var(--muted); line-height: 2; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 48px; }
  .form-group { display: flex; flex-direction: column; gap: 8px; }
  .form-group.full { grid-column: 1 / -1; }
  .form-label { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); }
  .form-input { background: var(--charcoal); border: 1px solid rgba(201,169,110,0.15); color: var(--warm-white); font-family: 'Jost'; font-size: 14px; font-weight: 300; padding: 14px 18px; outline: none; transition: border-color 0.25s; width: 100%; }
  .form-input:focus { border-color: rgba(201,169,110,0.5); }
  .form-note { font-size: 11px; color: var(--muted); line-height: 1.7; margin-top: 16px; }
  .faq-sec { background: var(--charcoal); }
  .faq-list { margin-top: 64px; max-width: 800px; }
  .faq-item { border-bottom: 1px solid rgba(201,169,110,0.12); }
  .faq-btn { width: 100%; background: transparent; border: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; padding: 28px 0; text-align: left; color: var(--warm-white); font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; transition: color 0.25s; }
  .faq-btn:hover { color: var(--gold); }
  .faq-plus { font-size: 24px; color: var(--gold); transition: transform 0.3s; flex-shrink: 0; margin-left: 24px; font-weight: 200; }
  .faq-plus.open { transform: rotate(45deg); }
  .faq-ans { font-size: 15px; line-height: 1.8; color: var(--muted); max-height: 0; overflow: hidden; transition: max-height 0.4s ease, padding-bottom 0.3s; }
  .faq-ans.open { max-height: 300px; padding-bottom: 28px; }
  footer { background: #080806; border-top: 1px solid rgba(201,169,110,0.12); padding: 80px 80px 48px; }
  .footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 64px; margin-bottom: 64px; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: var(--warm-white); margin-bottom: 16px; }
  .footer-logo span { color: var(--gold); }
  .footer-tagline { font-size: 13px; line-height: 1.8; color: var(--muted); }
  .footer-col h4 { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 24px; }
  .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer-col a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.25s; }
  .footer-col a:hover { color: var(--warm-white); }
  .footer-col p { font-size: 13px; color: var(--muted); line-height: 1.8; }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.06); }
  .footer-copy { font-size: 11px; color: rgba(138,133,120,0.5); letter-spacing: 0.05em; }
  .social-links { display: flex; gap: 20px; }
  .social-links a { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.25s; }
  .social-links a:hover { color: var(--gold); }
  .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: 0.1s; } .d2 { transition-delay: 0.2s; } .d3 { transition-delay: 0.3s; }
  @media (max-width: 1024px) { nav { padding: 0 32px; } section { padding: 96px 48px; } .hero { padding: 120px 48px 80px; } .steps-grid, .sizes-grid, .why-grid { grid-template-columns: 1fr; } .area-inner, .quote-inner { grid-template-columns: 1fr; gap: 48px; } .footer-top { grid-template-columns: 1fr 1fr; gap: 48px; } }
  @media (max-width: 640px) { nav { padding: 0 20px; } .nav-links { display: none; } section { padding: 72px 24px; } .hero { padding: 100px 24px 60px; } .form-grid { grid-template-columns: 1fr; } .footer-top { grid-template-columns: 1fr; } footer { padding: 60px 24px 40px; } .footer-bottom { flex-direction: column; gap: 16px; text-align: center; } .step { border-right: none; border-bottom: 1px solid rgba(201,169,110,0.12); } }
`;

const FAQS = [
  { q: "What materials are accepted in the containers?", a: "Our containers are designed for residential cleanout projects: furniture, appliances, household junk, yard debris, construction scraps from remodels, and general waste. We do not accept hazardous materials, paint, tires, or liquids." },
  { q: "How long can I keep the container on my property?", a: "Standard rentals include a 7-day window. Extended rentals are available and can be arranged when you book." },
  { q: "Can I book online or schedule in advance?", a: "Yes — online scheduling is available. We recommend booking at least 48 hours in advance, though same-week availability is often possible." },
  { q: "Do you serve Park City and the surrounding Wasatch Back?", a: "Absolutely. We serve Park City, Heber, Midway, Kamas, Jeremy Ranch, Deer Valley, and the broader Wasatch Back." },
  { q: "Are your containers residential-friendly?", a: "By design. Our hook lift containers are cleaner and more placement-flexible than traditional roll-offs. We protect driveways and are mindful of HOA aesthetics." },
  { q: "What sizes are available and how do I choose?", a: "We offer three sizes. Our team can recommend the right fit. When in doubt, sizing up is usually the right call." },
];

const SIZES = [
  { tag: "Compact", name: "10-Yard", dims: "12 ft x 7 ft x 4 ft", desc: "Ideal for targeted cleanouts: a single room, basement, or yard debris.", uses: ["Garage Cleanout", "Yard Debris", "Single Room"] },
  { tag: "Standard", name: "15-Yard", dims: "14 ft x 7 ft x 5 ft", desc: "Our most popular size. Handles remodels, multi-room cleanouts, and estate work.", uses: ["Remodel Debris", "Multi-Room", "Estate Cleanout"], featured: true },
  { tag: "Full Project", name: "20-Yard", dims: "16 ft x 7 ft x 6 ft", desc: "Built for larger projects: whole-home renovations and complete property cleanouts.", uses: ["Full Renovation", "Large Property", "Landscaping"] },
];

const WHY = [
  { icon: "◈", title: "Residential by Design", desc: "Our containers are sized for homes and driveways — not job sites. No heavy machinery, no damage to your property." },
  { icon: "◎", title: "Clean, Dependable Equipment", desc: "Every container arrives clean and well-maintained. We take pride in showing up to your home looking the part." },
  { icon: "◇", title: "Flexible Scheduling", desc: "Delivery and pickup windows built around your timeline. Book online and extend your rental if the project runs long." },
  { icon: "◉", title: "Local Expertise", desc: "We know the roads, the HOAs, and the lay of the land across Park City and the Wasatch Back." },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", size: "", date: "", notes: "" });
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll(".fade-up").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const setField = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  return (
    <div>
      <style>{styles}</style>
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#home" className="nav-logo">Classy <span>Containers</span></a>
        <ul className="nav-links">
          <li><a href="#process">Process</a></li>
          <li><a href="#sizes">Sizes</a></li>
          <li><a href="#area">Service Area</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <a href="#quote" className="nav-cta">Request a Quote</a>
      </nav>
      <section className="hero" id="home">
        <div className="hero-bg" /><div className="hero-pattern" /><div className="hero-accent" />
        <div className="hero-content">
          <div className="hero-eyebrow">Park City &amp; Wasatch Back</div>
          <h1 className="fade-up">Premium Residential<br />Container <em>Rental</em></h1>
          <p className="hero-sub fade-up d1">Clean equipment. Flexible scheduling. Delivered with care to your home. Serving Park City and the surrounding Wasatch Back communities.</p>
          <div className="hero-actions fade-up d2">
            <a href="#quote" className="btn-primary">Request a Quote</a>
            <a href="#sizes" className="btn-ghost">View Container Sizes</a>
          </div>
        </div>
        <div className="hero-scroll"><div className="scroll-line" />Scroll to explore</div>
      </section>
      <div className="divider" />
      <section className="how" id="process">
        <div className="eyebrow fade-up">The Process</div>
        <h2 className="sec-title fade-up">Simple from start<br />to finish.</h2>
        <p className="sec-sub fade-up">Three steps and you are focused on your project, not the logistics.</p>
        <div className="steps-grid">
          {[{n:"01",title:"Choose Your Container",desc:"Select the size that fits your project. Not sure? Our team will recommend the right option. No overselling, no waste."},{n:"02",title:"Schedule Delivery",desc:"Book online or by phone. We confirm your window and deliver at the agreed time — to your driveway or wherever works."},{n:"03",title:"Fill It. We Haul It.",desc:"Load at your own pace. When done, schedule pickup online. We collect and dispose of everything responsibly."}].map((s,i) => (
            <div className={"step fade-up d"+(i+1)} key={i}><span className="step-num">{s.n}</span><h3>{s.title}</h3><p>{s.desc}</p></div>
          ))}
        </div>
      </section>
      <div className="divider" />
      <section className="sizes-sec" id="sizes">
        <div className="eyebrow fade-up">Container Options</div>
        <h2 className="sec-title fade-up">The right size for<br />every project.</h2>
        <p className="sec-sub fade-up">All sizes available across Park City and the Wasatch Back.</p>
        <div className="sizes-grid">
          {SIZES.map((s,i) => (
            <div className={"size-card fade-up d"+(i+1)+(s.featured?" featured":"")} key={i}>
              <span className="size-tag">{s.tag}</span><h3>{s.name}</h3>
              <div className="size-dims">{s.dims}</div><p>{s.desc}</p>
              <div className="size-uses">{s.uses.map(u => <span className="use-tag" key={u}>{u}</span>)}</div>
              {s.featured && <div className="most-req">Most Requested</div>}
            </div>
          ))}
        </div>
      </section>
      <div className="divider" />
      <section className="why-sec" id="why">
        <div className="eyebrow fade-up">Why Classy Containers</div>
        <h2 className="sec-title fade-up">The difference is in<br />the details.</h2>
        <p className="sec-sub fade-up">Built for homeowners who care about how things look and how they are handled.</p>
        <div className="why-grid">
          {WHY.map((w,i) => (<div className={"why-item fade-up d"+(i%2+1)} key={i}><div className="why-icon">{w.icon}</div><h3>{w.title}</h3><p>{w.desc}</p></div>))}
        </div>
      </section>
      <div className="divider" />
      <section className="area-sec" id="area">
        <div className="area-inner">
          <div>
            <div className="eyebrow fade-up">Service Area</div>
            <h2 className="sec-title fade-up">Proudly serving<br />the Wasatch Back.</h2>
            <p className="sec-sub fade-up">Local to this market — we know the roads, the neighborhoods, and the standards expected here.</p>
            <ul className="area-list fade-up">
              {["Park City","Heber City","Midway","Kamas","Jeremy Ranch","Deer Valley","Snyderville","Coalville"].map(loc => (<li key={loc}><span className="area-dash">&#x2014;</span>{loc}</li>))}
            </ul>
            <p className="area-note fade-up">Serving additional Wasatch Back communities. Contact us to confirm availability.</p>
          </div>
          <div className="fade-up">
            <div className="map-box">
              <div className="map-dot" style={{width:8,height:8,top:"38%",left:"42%"}} />
              <div className="map-dot" style={{width:6,height:6,top:"62%",left:"54%",opacity:0.7}} />
              <div className="map-dot" style={{width:5,height:5,top:"58%",left:"48%",opacity:0.5}} />
              <div className="map-dot" style={{width:5,height:5,top:"45%",left:"35%",opacity:0.5}} />
              <div><div className="map-label-text">Wasatch Back Region</div><div className="map-sub-text">UTAH</div></div>
            </div>
          </div>
        </div>
      </section>
      <div className="divider" />
      <section className="quote-sec" id="quote">
        <div className="quote-inner">
          <div>
            <div className="eyebrow fade-up">Get Started</div>
            <h2 className="sec-title fade-up">Request a quote.<br />We will be in touch<br />within hours.</h2>
            <p className="sec-sub fade-up" style={{marginTop:24}}>Submit your project details and we will confirm availability, recommend the right container, and provide a clear, honest price.</p>
            <div className="contact-block fade-up"><div className="contact-lbl">Contact</div><div className="contact-info">hello@classycontainers.com<br />(435) 000-0000<br />Park City, Utah 84060</div></div>
          </div>
          <div className="form-grid fade-up">
            {[{l:"Full Name",n:"name",t:"text",p:"Jane Smith"},{l:"Phone",n:"phone",t:"tel",p:"(435) 000-0000"},{l:"Email Address",n:"email",t:"email",p:"you@email.com"},{l:"Service Address",n:"address",t:"text",p:"123 Mountain View Dr"}].map(f => (
              <div className="form-group" key={f.n}><span className="form-label">{f.l}</span><input className="form-input" type={f.t} name={f.n} placeholder={f.p} value={form[f.n]} onChange={setField} /></div>
            ))}
            <div className="form-group"><span className="form-label">Container Size</span>
              <select className="form-input" name="size" value={form.size} onChange={setField} style={{appearance:"none"}}>
                <option value="">Select a size</option>
                <option value="10">10-Yard — Compact</option>
                <option value="15">15-Yard — Standard</option>
                <option value="20">20-Yard — Full Project</option>
                <option value="unsure">Not sure — help me choose</option>
              </select>
            </div>
            <div className="form-group"><span className="form-label">Preferred Delivery Date</span><input className="form-input" type="date" name="date" value={form.date} onChange={setField} /></div>
            <div className="form-group full"><span className="form-label">Project Notes (optional)</span><textarea className="form-input" name="notes" rows={4} placeholder="Brief description of your project" value={form.notes} onChange={setField} style={{resize:"vertical"}} /></div>
            <div className="form-group full"><button className="btn-primary" type="button" style={{width:"100%",textAlign:"center"}} onClick={() => alert("Thank you. We will be in touch within a few hours.")}>Submit Quote Request</button><p className="form-note">No commitment required. We will respond with availability and a clear price estimate within a few hours.</p></div>
          </div>
        </div>
      </section>
      <div className="divider" />
      <section className="faq-sec" id="faq">
        <div className="eyebrow fade-up">Common Questions</div>
        <h2 className="sec-title fade-up">Everything you<br />need to know.</h2>
        <div className="faq-list">
          {FAQS.map((f,i) => (
            <div className="faq-item fade-up" key={i}>
              <button className="faq-btn" onClick={() => setOpenFaq(openFaq===i?null:i)}>{f.q}<span className={"faq-plus"+(openFaq===i?" open":"")}>+</span></button>
              <div className={"faq-ans"+(openFaq===i?" open":"")}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <div className="footer-top">
          <div><div className="footer-logo">Classy <span>Containers</span></div><p className="footer-tagline">Premium residential container rental. Clean equipment, white-glove service, transparent pricing.</p></div>
          <div className="footer-col"><h4>Navigation</h4><ul><li><a href="#process">How It Works</a></li><li><a href="#sizes">Container Sizes</a></li><li><a href="#area">Service Area</a></li><li><a href="#quote">Request a Quote</a></li><li><a href="#faq">FAQ</a></li></ul></div>
          <div className="footer-col"><h4>Service Area</h4><p>Park City · Heber · Midway · Kamas · Jeremy Ranch · Deer Valley · Snyderville · Wasatch County</p></div>
          <div className="footer-col"><h4>Contact</h4><p>hello@classycontainers.com<br />(435) 000-0000<br />Park City, Utah</p></div>
        </div>
        <div className="footer-bottom"><p className="footer-copy">2025 Classy Containers LLC &middot; Park City, Utah</p><div className="social-links"><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">Nextdoor</a></div></div>
      </footer>
    </div>
  );
}