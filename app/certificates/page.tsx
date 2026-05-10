import Link from "next/link";

export default function Certificates() {
  return (
    <main className="max-w-7xl mx-auto px-8 pb-24 mt-12">
      <section className="mb-12">
        <nav className="flex items-center gap-2 text-sm font-label text-on-surface-variant mb-4">
          <Link className="hover:text-primary transition-colors" href="/">Home</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-primary">Certificates</span>
        </nav>
        <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-on-surface mb-6">
          Technical <span className="text-primary">Accreditations</span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed">
          A verified collection of professional certifications and technical milestones achieved across cloud architecture, security operations, and artificial intelligence.
        </p>
      </section>

      <section className="mb-16">
        <div className="glass-panel p-2 rounded-full inline-flex flex-wrap gap-2 items-center">
          <button className="px-6 py-2 rounded-full bg-primary text-on-primary font-medium text-sm transition-all">All Tracks</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 font-medium text-sm transition-all">Cloud</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 font-medium text-sm transition-all">DevOps</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 font-medium text-sm transition-all">AI</button>
          <button className="px-6 py-2 rounded-full text-on-surface-variant hover:bg-surface-variant/50 font-medium text-sm transition-all">Security</button>
        </div>
      </section>

      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display font-semibold text-on-surface flex items-center gap-3">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            Featured Certifications
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel-elevated p-8 rounded-xl frozen-glow group hover:border-primary/40 transition-all duration-500 flex flex-col md:flex-row gap-8">
            <div className="w-32 h-32 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img alt="AWS Solutions Architect" className="w-full h-full object-contain relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpdFuZyoplvDEiFkbFlWxUogSGdxrCJaFKMKSHyCKC2lxUOt8iX176AmgNisj4NAMERpyPT1SaTr2RraDeSBalPZwEgkpeTJAT73-BUNB7g2mel8JCCvCS3CB_LCdi53bFcuQRxrIT_SKZl-Kj9OQzV59n-lLxcizG9sCzMtEjhqBVmI51AMPNfZVdrhzZhD4warvwHEvanxmhvHwPLdXd7RDAFTfrcRoGl7AraywL22UV7Lnl64vSTTyrYKpw0dKuQl-bSV1UeQ" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold tracking-widest text-primary uppercase mb-1 block">Amazon Web Services</span>
                  <h3 className="text-2xl font-bold text-on-surface">AWS Solutions Architect Professional</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-tighter text-on-surface-variant mb-1">Date Earned</p>
                  <p className="text-sm font-medium">October 2023</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-tighter text-on-surface-variant mb-1">Credential ID</p>
                  <p className="text-sm font-mono text-secondary">AWS-SAP-88219</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all">Verify Credentials</button>
                <button className="p-2.5 rounded-lg border border-outline-variant hover:border-primary/50 text-on-surface-variant transition-all">
                  <span className="material-symbols-outlined align-middle">share</span>
                </button>
              </div>
            </div>
          </div>

          <div className="glass-panel-elevated p-8 rounded-xl frozen-glow group hover:border-tertiary/40 transition-all duration-500 flex flex-col md:flex-row gap-8">
            <div className="w-32 h-32 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-tertiary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img alt="GCP Data Engineer" className="w-full h-full object-contain relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1zeKRXm4I7SM-d8TyVmOLk_bw0kQuFi6ewMb3PHDhXNpHct7yvxDVRZ_HyWXMR7qF-AZYEr0ejZBMNaaVbOxR9hCA8JW0IjklfGsLYMR_9SD6lhU32AOa2FMFp2wWsk4V1tf-m515ucv7BgGOfxS_YEhSrGSMtnJOfRvqkhvimlze2AZeAS82aFOjM2FQ-HNwG11RtoE_qK4IhHMvrt2ITseCirbNmpex8cHRnuzOT6yqCLueuW4EKw-8-uvTPEjFxCBrU7zV-A" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold tracking-widest text-tertiary uppercase mb-1 block">Google Cloud</span>
                  <h3 className="text-2xl font-bold text-on-surface">Professional Data Engineer</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-tighter text-on-surface-variant mb-1">Date Earned</p>
                  <p className="text-sm font-medium">January 2024</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-tighter text-on-surface-variant mb-1">Credential ID</p>
                  <p className="text-sm font-mono text-secondary">GCP-PDE-0112</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2.5 rounded-lg bg-tertiary text-on-tertiary text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all">View Full Transcript</button>
                <button className="p-2.5 rounded-lg border border-outline-variant hover:border-tertiary/50 text-on-surface-variant transition-all">
                  <span className="material-symbols-outlined align-middle">share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-outline-variant/30 flex-grow"></div>
          <h2 className="text-xl font-display font-medium text-on-surface-variant tracking-widest uppercase">Cloud Mastery</h2>
          <div className="h-px bg-outline-variant/30 flex-grow"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-xl hover:bg-surface-container-highest transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 glass-panel-elevated rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">cloud</span>
              </div>
              <span className="text-[10px] font-bold py-1 px-2 rounded bg-secondary-container text-on-secondary-container uppercase">Expert</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">Azure Solutions Architect</h3>
            <p className="text-xs text-on-surface-variant mb-4 font-label">Microsoft • Valid through 2026</p>
            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <span className="text-xs font-mono text-on-surface-variant/70">ID: MS-AZ-305</span>
              <a className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline" href="#">
                Verify <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl hover:bg-surface-container-highest transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 glass-panel-elevated rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">settings_ethernet</span>
              </div>
              <span className="text-[10px] font-bold py-1 px-2 rounded bg-secondary-container text-on-secondary-container uppercase">Advanced</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">AWS DevOps Engineer</h3>
            <p className="text-xs text-on-surface-variant mb-4 font-label">Amazon Web Services • Valid through 2025</p>
            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <span className="text-xs font-mono text-on-surface-variant/70">ID: AWS-DOE-441</span>
              <a className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline" href="#">
                Verify <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl hover:bg-surface-container-highest transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 glass-panel-elevated rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">hub</span>
              </div>
              <span className="text-[10px] font-bold py-1 px-2 rounded bg-secondary-container text-on-secondary-container uppercase">Expert</span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-2">GCP Cloud Architect</h3>
            <p className="text-xs text-on-surface-variant mb-4 font-label">Google Cloud • Valid through 2026</p>
            <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center">
              <span className="text-xs font-mono text-on-surface-variant/70">ID: GCP-PCA-920</span>
              <a className="text-xs font-bold text-primary flex items-center gap-1 group-hover:underline" href="#">
                Verify <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-semibold text-on-surface mb-8">Technical Specializations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-panel-elevated rounded-xl p-10 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-tertiary/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-tertiary text-3xl">psychology</span>
                <h3 className="text-3xl font-bold text-on-surface">Artificial Intelligence</h3>
              </div>
              <p className="text-on-surface-variant leading-relaxed max-w-md mb-8">
                Certifications in Machine Learning Engineering and Generative AI application development. Verified expertise in LLM fine-tuning and neural network optimization.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="glass-panel py-3 px-6 rounded-lg flex items-center gap-4">
                  <img alt="ML Ops" className="w-8 h-8 rounded" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD51pIBYuqX7X79iWl4mhCfm1QYDWyJ4MF56QMMM2fbyuwqnkGtElFPo3uRHu4SpQVO9Zkehq4FgMYYiou9dj_WHqBdNHuFzSgSfew3NdHVANMwzYNujKANSN7zHaUJ1ZZWaY5TYPqx4NZEI1vqLRlJixXa8gFS0s2B1zVG59G_7SBdjb0LQjPmidO9-ngh0Lqtm5FRmGp77DyELYqi7_cbgYonSYW9oh5CUkQuawHXNjHxtFw_W2LSBpLyC8vTyxxNIckgb2ycTg" />
                  <div>
                    <p className="text-sm font-bold">TensorFlow Developer</p>
                    <p className="text-[10px] text-tertiary uppercase">DeepLearning.AI</p>
                  </div>
                </div>
                <div className="glass-panel py-3 px-6 rounded-lg flex items-center gap-4">
                  <div className="w-8 h-8 bg-on-tertiary/20 rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary text-lg">bolt</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Generative AI Spec.</p>
                    <p className="text-[10px] text-tertiary uppercase">NVIDIA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-8 border-l-4 border-l-primary/50">
            <span className="material-symbols-outlined text-primary mb-4 text-4xl">shield</span>
            <h3 className="text-xl font-bold text-on-surface mb-3">Cybersecurity</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              Ethical hacking and security operations center (SOC) certifications including CompTIA Security+ and CISSP path.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                Certified Ethical Hacker (CEH)
              </li>
              <li className="flex items-center gap-3 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                Security+ (SY0-601)
              </li>
            </ul>
          </div>

          <div className="glass-panel rounded-xl p-8 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-secondary mb-4 text-4xl">terminal</span>
              <h3 className="text-xl font-bold text-on-surface mb-3">DevOps &amp; Automation</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Infrastructure as Code (IaC) mastery with Terraform and Kubernetes orchestration.
              </p>
            </div>
            <div className="mt-8 flex -space-x-2">
              <div className="w-10 h-10 rounded-full glass-panel-elevated border border-primary/20 flex items-center justify-center" title="Kubernetes CKA">
                <span className="material-symbols-outlined text-sm">token</span>
              </div>
              <div className="w-10 h-10 rounded-full glass-panel-elevated border border-primary/20 flex items-center justify-center" title="HashiCorp Terraform">
                <span className="material-symbols-outlined text-sm">layers</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 glass-panel rounded-xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 h-40 rounded-lg overflow-hidden relative">
              <img alt="Security Dashboard" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARb1LqWI_TXPUIHaDMjHHpGrNlQ4x9fw4UALOvmBIGhHUTV-TJGimY-YBmFlubar_5ylYLDMkWaM-n2Kq093CoJh3NPQm9YpkTF_S4jdt1_C10lH4wA7T000VtlsPR0nqg16idosCOCu7e16fHOmHK9CO7hTdMfJ1kxJqlwjJyhk4EY1L7VMrIlWPtN1cJC9nPrvFg5Zu9KYYwMjCe9F8nylZV4qCZeXxl8lEG9dZRsRfer5E1Emn6JXxvCQqGtimmVn5LhapLlw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-on-surface mb-2">Cloud Security Alliance</h3>
              <p className="text-sm text-on-surface-variant mb-6">Certificate of Cloud Security Knowledge (CCSK) representing mastery in shared responsibility models and tenant protection.</p>
              <button className="text-sm font-bold text-primary flex items-center gap-2 hover:translate-x-1 transition-transform">
                View Credentials <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
