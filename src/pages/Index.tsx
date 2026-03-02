import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG = "https://cdn.poehali.dev/projects/1384eebe-00f7-4e79-9042-4b5e9e141ee7/files/0ae959e8-5447-451e-a9a7-705aaf96c0b6.jpg";
const MONARCH_IMG = "https://cdn.poehali.dev/projects/1384eebe-00f7-4e79-9042-4b5e9e141ee7/files/5aacbe89-e405-462d-b643-554410cd475f.jpg";
const MINECRAFT_BG = "https://cdn.poehali.dev/projects/1384eebe-00f7-4e79-9042-4b5e9e141ee7/files/6097781f-9fad-4540-b26f-185a73c1e28d.jpg";

const NAV_ITEMS = ["Главная", "Уровни", "Донаты", "Достижения", "Кабинет"];

const DONATE_LEVELS = [
  { id: 1, name: "Новичок", emoji: "🪨", color: "#9ca3af", glow: "#9ca3af", price: 99, perks: ["Звание в чате", "+5% к опыту", "Доступ к /kit starter"] },
  { id: 2, name: "Искатель", emoji: "⚔️", color: "#22c55e", glow: "#22c55e", price: 299, perks: ["Зелёный ник", "+10% к опыту", "Kit каждые 24ч", "Доступ к /fly (1ч/день)"] },
  { id: 3, name: "Элита", emoji: "💎", color: "#3b82f6", glow: "#60a5fa", price: 699, perks: ["Синий ник с эффектом", "+20% к опыту", "Kit каждые 12ч", "/fly неограничено", "Префикс [Elite]"] },
  { id: 4, name: "Легенда", emoji: "🔥", color: "#f97316", glow: "#fb923c", price: 1499, perks: ["Огненный ник", "+35% к опыту", "Kit каждые 6ч", "Уникальные питомцы", "Доступ к /god (30мин)", "Префикс [Legend]"] },
  { id: 5, name: "Монарх", emoji: "👑", color: "#a855f7", glow: "#c084fc", price: 3000, perks: ["Фиолетовый ник + частицы", "+50% ко всему", "Kit каждый час", "Безлимитный /fly", "/god без ограничений", "Эксклюзивный плащ", "Тень-компаньон", "Доступ к закрытой зоне"] },
];

const ACHIEVEMENTS = [
  { id: 1, icon: "Sword", emoji: "⚔️", name: "Первый бой", desc: "Убей первого монстра", progress: 1, max: 1, done: true },
  { id: 2, icon: "Mountain", emoji: "⛏️", name: "Горняк", desc: "Добудь 100 блоков", progress: 67, max: 100, done: false },
  { id: 3, icon: "Gem", emoji: "💎", name: "Охотник за алмазами", desc: "Найди 10 алмазов", progress: 3, max: 10, done: false },
  { id: 4, icon: "Crown", emoji: "👑", name: "Монарх теней", desc: "Получи ранг Монарх", progress: 0, max: 1, done: false },
  { id: 5, icon: "Flame", emoji: "🔥", name: "Легенда сервера", desc: "Проведи 100 часов", progress: 23, max: 100, done: false },
  { id: 6, icon: "Star", emoji: "⭐", name: "Торговец", desc: "Соверши 50 сделок", progress: 12, max: 50, done: false },
];

const QUESTS = [
  { id: 1, emoji: "🏰", name: "Построй замок", desc: "Возведи постройку из 500+ блоков", reward: "500 XP", done: false },
  { id: 2, emoji: "🐉", name: "Победи дракона", desc: "Одолей Эндер-дракона", reward: "1000 XP + Титул", done: false },
  { id: 3, emoji: "💰", name: "Богач", desc: "Накопи 10,000 монет", reward: "Уникальный предмет", done: true },
  { id: 4, emoji: "🗡️", name: "Тень Монарха", desc: "Уничтожь 1000 врагов", reward: "Ранг + Плащ", done: false },
];

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 4 + 2,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 5,
}));

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [hovered, setHovered] = useState<number | null>(null);
  const [particles, setParticles] = useState(PARTICLES);

  useEffect(() => {
    document.title = "ShadowCraft — Донат-магазин";
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0010] text-white font-['Montserrat',sans-serif] overflow-x-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Orbitron:wght@700;900&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .pixel-border { image-rendering: pixelated; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px var(--glow-color)} 50%{box-shadow:0 0 50px var(--glow-color), 0 0 80px var(--glow-color)} }
        @keyframes particle-float { 0%{transform:translateY(0) scale(1);opacity:0.7} 100%{transform:translateY(-120px) scale(0.3);opacity:0} }
        @keyframes scan-line { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes border-anim { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .shimmer-text {
          background: linear-gradient(90deg, #c084fc, #ffffff, #a855f7, #ffffff, #c084fc);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-8px) scale(1.02); }
        .pixel-btn {
          position: relative;
          image-rendering: pixelated;
          clip-path: polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px);
        }
        .shadow-glow-purple { box-shadow: 0 0 30px rgba(168,85,247,0.5), 0 0 60px rgba(168,85,247,0.2); }
        .shadow-glow-blue { box-shadow: 0 0 20px rgba(96,165,250,0.4); }
        .progress-bar { background: linear-gradient(90deg, #7c3aed, #a855f7, #c084fc); }
        .scan-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
          pointer-events: none; z-index: 1000;
        }
        .bg-hero-jin {
          background-image: url('${HERO_BG}');
          background-size: cover;
          background-position: center top;
        }
      `}</style>

      {/* Scan overlay for retro effect */}
      <div className="scan-overlay" />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-purple-400 opacity-60"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animation: `particle-float ${p.duration}s ${p.delay}s ease-in infinite`,
            }}
          />
        ))}
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(180deg, rgba(10,0,16,0.98) 0%, rgba(10,0,16,0) 100%)" }}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">👑</div>
          <span className="font-orbitron text-xl font-bold shimmer-text">SHADOWCRAFT</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`px-4 py-2 text-sm font-semibold rounded transition-all duration-200 ${
                activeSection === item
                  ? "text-purple-300 bg-purple-900/50 border border-purple-500/50"
                  : "text-gray-400 hover:text-purple-300 hover:bg-purple-900/30"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <button className="pixel-btn bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold px-5 py-2 transition-colors">
          Войти
        </button>
      </nav>

      {/* HERO SECTION */}
      {activeSection === "Главная" && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Jin-Woo BG */}
          <div className="absolute inset-0 bg-hero-jin" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,0,16,0.85) 0%, rgba(30,0,60,0.6) 50%, rgba(10,0,16,0.9) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(0deg, #0a0010 0%, transparent 100%)" }} />

          {/* Content */}
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pt-24">
            <div className="inline-block mb-4 px-4 py-1 border border-purple-500/50 rounded-full text-purple-300 text-sm font-semibold bg-purple-900/30">
              ⚔️ Сервер выживания · Подними свой уровень
            </div>
            <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="shimmer-text">СТАНЬ</span>
              <br />
              <span className="text-white">МОНАРХОМ</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Получи уникальные привилегии, прокачай свой ранг и стань легендой сервера.
              <br />
              <span className="text-purple-400 font-semibold">5 уровней</span> — от новичка до Монарха теней.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveSection("Донаты")}
                className="pixel-btn bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg px-8 py-4 transition-all shadow-glow-purple"
              >
                👑 Купить донат
              </button>
              <button
                onClick={() => setActiveSection("Уровни")}
                className="pixel-btn bg-transparent border-2 border-purple-500 hover:bg-purple-900/40 text-purple-300 font-bold text-lg px-8 py-4 transition-all"
              >
                ⚔️ Узнать о рангах
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[
                { value: "1,247", label: "Игроков онлайн" },
                { value: "89", label: "Монархов" },
                { value: "4.9★", label: "Рейтинг" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-orbitron text-2xl font-black text-purple-400">{s.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-600 text-sm animate-bounce">↓ листай</div>
        </section>
      )}

      {/* LEVELS SECTION */}
      {activeSection === "Уровни" && (
        <section className="min-h-screen pt-28 px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-4xl font-black text-white mb-3">СИСТЕМА РАНГОВ</h2>
              <p className="text-gray-400">Каждый ранг открывает новые возможности на сервере</p>
            </div>
            <div className="space-y-4">
              {DONATE_LEVELS.map((lvl, i) => (
                <div
                  key={lvl.id}
                  className="card-hover relative rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, rgba(20,0,40,0.9) 0%, rgba(40,0,70,0.5) 100%)`,
                    border: `1px solid ${lvl.color}40`,
                  }}
                  onMouseEnter={() => setHovered(lvl.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {lvl.id === 5 && (
                    <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, transparent 100%)" }} />
                  )}
                  <div className="flex items-center gap-6 p-6">
                    {/* Level number */}
                    <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl font-orbitron font-black text-2xl"
                      style={{ background: `${lvl.color}20`, border: `2px solid ${lvl.color}60`, color: lvl.color }}>
                      {i + 1}
                    </div>
                    {/* Emoji */}
                    <div className="text-4xl float-anim" style={{ filter: `drop-shadow(0 0 10px ${lvl.glow})` }}>
                      {lvl.emoji}
                    </div>
                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-orbitron text-xl font-bold" style={{ color: lvl.color }}>{lvl.name}</h3>
                        {lvl.id === 5 && <span className="text-xs bg-purple-800 text-purple-200 px-2 py-0.5 rounded-full font-semibold">ТОПОВЫЙ</span>}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {lvl.perks.slice(0, 3).map(p => (
                          <span key={p} className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">✓ {p}</span>
                        ))}
                        {lvl.perks.length > 3 && <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded">+{lvl.perks.length - 3} ещё</span>}
                      </div>
                    </div>
                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <div className="font-orbitron text-2xl font-black" style={{ color: lvl.color }}>{lvl.price}₽</div>
                      <button
                        onClick={() => setActiveSection("Донаты")}
                        className="mt-2 text-sm px-4 py-2 rounded font-semibold transition-all"
                        style={{ background: `${lvl.color}25`, color: lvl.color, border: `1px solid ${lvl.color}50` }}
                      >
                        Купить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DONATES SECTION */}
      {activeSection === "Донаты" && (
        <section className="min-h-screen pt-28 px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-4xl font-black text-white mb-3">МАГАЗИН ДОНАТА</h2>
              <p className="text-gray-400">Выбери свой путь к вершине</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {DONATE_LEVELS.map(lvl => (
                <div
                  key={lvl.id}
                  className="card-hover relative rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: "linear-gradient(180deg, rgba(20,0,40,0.95) 0%, rgba(10,0,20,0.98) 100%)",
                    border: `2px solid ${lvl.color}50`,
                    boxShadow: lvl.id === 5 ? `0 0 40px ${lvl.glow}40, 0 0 80px ${lvl.glow}15` : `0 0 20px ${lvl.glow}20`,
                  }}
                >
                  {lvl.id === 5 && (
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${lvl.color}, transparent)` }} />
                  )}
                  {lvl.id === 5 && (
                    <div className="absolute top-3 right-3 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">BEST</div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Icon */}
                    <div className="text-center mb-4">
                      <div className="text-5xl mb-3 float-anim" style={{ filter: `drop-shadow(0 0 15px ${lvl.glow})`, animationDelay: `${lvl.id * 0.3}s` }}>
                        {lvl.emoji}
                      </div>
                      <h3 className="font-orbitron text-lg font-bold" style={{ color: lvl.color }}>{lvl.name}</h3>
                    </div>
                    {/* Price */}
                    <div className="text-center mb-5">
                      <span className="font-orbitron text-3xl font-black text-white">{lvl.price}</span>
                      <span className="text-gray-400 text-lg">₽</span>
                    </div>
                    {/* Perks */}
                    <div className="flex-1 space-y-2 mb-6">
                      {lvl.perks.map(p => (
                        <div key={p} className="flex items-start gap-2 text-sm text-gray-300">
                          <span style={{ color: lvl.color }} className="mt-0.5 flex-shrink-0">✦</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                    {/* Buy btn */}
                    <button
                      className="w-full pixel-btn py-3 font-orbitron font-bold text-sm transition-all"
                      style={{
                        background: lvl.id === 5 ? `linear-gradient(135deg, #7c3aed, #a855f7)` : `${lvl.color}25`,
                        color: lvl.id === 5 ? "#ffffff" : lvl.color,
                        border: `1px solid ${lvl.color}70`,
                      }}
                    >
                      {lvl.id === 5 ? "👑 КУПИТЬ" : "КУПИТЬ"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Monarch special banner */}
            <div className="mt-12 relative rounded-2xl overflow-hidden p-8"
              style={{ background: "linear-gradient(135deg, rgba(88,28,135,0.6) 0%, rgba(30,0,60,0.9) 100%)", border: "2px solid rgba(168,85,247,0.5)" }}>
              <div className="absolute inset-0 opacity-20">
                <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <img src={MONARCH_IMG} alt="Monarch" className="w-20 h-20 rounded-xl object-cover border-2 border-purple-400 pixel-border" />
                <div className="flex-1">
                  <h3 className="font-orbitron text-2xl font-black text-purple-300 mb-2">👑 Монарх — Высший ранг</h3>
                  <p className="text-gray-300">Стань истинным Монархом теней. Эксклюзивные привилегии, уникальный внешний вид и безграничная власть на сервере.</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="font-orbitron text-4xl font-black text-purple-400 mb-2">3000₽</div>
                  <button className="pixel-btn bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3 transition-all shadow-glow-purple">
                    Стать Монархом
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ACHIEVEMENTS SECTION */}
      {activeSection === "Достижения" && (
        <section className="min-h-screen pt-28 px-4 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-orbitron text-4xl font-black text-white mb-3">ДОСТИЖЕНИЯ И КВЕСТЫ</h2>
              <p className="text-gray-400">Выполняй задания и получай награды</p>
            </div>

            {/* Achievements */}
            <h3 className="font-orbitron text-xl font-bold text-purple-400 mb-4">⭐ Достижения</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {ACHIEVEMENTS.map(ach => {
                const pct = Math.round((ach.progress / ach.max) * 100);
                return (
                  <div
                    key={ach.id}
                    className="card-hover rounded-xl p-5"
                    style={{
                      background: ach.done ? "linear-gradient(135deg, rgba(88,28,135,0.5), rgba(40,0,80,0.7))" : "linear-gradient(135deg, rgba(20,0,40,0.9), rgba(10,0,20,0.9))",
                      border: ach.done ? "1px solid rgba(168,85,247,0.6)" : "1px solid rgba(255,255,255,0.08)",
                      boxShadow: ach.done ? "0 0 20px rgba(168,85,247,0.2)" : "none",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl flex-shrink-0">{ach.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white text-sm">{ach.name}</h4>
                          {ach.done && <span className="text-xs text-purple-300">✓</span>}
                        </div>
                        <p className="text-gray-500 text-xs mb-3">{ach.desc}</p>
                        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full rounded-full progress-bar transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{ach.progress}/{ach.max}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quests */}
            <h3 className="font-orbitron text-xl font-bold text-purple-400 mb-4">📜 Активные квесты</h3>
            <div className="space-y-3">
              {QUESTS.map(q => (
                <div
                  key={q.id}
                  className="card-hover flex items-center gap-5 p-5 rounded-xl"
                  style={{
                    background: q.done ? "linear-gradient(135deg, rgba(22,101,52,0.3), rgba(10,0,20,0.8))" : "linear-gradient(135deg, rgba(20,0,40,0.9), rgba(10,0,20,0.9))",
                    border: q.done ? "1px solid rgba(34,197,94,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="text-3xl">{q.emoji}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-white flex items-center gap-2">
                      {q.name}
                      {q.done && <span className="text-xs text-green-400 font-bold">ВЫПОЛНЕНО</span>}
                    </div>
                    <div className="text-gray-500 text-sm">{q.desc}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-purple-400 font-bold text-sm">{q.reward}</div>
                    <button
                      className="mt-1 text-xs px-3 py-1.5 rounded font-semibold transition-all"
                      style={q.done
                        ? { background: "rgba(34,197,94,0.15)", color: "#86efac", border: "1px solid rgba(34,197,94,0.3)" }
                        : { background: "rgba(168,85,247,0.15)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.3)" }
                      }
                    >
                      {q.done ? "✓ Получено" : "Выполнить"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CABINET SECTION */}
      {activeSection === "Кабинет" && (
        <section className="min-h-screen pt-28 px-4 pb-16 flex items-start justify-center">
          <div className="max-w-md w-full">
            <div className="rounded-2xl overflow-hidden"
              style={{ background: "linear-gradient(180deg, rgba(20,0,40,0.95) 0%, rgba(10,0,20,0.98) 100%)", border: "1px solid rgba(168,85,247,0.3)" }}>
              {/* Profile header with Jin-Woo bg */}
              <div className="relative h-36 overflow-hidden">
                <img src={HERO_BG} alt="bg" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, rgba(20,0,40,1) 0%, transparent 70%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end gap-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-purple-400 flex items-center justify-center text-3xl"
                    style={{ background: "rgba(88,28,135,0.8)" }}>
                    ⚔️
                  </div>
                  <div>
                    <div className="font-orbitron font-bold text-white text-lg">Игрок_0001</div>
                    <div className="text-purple-400 text-sm">🪨 Новичок</div>
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Уровень", value: "12" },
                    { label: "Часов", value: "7" },
                    { label: "Монет", value: "450" },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="font-orbitron text-xl font-bold text-purple-400">{s.value}</div>
                      <div className="text-gray-500 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* XP progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Опыт до следующего уровня</span>
                    <span className="text-purple-400 font-semibold">340 / 1000 XP</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[34%] rounded-full progress-bar" />
                  </div>
                </div>

                {/* Current rank */}
                <div className="p-4 rounded-xl mb-6" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}>
                  <div className="text-sm text-gray-400 mb-1">Текущий ранг</div>
                  <div className="flex items-center justify-between">
                    <span className="font-orbitron text-gray-300 font-bold">🪨 Новичок</span>
                    <button onClick={() => setActiveSection("Донаты")} className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
                      Улучшить →
                    </button>
                  </div>
                </div>

                {/* Auth form */}
                <div className="space-y-3">
                  <input type="text" placeholder="Никнейм Minecraft" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                  <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                  <input type="password" placeholder="Пароль" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                  <button className="w-full pixel-btn bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 font-orbitron transition-all shadow-glow-purple">
                    ВОЙТИ В АККАУНТ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM NAV mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 flex"
        style={{ background: "rgba(10,0,16,0.97)", borderTop: "1px solid rgba(168,85,247,0.2)" }}>
        {NAV_ITEMS.map(item => (
          <button
            key={item}
            onClick={() => setActiveSection(item)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${activeSection === item ? "text-purple-400" : "text-gray-600"}`}
          >
            {item === "Главная" ? "🏠" : item === "Уровни" ? "⚔️" : item === "Донаты" ? "💎" : item === "Достижения" ? "⭐" : "👤"}
          </button>
        ))}
      </div>
    </div>
  );
}
