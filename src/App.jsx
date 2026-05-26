import { useState } from "react";

// Indeks hari tetap pakai 0–6 (Sun–Sat) dari Date.getDay() — JANGAN diubah
// Hanya label tampilannya yang diterjemahkan
const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const FULL_DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const COLORS = ["#1e88e5", "#00897b", "#7b1fa2", "#e64a19", "#c2185b", "#303f9f", "#00838f"];

const INIT_DOCTORS = [
  {
    id: 1, name: "Dr. Sarah Chen", specialty: "Kardiologi", exp: 15, rating: 4.9,
    edu: "Harvard Medical School", fee: 300000,
    bio: "Kardiolog bersertifikat dengan 15 tahun pengalaman di bidang kardiologi preventif dan manajemen gagal jantung. Dr. Chen memelopori teknik pemasangan stent minimal invasif yang kini digunakan di seluruh wilayah.",
    phone: "(021) 234-5678", avatar: "SC", color: "#1e88e5",
  },
  {
    id: 2, name: "Dr. Marcus Webb", specialty: "Neurologi", exp: 12, rating: 4.8,
    edu: "Johns Hopkins University", fee: 380000,
    bio: "Neurolog ahli yang fokus pada epilepsi, gangguan gerak, dan pencegahan stroke dengan pendekatan berbasis bukti ilmiah. Peneliti aktif di bidang neurosains kognitif.",
    phone: "(021) 345-6789", avatar: "MW", color: "#00897b",
  },
  {
    id: 3, name: "Dr. Priya Patel", specialty: "Pediatri", exp: 8, rating: 4.9,
    edu: "Stanford Medical School", fee: 250000,
    bio: "Dokter anak berdedikasi yang memberikan layanan kesehatan menyeluruh dari bayi baru lahir hingga remaja. Spesialisasi di bidang pediatri perkembangan dan nutrisi anak.",
    phone: "(021) 456-7890", avatar: "PP", color: "#7b1fa2",
  },
  {
    id: 4, name: "Dr. James Okafor", specialty: "Ortopedi", exp: 20, rating: 4.7,
    edu: "Mayo Clinic School of Medicine", fee: 450000,
    bio: "Ahli bedah ortopedi berpengalaman yang mengkhususkan diri pada penggantian sendi, kedokteran olahraga, dan prosedur minimal invasif. Telah berhasil melakukan lebih dari 3.000 operasi.",
    phone: "(021) 567-8901", avatar: "JO", color: "#e64a19",
  },
  {
    id: 5, name: "Dr. Elena Vasquez", specialty: "Dermatologi", exp: 10, rating: 4.8,
    edu: "Columbia University", fee: 300000,
    bio: "Dermatolog yang mengkhususkan diri pada perawatan kulit medis, bedah, dan estetik dengan keahlian mendalam dalam deteksi kanker kulit. Dikenal dengan pendekatan yang teliti dan lembut.",
    phone: "(021) 678-9012", avatar: "EV", color: "#c2185b",
  },
  {
    id: 6, name: "Dr. Robert Kim", specialty: "Gastroenterologi", exp: 14, rating: 4.6,
    edu: "Yale School of Medicine", fee: 360000,
    bio: "Gastroenterolog dengan keahlian di bidang penyakit radang usus, gangguan hati, dan prosedur endoskopi lanjutan. Terlatih di institusi internasional terkemuka.",
    phone: "(021) 789-0123", avatar: "RK", color: "#303f9f",
  },
];

// Indeks hari (days) TETAP menggunakan 0–6 sesuai Date.getDay()
const INIT_SCHEDULES = [
  { id: 1, doctorId: 1, days: [1, 3, 5], start: "09:00", end: "17:00" },
  { id: 2, doctorId: 2, days: [2, 4], start: "10:00", end: "18:00" },
  { id: 3, doctorId: 3, days: [1, 2, 3, 4, 5], start: "08:00", end: "16:00" },
  { id: 4, doctorId: 4, days: [1, 3], start: "07:00", end: "15:00" },
  { id: 5, doctorId: 5, days: [2, 4, 6], start: "09:00", end: "17:00" },
  { id: 6, doctorId: 6, days: [1, 2, 3, 4, 5], start: "11:00", end: "19:00" },
];

const SERVICES = [
  { icon: "❤️", name: "Kardiologi", desc: "Perawatan jantung komprehensif mencakup diagnostik, pencegahan, dan pengobatan penyakit kardiovaskular." },
  { icon: "🧠", name: "Neurologi", desc: "Diagnosis dan pengobatan ahli untuk gangguan yang memengaruhi otak, sumsum tulang belakang, dan sistem saraf." },
  { icon: "👶", name: "Pediatri", desc: "Layanan kesehatan lengkap untuk bayi, anak-anak, dan remaja mulai dari pemeriksaan rutin hingga perawatan khusus." },
  { icon: "🦴", name: "Ortopedi", desc: "Penanganan canggih untuk kondisi tulang, sendi, otot, dan cedera olahraga menggunakan teknik terkini." },
  { icon: "🔬", name: "Dermatologi", desc: "Perawatan kulit medis dan estetik, termasuk diagnosis dan pengobatan semua kondisi dan penyakit kulit." },
  { icon: "🫀", name: "Gastroenterologi", desc: "Perawatan khusus untuk gangguan sistem pencernaan termasuk lambung, usus, hati, dan kantong empedu." },
  { icon: "👁️", name: "Oftalmologi", desc: "Layanan mata lengkap mulai dari pemeriksaan penglihatan rutin hingga prosedur bedah dan laser terkini." },
  { icon: "🩻", name: "Radiologi", desc: "Layanan pencitraan canggih termasuk MRI, CT scan, rontgen, dan USG diagnostik." },
];

// ─── Warna & Token Desain ────────────────────────────────────────────────────
const CLR = {
  navy: "#1a3050", blue: "#0ea5e9",
  bgLight: "#f8fafc", white: "#ffffff",
  border: "#e2e8f0", textDark: "#1e293b",
  textMid: "#475569", textMute: "#94a3b8",
};

const T = {
  card: { background: CLR.white, borderRadius: 16, border: `1px solid ${CLR.border}`, overflow: "hidden" },
  input: { width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${CLR.border}`, fontSize: 14, outline: "none", boxSizing: "border-box", background: CLR.white, color: CLR.textDark },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: CLR.textDark, marginBottom: 4 },
  tag: { display: "inline-block", background: "#dbeafe", color: "#1e40af", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 14 },
  h1: { fontSize: "clamp(2.2rem,4.5vw,3.8rem)", fontWeight: 700, lineHeight: 1.1, fontFamily: "'Oswald', sans-serif", margin: 0 },
  h2: { fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 700, fontFamily: "'Oswald', sans-serif", color: CLR.navy, margin: "0 0 10px" },
  h3: { fontSize: "1.15rem", fontWeight: 700, color: CLR.navy, margin: "0 0 8px" },
  // Layout — fullscreen dengan padding horizontal
  wrap: { width: "100%", maxWidth: 1440, margin: "0 auto", padding: "0 2.5rem" },
};

function btn(variant = "primary", full = false) {
  const base = { padding: "11px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, width: full ? "100%" : "auto", fontFamily: "inherit", transition: "opacity .15s" };
  if (variant === "primary") return { ...base, background: `linear-gradient(135deg,${CLR.navy},${CLR.blue})`, color: "#fff" };
  if (variant === "outline") return { ...base, background: "transparent", color: CLR.navy, border: `2px solid ${CLR.navy}` };
  if (variant === "ghost") return { ...base, background: "#f1f5f9", color: CLR.textMid };
  if (variant === "sm") return { ...base, padding: "8px 18px", fontSize: 13, borderRadius: 8 };
  return base;
}

function badge(ok) {
  return {
    display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
    ...(ok ? { background: "#dcfce7", color: "#15803d" } : { background: "#fee2e2", color: "#dc2626" })
  };
}

// ─── Komponen Utama ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [doctors, setDoctors] = useState(INIT_DOCTORS);
  const [schedules, setSchedules] = useState(INIT_SCHEDULES);
  const [selDocId, setSelDocId] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const [search, setSearch] = useState("");
  const [filterAvail, setFilterAvail] = useState(false);

  const [apptForm, setApptForm] = useState({ doctorId: "", date: "", time: "09:00", name: "", email: "", phone: "", reason: "" });
  const [apptDone, setApptDone] = useState(null);

  const [ctForm, setCtForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [ctSent, setCtSent] = useState(false);

  const [adminTab, setAdminTab] = useState("dokter");
  const [newDoc, setNewDoc] = useState({ name: "", specialty: "", exp: "", edu: "", bio: "", phone: "", fee: "" });
  const [editDoc, setEditDoc] = useState(null);
  const [newSch, setNewSch] = useState({ doctorId: "", days: [], start: "09:00", end: "17:00" });
  const [footerClicks, setFooterClicks] = useState(0);

  // ── Logika "Available Today" — tetap pakai indeks numerik Date.getDay() ──
  const today = new Date().getDay(); // 0=Min, 1=Sen, …, 6=Sab
  const availIds = new Set(schedules.filter(s => s.days.includes(today)).map(s => s.doctorId));
  const availableToday = doctors.filter(d => availIds.has(d.id));
  const selDoc = doctors.find(d => d.id === selDocId);
  const getDrSch = id => schedules.find(s => s.doctorId === id);

  const nav = (p, docId = null) => {
    setPage(p); if (docId) setSelDocId(docId);
    setApptDone(null); setCtSent(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Doctor CRUD
  const addDoctor = () => {
    if (!newDoc.name.trim() || !newDoc.specialty.trim()) return;
    const id = Math.max(0, ...doctors.map(d => d.id)) + 1;
    const av = newDoc.name.trim().split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
    setDoctors([...doctors, { ...newDoc, id, avatar: av, color: COLORS[id % COLORS.length], exp: parseInt(newDoc.exp) || 0, fee: parseInt(newDoc.fee) || 0, rating: 4.5 }]);
    setNewDoc({ name: "", specialty: "", exp: "", edu: "", bio: "", phone: "", fee: "" });
  };
  const saveDoc = () => { setDoctors(doctors.map(d => d.id === editDoc.id ? editDoc : d)); setEditDoc(null); };
  const delDoc = id => { setDoctors(doctors.filter(d => d.id !== id)); setSchedules(schedules.filter(s => s.doctorId !== id)); };

  // Schedule CRUD
  const addSchedule = () => {
    if (!newSch.doctorId || newSch.days.length === 0) return;
    const id = Math.max(0, ...schedules.map(s => s.id)) + 1;
    const did = parseInt(newSch.doctorId);
    setSchedules([...schedules.filter(s => s.doctorId !== did), { ...newSch, id, doctorId: did }]);
    setNewSch({ doctorId: "", days: [], start: "09:00", end: "17:00" });
  };
  const delSch = id => setSchedules(schedules.filter(s => s.id !== id));
  const toggleDay = d => setNewSch(s => ({ ...s, days: s.days.includes(d) ? s.days.filter(x => x !== d) : [...s.days, d] }));

  // ── Navigasi ─────────────────────────────────────────────────────────────
  const NavBar = () => (
    <nav style={{ position: "sticky", top: 0, zIndex: 200, background: CLR.white, borderBottom: `1px solid ${CLR.border}` }}>
      <div style={{ ...T.wrap, display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => nav("home")}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg,${CLR.navy},${CLR.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16 }}>M</div>
          <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 20, color: CLR.navy }}>MedKlinik</span>
        </div>
        <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {[["home", "Beranda"], ["services", "Layanan"], ["doctors", "Dokter"], ["contact", "Kontak"]].map(([p, l]) => (
            <button key={p} style={{ padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: page === p ? 700 : 500, color: page === p ? CLR.navy : CLR.textMid, border: "none", background: page === p ? "#eff6ff" : "transparent", fontFamily: "inherit" }} onClick={() => nav(p)}>{l}</button>
          ))}
          <button style={{ ...btn("primary"), padding: "9px 22px", marginLeft: 10 }} onClick={() => nav("appointment")}>Buat Janji →</button>
        </div>
      </div>
    </nav>
  );

  // ── Halaman Beranda ───────────────────────────────────────────────────────
  const renderHome = () => (
    <>
      {/* Hero — 100% lebar layar */}
      <div style={{ width: "100%", background: `linear-gradient(135deg,#0d1b2a 0%,${CLR.navy} 55%,#1e6091 100%)`, padding: "90px 0 80px", color: "#fff" }}>
        <div style={{ ...T.wrap, display: "grid", gridTemplateColumns: "1fr 430px", gap: 64, alignItems: "center" }}>
          <div>
            <span style={{ display: "inline-block", background: "rgba(14,165,233,.18)", color: "#7dd3fc", padding: "5px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, marginBottom: 20, letterSpacing: ".5px" }}>Layanan Kesehatan Terbaik</span>
            <h1 style={{ ...T.h1, color: "#fff", marginBottom: 22 }}>Perawatan Ahli,<br />Setiap Langkah<br />Perjalanan Anda</h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,.76)", lineHeight: 1.8, marginBottom: 36, maxWidth: 540 }}>Dokter spesialis kelas dunia yang berdedikasi untuk kesehatan Anda. Buat janji temu di hari yang sama dan akses spesialis dengan mudah.</p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 52 }}>
              <button style={{ ...btn("primary"), padding: "14px 32px", fontSize: 15 }} onClick={() => nav("appointment")}>Buat Janji Temu →</button>
              <button style={{ padding: "14px 32px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.25)", fontFamily: "inherit" }} onClick={() => nav("doctors")}>Temui Dokter Kami</button>
            </div>
            <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
              {[["50rb+", "Pasien Dilayani"], ["30+", "Spesialisasi"], ["4.9★", "Rating Rata-rata"], ["15thn", "Pengalaman Rata-rata"]].map(([v, l]) => (
                <div key={l}><div style={{ fontSize: 28, fontWeight: 800, color: "#fff" }}>{v}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 3 }}>{l}</div></div>
              ))}
            </div>
          </div>

          {/* Widget Tersedia Hari Ini */}
          <div style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(12px)", borderRadius: 20, border: "1px solid rgba(255,255,255,.13)", padding: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,.1)" }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,.3)" }}></div>
              <span style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>Tersedia Hari Ini</span>
              <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,.5)", background: "rgba(255,255,255,.08)", padding: "3px 12px", borderRadius: 20 }}>{FULL_DAYS[today]}</span>
            </div>
            {availableToday.length === 0
              ? <p style={{ color: "rgba(255,255,255,.5)", fontSize: 14, textAlign: "center", padding: "20px 0" }}>Tidak ada dokter yang berpraktik hari ini.</p>
              : <>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {availableToday.slice(0, 5).map(doc => {
                    const sch = getDrSch(doc.id);
                    return (
                      <div key={doc.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 13px", background: "rgba(255,255,255,.07)", borderRadius: 12, cursor: "pointer", transition: "background .15s" }}
                        onClick={() => nav("doctor-detail", doc.id)}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.13)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.07)"}>
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: doc.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{doc.avatar}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, color: "#fff", fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.name}</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{doc.specialty}</div>
                        </div>
                        {sch && <div style={{ fontSize: 11, color: "#7dd3fc", fontWeight: 600, whiteSpace: "nowrap" }}>{sch.start}–{sch.end}</div>}
                      </div>
                    );
                  })}
                </div>
                {availableToday.length > 5 && (
                  <button style={{ width: "100%", marginTop: 10, padding: "9px", borderRadius: 10, background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }} onClick={() => nav("doctors")}>
                    +{availableToday.length - 5} dokter lainnya tersedia →
                  </button>
                )}
              </>
            }
            <div style={{ marginTop: 16, padding: "13px 15px", background: "rgba(14,165,233,.15)", borderRadius: 10, border: "1px solid rgba(14,165,233,.25)" }}>
              <div style={{ fontSize: 12, color: "#7dd3fc", fontWeight: 700, marginBottom: 4 }}>📅 Ringkasan Hari Ini</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)" }}>{availableToday.length} dari {doctors.length} dokter tersedia berpraktik</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar kepercayaan */}
      <div style={{ width: "100%", background: CLR.navy, padding: "20px 0" }}>
        <div style={{ ...T.wrap, display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 14 }}>
          {[["🏥", "Fasilitas Berteknologi Tinggi"], ["⚡", "Janji Temu Hari yang Sama"], ["🔒", "Data Pasien Terlindungi"], ["📞", "Layanan Darurat 24/7"]].map(([ico, txt]) => (
            <div key={txt} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{ico}</span>
              <span style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: 500 }}>{txt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Layanan */}
      <div style={{ width: "100%", background: CLR.bgLight, padding: "80px 0" }}>
        <div style={T.wrap}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={T.tag}>Keahlian Kami</span>
            <h2 style={{ ...T.h2, textAlign: "center" }}>Layanan Medis Komprehensif</h2>
            <p style={{ color: CLR.textMid, fontSize: 16, maxWidth: 580, margin: "0 auto" }}>Dari perawatan pencegahan hingga penanganan kompleks, kami menyediakan layanan kesehatan yang lengkap.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 22 }}>
            {SERVICES.slice(0, 6).map(svc => (
              <div key={svc.name} style={{ ...T.card, padding: 26, transition: "all .2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,48,80,.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{svc.icon}</div>
                <h3 style={T.h3}>{svc.name}</h3>
                <p style={{ color: CLR.textMid, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{svc.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button style={btn("outline")} onClick={() => nav("services")}>Lihat Semua Layanan →</button>
          </div>
        </div>
      </div>

      {/* Dokter Unggulan */}
      <div style={{ width: "100%", background: CLR.white, padding: "80px 0" }}>
        <div style={T.wrap}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div><span style={T.tag}>Tim Dokter Kami</span><h2 style={T.h2}>Temui Para Spesialis</h2></div>
            <button style={btn("outline")} onClick={() => nav("doctors")}>Semua Dokter →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 26 }}>
            {doctors.slice(0, 3).map(doc => {
              const avail = availIds.has(doc.id);
              return (
                <div key={doc.id} style={{ ...T.card, cursor: "pointer", transition: "all .2s" }}
                  onClick={() => nav("doctor-detail", doc.id)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ height: 132, background: `linear-gradient(135deg,${doc.color}18,${doc.color}30)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{ width: 76, height: 76, borderRadius: "50%", background: doc.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 26, border: "3px solid #fff" }}>{doc.avatar}</div>
                    <span style={{ ...badge(avail), position: "absolute", top: 12, right: 12 }}>{avail ? "● Hari Ini" : "● Libur"}</span>
                  </div>
                  <div style={{ padding: 22 }}>
                    <h3 style={{ ...T.h3, marginBottom: 2 }}>{doc.name}</h3>
                    <p style={{ color: CLR.blue, fontSize: 13, fontWeight: 700, margin: "0 0 6px" }}>{doc.specialty}</p>
                    <p style={{ color: CLR.textMute, fontSize: 12, margin: "0 0 18px" }}>{doc.exp} thn pengalaman · ⭐ {doc.rating}</p>
                    <button style={{ ...btn("primary"), padding: "9px 0", fontSize: 13, width: "100%" }} onClick={e => { e.stopPropagation(); nav("appointment"); }}>Buat Janji</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );

  // ── Halaman Layanan ───────────────────────────────────────────────────────
  const renderServices = () => (
    <div style={{ width: "100%", background: CLR.bgLight, padding: "80px 0" }}>
      <div style={T.wrap}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={T.tag}>Yang Kami Tawarkan</span>
          <h2 style={{ ...T.h2, textAlign: "center" }}>Layanan Medis Kami</h2>
          <p style={{ color: CLR.textMid, fontSize: 16, maxWidth: 580, margin: "0 auto" }}>Layanan kesehatan komprehensif yang ditangani oleh dokter spesialis dengan teknologi terkini.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 24 }}>
          {SERVICES.map(svc => (
            <div key={svc.name} style={{ ...T.card, padding: 30, transition: "all .2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,48,80,.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: 58, height: 58, borderRadius: 14, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 18 }}>{svc.icon}</div>
              <h3 style={T.h3}>{svc.name}</h3>
              <p style={{ color: CLR.textMid, fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{svc.desc}</p>
              <button style={{ ...btn("sm"), background: `linear-gradient(135deg,${CLR.navy},${CLR.blue})`, color: "#fff", border: "none" }} onClick={() => nav("appointment")}>Buat Konsultasi →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Halaman Daftar Dokter ─────────────────────────────────────────────────
  const renderDoctors = () => {
    const filtered = doctors.filter(d => {
      const q = search.toLowerCase();
      return (d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)) && (!filterAvail || availIds.has(d.id));
    });
    return (
      <div style={{ width: "100%", background: CLR.bgLight, padding: "80px 0" }}>
        <div style={T.wrap}>
          <div style={{ marginBottom: 44 }}>
            <span style={T.tag}>Tim Dokter</span>
            <h2 style={T.h2}>Cari Dokter</h2>
            <p style={{ color: CLR.textMid, marginBottom: 26 }}>Temukan dokter spesialis terbaik kami. Saring berdasarkan ketersediaan hari ini.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <input style={{ ...T.input, maxWidth: 380 }} placeholder="Cari nama atau spesialisasi…" value={search} onChange={e => setSearch(e.target.value)} />
              <button style={{ padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", border: `2px solid ${CLR.navy}`, background: filterAvail ? CLR.navy : "#fff", color: filterAvail ? "#fff" : CLR.navy, transition: "all .15s", fontFamily: "inherit" }} onClick={() => setFilterAvail(v => !v)}>
                {filterAvail ? "✓ " : ""}Tersedia Hari Ini ({availableToday.length})
              </button>
            </div>
          </div>
          {filtered.length === 0
            ? <div style={{ textAlign: "center", padding: 80, color: CLR.textMute, fontSize: 16 }}>Tidak ada dokter yang sesuai pencarian Anda.</div>
            : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 26 }}>
              {filtered.map(doc => {
                const avail = availIds.has(doc.id); const sch = getDrSch(doc.id);
                return (
                  <div key={doc.id} style={{ ...T.card, cursor: "pointer", transition: "all .2s" }}
                    onClick={() => nav("doctor-detail", doc.id)}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                    <div style={{ padding: "18px 22px", background: `linear-gradient(135deg,${doc.color}15,${doc.color}25)`, display: "flex", gap: 14, alignItems: "center", position: "relative" }}>
                      <div style={{ width: 58, height: 58, borderRadius: "50%", background: doc.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 20, flexShrink: 0, border: "2px solid #fff" }}>{doc.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: CLR.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.name}</div>
                        <div style={{ fontSize: 13, color: doc.color, fontWeight: 700 }}>{doc.specialty}</div>
                      </div>
                      <span style={{ ...badge(avail), position: "absolute", top: 10, right: 12, fontSize: 10 }}>{avail ? "● Hari Ini" : "● Libur"}</span>
                    </div>
                    <div style={{ padding: "16px 22px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ color: CLR.textMute, fontSize: 12 }}>⭐ {doc.rating} · {doc.exp} thn</span>
                        <span style={{ color: CLR.navy, fontWeight: 700, fontSize: 13 }}>Rp {(doc.fee).toLocaleString("id-ID")}</span>
                      </div>
                      {sch && <div style={{ fontSize: 11, color: CLR.textMid, marginBottom: 14 }}>📅 {sch.days.map(d => DAYS[d]).join(", ")} · {sch.start}–{sch.end}</div>}
                      <button style={{ ...btn("primary"), padding: "9px 0", fontSize: 13, width: "100%" }} onClick={e => { e.stopPropagation(); nav("appointment"); }}>Buat Janji</button>
                    </div>
                  </div>
                );
              })}
            </div>
          }
        </div>
      </div>
    );
  };

  // ── Halaman Detail Dokter ─────────────────────────────────────────────────
  const renderDoctorDetail = () => {
    if (!selDoc) return <div style={{ padding: 80, textAlign: "center", color: CLR.textMute }}>Dokter tidak ditemukan. <button style={btn("outline")} onClick={() => nav("doctors")}>Kembali</button></div>;
    const avail = availIds.has(selDoc.id); const sch = getDrSch(selDoc.id);
    return (
      <div style={{ width: "100%", background: CLR.bgLight, padding: "72px 0" }}>
        <div style={{ ...T.wrap, maxWidth: 980 }}>
          <button style={{ ...btn("ghost"), marginBottom: 24, padding: "9px 18px" }} onClick={() => nav("doctors")}>← Kembali ke Daftar Dokter</button>
          <div style={T.card}>
            <div style={{ background: `linear-gradient(135deg,${selDoc.color}18,${selDoc.color}35)`, padding: "44px 44px 0" }}>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-end", flexWrap: "wrap" }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", background: selDoc.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 34, border: "4px solid #fff", flexShrink: 0, marginBottom: -24 }}>{selDoc.avatar}</div>
                <div style={{ paddingBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
                    <h2 style={{ ...T.h2, fontSize: "2rem" }}>{selDoc.name}</h2>
                    <span style={badge(avail)}>{avail ? "● Tersedia Hari Ini" : "● Tidak Berpraktik Hari Ini"}</span>
                  </div>
                  <p style={{ color: selDoc.color, fontWeight: 700, fontSize: 16, margin: 0 }}>Spesialis {selDoc.specialty}</p>
                </div>
              </div>
            </div>
            <div style={{ padding: 44 }}>
              <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 52 }}>
                <div>
                  <h3 style={T.h3}>Tentang Dokter</h3>
                  <p style={{ color: CLR.textMid, lineHeight: 1.85, marginBottom: 30, fontSize: 15 }}>{selDoc.bio}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 30 }}>
                    {[["🎓", "Pendidikan", selDoc.edu], ["⭐", "Penilaian", `${selDoc.rating} / 5.0`], ["📅", "Pengalaman", `${selDoc.exp} tahun`], ["💰", "Biaya Konsultasi", `Rp ${(selDoc.fee).toLocaleString("id-ID")}`]].map(([ico, lbl, val]) => (
                      <div key={lbl} style={{ padding: 16, background: CLR.bgLight, borderRadius: 12, border: `1px solid ${CLR.border}` }}>
                        <div style={{ fontSize: 22, marginBottom: 6 }}>{ico}</div>
                        <div style={{ fontSize: 11, color: CLR.textMute, fontWeight: 700, marginBottom: 2, textTransform: "uppercase", letterSpacing: ".5px" }}>{lbl}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: CLR.navy }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <h3 style={T.h3}>Kontak</h3>
                  <p style={{ color: CLR.textMid, fontSize: 14, margin: 0 }}>📞 {selDoc.phone}</p>
                </div>
                <div>
                  <h3 style={T.h3}>Jadwal Praktik Mingguan</h3>
                  {sch
                    ? <div style={{ background: CLR.bgLight, borderRadius: 14, padding: 20, marginBottom: 22, border: `1px solid ${CLR.border}` }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                        {DAYS.map((d, i) => (
                          <span key={d} style={{
                            padding: "5px 11px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                            background: sch.days.includes(i) ? (i === today ? selDoc.color : CLR.navy) : "#e2e8f0",
                            color: sch.days.includes(i) ? "#fff" : CLR.textMute
                          }}>{d}{i === today && sch.days.includes(i) ? " ●" : ""}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: 14, color: CLR.textMid }}>🕐 Pukul {sch.start} – {sch.end} WIB</div>
                    </div>
                    : <p style={{ color: CLR.textMute, fontSize: 14, marginBottom: 20 }}>Jadwal belum tersedia.</p>
                  }
                  <button style={{ ...btn("primary"), width: "100%", padding: "13px 0", fontSize: 15 }} onClick={() => { setApptForm(f => ({ ...f, doctorId: String(selDoc.id) })); nav("appointment"); }}>Buat Janji →</button>
                  <button style={{ ...btn("ghost"), width: "100%", padding: "11px 0", fontSize: 14, marginTop: 12 }} onClick={() => nav("contact")}>Kirim Pesan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Halaman Buat Janji ────────────────────────────────────────────────────
  const renderAppointment = () => {
    const handleBook = () => {
      if (!apptForm.name.trim() || !apptForm.email.trim() || !apptForm.doctorId || !apptForm.date) { alert("Harap lengkapi semua kolom yang wajib diisi."); return; }
      const doc = doctors.find(d => d.id === parseInt(apptForm.doctorId));
      setApptDone({ name: apptForm.name, date: apptForm.date, time: apptForm.time, email: apptForm.email, doctor: doc?.name });
    };
    if (apptDone) return (
      <div style={{ width: "100%", background: CLR.bgLight, padding: "80px 0", textAlign: "center" }}>
        <div style={{ ...T.card, maxWidth: 540, margin: "0 auto", padding: 64 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 22px" }}>✅</div>
          <h2 style={{ ...T.h2, textAlign: "center", marginBottom: 14 }}>Janji Terkonfirmasi!</h2>
          <p style={{ color: CLR.textMid, lineHeight: 1.8, marginBottom: 4 }}>Halo, <strong>{apptDone.name}</strong>!</p>
          <p style={{ color: CLR.textMid, lineHeight: 1.8, marginBottom: 4 }}>Janji temu Anda dengan <strong>{apptDone.doctor}</strong></p>
          <p style={{ color: CLR.textMid, lineHeight: 1.8, marginBottom: 26 }}>telah dijadwalkan pada <strong>{apptDone.date}</strong> pukul <strong>{apptDone.time} WIB</strong>.</p>
          <p style={{ color: CLR.textMute, fontSize: 13, marginBottom: 36 }}>Konfirmasi telah dikirim ke {apptDone.email}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button style={btn("primary")} onClick={() => nav("home")}>Kembali ke Beranda</button>
            <button style={btn("outline")} onClick={() => { setApptDone(null); setApptForm({ doctorId: "", date: "", time: "09:00", name: "", email: "", phone: "", reason: "" }); }}>Buat Janji Lain</button>
          </div>
        </div>
      </div>
    );
    return (
      <div style={{ width: "100%", background: CLR.bgLight, padding: "80px 0" }}>
        <div style={{ ...T.wrap, maxWidth: 760 }}>
          <span style={T.tag}>Jadwalkan Kunjungan</span>
          <h2 style={T.h2}>Buat Janji Temu</h2>
          <p style={{ color: CLR.textMid, marginBottom: 34, fontSize: 15 }}>Isi formulir di bawah ini dan kami akan mengkonfirmasi janji Anda dalam beberapa jam.</p>
          <div style={{ ...T.card, padding: 40 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
              <div style={{ gridColumn: "span 2" }}>
                <label style={T.label}>Pilih Dokter *</label>
                <select style={T.input} value={apptForm.doctorId} onChange={e => setApptForm(f => ({ ...f, doctorId: e.target.value }))}>
                  <option value="">Pilih dokter…</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialty}{availIds.has(d.id) ? " ✓ Tersedia Hari Ini" : ""}</option>)}
                </select>
              </div>
              <div>
                <label style={T.label}>Tanggal yang Diinginkan *</label>
                <input type="date" style={T.input} value={apptForm.date} onChange={e => setApptForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label style={T.label}>Waktu yang Diinginkan</label>
                <select style={T.input} value={apptForm.time} onChange={e => setApptForm(f => ({ ...f, time: e.target.value }))}>
                  {["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"].map(t => <option key={t} value={t}>{t} WIB</option>)}
                </select>
              </div>
              <div>
                <label style={T.label}>Nama Lengkap *</label>
                <input style={T.input} placeholder="cth. Budi Santoso" value={apptForm.name} onChange={e => setApptForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div>
                <label style={T.label}>Alamat Email *</label>
                <input type="email" style={T.input} placeholder="email@contoh.com" value={apptForm.email} onChange={e => setApptForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={T.label}>Nomor Telepon / WhatsApp</label>
                <input style={T.input} placeholder="cth. 08123456789" value={apptForm.phone} onChange={e => setApptForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={T.label}>Keluhan / Alasan Kunjungan</label>
                <textarea style={{ ...T.input, height: 110, resize: "vertical" }} placeholder="Ceritakan keluhan atau alasan kunjungan Anda…" value={apptForm.reason} onChange={e => setApptForm(f => ({ ...f, reason: e.target.value }))} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <button style={{ ...btn("primary"), width: "100%", padding: "15px 0", fontSize: 15 }} onClick={handleBook}>Konfirmasi Janji Temu →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Halaman Kontak ────────────────────────────────────────────────────────
  const renderContact = () => (
    <div style={{ width: "100%", background: CLR.white, padding: "80px 0" }}>
      <div style={T.wrap}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={T.tag}>Hubungi Kami</span>
          <h2 style={{ ...T.h2, textAlign: "center" }}>Kontak</h2>
          <p style={{ color: CLR.textMid, fontSize: 16 }}>Kami siap menjawab pertanyaan Anda dan membantu Anda mendapatkan perawatan yang tepat.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <div>
            {[["📍", "Alamat", "Jl. Medika Raya No. 123\nJakarta Selatan, DKI Jakarta 12345"], ["📞", "Telepon", "(021) 100-2000"], ["✉️", "Email", "info@medklinik.co.id"], ["🕐", "Jam Operasional", "Senin–Jumat: 08.00–20.00 WIB\nSabtu: 09.00–17.00 WIB · Minggu: Darurat saja"]].map(([ico, lbl, val]) => (
              <div key={lbl} style={{ display: "flex", gap: 18, marginBottom: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{ico}</div>
                <div>
                  <div style={{ fontWeight: 700, color: CLR.navy, marginBottom: 3, fontSize: 15 }}>{lbl}</div>
                  <div style={{ color: CLR.textMid, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-line" }}>{val}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 34, background: `linear-gradient(135deg,${CLR.navy},${CLR.blue})`, borderRadius: 16, padding: 26, color: "#fff" }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>🚨 Keadaan Darurat Medis?</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.8)", lineHeight: 1.7, margin: "0 0 12px" }}>Jika Anda mengalami keadaan darurat medis, segera hubungi 119 atau pergi ke IGD terdekat.</p>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Hotline Darurat: (021) 911-0000</div>
            </div>
          </div>
          <div style={{ ...T.card, padding: 40 }}>
            {ctSent
              ? <div style={{ textAlign: "center", padding: "44px 20px" }}>
                <div style={{ fontSize: 52, marginBottom: 18 }}>📬</div>
                <h3 style={T.h3}>Pesan Terkirim!</h3>
                <p style={{ color: CLR.textMid, marginBottom: 28 }}>Tim kami akan menghubungi Anda dalam 1×24 jam.</p>
                <button style={btn("primary")} onClick={() => setCtSent(false)}>Kirim Pesan Lain</button>
              </div>
              : <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[["Nama Lengkap", "name", "text", "Nama Anda"], ["Alamat Email", "email", "email", "email@contoh.com"], ["Subjek", "subject", "text", "Bagaimana kami bisa membantu?"]].map(([lbl, key, type, ph]) => (
                  <div key={key}>
                    <label style={T.label}>{lbl}</label>
                    <input type={type} style={T.input} placeholder={ph} value={ctForm[key]} onChange={e => setCtForm(f => ({ ...f, [key]: e.target.value }))} />
                  </div>
                ))}
                <div>
                  <label style={T.label}>Pesan</label>
                  <textarea style={{ ...T.input, height: 140, resize: "vertical" }} placeholder="Tulis pesan Anda di sini…" value={ctForm.message} onChange={e => setCtForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button style={{ ...btn("primary"), width: "100%", padding: "14px 0", fontSize: 15 }} onClick={() => ctForm.name && ctForm.email && setCtSent(true)}>Kirim Pesan →</button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );

  // ── Panel Admin ───────────────────────────────────────────────────────────
  const renderAdmin = () => {
    const apiResponse = {
      endpoint: "GET /api/dokter/tersedia-hari-ini",
      tanggal: new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      hari: FULL_DAYS[today],
      jumlah: availableToday.length,
      dokter: availableToday.map(d => { const s = getDrSch(d.id); return { id: d.id, nama: d.name, spesialisasi: d.specialty, rating: d.rating, jamPraktik: s ? `${s.start}–${s.end} WIB` : null }; })
    };
    return (
      <div style={{ background: "#0f172a", minHeight: "100vh", padding: "44px 2.5rem", fontFamily: "inherit" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
            <div>
              <h2 style={{ ...T.h2, color: "#f1f5f9", marginBottom: 4 }}>⚙️ Panel Admin</h2>
              <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Kelola data dokter dan jadwal praktik · Sistem CRUD</p>
            </div>
            <button style={{ ...btn("ghost"), background: "#1e293b", color: "#f1f5f9" }} onClick={() => setShowAdmin(false)}>✕ Tutup Admin</button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "#1e293b", padding: 4, borderRadius: 12, width: "fit-content" }}>
            {[["dokter", "Dokter"], ["jadwal", "Jadwal"], ["api", "API"]].map(([key, lbl]) => (
              <button key={key} style={{ padding: "9px 26px", borderRadius: 9, cursor: "pointer", border: "none", fontSize: 14, fontWeight: 600, background: adminTab === key ? "#0ea5e9" : "transparent", color: adminTab === key ? "#fff" : "#94a3b8", fontFamily: "inherit" }} onClick={() => setAdminTab(key)}>{lbl}</button>
            ))}
          </div>

          {/* Tab: Dokter */}
          {adminTab === "dokter" && <>
            <div style={{ background: "#1e293b", borderRadius: 16, padding: 26, marginBottom: 24, border: "1px solid #334155" }}>
              <h3 style={{ color: "#f1f5f9", marginBottom: 18, fontSize: 15, fontWeight: 700 }}>➕ Tambah Dokter Baru</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(195px,1fr))", gap: 14 }}>
                {[["Nama Lengkap *", "name", "text"], ["Spesialisasi *", "specialty", "text"], ["Pengalaman (thn)", "exp", "number"], ["Pendidikan", "edu", "text"], ["No. Telepon", "phone", "text"], ["Biaya Konsultasi", "fee", "number"]].map(([lbl, key, type]) => (
                  <div key={key}>
                    <label style={{ ...T.label, color: "#94a3b8", fontSize: 12 }}>{lbl}</label>
                    <input type={type} style={{ ...T.input, background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9" }} placeholder={lbl} value={newDoc[key]} onChange={e => setNewDoc(d => ({ ...d, [key]: e.target.value }))} />
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1" }}>
                  <label style={{ ...T.label, color: "#94a3b8", fontSize: 12 }}>Biografi</label>
                  <textarea style={{ ...T.input, background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9", height: 78, resize: "vertical" }} placeholder="Biografi singkat dokter…" value={newDoc.bio} onChange={e => setNewDoc(d => ({ ...d, bio: e.target.value }))} />
                </div>
              </div>
              <button style={{ ...btn("primary"), marginTop: 18 }} onClick={addDoctor}>Simpan Dokter</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {doctors.map(doc => (
                <div key={doc.id} style={{ background: "#1e293b", borderRadius: 14, border: "1px solid #334155", overflow: "hidden" }}>
                  {editDoc?.id === doc.id
                    ? <div style={{ padding: 22 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(185px,1fr))", gap: 12, marginBottom: 14 }}>
                        {[["Nama", "name"], ["Spesialisasi", "specialty"], ["Pengalaman", "exp"], ["Pendidikan", "edu"], ["Telepon", "phone"], ["Biaya", "fee"]].map(([lbl, key]) => (
                          <div key={key}>
                            <label style={{ ...T.label, color: "#94a3b8", fontSize: 12 }}>{lbl}</label>
                            <input style={{ ...T.input, background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9", padding: "8px 12px", fontSize: 13 }} value={editDoc[key] || ""} onChange={e => setEditDoc(d => ({ ...d, [key]: e.target.value }))} />
                          </div>
                        ))}
                        <div style={{ gridColumn: "1/-1" }}>
                          <label style={{ ...T.label, color: "#94a3b8", fontSize: 12 }}>Biografi</label>
                          <textarea style={{ ...T.input, background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9", height: 64, resize: "vertical", fontSize: 13 }} value={editDoc.bio || ""} onChange={e => setEditDoc(d => ({ ...d, bio: e.target.value }))} />
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <button style={{ ...btn("primary"), padding: "8px 22px", fontSize: 13 }} onClick={saveDoc}>Simpan Perubahan</button>
                        <button style={{ ...btn("ghost"), padding: "8px 22px", fontSize: 13, background: "#334155", color: "#94a3b8" }} onClick={() => setEditDoc(null)}>Batal</button>
                      </div>
                    </div>
                    : <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 22px" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: doc.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{doc.avatar}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 14 }}>{doc.name}</div>
                        <div style={{ color: "#64748b", fontSize: 12 }}>Sp. {doc.specialty} · {doc.exp} thn · Rp {(doc.fee).toLocaleString("id-ID")} · ⭐{doc.rating}</div>
                      </div>
                      <span style={{ ...badge(availIds.has(doc.id)), fontSize: 11 }}>{availIds.has(doc.id) ? "Hari Ini" : "Libur"}</span>
                      <button style={{ padding: "6px 16px", borderRadius: 8, cursor: "pointer", border: "1px solid #475569", background: "transparent", color: "#94a3b8", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }} onClick={() => setEditDoc({ ...doc })}>Edit</button>
                      <button style={{ padding: "6px 16px", borderRadius: 8, cursor: "pointer", border: "1px solid #ef4444", background: "transparent", color: "#ef4444", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }} onClick={() => window.confirm(`Hapus ${doc.name}?`) && delDoc(doc.id)}>Hapus</button>
                    </div>
                  }
                </div>
              ))}
            </div>
          </>}

          {/* Tab: Jadwal */}
          {adminTab === "jadwal" && <>
            <div style={{ background: "#1e293b", borderRadius: 16, padding: 26, marginBottom: 24, border: "1px solid #334155" }}>
              <h3 style={{ color: "#f1f5f9", marginBottom: 18, fontSize: 15, fontWeight: 700 }}>➕ Atur Jadwal Praktik</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
                <div>
                  <label style={{ ...T.label, color: "#94a3b8" }}>Dokter *</label>
                  <select style={{ ...T.input, background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9" }} value={newSch.doctorId} onChange={e => setNewSch(s => ({ ...s, doctorId: e.target.value }))}>
                    <option value="">Pilih dokter…</option>
                    {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ ...T.label, color: "#94a3b8" }}>Mulai Praktik</label>
                  <input type="time" style={{ ...T.input, background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9" }} value={newSch.start} onChange={e => setNewSch(s => ({ ...s, start: e.target.value }))} />
                </div>
                <div>
                  <label style={{ ...T.label, color: "#94a3b8" }}>Selesai Praktik</label>
                  <input type="time" style={{ ...T.input, background: "#0f172a", border: "1px solid #334155", color: "#f1f5f9" }} value={newSch.end} onChange={e => setNewSch(s => ({ ...s, end: e.target.value }))} />
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ ...T.label, color: "#94a3b8", marginBottom: 10 }}>Hari Praktik *</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {DAYS.map((d, i) => (
                    <button key={d} style={{ padding: "8px 16px", borderRadius: 8, cursor: "pointer", border: "none", fontSize: 13, fontWeight: 700, background: newSch.days.includes(i) ? "#0ea5e9" : "#334155", color: newSch.days.includes(i) ? "#fff" : "#94a3b8", fontFamily: "inherit" }} onClick={() => toggleDay(i)}>{d}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <button style={btn("primary")} onClick={addSchedule}>Simpan Jadwal</button>
                <span style={{ fontSize: 12, color: "#475569" }}>* Menggantikan jadwal yang sudah ada untuk dokter terpilih</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {schedules.map(sch => {
                const doc = doctors.find(d => d.id === sch.doctorId); const isToday = sch.days.includes(today);
                return (
                  <div key={sch.id} style={{ display: "flex", alignItems: "center", gap: 16, background: "#1e293b", borderRadius: 14, padding: "17px 22px", border: "1px solid #334155" }}>
                    {doc && <div style={{ width: 42, height: 42, borderRadius: 9, background: doc.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{doc.avatar}</div>}
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 14 }}>{doc?.name || "Tidak diketahui"}</div>
                      <div style={{ color: "#64748b", fontSize: 12 }}>Praktik: {sch.days.map(d => DAYS[d]).join(", ")} · {sch.start}–{sch.end} WIB</div>
                    </div>
                    <span style={{ ...badge(isToday), fontSize: 11 }}>{isToday ? "Tersedia Hari Ini" : "Libur Hari Ini"}</span>
                    <button style={{ padding: "6px 16px", borderRadius: 8, cursor: "pointer", border: "1px solid #ef4444", background: "transparent", color: "#ef4444", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }} onClick={() => delSch(sch.id)}>Hapus</button>
                  </div>
                );
              })}
            </div>
          </>}

          {/* Tab: API */}
          {adminTab === "api" && (
            <div style={{ background: "#1e293b", borderRadius: 16, padding: 30, border: "1px solid #334155" }}>
              <h3 style={{ color: "#f1f5f9", marginBottom: 8, fontSize: 15, fontWeight: 700 }}>📡 Endpoint: Dokter Tersedia Hari Ini</h3>
              <p style={{ color: "#64748b", fontSize: 13, marginBottom: 22 }}>GET /api/dokter/tersedia-hari-ini — Mengembalikan dokter yang berpraktik pada {FULL_DAYS[today]}</p>
              <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
                <div style={{ padding: "10px 18px", background: "#0f172a", borderRadius: 8, fontSize: 13, color: "#22c55e", fontWeight: 700 }}>200 OK</div>
                <div style={{ padding: "10px 18px", background: "#0f172a", borderRadius: 8, fontSize: 13, color: "#94a3b8" }}>Content-Type: application/json</div>
                <div style={{ padding: "10px 18px", background: "rgba(14,165,233,.15)", borderRadius: 8, fontSize: 13, color: "#7dd3fc", fontWeight: 600 }}>{availableToday.length} dokter tersedia</div>
              </div>
              <pre style={{ background: "#0f172a", borderRadius: 12, padding: 22, fontSize: 12, color: "#a5f3fc", overflow: "auto", margin: 0, lineHeight: 1.65 }}>{JSON.stringify(apiResponse, null, 2)}</pre>
              <div style={{ marginTop: 22, padding: 18, background: "#0f172a", borderRadius: 10, border: "1px solid #334155" }}>
                <div style={{ color: "#64748b", fontSize: 12, marginBottom: 10, fontWeight: 700, letterSpacing: ".5px" }}>ENDPOINT LAINNYA</div>
                {["GET    /api/dokter", "GET    /api/dokter/:id", "POST   /api/dokter", "PUT    /api/dokter/:id", "DELETE /api/dokter/:id", "GET    /api/jadwal", "POST   /api/jadwal", "PUT    /api/jadwal/:id", "DELETE /api/jadwal/:id", "GET    /api/dokter/tersedia-hari-ini"].map(ep => (
                  <div key={ep} style={{ fontSize: 13, color: "#94a3b8", padding: "5px 0", fontFamily: "monospace" }}>{ep}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── Footer ────────────────────────────────────────────────────────────────
  const Footer = () => (
    <footer style={{ width: "100%", background: "#0f172a", color: "#94a3b8", padding: "60px 0 28px" }}>
      <div style={T.wrap}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 52, marginBottom: 52 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `linear-gradient(135deg,${CLR.navy},${CLR.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>M</div>
              <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: 19, color: "#f1f5f9" }}>MedKlinik</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#64748b", maxWidth: 300 }}>Memberikan layanan kesehatan yang penuh kasih dan ahli kepada masyarakat selama lebih dari 20 tahun.</p>
          </div>
          {[
            ["Layanan", SERVICES.slice(0, 4).map(s => s.name)],
            ["Dokter", ["Cari Dokter", "Buat Janji", "Profil Spesialis", "Jadwal Praktik"]],
            ["Kontak", ["(021) 100-2000", "info@medklinik.co.id", "Jl. Medika Raya 123", "Darurat: (021) 911-0000"]],
          ].map(([title, items]) => (
            <div key={title}>
              <div style={{ color: "#f1f5f9", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>{title}</div>
              {items.map(item => <div key={item} style={{ fontSize: 13, color: "#64748b", marginBottom: 9 }}>{item}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1e293b", paddingTop: 26, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 13, color: "#334155", cursor: "default", userSelect: "none" }}
            onClick={() => { const n = footerClicks + 1; setFooterClicks(n); if (n >= 3) { setShowAdmin(true); setFooterClicks(0); } }}>
            © 2026 MedKlinik. Seluruh hak cipta dilindungi.{footerClicks > 0 ? <span style={{ color: "#1e293b" }}>{" ●".repeat(footerClicks)}</span> : null}
          </div>
          <div style={{ fontSize: 12, color: "#1e293b" }}>Data Pasien Terlindungi · SSL Terenkripsi · Berdiri 2006</div>
        </div>
      </div>
    </footer>
  );

  // ── Render Utama ──────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Source Sans 3',system-ui,sans-serif", color: CLR.textDark, background: CLR.bgLight, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        button,input,select,textarea{font-family:inherit;}
        input::placeholder,textarea::placeholder{color:#94a3b8;}
        select option{background:#fff;color:#1e293b;}
        @media(max-width:900px){
          .grid-2{grid-template-columns:1fr!important;}
        }
        @media(max-width:640px){
          .hide-sm{display:none!important;}
        }
      `}</style>
      {showAdmin
        ? renderAdmin()
        : <>
          <NavBar />
          {page === "home" && renderHome()}
          {page === "services" && renderServices()}
          {page === "doctors" && renderDoctors()}
          {page === "doctor-detail" && renderDoctorDetail()}
          {page === "appointment" && renderAppointment()}
          {page === "contact" && renderContact()}
          <Footer />
        </>
      }
    </div>
  );
}
