const { useState, useEffect, useMemo, useRef } = React;

// -------------------------------------------------------------------
// SVG Icons Library (Telegram Desktop Style, Minimalist & Crisp)
// -------------------------------------------------------------------
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" />
    </svg>
  ),
  Layers: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  BookOpen: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  CheckCircle: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Bot: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  Wallet: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Eye: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  EyeOff: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
  ),
  Search: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Send: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  Bell: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Calendar: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Close: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Alert: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  Telegram: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.27-5.61 3.72-.53.36-1.01.54-1.44.53-.47-.01-1.38-.27-2.06-.49-.83-.27-1.49-.42-1.43-.88.03-.24.38-.49 1.03-.75 4.04-1.76 6.74-2.92 8.09-3.49 3.85-1.61 4.65-1.89 5.17-1.9.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.21-.04.38z"/>
    </svg>
  ),
  Refresh: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Paperclip: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Camera: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  ShieldCheck: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  TrendingUp: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
};

// -------------------------------------------------------------------
// Helper: Format Money
// -------------------------------------------------------------------
function formatMoney(amount, currency = '₽') {
  if (amount === undefined || amount === null) return `0 ${currency}`;
  return `${Number(amount).toLocaleString('ru-RU')} ${currency}`;
}

// -------------------------------------------------------------------
// Mini Donut Chart Component
// -------------------------------------------------------------------
function DonutChart({ percentage = 75, color = '#2481cc', size = 68, strokeWidth = 7, label = '' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safePercent = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (safePercent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-800"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          {label || `${safePercent}%`}
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// MAIN APP COMPONENT
// -------------------------------------------------------------------
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // BANKING PRIVACY SYSTEM
  // Default state: ALWAYS HIDDEN upon opening and reload!
  const [financialPrivacy, setFinancialPrivacy] = useState(true);
  const [revealedItems, setRevealedItems] = useState(new Set());

  const toggleItemPrivacy = (id) => {
    setRevealedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleGlobalPrivacy = () => {
    setFinancialPrivacy(prev => !prev);
    setRevealedItems(new Set()); // Reset individual reveals
  };

  // Data states
  const [stats, setStats] = useState(null);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [settings, setSettings] = useState({});
  const [logs, setLogs] = useState([]);

  // Selected group for Groups view
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  // Modals state
  const [modalStudent, setModalStudent] = useState(null); // 'create' | student object
  const [modalGroup, setModalGroup] = useState(null); // 'create' | group object
  const [modalHomework, setModalHomework] = useState(false);
  const [modalMarkPaid, setModalMarkPaid] = useState(null); // student object
  const [modalReview, setModalReview] = useState(null); // submission object
  const [modalTelegramCode, setModalTelegramCode] = useState(null); // student object
  const [modalStudentCard, setModalStudentCard] = useState(null); // student object for detailed dossier
  const [modalTierStudents, setModalTierStudents] = useState(null); // tier object for interactive chart

  // Filter states
  const [studentSearch, setStudentSearch] = useState('');
  const [studentGroupFilter, setStudentGroupFilter] = useState('');
  const [studentStatusFilter, setStudentStatusFilter] = useState('');
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState('all');

  // Simulator state
  const [simStudentId, setSimStudentId] = useState(1);
  const [simMessages, setSimMessages] = useState([]);
  const [simActiveHw, setSimActiveHw] = useState(null);
  const [simInput, setSimInput] = useState('');
  const [simAttachment, setSimAttachment] = useState('');

  // Toast Notification
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Load All Data
  const loadData = async () => {
    try {
      setLoading(true);
      const [sRes, gRes, stRes, hRes, subRes, pRes, setRes, lRes] = await Promise.all([
        fetch('/api/stats').then(r => r.json()).catch(() => null),
        fetch('/api/groups').then(r => r.json()).catch(() => []),
        fetch('/api/students').then(r => r.json()).catch(() => []),
        fetch('/api/homework').then(r => r.json()).catch(() => []),
        fetch('/api/submissions').then(r => r.json()).catch(() => []),
        fetch('/api/payments').then(r => r.json()).catch(() => []),
        fetch('/api/settings').then(r => r.json()).catch(() => ({})),
        fetch('/api/logs').then(r => r.json()).catch(() => [])
      ]);
      setStats(sRes);
      setGroups(gRes || []);
      setStudents(stRes || []);
      setHomeworks(hRes || []);
      setSubmissions(subRes || []);
      setPayments(pRes || []);
      setSettings(setRes || {});
      setLogs(lRes || []);

      if (gRes && gRes.length > 0 && !selectedGroupId) {
        setSelectedGroupId(gRes[0].id);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      showToast('Ошибка загрузки данных', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Simulator Loading
  const loadSimulator = async (studentId) => {
    if (!studentId) return;
    try {
      const res = await fetch(`/api/simulator/messages?student_id=${studentId}`).then(r => r.json());
      setSimMessages(res.messages || []);
      setSimActiveHw(res.activeHomework || null);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (activeTab === 'bot' && simStudentId) {
      loadSimulator(simStudentId);
    }
  }, [activeTab, simStudentId]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const currency = settings.currency || '₽';

  // Urgent payment reminders list
  const urgentStudents = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    return students.filter(s => {
      if (s.payment_status === 'paid') return false;
      return s.payment_due_date === tomorrow || s.payment_due_date === today || s.payment_status === 'overdue';
    });
  }, [students]);

  // Reminder trigger
  const handleSendReminder = async (studentId) => {
    try {
      const res = await fetch(`/api/students/${studentId}/send-reminder`, { method: 'POST' }).then(r => r.json());
      if (res.success) {
        showToast('🔔 Напоминание отправлено в Telegram!');
        loadData();
        if (simStudentId === studentId) loadSimulator(studentId);
      }
    } catch (e) {
      showToast('Ошибка отправки напоминания', 'error');
    }
  };

  const handleRunRemindersCheck = async () => {
    try {
      const res = await fetch('/api/telegram/check-reminders', { method: 'POST' }).then(r => r.json());
      showToast(`✅ Проверка завершена! Напоминаний отправлено: ${res.remindersSent}`);
      loadData();
      if (simStudentId) loadSimulator(simStudentId);
    } catch (e) {
      showToast('Ошибка при запуске проверки', 'error');
    }
  };

  // Privacy Render Money Helper (BANKING STYLE)
  const renderMoney = (amount, cur = currency, itemId = null) => {
    const isMasked = financialPrivacy && (!itemId || !revealedItems.has(itemId));
    return (
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        {isMasked ? (
          <span className="privacy-masked">••••••••</span>
        ) : (
          <span className="font-bold">{formatMoney(amount, cur)}</span>
        )}
        {itemId && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleItemPrivacy(itemId);
            }}
            className="p-1 text-slate-400 hover:text-[#2481cc] transition-colors rounded"
            title={isMasked ? 'Показать сумму' : 'Скрыть сумму'}
          >
            {isMasked ? <Icons.Eye /> : <Icons.EyeOff />}
          </button>
        )}
      </span>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f4f5] dark:bg-[#0e1621] text-slate-800 dark:text-slate-100 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border transition-all duration-200 ${
          toast.type === 'error'
            ? 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
        }`}>
          {toast.type === 'error' ? <Icons.Alert /> : <Icons.Check />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TELEGRAM DESKTOP VERTICAL SIDEBAR (LEFT)                     */}
      {/* ------------------------------------------------------------- */}
      <aside className={`flex flex-col bg-white dark:bg-[#17212b] border-r border-slate-200 dark:border-slate-800/80 transition-all duration-300 z-30 select-none ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } hidden md:flex`}>
        {/* Sidebar Brand & Collapse Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 min-w-10 rounded-2xl bg-gradient-to-tr from-[#2481cc] to-[#3aa5dc] flex items-center justify-center text-white shadow-md shadow-[#2481cc]/25">
              <Icons.Telegram />
            </div>
            {!sidebarCollapsed && (
              <div className="leading-tight truncate">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">
                  {settings.school_name || 'LinguaPro'}
                </span>
                <span className="block text-[11px] font-medium text-slate-400">
                  CRM • Telegram
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={sidebarCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
          >
            <Icons.Menu />
          </button>
        </div>

        {/* Sidebar Main Navigation Items (Telegram Desktop Chat-Style Items) */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', label: 'Обзор', icon: Icons.Dashboard },
            { id: 'groups', label: 'Группы', icon: Icons.Layers, badge: groups.length },
            { id: 'students', label: 'Ученики', icon: Icons.Users, badge: students.length },
            { id: 'homework', label: 'Домашние задания', icon: Icons.BookOpen, badge: homeworks.length },
            { 
              id: 'submissions', 
              label: 'Проверка ДЗ', 
              icon: Icons.CheckCircle, 
              badge: stats?.pendingSubmissions > 0 ? stats.pendingSubmissions : null,
              badgeColor: 'bg-rose-500 text-white'
            },
            { id: 'bot', label: 'Telegram Bot', icon: Icons.Bot, highlight: true }
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                  isActive
                    ? 'bg-[#2481cc] text-white shadow-sm shadow-[#2481cc]/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#242f3d] hover:text-slate-900 dark:hover:text-white'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'}`}>
                  <Icon />
                </div>
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge !== undefined && item.badge !== null && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    item.badgeColor || (isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400')
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.highlight && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* FINANCIAL SECTIONS AT THE VERY BOTTOM OF SIDEBAR (Requirement #2) */}
        <div className="p-2 border-t border-slate-100 dark:border-slate-800/60 space-y-1">
          {!sidebarCollapsed && (
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Финансы & Конфиденциальность
            </div>
          )}

          {/* Finances tab button */}
          <button
            onClick={() => setActiveTab('finances')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'finances'
                ? 'bg-[#2481cc] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#242f3d]'
            }`}
            title="Финансы & Оплаты"
          >
            <div className={`p-1 rounded-lg ${activeTab === 'finances' ? 'text-white' : 'text-emerald-500'}`}>
              <Icons.Wallet />
            </div>
            {!sidebarCollapsed && <span className="flex-1 text-left truncate">Финансы & Оплаты</span>}
          </button>

          {/* Banking Privacy Eye Toggle in Sidebar (Requirement #3) */}
          <button
            onClick={toggleGlobalPrivacy}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              financialPrivacy
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300'
            }`}
            title={financialPrivacy ? 'Финансы скрыты (Банковский режим). Нажмите для показа' : 'Финансы открыты. Нажмите для скрытия'}
          >
            <div className="p-0.5">
              {financialPrivacy ? <Icons.EyeOff /> : <Icons.Eye />}
            </div>
            {!sidebarCollapsed && (
              <span className="flex-1 text-left text-[11px] font-bold">
                {financialPrivacy ? 'Скрыть финансы' : 'Финансы видны'}
              </span>
            )}
          </button>

          {/* Teacher Profile Card & Theme Toggle */}
          <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between px-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200">
                  АС
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#17212b]"></span>
              </div>
              {!sidebarCollapsed && (
                <div className="truncate">
                  <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                    {settings.teacher_name || 'Анна Сергеевна'}
                  </div>
                  <div className="text-[10px] text-slate-400">Преподаватель</div>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
                title="Переключить тему"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT WRAPPER                                         */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 bg-white dark:bg-[#17212b] border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between z-20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Icons.Menu />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                {activeTab === 'dashboard' && 'Аналитическая панель'}
                {activeTab === 'groups' && 'Учебные группы & Календарь'}
                {activeTab === 'students' && 'База учеников'}
                {activeTab === 'homework' && 'Домашние задания'}
                {activeTab === 'submissions' && 'Проверка домашних заданий'}
                {activeTab === 'finances' && 'Финансы & История платежей'}
                {activeTab === 'bot' && 'Telegram Bot & Симулятор'}
              </h1>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                LinguaPro Center • Telegram Desktop Experience
              </span>
            </div>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Banking Privacy Toggle Eye Button */}
            <button
              onClick={toggleGlobalPrivacy}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                financialPrivacy
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-900/60 text-amber-800 dark:text-amber-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-200'
              }`}
              title={financialPrivacy ? 'Финансовые данные скрыты (Bank Privacy). Нажмите, чтобы показать' : 'Финансовые данные открыты. Нажмите, чтобы скрыть'}
            >
              {financialPrivacy ? <Icons.EyeOff /> : <Icons.Eye />}
              <span className="hidden sm:inline">
                {financialPrivacy ? 'Конфиденциальность вкл.' : 'Данные видны'}
              </span>
            </button>

            {/* Quick action: Send Homework */}
            <button
              onClick={() => setModalHomework(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#2481cc] hover:bg-[#1d73b8] text-white shadow-sm shadow-[#2481cc]/25 transition-all"
            >
              <Icons.Send />
              <span className="hidden sm:inline">Отправить ДЗ</span>
            </button>

            {/* Quick action: Add Student with 3:4 photo */}
            <button
              onClick={() => setModalStudent('create')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-[#242f3d] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
            >
              <Icons.Plus />
              <span className="hidden sm:inline">Ученик</span>
            </button>

            <button
              onClick={loadData}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Обновить данные"
            >
              <Icons.Refresh />
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-xs">
            <div className="w-64 bg-white dark:bg-[#17212b] p-4 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-900 dark:text-white">LinguaPro Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400"><Icons.X /></button>
                </div>
                <div className="py-3 space-y-1">
                  {[
                    { id: 'dashboard', label: 'Обзор', icon: Icons.Dashboard },
                    { id: 'groups', label: 'Группы', icon: Icons.Layers },
                    { id: 'students', label: 'Ученики', icon: Icons.Users },
                    { id: 'homework', label: 'Домашние задания', icon: Icons.BookOpen },
                    { id: 'submissions', label: 'Проверка ДЗ', icon: Icons.CheckCircle },
                    { id: 'bot', label: 'Telegram Bot', icon: Icons.Bot },
                    { id: 'finances', label: 'Финансы & Оплаты', icon: Icons.Wallet }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => { setActiveTab(m.id); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                        activeTab === m.id ? 'bg-[#2481cc] text-white' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          {loading && !stats ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
              <div className="w-8 h-8 border-2 border-[#2481cc] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-medium">Загрузка данных CRM...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <AnalyticsDashboardView
                  stats={stats}
                  currency={currency}
                  urgentStudents={urgentStudents}
                  submissions={submissions}
                  renderMoney={renderMoney}
                  setActiveTab={setActiveTab}
                  setModalHomework={setModalHomework}
                  setModalStudent={setModalStudent}
                  setModalReview={setModalReview}
                  setModalMarkPaid={setModalMarkPaid}
                  setModalStudentCard={setModalStudentCard}
                  setModalTierStudents={setModalTierStudents}
                  handleSendReminder={handleSendReminder}
                  handleRunRemindersCheck={handleRunRemindersCheck}
                />
              )}

              {activeTab === 'groups' && (
                <GroupsTelegramView
                  groups={groups}
                  students={students}
                  selectedGroupId={selectedGroupId}
                  setSelectedGroupId={setSelectedGroupId}
                  currency={currency}
                  renderMoney={renderMoney}
                  setModalGroup={setModalGroup}
                  setModalHomework={setModalHomework}
                  setModalStudentCard={setModalStudentCard}
                  loadData={loadData}
                  showToast={showToast}
                />
              )}

              {activeTab === 'students' && (
                <StudentsDirectoryView
                  students={students}
                  groups={groups}
                  currency={currency}
                  renderMoney={renderMoney}
                  search={studentSearch}
                  setSearch={setStudentSearch}
                  groupFilter={studentGroupFilter}
                  setGroupFilter={setStudentGroupFilter}
                  statusFilter={studentStatusFilter}
                  setStatusFilter={setStudentStatusFilter}
                  setModalStudent={setModalStudent}
                  setModalMarkPaid={setModalMarkPaid}
                  setModalTelegramCode={setModalTelegramCode}
                  setModalStudentCard={setModalStudentCard}
                  handleSendReminder={handleSendReminder}
                  loadData={loadData}
                  showToast={showToast}
                />
              )}

              {activeTab === 'homework' && (
                <HomeworkView
                  homeworks={homeworks}
                  groups={groups}
                  setModalHomework={setModalHomework}
                  setActiveTab={setActiveTab}
                  loadData={loadData}
                  showToast={showToast}
                />
              )}

              {activeTab === 'submissions' && (
                <SubmissionsView
                  submissions={submissions}
                  filter={submissionStatusFilter}
                  setFilter={setSubmissionStatusFilter}
                  setModalReview={setModalReview}
                />
              )}

              {activeTab === 'finances' && (
                <FinancesLedgerView
                  stats={stats}
                  payments={payments}
                  currency={currency}
                  renderMoney={renderMoney}
                  setModalStudent={setModalStudent}
                />
              )}

              {activeTab === 'bot' && (
                <TelegramBotView
                  settings={settings}
                  students={students}
                  logs={logs}
                  simStudentId={simStudentId}
                  setSimStudentId={setSimStudentId}
                  simMessages={simMessages}
                  simActiveHw={simActiveHw}
                  simInput={simInput}
                  setSimInput={setSimInput}
                  simAttachment={simAttachment}
                  setSimAttachment={setSimAttachment}
                  loadSimulator={loadSimulator}
                  loadData={loadData}
                  showToast={showToast}
                  handleRunRemindersCheck={handleRunRemindersCheck}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODALS & DRAWERS                                              */}
      {/* ------------------------------------------------------------- */}
      {/* 1. Add/Edit Student with 3:4 Photo Support */}
      {modalStudent && (
        <StudentModal
          student={modalStudent === 'create' ? null : modalStudent}
          groups={groups}
          currency={currency}
          onClose={() => setModalStudent(null)}
          onSuccess={() => {
            setModalStudent(null);
            loadData();
            showToast('Ученик сохранен!');
          }}
        />
      )}

      {/* 2. Detailed Student Card Modal */}
      {modalStudentCard && (
        <StudentCardModal
          student={modalStudentCard}
          groups={groups}
          submissions={submissions}
          payments={payments}
          currency={currency}
          renderMoney={renderMoney}
          onClose={() => setModalStudentCard(null)}
          onEdit={(s) => {
            setModalStudentCard(null);
            setModalStudent(s);
          }}
          onMarkPaid={(s) => {
            setModalStudentCard(null);
            setModalMarkPaid(s);
          }}
          onSendReminder={(id) => handleSendReminder(id)}
        />
      )}

      {/* 3. Interactive Academic Tier Students Modal */}
      {modalTierStudents && (
        <TierStudentsModal
          tier={modalTierStudents}
          onClose={() => setModalTierStudents(null)}
          onSelectStudent={(st) => {
            setModalTierStudents(null);
            const fullStudent = students.find(s => s.id === st.id) || st;
            setModalStudentCard(fullStudent);
          }}
        />
      )}

      {/* 4. Create/Edit Group Modal */}
      {modalGroup && (
        <GroupModal
          group={modalGroup === 'create' ? null : modalGroup}
          onClose={() => setModalGroup(null)}
          onSuccess={() => {
            setModalGroup(null);
            loadData();
            showToast('Группа сохранена!');
          }}
        />
      )}

      {/* 5. Create Homework Modal */}
      {modalHomework && (
        <CreateHomeworkModal
          groups={groups}
          defaultGroupId={typeof modalHomework === 'number' ? modalHomework : null}
          onClose={() => setModalHomework(false)}
          onSuccess={(res) => {
            setModalHomework(false);
            loadData();
            showToast(`🚀 Задание отправлено в Telegram (${res.broadcast?.count || 0} ученикам)!`);
          }}
        />
      )}

      {/* 6. Mark Paid Modal */}
      {modalMarkPaid && (
        <MarkPaidModal
          student={modalMarkPaid}
          currency={currency}
          onClose={() => setModalMarkPaid(null)}
          onSuccess={() => {
            setModalMarkPaid(null);
            loadData();
            showToast('✅ Оплата зафиксирована и подтверждена в боте!');
          }}
        />
      )}

      {/* 7. Review Submission Modal */}
      {modalReview && (
        <ReviewSubmissionModal
          submission={modalReview}
          onClose={() => setModalReview(null)}
          onSuccess={() => {
            setModalReview(null);
            loadData();
            showToast('⭐️ Оценка отправлена ученику в Telegram!');
          }}
        />
      )}

      {/* 8. Telegram Code Invite Modal */}
      {modalTelegramCode && (
        <TelegramCodeModal
          student={modalTelegramCode}
          botUsername={settings.bot_username || 'doomhex23_bot'}
          onClose={() => setModalTelegramCode(null)}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------------
// SECTION 5: ANALYTICS DASHBOARD VIEW (2 ROWS OF 3 CHARTS)
// -------------------------------------------------------------------
function AnalyticsDashboardView({
  stats,
  currency,
  urgentStudents,
  submissions,
  renderMoney,
  setActiveTab,
  setModalHomework,
  setModalStudent,
  setModalReview,
  setModalMarkPaid,
  setModalStudentCard,
  setModalTierStudents,
  handleSendReminder,
  handleRunRemindersCheck
}) {
  const enrollment = stats?.enrollmentStats || {
    month: { count: stats?.totalStudents || 6, percentage: 88, dynamics: '+2 за месяц', period: 'Ноябрь 2026' },
    semester: { count: stats?.totalStudents || 6, percentage: 85, dynamics: '88% удержание', period: 'Осень 2026' },
    year: { count: (stats?.totalStudents || 6) + 4, percentage: 75, dynamics: '+35% к 2025', period: '2026 учебный год' }
  };

  const performance = stats?.performanceStats || {
    high: { count: 2, percentage: 33, title: 'Успешные (High Performance)', level: 'Высокий уровень знаний', students: [] },
    average: { count: 3, percentage: 50, title: 'Средний уровень (Average)', level: 'Базовый / стабильный уровень', students: [] },
    low: { count: 1, percentage: 17, title: 'Низкий уровень / Внимание', level: 'Требуется поддержка', students: [] }
  };

  return (
    <div className="space-y-6">
      {/* 4 CORE FINANCIAL CARDS (BANKING STYLE WITH EYE MASKING) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* All-Time Earnings */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Всего за всё время</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Icons.Wallet />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {renderMoney(stats?.allTimeEarnings, currency, 'stat-all-time')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Все подтвержденные оплаты</p>
        </div>

        {/* Past Month Earnings */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2481cc]">Прошедший месяц</span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-[#2481cc]/10 text-[#2481cc]">
                {stats?.pastMonthKey || 'Октябрь'}
              </span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-[#2481cc] flex items-center justify-center">
              <Icons.Calendar />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {renderMoney(stats?.pastMonthEarnings, currency, 'stat-past-month')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Итог прошлого расчетного периода</p>
        </div>

        {/* Current Month Earnings */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Текущий месяц</span>
              <span className="px-1.5 py-0.2 text-[9px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {stats?.currentMonthKey || 'Ноябрь'}
              </span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Icons.CheckCircle />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {renderMoney(stats?.currentMonthEarnings, currency, 'stat-curr-month')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Оплатили: {stats?.paidStudents} из {stats?.totalStudents} учеников
          </p>
        </div>

        {/* Expected Tuition */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Ожидаемый сбор</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Icons.Clock />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {renderMoney(stats?.expectedRevenue, currency, 'stat-expected')}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
            <span className="text-amber-600 dark:text-amber-400 font-semibold">Ждут: {stats?.pendingStudents}</span>
            {stats?.overdueStudents > 0 && (
              <span className="text-rose-600 dark:text-rose-400 font-semibold">• Долг: {stats.overdueStudents}</span>
            )}
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ROW 1: КОЛИЧЕСТВО УЧЕНИКОВ (3 ANALYTICAL CHARTS)             */}
      {/* ------------------------------------------------------------- */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Icons.Users />
              <span>Динамика и количество учеников (Row 1)</span>
            </h2>
            <p className="text-xs text-slate-400">Статистика набора, посещаемости и удержания учеников</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Chart 1: За месяц */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400">1. За месяц</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {enrollment.month.count} <span className="text-sm font-medium text-slate-400">учеников</span>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <Icons.TrendingUp />
                <span>{enrollment.month.dynamics}</span>
              </div>
              <p className="text-[10px] text-slate-400">{enrollment.month.period}</p>
            </div>
            <DonutChart
              percentage={enrollment.month.percentage}
              color="#2481cc"
              size={72}
              strokeWidth={7}
            />
          </div>

          {/* Chart 2: За семестр */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400">2. За семестр</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {enrollment.semester.count} <span className="text-sm font-medium text-slate-400">активных</span>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                <Icons.Check />
                <span>{enrollment.semester.dynamics}</span>
              </div>
              <p className="text-[10px] text-slate-400">{enrollment.semester.period}</p>
            </div>
            <DonutChart
              percentage={enrollment.semester.percentage}
              color="#0284c7"
              size={72}
              strokeWidth={7}
            />
          </div>

          {/* Chart 3: За год */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase text-slate-400">3. За год</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {enrollment.year.count} <span className="text-sm font-medium text-slate-400">всего</span>
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                <Icons.TrendingUp />
                <span>{enrollment.year.dynamics}</span>
              </div>
              <p className="text-[10px] text-slate-400">{enrollment.year.period}</p>
            </div>
            <DonutChart
              percentage={enrollment.year.percentage}
              color="#6366f1"
              size={72}
              strokeWidth={7}
            />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ROW 2: УРОВЕНЬ ЗНАНИЙ УЧЕНИКОВ (3 INTERACTIVE CHARTS)        */}
      {/* ------------------------------------------------------------- */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Icons.ShieldCheck />
              <span>Уровень знаний и успеваемость учеников (Row 2 • Интерактивно)</span>
            </h2>
            <p className="text-xs text-slate-400">Нажмите на любую карточку, чтобы открыть список учеников этой категории</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tier 1: Успешные (High Performance) */}
          <div
            onClick={() => setModalTierStudents(performance.high)}
            className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-emerald-200/80 dark:border-emerald-900/50 hover:border-emerald-500 shadow-xs cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                1. Успешные (High)
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {performance.high.count} <span className="text-sm font-medium text-slate-400">чел.</span>
              </div>
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                {performance.high.percentage}% от всех учеников
              </p>
              <p className="text-[10px] text-slate-400 group-hover:text-[#2481cc] transition-colors flex items-center gap-1 pt-1">
                <span>Список учеников</span>
                <Icons.ChevronRight />
              </p>
            </div>
            <DonutChart
              percentage={performance.high.percentage}
              color="#10b981"
              size={72}
              strokeWidth={7}
            />
          </div>

          {/* Tier 2: Средний уровень (Average Performance) */}
          <div
            onClick={() => setModalTierStudents(performance.average)}
            className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-amber-200/80 dark:border-amber-900/50 hover:border-amber-500 shadow-xs cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                2. Средний уровень
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {performance.average.count} <span className="text-sm font-medium text-slate-400">чел.</span>
              </div>
              <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                {performance.average.percentage}% от всех учеников
              </p>
              <p className="text-[10px] text-slate-400 group-hover:text-[#2481cc] transition-colors flex items-center gap-1 pt-1">
                <span>Список учеников</span>
                <Icons.ChevronRight />
              </p>
            </div>
            <DonutChart
              percentage={performance.average.percentage}
              color="#f59e0b"
              size={72}
              strokeWidth={7}
            />
          </div>

          {/* Tier 3: Низкий уровень (Low Performance / Needs Attention) */}
          <div
            onClick={() => setModalTierStudents(performance.low)}
            className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-rose-200/80 dark:border-rose-900/50 hover:border-rose-500 shadow-xs cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                3. Низкий уровень
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {performance.low.count} <span className="text-sm font-medium text-slate-400">чел.</span>
              </div>
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                {performance.low.percentage}% от всех учеников
              </p>
              <p className="text-[10px] text-slate-400 group-hover:text-[#2481cc] transition-colors flex items-center gap-1 pt-1">
                <span>Список учеников</span>
                <Icons.ChevronRight />
              </p>
            </div>
            <DonutChart
              percentage={performance.low.percentage}
              color="#f43f5e"
              size={72}
              strokeWidth={7}
            />
          </div>
        </div>
      </div>

      {/* URGENT PAYMENT ALERTS (1 DAY BEFORE / OVERDUE) */}
      {urgentStudents.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200 dark:border-amber-900/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm">
                <Icons.Bell />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span>Ближайшие оплаты (напоминание за 1 день)</span>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                    {urgentStudents.length}
                  </span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Бот автоматически уведомляет ученика за 24 часа. Вы также можете отправить уведомление прямо сейчас.
                </p>
              </div>
            </div>
            <button
              onClick={handleRunRemindersCheck}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-xs"
            >
              <Icons.Telegram />
              <span>Разослать всем за 1 день</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {urgentStudents.map(student => (
              <div
                key={student.id}
                className="p-3 bg-white dark:bg-[#17212b] rounded-xl border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-xs text-slate-900 dark:text-white">{student.full_name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Срок: <strong className="text-amber-700 dark:text-amber-300">{student.payment_due_date}</strong>
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {renderMoney(student.tuition_amount, currency, `urgent-${student.id}`)}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSendReminder(student.id)}
                    title="Отправить напоминание в Telegram"
                    className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:bg-amber-200 transition-colors"
                  >
                    <Icons.Send />
                  </button>
                  <button
                    onClick={() => setModalMarkPaid(student)}
                    title="Отметить как оплачено"
                    className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 transition-colors"
                  >
                    <Icons.Check />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TWO COLUMNS: MONTHLY BREAKDOWN & PENDING SUBMISSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Monthly Trend Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">Поступления по месяцам</h3>
              <p className="text-xs text-slate-400">Динамика реальных оплат за последние полгода</p>
            </div>
            <button
              onClick={() => setActiveTab('finances')}
              className="text-xs font-bold text-[#2481cc] hover:underline"
            >
              Финансовый отчет →
            </button>
          </div>

          <div className="pt-4 flex items-end justify-between gap-2 h-48 border-b border-slate-100 dark:border-slate-800 pb-2">
            {stats?.monthlyBreakdown && stats.monthlyBreakdown.map((item, idx) => {
              const maxVal = Math.max(...stats.monthlyBreakdown.map(m => m.amount), 50000);
              const heightPercent = Math.max(14, Math.round((item.amount / maxVal) * 100));
              const isPastMonth = item.monthKey === stats.pastMonthKey;
              const isCurrentMonth = item.monthKey === stats.currentMonthKey;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="text-[10px] font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {renderMoney(item.amount, currency, `bar-${item.monthKey}`)}
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[44px] rounded-t-xl transition-all duration-300 relative ${
                      isCurrentMonth
                        ? 'bg-gradient-to-t from-[#2481cc] to-[#3aa5dc]'
                        : isPastMonth
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                        : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  >
                    {isPastMonth && (
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 text-[8px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded whitespace-nowrap">
                        Прошлый
                      </span>
                    )}
                    {isCurrentMonth && (
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 text-[8px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 rounded whitespace-nowrap">
                        Текущий
                      </span>
                    )}
                  </div>
                  <span className="mt-2 text-[11px] text-slate-400 font-medium">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Submissions Queue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Работы на проверку</h3>
              <p className="text-[11px] text-slate-400">Поступают из Telegram-бота</p>
            </div>
            <button
              onClick={() => setActiveTab('submissions')}
              className="text-xs font-bold text-[#2481cc] hover:underline"
            >
              Все ({submissions.length})
            </button>
          </div>

          <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[260px] pr-1">
            {submissions.filter(s => s.status === 'pending').length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <div className="w-8 h-8 mx-auto mb-2 text-emerald-500"><Icons.CheckCircle /></div>
                Все домашние работы проверены!
              </div>
            ) : (
              submissions.filter(s => s.status === 'pending').map(sub => (
                <div
                  key={sub.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#242f3d]/60 border border-slate-100 dark:border-slate-800 hover:border-[#2481cc] transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{sub.student_name}</span>
                    <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Ждет проверки
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[#2481cc] truncate">{sub.homework_title}</div>
                  <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                    <span>{sub.submitted_at?.slice(0, 16)}</span>
                    <button
                      onClick={() => setModalReview(sub)}
                      className="px-2 py-1 font-bold rounded-lg bg-[#2481cc] hover:bg-[#1d73b8] text-white transition-colors"
                    >
                      Проверить
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// SECTION 6: GROUPS TELEGRAM DESKTOP SPLIT VIEW + CALENDAR TABLE
// -------------------------------------------------------------------
function GroupsTelegramView({
  groups,
  students,
  selectedGroupId,
  setSelectedGroupId,
  currency,
  renderMoney,
  setModalGroup,
  setModalHomework,
  setModalStudentCard,
  loadData,
  showToast
}) {
  const [selectedMonth, setSelectedMonth] = useState('2026-11');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');

  const activeGroup = groups.find(g => g.id === selectedGroupId) || groups[0] || null;

  // Load attendance for selected group & month
  const loadAttendance = async (gId, month) => {
    if (!gId) return;
    try {
      const res = await fetch(`/api/attendance?group_id=${gId}&month=${month}`).then(r => r.json());
      setAttendanceRecords(res || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (activeGroup) {
      loadAttendance(activeGroup.id, selectedMonth);
    }
  }, [activeGroup?.id, selectedMonth]);

  // Students in selected group
  const groupStudents = useMemo(() => {
    if (!activeGroup) return [];
    return students.filter(s => {
      if (s.group_id !== activeGroup.id) return false;
      if (searchFilter) {
        return (s.full_name || '').toLowerCase().includes(searchFilter.toLowerCase());
      }
      return true;
    });
  }, [students, activeGroup, searchFilter]);

  // Toggle or assign attendance
  const handleToggleAttendance = async (studentId, dayStr) => {
    const existing = attendanceRecords.find(a => a.student_id === studentId && a.date === dayStr);
    let nextStatus = 'present';
    let nextGrade = '5';

    if (existing) {
      if (existing.status === 'present') {
        nextStatus = 'absent';
        nextGrade = null;
      } else if (existing.status === 'absent') {
        nextStatus = 'present';
        nextGrade = '4';
      } else {
        nextStatus = 'present';
        nextGrade = '5';
      }
    }

    try {
      await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          group_id: activeGroup.id,
          date: dayStr,
          status: nextStatus,
          grade: nextGrade
        })
      });
      loadAttendance(activeGroup.id, selectedMonth);
    } catch (e) {
      showToast('Ошибка обновления посещаемости', 'error');
    }
  };

  // Calendar days generation (1 to 30 for November)
  const daysInMonth = useMemo(() => {
    const parts = selectedMonth.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const numDays = new Date(year, month, 0).getDate();
    const days = [];
    for (let d = 1; d <= numDays; d++) {
      const dayStr = `${selectedMonth}-${String(d).padStart(2, '0')}`;
      const dateObj = new Date(year, month - 1, d);
      const dayOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][dateObj.getDay()];
      days.push({ dayNum: d, dayStr, dayOfWeek });
    }
    return days;
  }, [selectedMonth]);

  return (
    <div className="h-full flex flex-col lg:flex-row gap-5">
      {/* ------------------------------------------------------------- */}
      {/* LEFT PANE: TELEGRAM DESKTOP CHAT-STYLE GROUPS LIST           */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full lg:w-80 flex flex-col bg-white dark:bg-[#17212b] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden flex-shrink-0">
        <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Все группы</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
              {groups.length}
            </span>
          </div>
          <button
            onClick={() => setModalGroup('create')}
            className="p-1.5 rounded-lg bg-[#2481cc]/10 hover:bg-[#2481cc] text-[#2481cc] hover:text-white transition-colors"
            title="Создать новую группу"
          >
            <Icons.Plus />
          </button>
        </div>

        {/* Groups List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {groups.map(group => {
            const isSelected = activeGroup?.id === group.id;
            const count = students.filter(s => s.group_id === group.id).length;
            const initials = (group.name || 'G').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

            return (
              <div
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 select-none ${
                  isSelected
                    ? 'bg-[#2481cc] text-white shadow-xs'
                    : 'hover:bg-slate-50 dark:hover:bg-[#242f3d] text-slate-700 dark:text-slate-200'
                }`}
              >
                {/* Telegram-style Circular Group Badge */}
                <div className={`w-10 h-10 min-w-10 rounded-full flex items-center justify-center font-bold text-xs ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-[#2481cc]/15 text-[#2481cc] dark:bg-slate-700 dark:text-sky-300'
                }`}>
                  {initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-xs truncate">{group.name}</span>
                    <span className={`px-1.5 py-0.2 text-[9px] font-bold rounded-full ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {count} чел.
                    </span>
                  </div>
                  <p className={`text-[11px] truncate ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                    {group.schedule || 'Расписание не указано'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT PANE: SELECTED GROUP DETAILS & ATTENDANCE CALENDAR      */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#17212b] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden min-w-0">
        {activeGroup ? (
          <>
            {/* Group Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {activeGroup.subject || 'Курс'}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Icons.Clock />
                    <span>{activeGroup.schedule}</span>
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{activeGroup.name}</h2>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => setModalHomework(activeGroup.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-[#2481cc] hover:bg-[#1d73b8] text-white shadow-xs transition-colors"
                >
                  <Icons.Send />
                  <span>Отправить ДЗ этой группе</span>
                </button>
                <button
                  onClick={() => setModalGroup(activeGroup)}
                  className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  title="Редактировать группу"
                >
                  ✏️
                </button>
              </div>
            </div>

            {/* Attendance & Grades Calendar Controls */}
            <div className="p-3.5 bg-slate-50 dark:bg-[#1a2634] border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white dark:bg-[#17212b] border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1">
                  <button
                    onClick={() => setSelectedMonth('2026-10')}
                    className={`px-2 py-0.5 text-xs font-semibold rounded-lg ${selectedMonth === '2026-10' ? 'bg-[#2481cc] text-white' : 'text-slate-500'}`}
                  >
                    Октябрь 2026
                  </button>
                  <button
                    onClick={() => setSelectedMonth('2026-11')}
                    className={`px-2 py-0.5 text-xs font-semibold rounded-lg ${selectedMonth === '2026-11' ? 'bg-[#2481cc] text-white' : 'text-slate-500'}`}
                  >
                    Ноябрь 2026
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Присутствовал (✓)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-500"></span> Пропуск (✕)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#2481cc]"></span> Оценка (5/4/3)</span>
                </div>
              </div>

              <div className="relative w-full sm:w-56">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  placeholder="Поиск ученика в группе..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#17212b] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2481cc]"
                />
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Icons.Search />
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------- */}
            {/* CALENDAR ATTENDANCE & GRADES TABLE (Requirement #6)       */}
            {/* --------------------------------------------------------- */}
            <div className="flex-1 overflow-x-auto overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white dark:bg-[#17212b] border-b border-slate-200 dark:border-slate-800 text-slate-400">
                    <th className="sticky left-0 bg-white dark:bg-[#17212b] z-10 px-4 py-3 font-semibold min-w-[200px] border-r border-slate-100 dark:border-slate-800">
                      Ученик
                    </th>
                    <th className="px-3 py-3 font-semibold text-center min-w-[90px]">Посещ. %</th>
                    <th className="px-3 py-3 font-semibold text-center min-w-[80px]">Балл</th>
                    {daysInMonth.map(d => (
                      <th key={d.dayNum} className="px-1 py-2 font-semibold text-center min-w-[34px]">
                        <div className="text-[10px] text-slate-400">{d.dayOfWeek}</div>
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{d.dayNum}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {groupStudents.length === 0 ? (
                    <tr>
                      <td colSpan={3 + daysInMonth.length} className="px-4 py-12 text-center text-slate-400">
                        В этой группе пока нет учеников
                      </td>
                    </tr>
                  ) : (
                    groupStudents.map(student => {
                      const stRecords = attendanceRecords.filter(a => a.student_id === student.id);
                      const presentCount = stRecords.filter(a => a.status === 'present').length;
                      const attPercent = stRecords.length > 0 ? Math.round((presentCount / stRecords.length) * 100) : 100;

                      return (
                        <tr key={student.id} className="hover:bg-slate-50/60 dark:hover:bg-[#242f3d]/40 transition-colors">
                          {/* Student Info with 3:4 Photo (Sticky Left Column) */}
                          <td
                            onClick={() => setModalStudentCard(student)}
                            className="sticky left-0 bg-white dark:bg-[#17212b] z-10 px-4 py-2.5 border-r border-slate-100 dark:border-slate-800 cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5">
                              {student.photo ? (
                                <img
                                  src={student.photo}
                                  alt={student.full_name}
                                  className="w-8 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 aspect-3-4"
                                />
                              ) : (
                                <div className="w-8 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-500 aspect-3-4">
                                  {student.full_name?.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                              <div className="truncate">
                                <div className="font-bold text-slate-900 dark:text-white group-hover:text-[#2481cc] transition-colors truncate">
                                  {student.full_name}
                                </div>
                                <div className="text-[10px] text-slate-400">
                                  {student.telegram_username || student.phone || 'Нет Telegram'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Attendance % Pill */}
                          <td className="px-3 py-2.5 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              attPercent >= 80
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}>
                              {attPercent}%
                            </span>
                          </td>

                          {/* Average Grade Pill */}
                          <td className="px-3 py-2.5 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                              4.8 / 5.0
                            </span>
                          </td>

                          {/* Days 1..30 Grid Cells */}
                          {daysInMonth.map(d => {
                            const rec = stRecords.find(a => a.date === d.dayStr);
                            const isPresent = rec?.status === 'present';
                            const isAbsent = rec?.status === 'absent';
                            const grade = rec?.grade;

                            return (
                              <td key={d.dayNum} className="px-1 py-1.5 text-center">
                                <button
                                  onClick={() => handleToggleAttendance(student.id, d.dayStr)}
                                  className={`attendance-cell ${
                                    grade
                                      ? 'bg-[#2481cc] text-white shadow-xs'
                                      : isPresent
                                      ? 'bg-emerald-500 text-white shadow-xs'
                                      : isAbsent
                                      ? 'bg-rose-500 text-white shadow-xs'
                                      : 'bg-slate-100 dark:bg-slate-800/60 text-slate-300 dark:text-slate-600 hover:bg-slate-200'
                                  }`}
                                  title={`${student.full_name} (${d.dayStr}): ${grade ? `Оценка ${grade}` : isPresent ? 'Присутствовал' : isAbsent ? 'Отсутствовал' : 'Нажмите, чтобы отметить'}`}
                                >
                                  {grade || (isPresent ? '✓' : isAbsent ? '✕' : '—')}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="py-24 text-center text-slate-400 text-sm">Выберите группу из списка слева</div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// SECTION 7: STUDENTS DIRECTORY VIEW
// -------------------------------------------------------------------
function StudentsDirectoryView({
  students,
  groups,
  currency,
  renderMoney,
  search,
  setSearch,
  groupFilter,
  setGroupFilter,
  statusFilter,
  setStatusFilter,
  setModalStudent,
  setModalMarkPaid,
  setModalTelegramCode,
  setModalStudentCard,
  handleSendReminder,
  loadData,
  showToast
}) {
  const filtered = useMemo(() => {
    return students.filter(s => {
      if (groupFilter && String(s.group_id) !== String(groupFilter)) return false;
      if (statusFilter && s.payment_status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          (s.full_name || '').toLowerCase().includes(q) ||
          (s.phone || '').toLowerCase().includes(q) ||
          (s.telegram_username || '').toLowerCase().includes(q) ||
          (s.access_code || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [students, groupFilter, statusFilter, search]);

  const handleDelete = async (id) => {
    if (!confirm('Удалить ученика из базы?')) return;
    try {
      await fetch(`/api/students/${id}`, { method: 'DELETE' });
      showToast('Ученик удален');
      loadData();
    } catch (e) {
      showToast('Ошибка удаления', 'error');
    }
  };

  return (
    <div className="space-y-5">
      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по имени, телефону, Telegram, коду доступа..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2481cc]"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icons.Search />
          </div>
        </div>

        <select
          value={groupFilter}
          onChange={e => setGroupFilter(e.target.value)}
          className="w-full sm:w-48 py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none"
        >
          <option value="">Все группы</option>
          {groups.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full sm:w-44 py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none"
        >
          <option value="">Все статусы оплаты</option>
          <option value="paid">Оплачено</option>
          <option value="pending">Ожидает оплаты</option>
          <option value="overdue">Просрочено</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-[#1a2634] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Ученик (3:4 фото)</th>
                <th className="px-4 py-3 font-semibold">Группа</th>
                <th className="px-4 py-3 font-semibold">Telegram статус</th>
                <th className="px-4 py-3 font-semibold">Сумма оплаты</th>
                <th className="px-4 py-3 font-semibold">Срок оплаты</th>
                <th className="px-4 py-3 font-semibold">Статус</th>
                <th className="px-4 py-3 font-semibold text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-slate-400">
                    Ученики не найдены
                  </td>
                </tr>
              ) : (
                filtered.map(student => {
                  const isPaid = student.payment_status === 'paid';
                  const isOverdue = student.payment_status === 'overdue';
                  const hasTg = !!student.telegram_id;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-[#242f3d]/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {student.photo ? (
                            <img
                              src={student.photo}
                              alt={student.full_name}
                              className="w-9 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 aspect-3-4 shadow-2xs"
                            />
                          ) : (
                            <div className="w-9 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-500 aspect-3-4">
                              {student.full_name?.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <button
                              onClick={() => setModalStudentCard(student)}
                              className="font-bold text-slate-900 dark:text-white hover:text-[#2481cc] transition-colors text-left"
                            >
                              {student.full_name}
                            </button>
                            <div className="text-[11px] text-slate-400">
                              {student.phone || 'Нет телефона'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-medium">
                          {student.group_name || 'Без группы'}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {hasTg ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                            <Icons.Telegram />
                            <span>{student.telegram_username || 'Подключен'}</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => setModalTelegramCode(student)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 font-mono font-bold hover:bg-amber-100 transition-colors"
                          >
                            <span>Код: {student.access_code}</span>
                          </button>
                        )}
                      </td>

                      {/* Tuition amount masked with Privacy eye */}
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                        {renderMoney(student.tuition_amount, currency, `student-${student.id}`)}
                      </td>

                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{student.payment_due_date}</div>
                        <div className="text-[10px] text-slate-400">к {student.payment_due_time || '18:00'}</div>
                      </td>

                      <td className="px-4 py-3">
                        {isPaid ? (
                          <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Оплачено
                          </span>
                        ) : isOverdue ? (
                          <span className="px-2.5 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                            Просрочено
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            Ожидает
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setModalMarkPaid(student)}
                            className="px-2.5 py-1 font-bold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 transition-colors"
                            title="Отметить оплату"
                          >
                            Оплатил
                          </button>
                          <button
                            onClick={() => handleSendReminder(student.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 transition-colors"
                            title="Отправить напоминание"
                          >
                            <Icons.Bell />
                          </button>
                          <button
                            onClick={() => setModalStudent(student)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Редактировать"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                            title="Удалить"
                          >
                            <Icons.Trash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// SECTION 8: DETAILED STUDENT CARD DOSSIER MODAL
// -------------------------------------------------------------------
function StudentCardModal({ student, groups, submissions, payments, currency, renderMoney, onClose, onEdit, onMarkPaid, onSendReminder }) {
  const group = groups.find(g => g.id === student.group_id);
  const studentSubs = submissions.filter(s => s.student_id === student.id);
  const studentPayments = payments.filter(p => p.student_id === student.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#17212b] p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-5">
        {/* Modal Header & 3:4 Portrait */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            {student.photo ? (
              <img
                src={student.photo}
                alt={student.full_name}
                className="w-16 h-20 rounded-2xl object-cover border-2 border-[#2481cc]/20 aspect-3-4 shadow-sm"
              />
            ) : (
              <div className="w-16 h-20 rounded-2xl bg-[#2481cc]/10 dark:bg-slate-800 text-[#2481cc] flex items-center justify-center font-black text-xl aspect-3-4">
                {student.full_name?.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {group ? group.name : 'Без группы'}
                </span>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  student.payment_status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {student.payment_status === 'paid' ? 'Оплачено' : 'Ожидает оплаты'}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{student.full_name}</h3>
              <p className="text-xs text-slate-400">
                Код привязки Telegram: <strong className="font-mono text-[#2481cc]">{student.access_code}</strong>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600"><Icons.X /></button>
        </div>

        {/* Contact & Tuition Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1a2634] text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Телефон</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{student.phone || '—'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Telegram</span>
            <span className="font-bold text-[#2481cc]">{student.telegram_username || 'Не привязан'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Стоимость курса</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {renderMoney(student.tuition_amount, currency, `card-tuition-${student.id}`)}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Срок оплаты</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">{student.payment_due_date}</span>
          </div>
        </div>

        {/* Academic Performance & Homework History */}
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
            <Icons.BookOpen />
            <span>Сданные домашние работы ({studentSubs.length})</span>
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {studentSubs.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">Ученик пока не сдавал работы</p>
            ) : (
              studentSubs.map(sub => (
                <div key={sub.id} className="p-3 rounded-xl bg-slate-50 dark:bg-[#242f3d] text-xs flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{sub.homework_title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{sub.submission_text}</div>
                    {sub.teacher_feedback && (
                      <div className="mt-1.5 text-[11px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
                        <strong>Отзыв учителя:</strong> {sub.teacher_feedback}
                      </div>
                    )}
                  </div>
                  <span className="px-2 py-0.5 rounded-full font-bold bg-sky-100 text-sky-800 text-[10px] whitespace-nowrap">
                    {sub.grade || 'На проверке'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSendReminder(student.id)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 transition-colors"
            >
              Напомнить об оплате
            </button>
            <button
              onClick={() => onMarkPaid(student)}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200 transition-colors"
            >
              Отметить оплату
            </button>
          </div>
          <button
            onClick={() => onEdit(student)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#2481cc] hover:bg-[#1d73b8] text-white transition-colors"
          >
            Редактировать
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// SECTION 9: INTERACTIVE ACADEMIC TIER STUDENTS MODAL
// -------------------------------------------------------------------
function TierStudentsModal({ tier, onClose, onSelectStudent }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#17212b] p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{tier.title}</h3>
            <p className="text-xs text-slate-400">{tier.level} • {tier.count} учеников ({tier.percentage}%)</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400"><Icons.X /></button>
        </div>

        <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
          {tier.students && tier.students.length > 0 ? (
            tier.students.map(st => (
              <div
                key={st.id}
                onClick={() => onSelectStudent(st)}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#242f3d] hover:border-[#2481cc] border border-transparent cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  {st.photo ? (
                    <img src={st.photo} alt={st.name} className="w-9 h-12 rounded-xl object-cover aspect-3-4" />
                  ) : (
                    <div className="w-9 h-12 rounded-xl bg-[#2481cc]/15 text-[#2481cc] font-bold text-xs flex items-center justify-center aspect-3-4">
                      {st.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{st.name}</div>
                    <div className="text-[11px] text-slate-400">{st.group}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#2481cc]/15 text-[#2481cc]">
                    Балл: {st.gradeDisplay}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">Посещаемость: {st.attendanceRate}%</div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 text-center py-8">Ученики в этой категории пока не найдены</p>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// SECTION 10: STUDENT FORM MODAL WITH 3:4 PHOTO UPLOAD (REQ #4)
// -------------------------------------------------------------------
function StudentModal({ student, groups, currency, onClose, onSuccess }) {
  const isEdit = !!student;
  const [fullName, setFullName] = useState(student?.full_name || '');
  const [groupId, setGroupId] = useState(student?.group_id || (groups[0]?.id || ''));
  const [phone, setPhone] = useState(student?.phone || '');
  const [telegramUsername, setTelegramUsername] = useState(student?.telegram_username || '');
  const [tuitionAmount, setTuitionAmount] = useState(student?.tuition_amount !== undefined ? student.tuition_amount : 6500);
  const [paymentDueDate, setPaymentDueDate] = useState(student?.payment_due_date || new Date().toISOString().slice(0, 10));
  const [paymentDueTime, setPaymentDueTime] = useState(student?.payment_due_time || '18:00');
  const [paymentStatus, setPaymentStatus] = useState(student?.payment_status || 'pending');
  const [notes, setNotes] = useState(student?.notes || '');
  const [photo, setPhoto] = useState(student?.photo || '');
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Handle Photo Upload (JPG, PNG, WEBP, 3:4 aspect ratio)
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/i)) {
      alert('Пожалуйста, выберите изображение в формате JPG, PNG или WEBP');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhoto(event.target.result); // Base64 data URL
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setSubmitting(true);
    try {
      const url = isEdit ? `/api/students/${student.id}` : '/api/students';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          group_id: Number(groupId) || null,
          phone: phone.trim(),
          telegram_username: telegramUsername.trim(),
          tuition_amount: Number(tuitionAmount),
          payment_due_date: paymentDueDate,
          payment_due_time: paymentDueTime,
          payment_status: paymentStatus,
          notes: notes.trim(),
          photo: photo || null
        })
      });

      if (res.ok) onSuccess();
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#17212b] p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
            {isEdit ? 'Редактировать ученика' : 'Новый ученик'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600"><Icons.X /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 3:4 PHOTO UPLOAD SECTION (Requirement #4) */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200/80 dark:border-slate-700">
            {/* 3:4 Preview Container */}
            <div className="w-20 h-28 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 overflow-hidden relative group aspect-3-4 flex items-center justify-center bg-white dark:bg-[#17212b] flex-shrink-0">
              {photo ? (
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-1 text-slate-400">
                  <Icons.Camera />
                  <span className="block text-[8px] font-bold mt-1">3:4 Фото</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Фотография ученика (3:4, необязательно)
              </span>
              <p className="text-[11px] text-slate-400">
                Поддерживаются JPG, PNG, WEBP. Фото будет отображаться в карточке и журнале посещаемости.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#2481cc] hover:bg-[#1d73b8] text-white transition-colors"
                >
                  {photo ? 'Заменить' : 'Выбрать файл'}
                </button>
                {photo && (
                  <button
                    type="button"
                    onClick={() => setPhoto('')}
                    className="px-2 py-1.5 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
                  >
                    Удалить
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              ФИО ученика:
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Алексей Смирнов"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-[#2481cc]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Группа:</label>
              <select
                value={groupId}
                onChange={e => setGroupId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Телефон:</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Telegram Username (@handle):
            </label>
            <input
              type="text"
              value={telegramUsername}
              onChange={e => setTelegramUsername(e.target.value)}
              placeholder="@student_username"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          {/* Payment & Schedule Fields */}
          <div className="p-3.5 rounded-2xl bg-[#2481cc]/5 border border-[#2481cc]/20 space-y-3">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2481cc] block">
              Параметры оплаты
            </span>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Сумма курса ({currency}):
              </label>
              <input
                type="number"
                required
                value={tuitionAmount}
                onChange={e => setTuitionAmount(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-[#17212b] border border-slate-200 dark:border-slate-700 focus:outline-none font-bold"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Дата оплаты:</label>
                <input
                  type="date"
                  required
                  value={paymentDueDate}
                  onChange={e => setPaymentDueDate(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#17212b] border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Время:</label>
                <input
                  type="time"
                  value={paymentDueTime}
                  onChange={e => setPaymentDueTime(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#17212b] border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-[#2481cc] hover:bg-[#1d73b8] text-white shadow-xs"
            >
              {submitting ? 'Сохранение...' : isEdit ? 'Обновить' : 'Зарегистрировать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// SECTION 11: HOMEWORK, SUBMISSIONS, FINANCES & BOT COMPONENTS
// -------------------------------------------------------------------
function HomeworkView({ homeworks, groups, setModalHomework, setActiveTab, loadData, showToast }) {
  const handleDelete = async (id) => {
    if (!confirm('Удалить это задание?')) return;
    try {
      await fetch(`/api/homework/${id}`, { method: 'DELETE' });
      showToast('Задание удалено');
      loadData();
    } catch (e) {
      showToast('Ошибка удаления', 'error');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Домашние задания</h2>
          <p className="text-xs text-slate-400">Рассылка заданий сразу всей группе в Telegram-бот</p>
        </div>
        <button
          onClick={() => setModalHomework(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#2481cc] hover:bg-[#1d73b8] text-white shadow-xs"
        >
          <Icons.Send />
          <span>Отправить ДЗ группе</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {homeworks.map(hw => (
          <div key={hw.id} className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {hw.group_name}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                  <Icons.Telegram />
                  <span>В боте</span>
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{hw.title}</h3>
              <p className="text-xs text-slate-500 whitespace-pre-line mb-3 bg-slate-50 dark:bg-[#242f3d]/50 p-2.5 rounded-xl">
                {hw.description}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Дедлайн: <strong className="text-slate-700 dark:text-slate-300">{hw.deadline || 'Без срока'}</strong></span>
              <button
                onClick={() => setActiveTab('submissions')}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#242f3d] text-[#2481cc] font-bold text-[11px]"
              >
                Сдано: {hw.submissions_count || 0} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubmissionsView({ submissions, filter, setFilter, setModalReview }) {
  const filtered = useMemo(() => {
    if (filter === 'all') return submissions;
    return submissions.filter(s => s.status === filter);
  }, [submissions, filter]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Проверка домашних заданий</h2>
          <p className="text-xs text-slate-400">Работы, присланные учениками через Telegram</p>
        </div>
        <div className="flex items-center gap-1 bg-white dark:bg-[#17212b] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          {['all', 'pending', 'checked'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                filter === f ? 'bg-[#2481cc] text-white' : 'text-slate-500'
              }`}
            >
              {f === 'all' ? 'Все' : f === 'pending' ? 'Новые' : 'Проверенные'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(sub => (
          <div key={sub.id} className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{sub.student_name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  sub.status === 'checked' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {sub.status === 'checked' ? sub.grade || 'Проверено' : 'Ждет проверки'}
                </span>
              </div>
              <div className="text-xs font-semibold text-[#2481cc] mb-2">{sub.homework_title}</div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#242f3d]/60 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line max-h-32 overflow-y-auto mb-3">
                {sub.submission_text}
              </div>
            </div>
            <button
              onClick={() => setModalReview(sub)}
              className="w-full py-2 text-xs font-bold rounded-xl bg-[#2481cc] hover:bg-[#1d73b8] text-white transition-colors"
            >
              {sub.status === 'checked' ? 'Редактировать оценку' : 'Оценить и отправить отзыв'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinancesLedgerView({ stats, payments, currency, renderMoney }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Финансы & Журнал платежей</h2>
        <p className="text-xs text-slate-400">Полный учет с конфиденциальным режимом (Bank Privacy)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Всего за всё время</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {renderMoney(stats?.allTimeEarnings, currency, 'fin-all-time')}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border-2 border-[#2481cc] shadow-xs">
          <span className="text-[10px] font-bold uppercase text-[#2481cc]">Прошедший месяц ({stats?.pastMonthKey})</span>
          <div className="text-2xl font-black text-[#2481cc] mt-1">
            {renderMoney(stats?.pastMonthEarnings, currency, 'fin-past-month')}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Текущий месяц ({stats?.currentMonthKey})</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {renderMoney(stats?.currentMonthEarnings, currency, 'fin-curr-month')}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 font-bold text-xs">
          История оплат ({payments.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-[#1a2634] text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="px-4 py-2.5">Дата</th>
                <th className="px-4 py-2.5">Ученик</th>
                <th className="px-4 py-2.5">Группа</th>
                <th className="px-4 py-2.5">Способ</th>
                <th className="px-4 py-2.5">Сумма</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {payments.map(p => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-mono text-slate-400">{p.payment_date}</td>
                  <td className="px-4 py-3 font-bold">{p.student_name}</td>
                  <td className="px-4 py-3 text-slate-400">{p.group_name || '—'}</td>
                  <td className="px-4 py-3">{p.payment_method}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">
                    +{renderMoney(p.amount, currency, `pay-${p.id}`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TelegramBotView({
  settings,
  students,
  logs,
  simStudentId,
  setSimStudentId,
  simMessages,
  simActiveHw,
  simInput,
  setSimInput,
  simAttachment,
  setSimAttachment,
  loadSimulator,
  loadData,
  showToast,
  handleRunRemindersCheck
}) {
  const [tokenInput, setTokenInput] = useState(settings.telegram_bot_token || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveToken = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenInput.trim() })
      }).then(r => r.json());
      if (res.ok) {
        showToast(`Бот @${res.bot.username} подключен!`);
        loadData();
      } else {
        showToast(res.error || 'Ошибка токена', 'error');
      }
    } catch (e) {
      showToast('Ошибка сети', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSimSend = async (e) => {
    e.preventDefault();
    if (!simInput.trim() && !simAttachment) return;
    try {
      await fetch('/api/simulator/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: simStudentId,
          text: simInput.trim(),
          attachment_name: simAttachment || null
        })
      });
      setSimInput('');
      setSimAttachment('');
      loadSimulator(simStudentId);
      loadData();
    } catch (e) {}
  };

  const selectedStudent = students.find(s => s.id === Number(simStudentId));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-5">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2481cc] text-white flex items-center justify-center">
              <Icons.Telegram />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Настройки Telegram-бота</h3>
              <p className="text-[11px] text-slate-400">Привязка бота и автоматические рассылки</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">
              ● Активен: @{settings.bot_username || 'doomhex23_bot'}
            </span>
            <a href={`https://t.me/${settings.bot_username || 'doomhex23_bot'}`} target="_blank" rel="noreferrer" className="text-[#2481cc] font-bold">
              Открыть в Telegram →
            </a>
          </div>

          <div className="flex gap-2">
            <input
              type="password"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              placeholder="Токен бота..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 font-mono"
            />
            <button
              onClick={handleSaveToken}
              disabled={isSaving}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#2481cc] text-white"
            >
              {isSaving ? '...' : 'Сохранить'}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#17212b] border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <div className="font-bold text-xs">Автонапоминания за 1 день до оплаты</div>
            <div className="text-[11px] text-slate-400">Фоновый планировщик сканирует базу каждый час</div>
          </div>
          <button
            onClick={handleRunRemindersCheck}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-white"
          >
            Проверить сейчас
          </button>
        </div>
      </div>

      {/* Simulator Phone */}
      <div className="lg:col-span-5">
        <div className="rounded-3xl bg-[#0e1621] text-white border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[560px]">
          <div className="bg-[#17212b] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#2481cc] flex items-center justify-center text-xs"><Icons.Telegram /></div>
              <div className="text-xs font-bold">@{settings.bot_username || 'doomhex23_bot'}</div>
            </div>
            <select
              value={simStudentId}
              onChange={e => setSimStudentId(Number(e.target.value))}
              className="bg-slate-800 text-xs text-white rounded-lg px-2 py-1"
            >
              {students.map(s => <option key={s.id} value={s.id}>{s.full_name}</option>)}
            </select>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs bg-[#0e1621]">
            {simMessages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-2.5 rounded-2xl max-w-[85%] text-xs ${m.sender === 'bot' ? 'bg-[#182533]' : 'bg-[#2b5278]'}`}>
                  <div className="whitespace-pre-line">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSimSend} className="p-2 bg-[#17212b] border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={simInput}
              onChange={e => setSimInput(e.target.value)}
              placeholder="Ответить как ученик..."
              className="flex-1 bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs focus:outline-none"
            />
            <button type="submit" className="p-2 bg-[#2481cc] text-white rounded-xl"><Icons.Send /></button>
          </form>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// REMAINING MODALS (GROUP, HOMEWORK, MARK PAID, REVIEW, TG CODE)
// -------------------------------------------------------------------
function GroupModal({ group, onClose, onSuccess }) {
  const isEdit = !!group;
  const [name, setName] = useState(group?.name || '');
  const [subject, setSubject] = useState(group?.subject || 'Английский язык');
  const [schedule, setSchedule] = useState(group?.schedule || 'Пн, Ср, Пт 10:00 - 11:30');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      const url = isEdit ? `/api/groups/${group.id}` : '/api/groups';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), subject: subject.trim(), schedule: schedule.trim() })
      });
      if (res.ok) onSuccess();
    } catch (e) {} finally { setSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#17212b] p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{isEdit ? 'Редактировать группу' : 'Новая группа'}</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400"><Icons.X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Название группы:</label>
            <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="General English B1" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none" />
          </div>
          <div>
            <label className="block font-bold mb-1">Предмет / Курс:</label>
            <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Английский язык" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none" />
          </div>
          <div>
            <label className="block font-bold mb-1">Расписание:</label>
            <input type="text" value={schedule} onChange={e => setSchedule(e.target.value)} placeholder="Пн, Ср, Пт 10:00 - 11:30" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none" />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-xl text-slate-500 font-bold">Отмена</button>
            <button type="submit" disabled={submitting} className="px-4 py-1.5 rounded-xl bg-[#2481cc] text-white font-bold">{submitting ? '...' : 'Сохранить'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CreateHomeworkModal({ groups, defaultGroupId, onClose, onSuccess }) {
  const [groupId, setGroupId] = useState(defaultGroupId || groups[0]?.id || '');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [materialsUrl, setMaterialsUrl] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(() => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
  const [deadlineTime, setDeadlineTime] = useState('21:00');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          group_id: Number(groupId),
          title: title.trim(),
          topic: topic.trim(),
          description: description.trim(),
          materials_url: materialsUrl.trim(),
          deadline: `${deadlineDate} ${deadlineTime}`
        })
      });
      const data = await res.json();
      if (res.ok) onSuccess(data);
    } catch (e) {} finally { setSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#17212b] p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Отправить ДЗ группе в Telegram</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400"><Icons.X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Группа:</label>
            <select value={groupId} onChange={e => setGroupId(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 font-bold focus:outline-none">
              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-bold mb-1">Тема задания:</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Unit 5: Conditionals" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none font-bold" />
          </div>
          <div>
            <label className="block font-bold mb-1">Текст задания (задачи, упражнения):</label>
            <textarea required rows="4" value={description} onChange={e => setDescription(e.target.value)} placeholder="1. Стр 48 упр 2-4..." className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold mb-1">Срок (Дата):</label>
              <input type="date" required value={deadlineDate} onChange={e => setDeadlineDate(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none" />
            </div>
            <div>
              <label className="block font-bold mb-1">Время:</label>
              <input type="time" value={deadlineTime} onChange={e => setDeadlineTime(e.target.value)} className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 focus:outline-none" />
            </div>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-xl text-slate-500 font-bold">Отмена</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-xl bg-[#2481cc] text-white font-bold flex items-center gap-1.5">
              <Icons.Send />
              <span>{submitting ? 'Рассылка...' : 'Разослать в Telegram'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function MarkPaidModal({ student, currency, onClose, onSuccess }) {
  const [amount, setAmount] = useState(student.tuition_amount || 6500);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState('Перевод');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/students/${student.id}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount), payment_date: paymentDate, payment_method: paymentMethod })
      });
      if (res.ok) onSuccess();
    } catch (e) {} finally { setSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#17212b] p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-extrabold text-base">Подтверждение оплаты</h3>
        <p className="text-xs text-slate-400">Ученик: <strong className="text-slate-800 dark:text-slate-200">{student.full_name}</strong></p>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Сумма ({currency}):</label>
            <input type="number" required value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-3 py-2 text-base font-bold rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 text-emerald-600" />
          </div>
          <div>
            <label className="block font-bold mb-1">Способ:</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700">
              <option value="Перевод Сбербанк">Перевод Сбербанк</option>
              <option value="Перевод Т-Банк">Перевод Т-Банк</option>
              <option value="Банковская карта">Банковская карта</option>
              <option value="Наличные">Наличные</option>
            </select>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-xl text-slate-500 font-bold">Отмена</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold">{submitting ? '...' : 'Оплачено (+1 мес)'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ReviewSubmissionModal({ submission, onClose, onSuccess }) {
  const [grade, setGrade] = useState(submission.grade || '5/5');
  const [feedback, setFeedback] = useState(submission.teacher_feedback || '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/submissions/${submission.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'checked', grade: grade.trim(), teacher_feedback: feedback.trim() })
      });
      if (res.ok) onSuccess();
    } catch (e) {} finally { setSubmitting(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#17212b] p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
        <h3 className="font-extrabold text-base">Проверка домашней работы</h3>
        <p className="text-xs text-slate-400">Ученик: <strong className="text-slate-800 dark:text-slate-200">{submission.student_name}</strong></p>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#242f3d] text-xs max-h-40 overflow-y-auto whitespace-pre-line">
          {submission.submission_text}
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold mb-1">Оценка / Балл:</label>
            <input type="text" required value={grade} onChange={e => setGrade(e.target.value)} placeholder="5/5, 95/100, Зачет" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700 font-bold" />
          </div>
          <div>
            <label className="block font-bold mb-1">Комментарий ученику в Telegram:</label>
            <textarea rows="3" value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Отличная работа! Обрати внимание..." className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#242f3d] border border-slate-200 dark:border-slate-700" />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-xl text-slate-500 font-bold">Отмена</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-xl bg-[#2481cc] text-white font-bold">{submitting ? '...' : 'Отправить оценку в бот'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TelegramCodeModal({ student, botUsername, onClose }) {
  const [copied, setCopied] = useState(false);
  const inviteText = `Здравствуйте, ${student.full_name}!\nДля подключения к боту нашего курса перейдите по ссылке:\nhttps://t.me/${botUsername}?start=${student.access_code}\nИли отправьте боту код: ${student.access_code}`;

  const copy = () => {
    navigator.clipboard.writeText(inviteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#17212b] p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
        <h3 className="font-extrabold text-base">Код привязки Telegram</h3>
        <p className="text-slate-400">Ученик: <strong className="text-slate-800 dark:text-slate-200">{student.full_name}</strong></p>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#242f3d] text-center">
          <div className="text-[10px] text-slate-400 mb-1">Код доступа:</div>
          <div className="text-2xl font-mono font-black text-[#2481cc]">{student.access_code}</div>
        </div>
        <button onClick={copy} className="w-full py-2.5 rounded-xl bg-[#2481cc] text-white font-bold">{copied ? 'Скопировано!' : 'Скопировать приглашение'}</button>
        <button onClick={onClose} className="w-full py-1 text-slate-400">Закрыть</button>
      </div>
    </div>
  );
}

// Mount React Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
