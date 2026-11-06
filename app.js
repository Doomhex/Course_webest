const { useState, useEffect, useMemo } = React;

// -------------------------------------------------------------------
// SVG Icons Library (Crisp, zero-dependency, modern aesthetic)
// -------------------------------------------------------------------
const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Layers: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
  Wallet: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Bot: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
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
  Search: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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
  )
};

// Helper to format currency
function formatMoney(amount, currency = '₽') {
  if (amount === undefined || amount === null) return `0 ${currency}`;
  return `${Number(amount).toLocaleString('ru-RU')} ${currency}`;
}

// -------------------------------------------------------------------
// MAIN APP COMPONENT
// -------------------------------------------------------------------
function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data states
  const [stats, setStats] = useState(null);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [homeworks, setHomeworks] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [settings, setSettings] = useState({});
  const [logs, setLogs] = useState([]);

  // Modals
  const [modalStudent, setModalStudent] = useState(null); // 'create' | student object
  const [modalGroup, setModalGroup] = useState(null); // 'create' | group object
  const [modalHomework, setModalHomework] = useState(false);
  const [modalMarkPaid, setModalMarkPaid] = useState(null); // student object
  const [modalReview, setModalReview] = useState(null); // submission object
  const [modalTelegramCode, setModalTelegramCode] = useState(null); // student object

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
        fetch('/api/stats').then(r => r.json()),
        fetch('/api/groups').then(r => r.json()),
        fetch('/api/students').then(r => r.json()),
        fetch('/api/homework').then(r => r.json()),
        fetch('/api/submissions').then(r => r.json()),
        fetch('/api/payments').then(r => r.json()),
        fetch('/api/settings').then(r => r.json()),
        fetch('/api/logs').then(r => r.json())
      ]);
      setStats(sRes);
      setGroups(gRes);
      setStudents(stRes);
      setHomeworks(hRes);
      setSubmissions(subRes);
      setPayments(pRes);
      setSettings(setRes);
      setLogs(lRes);
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

  // Simulator Polling / Loading
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

  // Overdue and Due Tomorrow Students
  const urgentStudents = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    return students.filter(s => {
      if (s.payment_status === 'paid') return false;
      return s.payment_due_date === tomorrow || s.payment_due_date === today || s.payment_status === 'overdue';
    });
  }, [students]);

  // Handlers
  const handleSendReminder = async (studentId) => {
    try {
      const res = await fetch(`/api/students/${studentId}/send-reminder`, { method: 'POST' }).then(r => r.json());
      if (res.success) {
        showToast('🔔 Напоминание об оплате успешно отправлено в Telegram!');
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 border text-sm font-medium transition-smooth ${
          toast.type === 'error'
            ? 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800'
            : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
        }`}>
          {toast.type === 'error' ? <Icons.Alert /> : <Icons.Check />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Icons.BookOpen />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                  {settings.school_name || 'EduFlow'}
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                  CRM + Bot
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Преподаватель: <span className="font-medium text-slate-700 dark:text-slate-300">{settings.teacher_name || 'Анна Сергеевна'}</span>
              </p>
            </div>
          </div>

          {/* Quick Actions & Header Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setModalHomework(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm shadow-brand-600/25 transition-smooth"
            >
              <Icons.Send />
              <span className="hidden sm:inline">Отправить ДЗ группе</span>
              <span className="sm:hidden">ДЗ</span>
            </button>

            <button
              onClick={() => setModalStudent('create')}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-smooth"
            >
              <Icons.Plus />
              <span className="hidden sm:inline">Ученик</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-smooth"
              title="Переключить тему"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            <button
              onClick={loadData}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-smooth"
              title="Обновить данные"
            >
              <Icons.Refresh />
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 overflow-x-auto py-1 border-t border-slate-100 dark:border-slate-800/60 scrollbar-none">
          {[
            { id: 'dashboard', label: 'Обзор', icon: Icons.Dashboard },
            { id: 'groups', label: `Группы (${groups.length})`, icon: Icons.Layers },
            { id: 'students', label: `Ученики (${students.length})`, icon: Icons.Users },
            { id: 'homework', label: `Домашние задания (${homeworks.length})`, icon: Icons.BookOpen },
            { 
              id: 'submissions', 
              label: 'Проверка ДЗ', 
              icon: Icons.CheckCircle,
              badge: stats?.pendingSubmissions > 0 ? stats.pendingSubmissions : null 
            },
            { id: 'finances', label: 'Финансы & Оплаты', icon: Icons.Wallet },
            { id: 'bot', label: 'Telegram Бот', icon: Icons.Bot, highlight: true }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-smooth relative ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/50 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
                    {tab.badge}
                  </span>
                )}
                {tab.highlight && !isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading && !stats ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
            <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Загрузка платформы...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                stats={stats}
                currency={currency}
                urgentStudents={urgentStudents}
                groups={groups}
                submissions={submissions}
                setActiveTab={setActiveTab}
                setModalHomework={setModalHomework}
                setModalStudent={setModalStudent}
                setModalReview={setModalReview}
                setModalMarkPaid={setModalMarkPaid}
                handleSendReminder={handleSendReminder}
                handleRunRemindersCheck={handleRunRemindersCheck}
              />
            )}

            {activeTab === 'groups' && (
              <GroupsView
                groups={groups}
                students={students}
                currency={currency}
                setModalGroup={setModalGroup}
                setModalHomework={(gId) => {
                  setModalHomework(gId || true);
                }}
                loadData={loadData}
                showToast={showToast}
              />
            )}

            {activeTab === 'students' && (
              <StudentsView
                students={students}
                groups={groups}
                currency={currency}
                search={studentSearch}
                setSearch={setStudentSearch}
                groupFilter={studentGroupFilter}
                setGroupFilter={setStudentGroupFilter}
                statusFilter={studentStatusFilter}
                setStatusFilter={setStudentStatusFilter}
                setModalStudent={setModalStudent}
                setModalMarkPaid={setModalMarkPaid}
                setModalTelegramCode={setModalTelegramCode}
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
              <FinancesView
                stats={stats}
                payments={payments}
                currency={currency}
                setModalMarkPaid={() => setModalStudent('create')}
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

      {/* MODALS */}
      {modalStudent && (
        <StudentModal
          student={modalStudent === 'create' ? null : modalStudent}
          groups={groups}
          currency={currency}
          onClose={() => setModalStudent(null)}
          onSuccess={() => {
            setModalStudent(null);
            loadData();
            showToast('Ученик успешно сохранен!');
          }}
        />
      )}

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

      {modalHomework && (
        <CreateHomeworkModal
          groups={groups}
          defaultGroupId={typeof modalHomework === 'number' ? modalHomework : null}
          onClose={() => setModalHomework(false)}
          onSuccess={(res) => {
            setModalHomework(false);
            loadData();
            showToast(`🚀 Задание опубликовано и отправлено в Telegram (${res.broadcast.count} ученикам)!`);
          }}
        />
      )}

      {modalMarkPaid && (
        <MarkPaidModal
          student={modalMarkPaid}
          currency={currency}
          onClose={() => setModalMarkPaid(null)}
          onSuccess={() => {
            setModalMarkPaid(null);
            loadData();
            showToast('✅ Оплата зафиксирована и отправлено подтверждение в бот!');
          }}
        />
      )}

      {modalReview && (
        <ReviewSubmissionModal
          submission={modalReview}
          onClose={() => setModalReview(null)}
          onSuccess={() => {
            setModalReview(null);
            loadData();
            showToast('⭐️ Оценка и отзыв сохранены и отправлены ученику в Telegram!');
          }}
        />
      )}

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
// TAB 1: DASHBOARD VIEW
// -------------------------------------------------------------------
function DashboardView({
  stats,
  currency,
  urgentStudents,
  groups,
  submissions,
  setActiveTab,
  setModalHomework,
  setModalStudent,
  setModalReview,
  setModalMarkPaid,
  handleSendReminder,
  handleRunRemindersCheck
}) {
  return (
    <div className="space-y-6">
      {/* 4 CORE FINANCIAL & METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* All-Time Earnings */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Всего за всё время</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Icons.Wallet />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {formatMoney(stats?.allTimeEarnings, currency)}
          </div>
          <div className="mt-2 flex items-center text-xs text-slate-500 dark:text-slate-400">
            <span>Общий доход за всю историю работы</span>
          </div>
        </div>

        {/* Past Month Earnings (Highlighted!) */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-brand-200/80 dark:border-brand-900/60 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-16 h-16 bg-brand-500/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                За прошедший месяц
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                {stats?.pastMonthKey || 'Октябрь'}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Icons.Calendar />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {formatMoney(stats?.pastMonthEarnings, currency)}
          </div>
          <div className="mt-2 flex items-center text-xs text-brand-600 dark:text-brand-400 font-medium">
            <span>Итог прошлого расчетного периода</span>
          </div>
        </div>

        {/* Current Month Earnings */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider">За текущий месяц</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {stats?.currentMonthKey || 'Ноябрь'}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Icons.CheckCircle />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {formatMoney(stats?.currentMonthEarnings, currency)}
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Оплатили: {stats?.paidStudents} из {stats?.totalStudents} учеников</span>
          </div>
        </div>

        {/* Expected Monthly Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Ожидаемый сбор</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Icons.Clock />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            {formatMoney(stats?.expectedRevenue, currency)}
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="text-amber-600 dark:text-amber-400 font-medium">
              Ожидают: {stats?.pendingStudents}
            </span>
            {stats?.overdueStudents > 0 && (
              <span className="text-rose-600 dark:text-rose-400 font-medium">
                • Просрочено: {stats.overdueStudents}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* URGENT PAYMENT ALERT BANNER (1 DAY BEFORE / OVERDUE) */}
      {urgentStudents.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200 dark:border-amber-900/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm">
                <Icons.Bell />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                  <span>Ближайшие оплаты (завтра или просрочено)</span>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                    {urgentStudents.length} учеников
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  Бот автоматически отправляет напоминания за 1 день до даты оплаты. Вы также можете отправить напоминание вручную.
                </p>
              </div>
            </div>
            <button
              onClick={handleRunRemindersCheck}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-smooth whitespace-nowrap self-start sm:self-auto"
            >
              <Icons.Telegram />
              <span>Разослать напоминания за 1 день</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {urgentStudents.map(student => (
              <div
                key={student.id}
                className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/80 dark:border-amber-900/40 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-sm text-slate-900 dark:text-white">{student.full_name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Срок: <span className="font-semibold text-amber-700 dark:text-amber-400">{student.payment_due_date} ({student.payment_due_time})</span>
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {formatMoney(student.tuition_amount, currency)}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSendReminder(student.id)}
                    title="Отправить напоминание в Telegram"
                    className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 hover:bg-amber-200 transition-smooth"
                  >
                    <Icons.Send />
                  </button>
                  <button
                    onClick={() => setModalMarkPaid(student)}
                    title="Отметить как оплачено"
                    className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 transition-smooth"
                  >
                    <Icons.Check />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TWO COLUMNS: MONTHLY BREAKDOWN & RECENT SUBMISSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Monthly Revenue Visual Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Динамика поступлений по месяцам</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Сравнение дохода за последние 6 месяцев</p>
            </div>
            <button
              onClick={() => setActiveTab('finances')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Подробная ведомость →
            </button>
          </div>

          <div className="pt-4 flex items-end justify-between gap-2 h-52 border-b border-slate-100 dark:border-slate-800 pb-2">
            {stats?.monthlyBreakdown && stats.monthlyBreakdown.map((item, idx) => {
              const maxVal = Math.max(...stats.monthlyBreakdown.map(m => m.amount), 50000);
              const heightPercent = Math.max(12, Math.round((item.amount / maxVal) * 100));
              const isPastMonth = item.monthKey === stats.pastMonthKey;
              const isCurrentMonth = item.monthKey === stats.currentMonthKey;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1 opacity-0 group-hover:opacity-100 transition-smooth">
                    {formatMoney(item.amount, currency)}
                  </div>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[48px] rounded-t-xl transition-all duration-300 relative ${
                      isCurrentMonth
                        ? 'bg-gradient-to-t from-brand-600 to-indigo-500'
                        : isPastMonth
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                        : 'bg-slate-200 dark:bg-slate-800'
                    }`}
                  >
                    {isPastMonth && (
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded whitespace-nowrap">
                        Прошлый
                      </span>
                    )}
                    {isCurrentMonth && (
                      <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 text-[9px] font-bold bg-brand-100 text-brand-800 dark:bg-brand-950 dark:text-brand-300 rounded whitespace-nowrap">
                        Текущий
                      </span>
                    )}
                  </div>
                  <span className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500"></span>
              <span>Прошедший месяц ({formatMoney(stats?.pastMonthEarnings, currency)})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-brand-500"></span>
              <span>Текущий месяц ({formatMoney(stats?.currentMonthEarnings, currency)})</span>
            </div>
          </div>
        </div>

        {/* Right: Pending Homework Reviews */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Сданные работы на проверку</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Поступают из Telegram-бота</p>
            </div>
            <button
              onClick={() => setActiveTab('submissions')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Все ({submissions.length})
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-[290px] pr-1">
            {submissions.filter(s => s.status === 'pending').length === 0 ? (
              <div className="py-10 text-center text-slate-400 text-xs">
                <div className="w-10 h-10 mx-auto mb-2 text-emerald-500"><Icons.CheckCircle /></div>
                Все домашние работы проверены!
              </div>
            ) : (
              submissions.filter(s => s.status === 'pending').map(sub => (
                <div
                  key={sub.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 transition-smooth"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-slate-900 dark:text-white">
                      {sub.student_name}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Ждет проверки
                    </span>
                  </div>
                  <div className="text-xs font-medium text-brand-600 dark:text-brand-400 truncate">
                    {sub.homework_title}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {sub.submission_text}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{sub.submitted_at}</span>
                    <button
                      onClick={() => setModalReview(sub)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-600 hover:bg-brand-700 text-white transition-smooth"
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
// TAB 2: GROUPS VIEW
// -------------------------------------------------------------------
function GroupsView({ groups, students, currency, setModalGroup, setModalHomework, loadData, showToast }) {
  const handleDeleteGroup = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить эту группу?')) return;
    try {
      await fetch(`/api/groups/${id}`, { method: 'DELETE' });
      showToast('Группа удалена');
      loadData();
    } catch (e) {
      showToast('Ошибка удаления', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Учебные группы</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Управляйте группами курсов, расписанием и рассылайте домашние задания одним нажатием
          </p>
        </div>
        <button
          onClick={() => setModalGroup('create')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-smooth self-start sm:self-auto"
        >
          <Icons.Plus />
          <span>Создать группу</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map(group => {
          const groupStudents = students.filter(s => s.group_id === group.id);
          const totalTuition = groupStudents.reduce((sum, s) => sum + (s.tuition_amount || 0), 0);

          return (
            <div
              key={group.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {group.subject || 'Курс'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setModalGroup(group)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {group.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <Icons.Clock />
                  <span>{group.schedule || 'Расписание не указано'}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Учеников</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      {groupStudents.length} чел.
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Сбор в месяц</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                      {formatMoney(totalTuition, currency)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setModalHomework(group.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900 text-brand-700 dark:text-brand-300 transition-smooth"
                >
                  <Icons.Send />
                  <span>Отправить ДЗ этой группе</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// TAB 3: STUDENTS VIEW
// -------------------------------------------------------------------
function StudentsView({
  students,
  groups,
  currency,
  search,
  setSearch,
  groupFilter,
  setGroupFilter,
  statusFilter,
  setStatusFilter,
  setModalStudent,
  setModalMarkPaid,
  setModalTelegramCode,
  handleSendReminder,
  loadData,
  showToast
}) {
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      if (groupFilter && String(s.group_id) !== String(groupFilter)) return false;
      if (statusFilter && s.payment_status !== statusFilter) return false;
      if (search) {
        const query = search.toLowerCase();
        const matchesName = (s.full_name || '').toLowerCase().includes(query);
        const matchesPhone = (s.phone || '').toLowerCase().includes(query);
        const matchesTg = (s.telegram_username || '').toLowerCase().includes(query);
        const matchesCode = (s.access_code || '').toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesTg && !matchesCode) return false;
      }
      return true;
    });
  }, [students, groupFilter, statusFilter, search]);

  const handleDelete = async (id) => {
    if (!confirm('Удалить ученика?')) return;
    try {
      await fetch(`/api/students/${id}`, { method: 'DELETE' });
      showToast('Ученик удален');
      loadData();
    } catch (e) {
      showToast('Ошибка удаления', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search / Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ученики центра</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Учет посещаемости, сумм оплаты, дат следующего взноса и привязки к Telegram
          </p>
        </div>
        <button
          onClick={() => setModalStudent('create')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-smooth self-start md:self-auto"
        >
          <Icons.Plus />
          <span>Добавить ученика</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icons.Search />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по имени, телефону, Telegram или коду..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <select
          value={groupFilter}
          onChange={e => setGroupFilter(e.target.value)}
          className="w-full sm:w-48 py-2 px-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
        >
          <option value="">Все группы</option>
          {groups.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="w-full sm:w-44 py-2 px-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
        >
          <option value="">Все статусы оплаты</option>
          <option value="paid">Оплачено</option>
          <option value="pending">Ожидает оплаты</option>
          <option value="overdue">Просрочено</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50/75 dark:bg-slate-800/50 text-xs uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Ученик</th>
                <th className="px-5 py-3.5 font-semibold">Группа</th>
                <th className="px-5 py-3.5 font-semibold">Telegram статус</th>
                <th className="px-5 py-3.5 font-semibold">Сумма оплаты</th>
                <th className="px-5 py-3.5 font-semibold">Срок оплаты</th>
                <th className="px-5 py-3.5 font-semibold">Статус</th>
                <th className="px-5 py-3.5 font-semibold text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-slate-400 text-sm">
                    Ученики не найдены
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  const isPaid = student.payment_status === 'paid';
                  const isOverdue = student.payment_status === 'overdue';
                  const hasTg = !!student.telegram_id;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-smooth">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {student.full_name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {student.phone || 'Нет телефона'}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          {student.group_name || 'Без группы'}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {hasTg ? (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                            <Icons.Telegram />
                            <span>{student.telegram_username || 'Подключен'}</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setModalTelegramCode(student)}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono font-medium rounded bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 hover:bg-amber-100 transition-smooth"
                          >
                            <span>Код: {student.access_code}</span>
                          </button>
                        )}
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                        {formatMoney(student.tuition_amount, currency)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
                          {student.payment_due_date || '—'}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {student.payment_due_time ? `к ${student.payment_due_time}` : ''}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        {isPaid ? (
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Оплачено
                          </span>
                        ) : isOverdue ? (
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                            Просрочено
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            Ожидает
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Mark as Paid Button */}
                          <button
                            onClick={() => setModalMarkPaid(student)}
                            title="Отметить оплату"
                            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:hover:bg-emerald-900 dark:text-emerald-300 transition-smooth flex items-center gap-1"
                          >
                            <Icons.Check />
                            <span className="hidden sm:inline">Оплатил</span>
                          </button>

                          {/* Reminder button */}
                          <button
                            onClick={() => handleSendReminder(student.id)}
                            title="Отправить напоминание в Telegram"
                            className="p-1.5 text-xs rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 transition-smooth"
                          >
                            <Icons.Bell />
                          </button>

                          {/* Edit button */}
                          <button
                            onClick={() => setModalStudent(student)}
                            title="Редактировать"
                            className="p-1.5 text-xs rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-smooth"
                          >
                            ✏️
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => handleDelete(student.id)}
                            title="Удалить"
                            className="p-1.5 text-xs rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-smooth"
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
// TAB 4: HOMEWORK & LESSON TOPICS VIEW
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Домашние задания и темы уроков</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Отправляйте задания группам: они мгновенно доставляются в Telegram-бот всем ученикам выбранной группы
          </p>
        </div>
        <button
          onClick={() => setModalHomework(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-smooth self-start sm:self-auto"
        >
          <Icons.Send />
          <span>Отправить ДЗ группе</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {homeworks.length === 0 ? (
          <div className="col-span-2 py-16 text-center text-slate-400">
            Пока нет опубликованных заданий. Нажмите «Отправить ДЗ группе»!
          </div>
        ) : (
          homeworks.map(hw => (
            <div
              key={hw.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {hw.group_name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <Icons.Telegram />
                      <span>Отправлено в бот</span>
                    </span>
                    <button
                      onClick={() => handleDelete(hw.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {hw.title}
                </h3>
                {hw.topic && (
                  <div className="text-xs font-medium text-brand-600 dark:text-brand-400 mb-2">
                    Раздел: {hw.topic}
                  </div>
                )}

                <div className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl mb-3">
                  {hw.description}
                </div>

                {hw.materials_url && (
                  <a
                    href={hw.materials_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 hover:underline mb-3"
                  >
                    <Icons.Paperclip />
                    <span>Материалы к уроку</span>
                  </a>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="text-slate-500 flex items-center gap-1">
                  <Icons.Clock />
                  <span>Дедлайн: <strong className="text-slate-800 dark:text-slate-200">{hw.deadline || 'Без дедлайна'}</strong></span>
                </div>

                <button
                  onClick={() => setActiveTab('submissions')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium transition-smooth"
                >
                  Сдано: {hw.submissions_count || 0} →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// TAB 5: SUBMISSIONS (ПРОВЕРКА ДЗ)
// -------------------------------------------------------------------
function SubmissionsView({ submissions, filter, setFilter, setModalReview }) {
  const filtered = useMemo(() => {
    if (filter === 'all') return submissions;
    return submissions.filter(s => s.status === filter);
  }, [submissions, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Проверка домашних заданий</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Работы, отправленные учениками через Telegram-бот. Проверяйте, ставьте оценки и комментируйте
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          {[
            { id: 'all', label: 'Все' },
            { id: 'pending', label: 'Новые на проверку' },
            { id: 'checked', label: 'Проверенные' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-smooth ${
                filter === btn.id
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-3 py-16 text-center text-slate-400">
            Нет работ по выбранному фильтру
          </div>
        ) : (
          filtered.map(sub => {
            const isChecked = sub.status === 'checked';

            return (
              <div
                key={sub.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {sub.student_name}
                    </span>
                    {isChecked ? (
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {sub.grade || 'Проверено'}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 animate-pulse">
                        Требует проверки
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-1">
                    {sub.homework_title}
                  </div>
                  <div className="text-[11px] text-slate-400 mb-3">
                    Группа: {sub.group_name} • Отправлено: {sub.submitted_at}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-700 dark:text-slate-200 max-h-36 overflow-y-auto whitespace-pre-line mb-3">
                    {sub.submission_text}
                  </div>

                  {sub.file_name && (
                    <div className="mb-3 flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      <Icons.Paperclip />
                      <span>Прикреплен файл: {sub.file_name}</span>
                    </div>
                  )}

                  {isChecked && sub.teacher_feedback && (
                    <div className="p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 mb-3">
                      <strong>Отзыв учителя:</strong> {sub.teacher_feedback}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                  <button
                    onClick={() => setModalReview(sub)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-xs transition-smooth"
                  >
                    {isChecked ? 'Редактировать оценку' : 'Оценить и оставить отзыв'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// TAB 6: FINANCES VIEW
// -------------------------------------------------------------------
function FinancesView({ stats, payments, currency, setModalMarkPaid }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Финансы и Оплаты</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Полный расчет поступлений: за всё время, за прошедший и текущий месяцы
          </p>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold uppercase text-slate-400">Всего за всё время</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            {formatMoney(stats?.allTimeEarnings, currency)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Общая сумма всех зафиксированных платежей</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-brand-500 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-brand-600 dark:text-brand-400">За прошедший месяц</span>
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
              {stats?.pastMonthKey}
            </span>
          </div>
          <div className="text-3xl font-black text-brand-700 dark:text-brand-300 tracking-tight mt-1">
            {formatMoney(stats?.pastMonthEarnings, currency)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Окончательный итог прошлого месяца</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400">За текущий месяц</span>
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {stats?.currentMonthKey}
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            {formatMoney(stats?.currentMonthEarnings, currency)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Ожидается всего: {formatMoney(stats?.expectedRevenue, currency)}</p>
        </div>
      </div>

      {/* Payments History Ledger Table */}
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Журнал полученных оплат</h3>
          <span className="text-xs text-slate-500">Записей: {payments.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50/75 dark:bg-slate-800/50 text-xs uppercase text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3 font-semibold">Дата</th>
                <th className="px-5 py-3 font-semibold">Ученик</th>
                <th className="px-5 py-3 font-semibold">Группа</th>
                <th className="px-5 py-3 font-semibold">Период</th>
                <th className="px-5 py-3 font-semibold">Способ</th>
                <th className="px-5 py-3 font-semibold">Сумма</th>
                <th className="px-5 py-3 font-semibold">Примечание</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-5 py-3.5 text-xs text-slate-500 font-mono">{p.payment_date}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">{p.student_name}</td>
                  <td className="px-5 py-3.5 text-xs">{p.group_name || '—'}</td>
                  <td className="px-5 py-3.5 text-xs font-mono">{p.period_month}</td>
                  <td className="px-5 py-3.5 text-xs">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {p.payment_method}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                    +{formatMoney(p.amount, currency)}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-400">{p.receipt_note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// TAB 7: TELEGRAM BOT & LIVE SIMULATOR
// -------------------------------------------------------------------
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
  const [isSavingToken, setIsSavingToken] = useState(false);

  const handleSaveBotToken = async () => {
    if (!tokenInput.trim()) {
      showToast('Введите токен бота', 'error');
      return;
    }
    setIsSavingToken(true);
    try {
      const res = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenInput.trim() })
      }).then(r => r.json());

      if (res.ok) {
        showToast(`✅ Бот @${res.bot.username} успешно подключен!`);
        loadData();
      } else {
        showToast(`Ошибка: ${res.error}`, 'error');
      }
    } catch (e) {
      showToast('Ошибка связи с Telegram API', 'error');
    } finally {
      setIsSavingToken(false);
    }
  };

  // Student simulator send message
  const handleSimSend = async (e) => {
    e.preventDefault();
    if (!simInput.trim() && !simAttachment) return;

    try {
      const res = await fetch('/api/simulator/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: simStudentId,
          text: simInput.trim(),
          attachment_name: simAttachment || null
        })
      }).then(r => r.json());

      if (res.success) {
        setSimInput('');
        setSimAttachment('');
        loadSimulator(simStudentId);
        loadData();
        showToast('Отправлено в бот! Ответ сгенерирован.');
      }
    } catch (e) {
      showToast('Ошибка отправки', 'error');
    }
  };

  const selectedStudent = students.find(s => s.id === Number(simStudentId));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Telegram Бот & Интерактивный симулятор</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Подключение настоящего Telegram-бота + живой симулятор ученика для тестирования рассылок и проверки ДЗ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Real Bot Settings & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bot Token Setup Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                <Icons.Telegram />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Подключение Telegram Бота</h3>
                <p className="text-xs text-slate-500">Автоматическая рассылка заданий и напоминаний</p>
              </div>
            </div>

            {settings.bot_username ? (
              <div className="space-y-2 mb-4">
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                      Активен: @{settings.bot_username}
                    </span>
                  </div>
                  <a
                    href={`https://t.me/${settings.bot_username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Открыть в Telegram →
                  </a>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 text-xs">
                  <span className="text-sky-800 dark:text-sky-200">
                    Для работы на Vercel привяжите Webhook:
                  </span>
                  <button
                    onClick={async () => {
                      try {
                        const r = await fetch('/api/setup-webhook').then(res => res.json());
                        if (r.telegramResponse?.ok) {
                          showToast('🔗 Webhook успешно привязан к вашему Vercel!');
                        } else {
                          showToast('Ошибка привязки Webhook', 'error');
                        }
                      } catch (e) {
                        showToast('Ошибка вызова Webhook setup', 'error');
                      }
                    }}
                    className="px-3 py-1.5 font-bold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-smooth shadow-xs"
                  >
                    Активировать Webhook Vercel
                  </button>
                </div>
              </div>
            ) : null}

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Токен Telegram-бота (от @BotFather):
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={tokenInput}
                  onChange={e => setTokenInput(e.target.value)}
                  placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ..."
                  className="flex-1 px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                />
                <button
                  onClick={handleSaveBotToken}
                  disabled={isSavingToken}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-smooth whitespace-nowrap"
                >
                  {isSavingToken ? 'Проверка...' : 'Подключить'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                1. Напишите <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-brand-500 underline">@BotFather</a> в Telegram команду <code>/newbot</code><br />
                2. Скопируйте полученный HTTP API Token и вставьте сюда. Бот сразу начнет рассылать ДЗ ученикам!
              </p>
            </div>
          </div>

          {/* Automation & Reminders Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Автоматизация напоминаний об оплате
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Система автоматически находит учеников, у которых срок оплаты наступает ровно через 1 день (24 часа), и отправляет им персонализированное уведомление в Telegram.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                  Правило: «За 1 день до даты оплаты»
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  ● Фоновый планировщик активен (проверка каждый час)
                </div>
              </div>
              <button
                onClick={handleRunRemindersCheck}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-smooth"
              >
                Запустить проверку сейчас
              </button>
            </div>
          </div>

          {/* Live Activity Logs */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Журнал событий бота</h3>
              <span className="text-xs text-slate-400">Последние действия</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {logs.length === 0 ? (
                <div className="text-xs text-slate-400 py-4 text-center">Логов пока нет</div>
              ) : (
                logs.map(log => (
                  <div key={log.id} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs flex items-start gap-2">
                    <span className="text-slate-400 font-mono text-[10px] mt-0.5">{log.created_at.slice(11, 19)}</span>
                    <span className="text-slate-700 dark:text-slate-300 flex-1">{log.details}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Telegram Simulator Phone (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-slate-900 text-white border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[640px]">
            {/* Phone Top Notch / Header */}
            <div className="bg-slate-800/90 px-4 py-3 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm">
                  <Icons.Telegram />
                </div>
                <div>
                  <div className="font-bold text-xs">
                    {settings.school_name || 'EduFlow Bot'}
                  </div>
                  <div className="text-[10px] text-sky-400">бот курса • онлайн</div>
                </div>
              </div>

              {/* Student selector */}
              <select
                value={simStudentId}
                onChange={e => setSimStudentId(Number(e.target.value))}
                className="bg-slate-700 text-xs text-white rounded-lg px-2 py-1 border border-slate-600 focus:outline-none"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.full_name} ({s.group_name})
                  </option>
                ))}
              </select>
            </div>

            {/* Active Homework Banner inside student phone */}
            {simActiveHw && (
              <div className="bg-indigo-950/80 px-3 py-1.5 border-b border-indigo-900/60 text-[11px] flex items-center justify-between text-indigo-200">
                <span className="truncate">Текущее ДЗ: {simActiveHw.title}</span>
                <span className="font-bold text-indigo-400 whitespace-nowrap ml-2">до {simActiveHw.deadline}</span>
              </div>
            )}

            {/* Chat Messages Flow */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0e1621] text-xs">
              <div className="text-center text-[10px] text-slate-500">
                Вы вошли как ученик: <span className="text-slate-300 font-semibold">{selectedStudent?.full_name}</span>
              </div>

              {simMessages.map(msg => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl ${
                        isBot
                          ? 'bg-[#182533] text-slate-100 rounded-tl-sm'
                          : 'bg-[#2b5278] text-white rounded-tr-sm'
                      }`}
                    >
                      <div className="whitespace-pre-line text-[12px] leading-relaxed">
                        {msg.text}
                      </div>
                      {msg.attachment_name && (
                        <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-sky-300">
                          <Icons.Paperclip />
                          <span>{msg.attachment_name}</span>
                        </div>
                      )}
                      <div className="text-[9px] text-slate-400 text-right mt-1">
                        {msg.created_at ? msg.created_at.slice(11, 16) : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulator Input Bar */}
            <form onSubmit={handleSimSend} className="p-2.5 bg-[#17212b] border-t border-slate-800 flex flex-col gap-2">
              {simAttachment && (
                <div className="px-2 py-1 rounded bg-slate-800 text-[11px] text-sky-300 flex items-center justify-between">
                  <span>📎 Файл: {simAttachment}</span>
                  <button type="button" onClick={() => setSimAttachment('')} className="text-slate-400 hover:text-white">✕</button>
                </div>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSimAttachment('reshenie_dz_alex.pdf')}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-smooth"
                  title="Прикрепить файл задания"
                >
                  <Icons.Paperclip />
                </button>
                <input
                  type="text"
                  value={simInput}
                  onChange={e => setSimInput(e.target.value)}
                  placeholder="Ответить в бот (сдать ДЗ)..."
                  className="flex-1 bg-[#242f3d] text-white placeholder-slate-400 px-3 py-2 text-xs rounded-xl focus:outline-none"
                />
                <button
                  type="submit"
                  className="p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl transition-smooth"
                >
                  <Icons.Send />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// MODAL: CREATE / EDIT STUDENT
// -------------------------------------------------------------------
function StudentModal({ student, groups, currency, onClose, onSuccess }) {
  const isEdit = !!student;
  const [fullName, setFullName] = useState(student?.full_name || '');
  const [groupId, setGroupId] = useState(student?.group_id || (groups[0]?.id || ''));
  const [phone, setPhone] = useState(student?.phone || '');
  const [telegramUsername, setTelegramUsername] = useState(student?.telegram_username || '');
  const [tuitionAmount, setTuitionAmount] = useState(student?.tuition_amount !== undefined ? student.tuition_amount : 6000);
  const [paymentDueDate, setPaymentDueDate] = useState(student?.payment_due_date || new Date().toISOString().slice(0, 10));
  const [paymentDueTime, setPaymentDueTime] = useState(student?.payment_due_time || '18:00');
  const [paymentStatus, setPaymentStatus] = useState(student?.payment_status || 'pending');
  const [notes, setNotes] = useState(student?.notes || '');
  const [submitting, setSubmitting] = useState(false);

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
          notes: notes.trim()
        })
      });

      if (res.ok) {
        onSuccess();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {isEdit ? 'Редактировать ученика' : 'Регистрация нового ученика'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <Icons.X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              ФИО ученика:
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Иван Петров"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Группа:
              </label>
              <select
                value={groupId}
                onChange={e => setGroupId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Телефон:
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+7 (999) 000-00-00"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Telegram Username (@handle):
            </label>
            <input
              type="text"
              value={telegramUsername}
              onChange={e => setTelegramUsername(e.target.value)}
              placeholder="@student_username"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          {/* Tuition & Payment Schedule Fields */}
          <div className="p-4 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 block">
              Параметры оплаты курса:
            </span>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Сумма оплаты ({currency}):
              </label>
              <input
                type="number"
                required
                value={tuitionAmount}
                onChange={e => setTuitionAmount(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Дата следующей оплаты:
                </label>
                <input
                  type="date"
                  required
                  value={paymentDueDate}
                  onChange={e => setPaymentDueDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Время:
                </label>
                <input
                  type="time"
                  value={paymentDueTime}
                  onChange={e => setPaymentDueTime(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Текущий статус:
              </label>
              <select
                value={paymentStatus}
                onChange={e => setPaymentStatus(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="pending">Ожидает оплаты (напомнить за 1 день)</option>
                <option value="paid">Оплачено за этот месяц</option>
                <option value="overdue">Просрочено</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Заметки преподавателя:
            </label>
            <textarea
              rows="2"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Особенности ученика, пожелания..."
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-xs"
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
// MODAL: CREATE / EDIT GROUP
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
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">
            {isEdit ? 'Редактировать группу' : 'Создать новую группу'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <Icons.X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Название группы:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="General English B1 (Morning)"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Предмет / Направление:
            </label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Английский язык / IELTS"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Расписание занятий:
            </label>
            <input
              type="text"
              value={schedule}
              onChange={e => setSchedule(e.target.value)}
              placeholder="Пн, Ср, Пт 10:00 - 11:30"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-xs"
            >
              {submitting ? 'Сохранение...' : isEdit ? 'Обновить' : 'Создать группу'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// MODAL: CREATE & BROADCAST HOMEWORK TO GROUP
// -------------------------------------------------------------------
function CreateHomeworkModal({ groups, defaultGroupId, onClose, onSuccess }) {
  const [groupId, setGroupId] = useState(defaultGroupId || groups[0]?.id || '');
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [materialsUrl, setMaterialsUrl] = useState('');
  const [deadlineDate, setDeadlineDate] = useState(() => {
    const d = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  });
  const [deadlineTime, setDeadlineTime] = useState('21:00');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      const deadline = `${deadlineDate} ${deadlineTime}`;
      const res = await fetch('/api/homework', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          group_id: Number(groupId),
          title: title.trim(),
          topic: topic.trim(),
          description: description.trim(),
          materials_url: materialsUrl.trim(),
          deadline
        })
      });

      const data = await res.json();
      if (res.ok) onSuccess(data);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-500 text-white">
              <Icons.Send />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Отправить ДЗ / тему урока группе
              </h3>
              <p className="text-xs text-slate-500">Автоматически разошлется всем ученикам в Telegram</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <Icons.X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Выберите группу для рассылки:
            </label>
            <select
              value={groupId}
              onChange={e => setGroupId(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold focus:outline-none"
            >
              {groups.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Тема домашнего задания / урока:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Unit 6: Past Simple vs Present Perfect"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Подраздел / Грамматический фокус (опционально):
            </label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Grammar & Writing Task"
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Текст задания (что именно сделать ученикам):
            </label>
            <textarea
              required
              rows="4"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="1. Прочитать правило на стр. 52&#10;2. Выполнить упр 3 и 4 письменно&#10;3. Написать 5 предложений..."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Крайний срок сдачи (Дата):
              </label>
              <input
                type="date"
                required
                value={deadlineDate}
                onChange={e => setDeadlineDate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Время сдачи:
              </label>
              <input
                type="time"
                value={deadlineTime}
                onChange={e => setDeadlineTime(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Ссылка на материалы / Google Drive / PDF (опционально):
            </label>
            <input
              type="url"
              value={materialsUrl}
              onChange={e => setMaterialsUrl(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            <Icons.Telegram />
            <span>При нажатии «Разослать» задание сразу отправится в Telegram всем ученикам группы!</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-xs"
            >
              <Icons.Send />
              <span>{submitting ? 'Рассылка...' : 'Опубликовать и разослать в Telegram'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// MODAL: MARK STUDENT AS PAID
// -------------------------------------------------------------------
function MarkPaidModal({ student, currency, onClose, onSuccess }) {
  const [amount, setAmount] = useState(student.tuition_amount || 6000);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [paymentMethod, setPaymentMethod] = useState('Перевод');
  const [receiptNote, setReceiptNote] = useState('Оплата курса за текущий месяц');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/students/${student.id}/mark-paid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount),
          payment_date: paymentDate,
          payment_method: paymentMethod,
          receipt_note: receiptNote.trim()
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
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500 text-white">
              <Icons.Check />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Подтверждение оплаты
              </h3>
              <p className="text-xs text-slate-500">{student.full_name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <Icons.X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Полученная сумма ({currency}):
            </label>
            <input
              type="number"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 text-base font-bold text-emerald-600 dark:text-emerald-400 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Дата платежа:
              </label>
              <input
                type="date"
                required
                value={paymentDate}
                onChange={e => setPaymentDate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Способ оплаты:
              </label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="Перевод Сбербанк">Перевод Сбер</option>
                <option value="Перевод Т-Банк">Перевод Т-Банк</option>
                <option value="Банковская карта">Банковская карта</option>
                <option value="Наличные">Наличные</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Примечание к квитанции:
            </label>
            <input
              type="text"
              value={receiptNote}
              onChange={e => setReceiptNote(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-800 dark:text-indigo-300">
            💡 Система автоматически переставит плановую дату следующей оплаты на +1 месяц и отправит ученику квитанцию в Telegram-бот.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
            >
              {submitting ? 'Запись...' : 'Зафиксировать оплату'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// MODAL: REVIEW SUBMISSION (ПРОВЕРКА ДЗ)
// -------------------------------------------------------------------
function ReviewSubmissionModal({ submission, onClose, onSuccess }) {
  const [grade, setGrade] = useState(submission.grade || '5/5');
  const [feedback, setFeedback] = useState(submission.teacher_feedback || '');
  const [status, setStatus] = useState(submission.status === 'pending' ? 'checked' : submission.status);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/submissions/${submission.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          grade: grade.trim(),
          teacher_feedback: feedback.trim()
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
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Проверка домашней работы
            </h3>
            <p className="text-xs text-slate-500">
              Ученик: <strong className="text-slate-800 dark:text-slate-200">{submission.student_name}</strong> • Группа: {submission.group_name}
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <Icons.X />
          </button>
        </div>

        <div className="mb-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-1">
            Тема задания: {submission.homework_title}
          </div>
          <div className="text-xs text-slate-800 dark:text-slate-200 font-mono whitespace-pre-line max-h-48 overflow-y-auto">
            {submission.submission_text}
          </div>
          {submission.file_name && (
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              <Icons.Paperclip />
              <span>Файл ученика: {submission.file_name}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Оценка / Балл:
              </label>
              <input
                type="text"
                required
                value={grade}
                onChange={e => setGrade(e.target.value)}
                placeholder="5/5, 95/100, Отлично"
                className="w-full px-3.5 py-2 text-sm font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Статус:
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="checked">Проверено и зачтено</option>
                <option value="pending">Оставить на доработку</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Комментарий и разбор ошибок для ученика:
            </label>
            <textarea
              rows="3"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Отличная работа! Обрати внимание на согласование времен в 3-м предложении..."
              className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
            💬 Оценка и ваш комментарий сразу придут ученику в Telegram-бот!
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-xl text-slate-600 hover:bg-slate-100 dark:text-slate-300"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-xs"
            >
              {submitting ? 'Отправка...' : 'Сохранить и отправить отзыв'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// MODAL: TELEGRAM INVITE CODE
// -------------------------------------------------------------------
function TelegramCodeModal({ student, botUsername, onClose }) {
  const [copied, setCopied] = useState(false);

  const inviteText = `Здравствуйте, ${student.full_name}!\nДля подключения к Telegram-боту нашего курса перейдите по ссылке:\nhttps://t.me/${botUsername}?start=${student.access_code}\nИли отправьте боту код: ${student.access_code}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-500 text-white">
              <Icons.Telegram />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Привязка Telegram ученика
              </h3>
              <p className="text-xs text-slate-500">{student.full_name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <Icons.X />
          </button>
        </div>

        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-center border border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 block mb-1">Персональный код доступа ученика:</span>
            <span className="text-2xl font-mono font-bold tracking-wider text-brand-600 dark:text-brand-400">
              {student.access_code}
            </span>
          </div>

          <p>
            Передайте этот код ученику. Когда он напишет боту <a href={`https://t.me/${botUsername}`} target="_blank" rel="noreferrer" className="text-brand-500 underline">@{botUsername}</a> свой код или нажмет старт по ссылке, его аккаунт автоматически привяжется к этой базе!
          </p>

          <div className="pt-2">
            <button
              onClick={copyToClipboard}
              className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold flex items-center justify-center gap-2 transition-smooth"
            >
              <Icons.Check />
              <span>{copied ? 'Скопировано в буфер!' : 'Скопировать приглашение для ученика'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mount the React Application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
