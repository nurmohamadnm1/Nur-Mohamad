/* =====================================================================
   SITE CONTENT — edit this file only.
   Everything on the website (text, sections, links, order) comes from here.
   Rules: keep the quotes "..." and commas. Empty "" = hidden automatically.
   ===================================================================== */

window.SITE = {

  /* ---------- 1. Basic info ---------- */
  name: "Nur Mohamad",
  shortName: "Nur",
  initials: "NM",
  roles: [                                  // hero typing animation
    "Statistician",
    "Bioinformatics Researcher",
    "Biostatistics Enthusiast",
    "Computational Biology Learner"
  ],
  tagline: "Final-year Statistics student at the University of Rajshahi working where statistics meets genomics, drug discovery and public health data.",
  location: "Rajshahi-6205, Bangladesh",
  email: "nurmohamadnm1@gmail.com",
  phone: "+8801315037640",
  showPhone: true,                          // false = hide phone number
  photo: "",                                // e.g. "assets/img/profile.jpg" (empty = NM monogram)
  cvFile: "assets/Nur_Mohamad_CV.pdf",      // upload your PDF here; "" = hide button
  availability: "Open to MSc / research opportunities from 2027",  // "" = hide badge

  /* ---------- 2. Social / academic profiles (fill in; empty = hidden) ---------- */
  social: {
    googleScholar: "",   // https://scholar.google.com/citations?user=XXXX
    orcid: "",           // https://orcid.org/0000-0000-0000-0000
    researchGate: "",    // https://www.researchgate.net/profile/Nur-Mohamad
    linkedin: "",        // https://www.linkedin.com/in/your-id
    github: "https://github.com/nurmohamadnm1",
    twitter: "",         // https://x.com/your-id
    facebook: ""
  },

  /* ---------- 3. Section order + on/off ---------- */
  // Reorder or delete lines to change the menu and page order.
  sections: [
    "about", "research", "experience", "publications",
    "skills", "projects", "leadership", "news", "references", "contact"
  ],

  /* ---------- 4. About ---------- */
  about: [
    "I am a final-year BSc (Hons) Statistics student at the University of Rajshahi, Bangladesh, graduating in November 2026. My work sits at the intersection of statistics and the life sciences: I use statistical thinking to make sense of biological and health data.",
    "My research spans plant genomics (GWAS, QTL mapping, transcriptomics), structure-based drug design with network pharmacology, and biostatistics for public health. I work daily in R, Python and Ubuntu Linux, and I have contributed to peer-reviewed publications and international conferences."
  ],
  quickFacts: [                              // shown as an R summary() block
    ["degree",      "BSc (Hons) Statistics"],
    ["institution", "University of Rajshahi"],
    ["cgpa",        "3.40"],
    ["graduation",  "Nov 2026 (expected)"],
    ["tools",       "R, Python, Linux, SPSS"],
    ["based_in",    "Rajshahi, Bangladesh"]
  ],
  stats: [                                   // animated counters
    { value: 3, label: "Journal papers", suffix: "" },
    { value: 3, label: "Conference papers", suffix: "" },
    { value: 2, label: "Research positions", suffix: "" },
    { value: 4, label: "Leadership roles", suffix: "" }
  ],

  /* ---------- 5. Education ---------- */
  education: [
    {
      degree: "Bachelor of Science in Statistics",
      institution: "University of Rajshahi",
      location: "Rajshahi-6205, Bangladesh",
      period: "Nov 2022 – Nov 2026 (Expected)",
      details: "Current CGPA: 3.40"
    }
  ],

  /* ---------- 6. Research interests ---------- */
  research: [
    {
      title: "Computational drug design",
      text: "Structure-based drug design and molecular modelling: docking, MD simulation and DFT to screen natural compounds against disease targets.",
      tags: ["Docking", "MD simulation", "DFT"]
    },
    {
      title: "Transcriptomics & integrative bioinformatics",
      text: "Finding disease genes and drug targets from expression data through DEG analysis, PPI networks and pathway enrichment.",
      tags: ["DEG", "PPI network", "Enrichment"]
    },
    {
      title: "Plant genomics",
      text: "Statistical genetics in crops: GWAS, QTL mapping, WGS and gene-family analysis in wheat, maize, rapeseed and banana.",
      tags: ["GWAS", "QTL", "WGS"]
    },
    {
      title: "Biostatistics",
      text: "Statistical analysis of health and biomedical data, survey design and predictive modelling for public-health questions in Bangladesh.",
      tags: ["Survey design", "Modelling", "Meta-analysis"]
    }
  ],

  /* ---------- 7. Experience (timeline) ---------- */
  experience: [
    {
      role: "Research Assistant",
      org: "Institute of Natural Resources Research and Development (INRRD)",
      url: "https://inrrd.com/",
      location: "Rajshahi, Bangladesh",
      period: "2025 – Present",
      points: [
        "Conducted data collection, cleaning and statistical analysis using R, Python and SPSS.",
        "Assisted in designing research methodology and developing questionnaires.",
        "Contributed to manuscript preparation, editing and reference management."
      ]
    },
    {
      role: "Research Fellow",
      org: "Bangladesh Institute of Innovative Health Research (BIIHR)",
      url: "https://www.biihr-bd.org/",
      location: "Dhaka, Bangladesh",
      period: "2024 · 6 months",
      points: [
        "Completed comprehensive training in research design, data analysis and scientific writing.",
        "Led a community-based research project from methodology to dissemination.",
        "Co-authored research findings and took part in publication efforts."
      ]
    },
    {
      role: "Research Mentee — Basic Biology for Bioinformatics",
      org: "Dept. of Biochemistry & Molecular Biology, University of Rajshahi",
      url: "",
      location: "Rajshahi, Bangladesh",
      period: "Dec 2025 – Feb 2026",
      points: [
        "Hands-on mentorship under Dr. Md Mostofa Uddin Helal (Postdoctoral Fellow).",
        "Key areas: molecular biology, genomics (WGS, GWAS, QTL), transcriptomics and metabolomics in banana, rapeseed, wheat and maize."
      ]
    }
  ],

  /* ---------- 8. Publications ----------
     type:   "journal" | "conference"
     status: "published" | "under-review" | "presented"
     me:     your name exactly as written in authors (gets highlighted) */
  me: "Mohamad, N.",
  publications: [
    {
      type: "journal", status: "published", year: 2025,
      title: "Evaluating Drought Vulnerability by the Markov Chain Model in Barind Tract of Bangladesh",
      authors: "Islam, M. A., Haque, M. M., Mohamad, N., Borkatullah, M., & Rahman, M. S.",
      venue: "Life Science Studies, 2, 07–16",
      note: "Available online January 19, 2025",
      doi: "", url: "", pdf: ""
    },
    {
      type: "journal", status: "under-review", year: 2025,
      title: "Disclosing TNBC-associated overexpressed genes for decoding their natural inhibitors from Syzygium cumini using network pharmacology approaches",
      authors: "Sheikh, H., Sarker, H., Nibir, A. R., Proma, F. A., Biswas, A., Mohamad, N., Kumar, N., & Ali, M. A.",
      venue: "BBA – Molecular Basis of Disease",
      note: "Under review",
      doi: "", url: "", pdf: ""
    },
    {
      type: "journal", status: "under-review", year: 2025,
      title: "In silico identification of natural therapeutics targeting the fusion proteins of human metapneumovirus following the emerging hMPV outbreak",
      authors: "Sheikh, H., Das, S. P. K., Ali, M. A., Saha, U., Sarker, H., Mohamad, N., & Kumar, N.",
      venue: "Journal of Molecular Graphics and Modelling",
      note: "Under review",
      doi: "", url: "", pdf: ""
    },
    {
      type: "conference", status: "presented", year: 2025,
      title: "In Silico Screening of Neem-Derived Phytochemicals as Potential Inhibitors of Nipah Virus Attachment Glycoprotein",
      authors: "Biswas, T., Mohamad, N., & Ali, M. A.",
      venue: "International Conference on Applied Statistics and Data Science (ICASDS 2025), University of Dhaka",
      note: "December 2025",
      doi: "", url: "", pdf: ""
    },
    {
      type: "conference", status: "presented", year: 2025,
      title: "Investigating the Bioactivity of Natural Compounds Targeting Human Metapneumovirus (hMPV) Infection via Viral Fusion (F) Proteins: A Network Pharmacology Approach",
      authors: "Sheikh, H., Ali, M. A., Mohamad, N., et al.",
      venue: "International Conference on Applied Statistics and Data Science (ICASDS 2025), University of Dhaka",
      note: "December 2025",
      doi: "", url: "", pdf: ""
    },
    {
      type: "conference", status: "presented", year: 2024,
      title: "Socio-Demographic and Health Factors Influencing COVID-19 Vaccine Acceptance Among Rural Women in Bangladesh",
      authors: "Mohamad, N., & Shatu, K. A.",
      venue: "24th National Conference and AGM 2024, Department of Zoology, University of Dhaka",
      note: "Nabab Nawab Ali Chowdhury Senate Bhaban",
      doi: "", url: "", pdf: ""
    }
  ],

  /* ---------- 9. Skills ---------- */
  skills: [
    {
      group: "Plant genomics & bioinformatics",
      items: ["Gene-family identification", "GEO / microarray analysis", "DEG analysis", "PPI networks", "Pathway enrichment", "GWAS", "QTL mapping"]
    },
    {
      group: "Programming & computing",
      items: ["R", "Python", "Ubuntu Linux", "Bash workflows"]
    },
    {
      group: "Computational chemistry",
      items: ["Molecular docking", "MD simulation", "DFT calculations", "Network pharmacology"]
    },
    {
      group: "Statistics",
      items: ["Meta-analysis", "Markov chain models", "Survey design", "Predictive modelling"]
    },
    {
      group: "Software",
      items: ["SPSS", "ArcGIS", "GAPIT", "BLINK"]
    }
  ],
  languages: ["Bengali (native)", "English (professional)"],

  /* ---------- 10. Projects (add more any time) ---------- */
  projects: [
    {
      title: "Drought vulnerability in the Barind Tract",
      text: "Markov chain modelling of drought states to assess vulnerability across north-western Bangladesh.",
      tags: ["Markov chain", "Climate"], link: ""
    },
    {
      title: "Natural inhibitors for TNBC",
      text: "Network pharmacology to link overexpressed triple-negative breast cancer genes with Syzygium cumini compounds.",
      tags: ["Network pharmacology", "Cancer"], link: ""
    },
    {
      title: "Anti-hMPV therapeutics in silico",
      text: "Docking and dynamics screen of natural compounds against human metapneumovirus fusion proteins.",
      tags: ["Docking", "Virology"], link: ""
    },
    {
      title: "Neem phytochemicals vs. Nipah virus",
      text: "Virtual screening of neem-derived compounds against the Nipah virus attachment glycoprotein.",
      tags: ["Virtual screening", "Nipah"], link: ""
    }
  ],

  /* ---------- 11. Workshops & training ---------- */
  workshops: [
    {
      title: "Pre-Conference Workshop on Systematic Review and Meta-Analysis",
      org: "ICRSDS4IR — International Conference on Research and Sustainable Development in the 4IR",
      date: "Dec 25, 2024",
      text: "Hands-on training in systematic search strategies, quality and bias assessment, and meta-analysis techniques."
    }
  ],

  /* ---------- 12. Leadership & volunteering ---------- */
  leadership: [
    {
      org: "Rajshahi University Higher Study Club",
      location: "Rajshahi",
      roles: [
        { title: "Senior Joint Secretary", period: "Aug 2026 – Present", text: "Co-lead club operations and coordinate higher-study seminars and events." },
        { title: "Research, Monitoring & Analytics Coordinator", period: "Oct 2025 – Aug 2026", text: "Led survey design and data analysis to evaluate student outcomes and higher-study initiatives." }
      ]
    },
    {
      org: "University Students' Association of Shelaidah (USAS)",
      location: "Shelaidah, Kushtia",
      roles: [
        { title: "Secretary", period: "Sep 2026 – Present", text: "Lead educational outreach and admission guidance for students preparing for university entrance exams." }
      ]
    },
    {
      org: "Flourish Green World Organization",
      location: "Rajshahi District",
      roles: [
        { title: "Communication Secretary", period: "Feb 2026 – Present", text: "Lead organisational communication, volunteer coordination and digital outreach." }
      ]
    },
    {
      org: "BADHAN — Voluntary Blood Donors Organization, Nawab Abdul Latif Hall unit, RU",
      location: "Rajshahi",
      roles: [
        { title: "Associate Organizing Secretary", period: "Oct 2024 – Present", text: "Organise blood donation campaigns, match donors with recipients and raise community awareness." }
      ]
    }
  ],

  /* ---------- 13. News / updates (newest first) ---------- */
  news: [
    { date: "2026-09", text: "Became Secretary of the University Students' Association of Shelaidah (USAS)." },
    { date: "2026-08", text: "Elected Senior Joint Secretary, Rajshahi University Higher Study Club." },
    { date: "2026-02", text: "Joined Flourish Green World Organization as Communication Secretary." },
    { date: "2025-12", text: "Presented two papers at ICASDS 2025, University of Dhaka." },
    { date: "2025-12", text: "Started hands-on mentorship in basic biology for bioinformatics." },
    { date: "2025-01", text: "Paper on drought vulnerability published in Life Science Studies." }
  ],

  /* ---------- 14. References ---------- */
  showReferences: true,                     // false = "Available on request"
  references: [
    {
      role: "Project Supervisor",
      name: "Dr. Mst. Papia Sultana",
      title: "Professor, Department of Statistics",
      org: "University of Rajshahi",
      email: "papia.stat@ru.ac.bd"
    },
    {
      role: "Mentor",
      name: "Dr. Md Mostofa Uddin Helal",
      title: "Postdoctoral Fellow, Dept. of Biochemistry & Molecular Biology",
      org: "University of Rajshahi",
      email: "mostofa.agr12@ru.ac.bd"
    }
  ],

  /* ---------- 15. Contact form ----------
     Free: create a form at https://formspree.io, paste its endpoint below.
     Empty = the form opens the visitor's email app instead. */
  formspreeEndpoint: "",                    // e.g. "https://formspree.io/f/abcdwxyz"

  /* ---------- 16. Optional extras ---------- */
  googleAnalyticsId: "",                    // e.g. "G-XXXXXXXXXX"
  lastUpdated: "October 2026"
};
