import { ArrowDown, ArrowUpRight, Play } from "lucide-react";

const projects = [
  { number: "01", name: "Future / Form", type: "Brand world · Digital launch", style: "project-card--lime" },
  { number: "02", name: "Soft Power", type: "Campaign · Social film", style: "project-card--pink" },
  { number: "03", name: "New Ritual", type: "Identity · Content system", style: "project-card--blue" },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Vohn Studio home">VOHN<span>®</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#studio">Studio</a>
          <a href="#contact">Contact <ArrowUpRight size={14} /></a>
        </div>
        <a className="nav-pill" href="#contact">Let’s make something <span>↗</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-topline"><span>INDEPENDENT CREATIVE STUDIO</span><span>DESIGN · DIGITAL · MOTION</span></div>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Culture moves fast. Make work that moves with it.</p>
            <h1>MAKE<br /><span className="outline-word">NOISE.</span><br />MOVE<br /><span className="accent-word">CULTURE.</span></h1>
            <p className="hero-description">We turn ambitious ideas into sharp identities, immersive websites, and social-first stories people want to share.</p>
            <a className="button button--light" href="#work">Explore selected work <ArrowDown size={16} /></a>
          </div>
          <div className="hero-art" aria-label="Abstract colorful artwork">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-sun" />
            <div className="art-panel"><span>IDEAS IN<br />MOTION</span><b>↗</b></div>
            <span className="art-caption">DESIGN FOR THE<br />NEXT WAVE</span>
            <span className="art-index">01 / 03</span>
          </div>
        </div>
        <div className="hero-footer"><span>SCROLL TO DISCOVER</span><span className="scroll-line" /><span>01 — 03</span></div>
      </section>

      <section className="ticker" aria-label="Studio services">
        <div className="ticker-track">BRAND WORLDS <i>✳</i> DIGITAL EXPERIENCES <i>✳</i> SOCIAL FILMS <i>✳</i> CAMPAIGN VISUALS <i>✳</i> BRAND WORLDS <i>✳</i></div>
      </section>

      <section className="work-section shell" id="work">
        <div className="section-heading"><div><p className="eyebrow">A FEW GOOD THINGS</p><h2>Made to <span>make you look.</span></h2></div><a className="text-link" href="#contact">Have a project? <ArrowUpRight size={16} /></a></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card ${project.style}`} key={project.number}>
              <div className="project-visual">
                <span className="project-number">{project.number}</span>
                <div className="project-shape"><span>{project.name.split(" ")[0]}</span></div>
                <span className="project-open"><ArrowUpRight size={20} /></span>
              </div>
              <div className="project-meta"><div><h3>{project.name}</h3><p>{project.type}</p></div><span>SELECTED WORK</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto" id="studio">
        <div className="manifesto-inner shell">
          <p className="eyebrow"><span className="eyebrow-dot" /> SMALL STUDIO. BIG FEELING.</p>
          <h2>Good work gets<br />attention. <span>Great work<br />starts a feeling.</span></h2>
          <div className="manifesto-bottom"><p>We pair strategy with a strong visual point of view to help brands show up with confidence—wherever people find them.</p><a className="button button--dark" href="#contact">Meet the studio <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="services shell">
        <div className="section-heading"><div><p className="eyebrow">WHAT WE BRING</p><h2>From first thought<br />to <span>full send.</span></h2></div><p className="services-note">One creative partner for the moments your audience remembers.</p></div>
        <div className="service-list">
          <a href="#contact"><span>01</span><h3>Brand identity</h3><p>Positioning, visual systems, art direction</p><ArrowUpRight /></a>
          <a href="#contact"><span>02</span><h3>Digital experiences</h3><p>Web design, interaction, launch pages</p><ArrowUpRight /></a>
          <a href="#contact"><span>03</span><h3>Social content</h3><p>Campaigns, motion, short-form video</p><ArrowUpRight /></a>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-inner shell">
          <p className="eyebrow"><span className="eyebrow-dot" /> HAVE A GOOD ONE IN MIND?</p>
          <h2>Let’s make<br /><span>it matter.</span></h2>
          <a className="contact-link" href="mailto:hello@example.com">hello@example.com <ArrowUpRight /></a>
          <div className="contact-sticker"><Play size={14} fill="currentColor" /> NEW PROJECTS<br />ALWAYS WELCOME</div>
        </div>
      </section>

      <footer className="footer shell"><a className="wordmark" href="#top">VOHN<span>®</span></a><span>Independent by nature. Online everywhere.</span><span>© 2026 VOHN STUDIO</span></footer>
    </main>
  );
}
