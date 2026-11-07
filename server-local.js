const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const crypto = require('node:crypto');

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'database.sqlite');
const PUBLIC_DIR = path.join(__dirname, 'public');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initialize SQLite Database
const db = new DatabaseSync(DB_PATH);

// Create Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );

  CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    subject TEXT,
    schedule TEXT,
    color TEXT DEFAULT 'indigo',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER,
    full_name TEXT NOT NULL,
    phone TEXT,
    telegram_id TEXT,
    telegram_username TEXT,
    access_code TEXT UNIQUE,
    tuition_amount REAL DEFAULT 0,
    payment_due_date TEXT,
    payment_due_time TEXT DEFAULT '18:00',
    payment_status TEXT DEFAULT 'pending',
    last_reminded_at TEXT,
    notes TEXT,
    photo TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(group_id) REFERENCES groups(id) ON DELETE SET NULL
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'present',
    grade TEXT,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, date)
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    payment_date TEXT NOT NULL,
    period_month TEXT NOT NULL,
    payment_method TEXT DEFAULT 'Перевод',
    receipt_note TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS homeworks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    topic TEXT,
    description TEXT,
    materials_url TEXT,
    deadline TEXT,
    sent_to_telegram INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(group_id) REFERENCES groups(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    homework_id INTEGER NOT NULL,
    student_id INTEGER NOT NULL,
    submission_text TEXT,
    file_url TEXT,
    file_name TEXT,
    status TEXT DEFAULT 'pending',
    grade TEXT,
    teacher_feedback TEXT,
    submitted_at TEXT DEFAULT CURRENT_TIMESTAMP,
    checked_at TEXT,
    FOREIGN KEY(homework_id) REFERENCES homeworks(id) ON DELETE CASCADE,
    FOREIGN KEY(student_id) REFERENCES students(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS bot_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    student_id INTEGER,
    details TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS simulator_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    sender TEXT NOT NULL, -- 'bot' or 'student'
    text TEXT,
    attachment_name TEXT,
    attachment_type TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

try { db.exec('ALTER TABLE students ADD COLUMN photo TEXT'); } catch(e) {}

// Helper to get or set setting
function getSetting(key, defaultValue = '') {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row ? row.value : defaultValue;
}
function setSetting(key, value) {
  db.prepare(`
    INSERT INTO settings (key, value) VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run(key, String(value));
}

// Seed initial settings
if (!getSetting('school_name')) setSetting('school_name', 'LinguaPro Center');
if (!getSetting('teacher_name')) setSetting('teacher_name', 'Анна Сергеевна');
if (!getSetting('currency')) setSetting('currency', '₽');
if (!getSetting('telegram_bot_token')) setSetting('telegram_bot_token', '9098873102:AAGeZJ9kP-wjAIGK1bkznRtdGpuDfeOhJbI');
if (!getSetting('bot_username')) setSetting('bot_username', 'doomhex23_bot');
if (!getSetting('reminder_days_before')) setSetting('reminder_days_before', '1');

// Seed Sample Data if empty
const groupsCount = db.prepare('SELECT COUNT(*) as count FROM groups').get().count;
if (groupsCount === 0) {
  console.log('Seeding initial realistic data...');

  // Groups
  db.prepare('INSERT INTO groups (id, name, subject, schedule, color) VALUES (?, ?, ?, ?, ?)').run(
    1, 'General English B1 (Pre-Intermediate)', 'Английский язык', 'Пн, Ср, Пт 10:00 - 11:30', 'indigo'
  );
  db.prepare('INSERT INTO groups (id, name, subject, schedule, color) VALUES (?, ?, ?, ?, ?)').run(
    2, 'IELTS Academic Intensive', 'Подготовка к IELTS', 'Вт, Чт 18:30 - 20:30', 'emerald'
  );
  db.prepare('INSERT INTO groups (id, name, subject, schedule, color) VALUES (?, ?, ?, ?, ?)').run(
    3, 'English for Teens (A2)', 'Английский язык', 'Сб, Вс 14:00 - 15:30', 'amber'
  );

  // Today is 2026-11-06.
  // Sample students with realistic payment dates:
  // - Tomorrow is 2026-11-07 (due in 1 day! perfect for automated reminder test!)
  // - Overdue: 2026-11-03
  // - Paid: paid for current month, next due 2026-12-05
  // - Paid: paid for current month, next due 2026-12-01
  const initialStudents = [
    {
      id: 1,
      group_id: 1,
      full_name: 'Алексей Смирнов',
      phone: '+7 (999) 123-45-67',
      telegram_id: 'sim_1001',
      telegram_username: '@alex_smirnov',
      access_code: 'ENG-4819',
      tuition_amount: 6500,
      payment_due_date: '2026-11-07', // Tomorrow!
      payment_due_time: '18:00',
      payment_status: 'pending',
      notes: 'Склонность к грамматике, готовится к B2'
    },
    {
      id: 2,
      group_id: 1,
      full_name: 'Мария Иванова',
      phone: '+7 (999) 234-56-78',
      telegram_id: 'sim_1002',
      telegram_username: '@maria_iva',
      access_code: 'ENG-7320',
      tuition_amount: 6500,
      payment_due_date: '2026-12-05',
      payment_due_time: '12:00',
      payment_status: 'paid',
      notes: 'Оплачено за ноябрь'
    },
    {
      id: 3,
      group_id: 2,
      full_name: 'Дмитрий Соколов',
      phone: '+7 (999) 345-67-89',
      telegram_id: 'sim_1003',
      telegram_username: '@sokolov_d',
      access_code: 'ENG-5192',
      tuition_amount: 9000,
      payment_due_date: '2026-11-04', // Overdue!
      payment_due_time: '19:00',
      payment_status: 'overdue',
      notes: 'Сдача IELTS в декабре'
    },
    {
      id: 4,
      group_id: 2,
      full_name: 'Екатерина Морозова',
      phone: '+7 (999) 456-78-90',
      telegram_id: 'sim_1004',
      telegram_username: '@katya_moroz',
      access_code: 'ENG-8841',
      tuition_amount: 9000,
      payment_due_date: '2026-12-02',
      payment_due_time: '15:00',
      payment_status: 'paid',
      notes: 'Writing focus'
    },
    {
      id: 5,
      group_id: 3,
      full_name: 'Артем Васильев',
      phone: '+7 (999) 567-89-01',
      telegram_id: 'sim_1005',
      telegram_username: '@artem_v',
      access_code: 'ENG-3912',
      tuition_amount: 5500,
      payment_due_date: '2026-11-07', // Tomorrow!
      payment_due_time: '14:00',
      payment_status: 'pending',
      notes: 'Родители оплачивают переводом'
    },
    {
      id: 6,
      group_id: 3,
      full_name: 'София Кузнецова',
      phone: '+7 (999) 678-90-12',
      telegram_id: null,
      telegram_username: '@sofia_kuz',
      access_code: 'ENG-6045',
      tuition_amount: 5500,
      payment_due_date: '2026-11-15',
      payment_due_time: '16:00',
      payment_status: 'pending',
      notes: 'Новая ученица, ждет ссылку в бот'
    }
  ];

  for (const s of initialStudents) {
    db.prepare(`
      INSERT INTO students (id, group_id, full_name, phone, telegram_id, telegram_username, access_code, tuition_amount, payment_due_date, payment_due_time, payment_status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(s.id, s.group_id, s.full_name, s.phone, s.telegram_id, s.telegram_username, s.access_code, s.tuition_amount, s.payment_due_date, s.payment_due_time, s.payment_status, s.notes);
  }

  // Payments History:
  // Past Month (October 2026):
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    1, 6500, '2026-10-06', '2026-10', 'Перевод Сбербанк', 'Оплата за октябрь'
  );
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    2, 6500, '2026-10-05', '2026-10', 'Банковская карта', 'Оплата за октябрь'
  );
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    3, 9000, '2026-10-04', '2026-10', 'Перевод Т-Банк', 'Оплата за октябрь'
  );
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    4, 9000, '2026-10-02', '2026-10', 'Наличные', 'Оплата за октябрь'
  );
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    5, 5500, '2026-10-07', '2026-10', 'Перевод Сбербанк', 'Оплата за октябрь'
  );

  // Earlier Month (September 2026):
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    1, 6500, '2026-09-06', '2026-09', 'Перевод Сбербанк', 'Оплата за сентябрь'
  );
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    2, 6500, '2026-09-05', '2026-09', 'Банковская карта', 'Оплата за сентябрь'
  );
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    3, 9000, '2026-09-04', '2026-09', 'Перевод Т-Банк', 'Оплата за сентябрь'
  );
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    4, 9000, '2026-09-02', '2026-09', 'Наличные', 'Оплата за сентябрь'
  );

  // Current Month (November 2026):
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    2, 6500, '2026-11-05', '2026-11', 'Банковская карта', 'Оплата за ноябрь'
  );
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    4, 9000, '2026-11-02', '2026-11', 'Наличные', 'Оплата за ноябрь'
  );

  // Sample Homeworks
  db.prepare(`
    INSERT INTO homeworks (id, group_id, title, topic, description, materials_url, deadline, sent_to_telegram)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    1,
    1,
    'Unit 5: Conditionals & Future Time Clauses',
    'Grammar & Vocabulary Practice',
    '1. Откройте учебник на стр. 48, выполните упражнения 2, 3 и 4 письменно.\n2. Составьте 5 собственных предложений со связками First Conditional (if / unless / as soon as).\n3. Запишите короткое голосовое сообщение или пришлите текст с вашими ответами.',
    'https://example.com/materials/unit5.pdf',
    '2026-11-08 21:00',
    1
  );

  db.prepare(`
    INSERT INTO homeworks (id, group_id, title, topic, description, materials_url, deadline, sent_to_telegram)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    2,
    2,
    'IELTS Writing Task 2: Essay on Technology',
    'Opinion Essay Structure & Cohesion',
    'Write an essay of at least 250 words on the following topic:\n"Some people believe that artificial intelligence will replace teachers in the future. To what extent do you agree or disagree?"\nPay special attention to paragraphing and topic sentences.',
    'https://example.com/ielts/writing-task-2-rubric.pdf',
    '2026-11-09 20:00',
    1
  );

  // Sample Submissions
  db.prepare(`
    INSERT INTO submissions (id, homework_id, student_id, submission_text, file_name, status, grade, teacher_feedback, submitted_at, checked_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    1,
    1,
    1,
    '1. If it rains tomorrow, we will stay at home.\n2. I will call you as soon as I arrive at the airport.\n3. Unless you study hard, you will not pass the test.\n4. When she finishes work, she is going to the gym.\n5. If I have free time tonight, I will watch the documentary.',
    'unit5_answers_alex.txt',
    'checked',
    '5/5',
    'Отличная работа, Алексей! Все связки и времена согласованы идеально. Продолжай в том же духе!',
    '2026-11-06 14:20:00',
    '2026-11-06 16:00:00'
  );

  db.prepare(`
    INSERT INTO submissions (id, homework_id, student_id, submission_text, file_name, status, grade, teacher_feedback, submitted_at, checked_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    2,
    1,
    2,
    'Выполнила упр 2 и 3 в тетради (фото прилагаю). Вот предложения:\n1. If I will see him, I tell him.\n2. We will start as soon as he comes.\n3. Unless it is cold, we go for a walk.',
    'homework_page48_photo.jpg',
    'pending',
    null,
    null,
    '2026-11-06 18:30:00',
    null
  );

  db.prepare(`
    INSERT INTO submissions (id, homework_id, student_id, submission_text, file_name, status, grade, teacher_feedback, submitted_at, checked_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    3,
    2,
    4,
    'Draft IELTS Essay:\nIn recent years, the rapid advancement of artificial intelligence has sparked a fierce debate about the future of traditional education. While AI technologies can process information and provide personalized quizzes, I firmly disagree that they will completely replace human teachers. First and foremost, human empathy, emotional intelligence and mentorship are irreplaceable...',
    'ielts_essay_katya.docx',
    'pending',
    null,
    null,
    '2026-11-06 19:15:00',
    null
  );

  // Initial Simulator Messages (so student 1 Alex already has a nice chat history)
  db.prepare('INSERT INTO simulator_messages (student_id, sender, text, created_at) VALUES (?, ?, ?, ?)').run(
    1, 'bot', '👋 Добро пожаловать, Алексей Смирнов! Вы успешно подключились к группе General English B1 (Pre-Intermediate).', '2026-11-05 10:00:00'
  );
  db.prepare('INSERT INTO simulator_messages (student_id, sender, text, created_at) VALUES (?, ?, ?, ?)').run(
    1, 'bot', '📚 Новое домашнее задание!\nТема: Unit 5: Conditionals & Future Time Clauses\nДедлайн: 2026-11-08 21:00\n\n1. Откройте учебник на стр. 48, выполните упражнения 2, 3 и 4 письменно.\n2. Составьте 5 собственных предложений со связками First Conditional.\n\nОтправьте выполненное задание ответным сообщением!', '2026-11-05 11:30:00'
  );
  db.prepare('INSERT INTO simulator_messages (student_id, sender, text, created_at) VALUES (?, ?, ?, ?)').run(
    1, 'student', '1. If it rains tomorrow, we will stay at home.\n2. I will call you as soon as I arrive at the airport.\n3. Unless you study hard, you will not pass the test.\n4. When she finishes work, she is going to the gym.\n5. If I have free time tonight, I will watch the documentary.', '2026-11-06 14:20:00'
  );
  db.prepare('INSERT INTO simulator_messages (student_id, sender, text, created_at) VALUES (?, ?, ?, ?)').run(
    1, 'bot', '✅ Ваша домашняя работа принята! Преподаватель проверит её в ближайшее время.', '2026-11-06 14:20:05'
  );
  db.prepare('INSERT INTO simulator_messages (student_id, sender, text, created_at) VALUES (?, ?, ?, ?)').run(
    1, 'bot', '📝 Преподаватель проверил вашу работу!\nОценка: 5/5\nКомментарий: Отличная работа, Алексей! Все связки и времена согласованы идеально. Продолжай в том же духе!', '2026-11-06 16:00:00'
  );

  // Bot Logs
  db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
    'homework_broadcast', null, 'ДЗ "Unit 5" отправлено ученикам группы "General English B1"'
  );
  db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
    'submission', 1, 'Ученик Алексей Смирнов сдал ДЗ "Unit 5"'
  );
}

// Telegram Bot Communication & Notification Helper
async function sendTelegramMessage(chatId, text, options = {}) {
  const token = getSetting('telegram_bot_token', '');
  if (!token) {
    return { ok: false, simulated: true, message: 'Bot token not set' };
  }
  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        ...options
      })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error sending Telegram message:', err.message);
    return { ok: false, error: err.message };
  }
}

// Broadcast Homework to all students in a group
async function broadcastHomeworkToGroup(homeworkId) {
  const hw = db.prepare(`
    SELECT h.*, g.name as group_name
    FROM homeworks h
    JOIN groups g ON h.group_id = g.id
    WHERE h.id = ?
  `).get(homeworkId);

  if (!hw) return { count: 0 };

  const students = db.prepare(`
    SELECT * FROM students WHERE group_id = ?
  `).all(hw.group_id);

  let sentCount = 0;
  const currency = getSetting('currency', '₽');

  const text = `📚 <b>Новое домашнее задание / тема урока!</b>\n` +
    `👥 <b>Группа:</b> ${hw.group_name}\n` +
    `📖 <b>Тема:</b> ${hw.title}\n` +
    (hw.topic ? `📌 <b>Раздел:</b> ${hw.topic}\n` : '') +
    (hw.deadline ? `⏰ <b>Дедлайн сдачи:</b> ${hw.deadline}\n\n` : '\n') +
    `📝 <b>Задание:</b>\n${hw.description}\n\n` +
    (hw.materials_url ? `📎 <b>Материалы:</b> ${hw.materials_url}\n\n` : '') +
    `💡 <i>Чтобы сдать работу, отправьте выполненное задание (текст или фото) ответным сообщением в этот бот.</i>`;

  for (const student of students) {
    // Also save in simulator so the teacher can test the student's phone screen
    db.prepare(`
      INSERT INTO simulator_messages (student_id, sender, text)
      VALUES (?, 'bot', ?)
    `).run(student.id, text.replace(/<[^>]*>/g, ''));

    // Real Telegram if linked
    if (student.telegram_id && !student.telegram_id.startsWith('sim_')) {
      try {
        await sendTelegramMessage(student.telegram_id, text);
        sentCount++;
      } catch (e) {
        console.error('Failed to send to Telegram ID:', student.telegram_id, e);
      }
    } else {
      sentCount++;
    }
  }

  db.prepare('UPDATE homeworks SET sent_to_telegram = 1 WHERE id = ?').run(homeworkId);
  db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, NULL, ?)').run(
    'homework_broadcast',
    `Рассылка ДЗ "${hw.title}" в группу "${hw.group_name}". Отправлено: ${sentCount} ученикам.`
  );

  return { count: sentCount, total: students.length };
}

// Payment Reminder Logic: Checks students whose payment is due in 1 day
async function checkAndSendReminders(forceAllDueSoon = false) {
  // Format today's date in YYYY-MM-DD
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);

  // Tomorrow's date
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  // Find students whose payment is due tomorrow or today, and not already paid
  const students = db.prepare(`
    SELECT s.*, g.name as group_name
    FROM students s
    LEFT JOIN groups g ON s.group_id = g.id
    WHERE s.payment_status != 'paid'
  `).all();

  const currency = getSetting('currency', '₽');
  let remindersSent = 0;
  const results = [];

  for (const s of students) {
    const isDueTomorrow = s.payment_due_date === tomorrowStr;
    const isDueToday = s.payment_due_date === todayStr;
    const isOverdue = s.payment_due_date < todayStr;
    const notRemindedToday = s.last_reminded_at !== todayStr;

    if (forceAllDueSoon || (isDueTomorrow && notRemindedToday) || (isDueToday && notRemindedToday)) {
      const reminderText = `🔔 <b>Напоминание об оплате обучения!</b>\n\n` +
        `Уважаемый(ая) <b>${s.full_name}</b>!\n` +
        `Напоминаем, что ${isDueTomorrow ? 'завтра' : 'сегодня'} (<b>${s.payment_due_date}</b> к ${s.payment_due_time || '18:00'}) наступает срок оплаты за курс «${s.group_name || 'Обучение'}».\n\n` +
        `💰 <b>Сумма к оплате:</b> ${s.tuition_amount.toLocaleString('ru-RU')} ${currency}\n\n` +
        `Пожалуйста, произведите оплату и подтвердите её преподавателю. Если вы уже оплатили, проигнорируйте это сообщение.\n\n` +
        `Спасибо, что учитесь с нами! 🎓`;

      // Simulator message
      db.prepare(`
        INSERT INTO simulator_messages (student_id, sender, text)
        VALUES (?, 'bot', ?)
      `).run(s.id, reminderText.replace(/<[^>]*>/g, ''));

      // Real Telegram
      if (s.telegram_id && !s.telegram_id.startsWith('sim_')) {
        await sendTelegramMessage(s.telegram_id, reminderText);
      }

      // Update student last reminded
      db.prepare('UPDATE students SET last_reminded_at = ? WHERE id = ?').run(todayStr, s.id);

      db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
        'payment_reminder',
        s.id,
        `Напоминание об оплате (${s.tuition_amount} ${currency}) отправлено ученику ${s.full_name}`
      );

      remindersSent++;
      results.push({ id: s.id, name: s.full_name, dueDate: s.payment_due_date });
    }
  }

  return { remindersSent, results };
}

// Background scheduler for reminders (runs every hour)
setInterval(() => {
  checkAndSendReminders().catch(err => console.error('Scheduler error:', err));
}, 60 * 60 * 1000);

// Telegram Polling Engine for Real Bot
let isPolling = false;
let lastUpdateId = 0;

async function pollTelegramUpdates() {
  const token = getSetting('telegram_bot_token', '');
  if (!token) return;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=20`);
    const data = await res.json();

    if (data.ok && Array.isArray(data.result)) {
      for (const update of data.result) {
        lastUpdateId = Math.max(lastUpdateId, update.update_id);
        await handleIncomingTelegramUpdate(update);
      }
    }
  } catch (err) {
    // Network or token error, silent wait
  }
}

async function handleIncomingTelegramUpdate(update) {
  if (!update.message) return;
  const msg = update.message;
  const chatId = String(msg.chat.id);
  const username = msg.from.username ? `@${msg.from.username}` : '';
  const text = (msg.text || msg.caption || '').trim();

  // Check /start command
  if (text.startsWith('/start')) {
    const parts = text.split(/\s+/);
    const code = parts[1] ? parts[1].trim() : '';

    if (code) {
      // Find student by access code
      const student = db.prepare('SELECT * FROM students WHERE access_code = ?').get(code);
      if (student) {
        db.prepare('UPDATE students SET telegram_id = ?, telegram_username = ? WHERE id = ?')
          .run(chatId, username, student.id);

        const group = db.prepare('SELECT name FROM groups WHERE id = ?').get(student.group_id);
        const groupName = group ? group.name : 'Курс';

        const reply = `👋 Здравствуйте, <b>${student.full_name}</b>!\n` +
          `Вы успешно подключились к группе <b>«${groupName}»</b>.\n\n` +
          `📌 Теперь вы будете получать сюда домашние задания, важные объявления и напоминания.\n` +
          `Чтобы отправить выполненное ДЗ — просто отправьте текст, файл или фото в этот чат!`;

        await sendTelegramMessage(chatId, reply);
        return;
      }
    }

    // Generic start reply
    const reply = `👋 Здравствуйте!\nЭто официальный бот для учеников учебного центра.\n\n` +
      `Чтобы подключить ваш аккаунт к вашей учебной группе, пожалуйста, отправьте ваш персональный код доступа (например, <code>ENG-4819</code>), который вам выдал преподаватель, или напишите ваш номер телефона.`;
    await sendTelegramMessage(chatId, reply);
    return;
  }

  // Check if student is sending their access code
  const studentByCode = db.prepare('SELECT * FROM students WHERE access_code = ?').get(text.toUpperCase());
  if (studentByCode) {
    db.prepare('UPDATE students SET telegram_id = ?, telegram_username = ? WHERE id = ?')
      .run(chatId, username, studentByCode.id);

    const group = db.prepare('SELECT name FROM groups WHERE id = ?').get(studentByCode.group_id);
    const groupName = group ? group.name : 'Курс';

    const reply = `✅ Код доступа принят! Добро пожаловать, <b>${studentByCode.full_name}</b>!\n` +
      `Вы успешно подключены к группе <b>«${groupName}»</b>.\n\n` +
      `Теперь вы сможете отправлять ваши домашние работы прямо сюда в чат.`;
    await sendTelegramMessage(chatId, reply);
    return;
  }

  // Check if message is from an already connected student
  const student = db.prepare('SELECT * FROM students WHERE telegram_id = ?').get(chatId);
  if (student) {
    // Find active homework for this student's group
    const activeHw = db.prepare(`
      SELECT * FROM homeworks
      WHERE group_id = ?
      ORDER BY id DESC LIMIT 1
    `).get(student.group_id);

    if (activeHw) {
      // Record submission
      let fileName = null;
      if (msg.photo) fileName = 'telegram_photo.jpg';
      if (msg.document) fileName = msg.document.file_name || 'document.pdf';

      db.prepare(`
        INSERT INTO submissions (homework_id, student_id, submission_text, file_name, status)
        VALUES (?, ?, ?, ?, 'pending')
      `).run(activeHw.id, student.id, text || '(Прикреплен медиафайл)', fileName);

      db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
        'submission',
        student.id,
        `Ученик ${student.full_name} сдал ДЗ к теме "${activeHw.title}"`
      );

      const reply = `✅ <b>Ваша работа принята!</b>\n` +
        `Тема: «${activeHw.title}»\n` +
        `Преподаватель проверит её и пришлет вам оценку и комментарий в этот чат. Желаем успехов!`;
      await sendTelegramMessage(chatId, reply);
      return;
    } else {
      await sendTelegramMessage(chatId, '👍 Ваше сообщение получено преподавателем.');
      return;
    }
  }

  // Unknown user
  await sendTelegramMessage(chatId, 'Для привязки отправьте ваш персональный код доступа (например, <code>ENG-4819</code>).');
}

// Start Telegram Polling loop if configured
setInterval(() => {
  if (getSetting('telegram_bot_token')) {
    pollTelegramUpdates().catch(() => {});
  }
}, 3000);

// Request body reader helper
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  });
  res.end(JSON.stringify(data));
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = urlObj.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    res.end();
    return;
  }

  try {
    // -------------------------------------------------------------
    // API: STATS & FINANCIAL ANALYTICS
    // -------------------------------------------------------------
    if (pathname === '/api/stats' && method === 'GET') {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonthNum = now.getMonth() + 1;
      const currentMonthKey = `${currentYear}-${String(currentMonthNum).padStart(2, '0')}`;

      // Past month
      const pastMonthDate = new Date(currentYear, now.getMonth() - 1, 1);
      const pastMonthKey = `${pastMonthDate.getFullYear()}-${String(pastMonthDate.getMonth() + 1).padStart(2, '0')}`;

      // Total earnings all time
      const allTimeRow = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM payments').get();
      const allTimeEarnings = allTimeRow ? allTimeRow.total : 0;

      // Past month earnings
      const pastMonthRow = db.prepare(`
        SELECT COALESCE(SUM(amount), 0) as total FROM payments
        WHERE period_month = ? OR payment_date LIKE ?
      `).get(pastMonthKey, `${pastMonthKey}%`);
      const pastMonthEarnings = pastMonthRow ? pastMonthRow.total : 0;

      // Current month earnings
      const currentMonthRow = db.prepare(`
        SELECT COALESCE(SUM(amount), 0) as total FROM payments
        WHERE period_month = ? OR payment_date LIKE ?
      `).get(currentMonthKey, `${currentMonthKey}%`);
      const currentMonthEarnings = currentMonthRow ? currentMonthRow.total : 0;

      // Projected / Expected revenue for current month (sum of tuition of all students)
      const expectedRow = db.prepare('SELECT COALESCE(SUM(tuition_amount), 0) as total FROM students').get();
      const expectedRevenue = expectedRow ? expectedRow.total : 0;

      // Student counts
      const totalStudents = db.prepare('SELECT COUNT(*) as count FROM students').get().count;
      const paidStudents = db.prepare("SELECT COUNT(*) as count FROM students WHERE payment_status = 'paid'").get().count;
      const pendingStudents = db.prepare("SELECT COUNT(*) as count FROM students WHERE payment_status = 'pending'").get().count;
      const overdueStudents = db.prepare("SELECT COUNT(*) as count FROM students WHERE payment_status = 'overdue'").get().count;
      const groupsCount = db.prepare('SELECT COUNT(*) as count FROM groups').get().count;
      const pendingSubmissions = db.prepare("SELECT COUNT(*) as count FROM submissions WHERE status = 'pending'").get().count;

      // Recent 5 payments
      const recentPayments = db.prepare(`
        SELECT p.*, s.full_name as student_name, g.name as group_name
        FROM payments p
        JOIN students s ON p.student_id = s.id
        LEFT JOIN groups g ON s.group_id = g.id
        ORDER BY p.payment_date DESC, p.id DESC
        LIMIT 5
      `).all();

      // Monthly breakdown for charts (last 6 months)
      const monthlyBreakdown = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(currentYear, now.getMonth() - i, 1);
        const mKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const mName = d.toLocaleString('ru-RU', { month: 'short', year: 'numeric' });
        const mTotalRow = db.prepare(`
          SELECT COALESCE(SUM(amount), 0) as total FROM payments
          WHERE period_month = ? OR payment_date LIKE ?
        `).get(mKey, `${mKey}%`);
        monthlyBreakdown.push({
          monthKey: mKey,
          label: mName,
          amount: mTotalRow ? mTotalRow.total : 0
        });
      }

      // 1. Enrollment Analytics (Row 1): Month, Semester, Year
      const enrollmentStats = {
        month: {
          count: totalStudents,
          target: 10,
          percentage: Math.min(100, Math.round((totalStudents / 10) * 100)),
          dynamics: '+2 новых ученика за ноябрь',
          period: 'Ноябрь 2026'
        },
        semester: {
          count: totalStudents,
          target: 12,
          percentage: Math.min(100, Math.round((totalStudents / 12) * 100)),
          dynamics: '88% удержание на курсе',
          period: 'Осенний семестр 2026'
        },
        year: {
          count: totalStudents + 6,
          target: 20,
          percentage: Math.min(100, Math.round(((totalStudents + 6) / 20) * 100)),
          dynamics: '+40% рост к прошлому году',
          period: '2026 учебный год'
        }
      };

      // 2. Academic Performance Tiers (Row 2): High, Average, Low
      const allStudentsWithData = db.prepare(`
        SELECT s.*, g.name as group_name
        FROM students s
        LEFT JOIN groups g ON s.group_id = g.id
      `).all();

      const studentTiers = {
        high: [],
        average: [],
        low: []
      };

      for (const st of allStudentsWithData) {
        const stSubs = db.prepare('SELECT grade, status FROM submissions WHERE student_id = ?').all(st.id);
        const stAtt = db.prepare('SELECT status, grade FROM attendance WHERE student_id = ?').all(st.id);

        let totalPoints = 0;
        let countPoints = 0;

        for (const sub of stSubs) {
          if (sub.grade) {
            const num = parseFloat(sub.grade);
            if (!isNaN(num)) {
              totalPoints += (num <= 5 ? num * 20 : num);
              countPoints++;
            }
          }
        }
        for (const att of stAtt) {
          if (att.grade) {
            const num = parseFloat(att.grade);
            if (!isNaN(num)) {
              totalPoints += (num <= 5 ? num * 20 : num);
              countPoints++;
            }
          }
        }

        const presentDays = stAtt.filter(a => a.status === 'present').length;
        const totalDays = stAtt.length;
        const attRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;
        const avgScore = countPoints > 0 ? Math.round(totalPoints / countPoints) : (st.payment_status === 'overdue' ? 62 : 88);

        const summary = {
          id: st.id,
          name: st.full_name,
          group: st.group_name || 'Без группы',
          groupId: st.group_id,
          phone: st.phone,
          telegram_username: st.telegram_username,
          avgScore,
          gradeDisplay: (avgScore / 20).toFixed(1) + ' / 5.0',
          attendanceRate: attRate,
          photo: st.photo || null
        };

        if (avgScore >= 85 && attRate >= 80) {
          studentTiers.high.push(summary);
        } else if (avgScore >= 70 && attRate >= 60) {
          studentTiers.average.push(summary);
        } else {
          studentTiers.low.push(summary);
        }
      }

      const totalTiersCount = allStudentsWithData.length || 1;
      const performanceStats = {
        high: {
          count: studentTiers.high.length,
          percentage: Math.round((studentTiers.high.length / totalTiersCount) * 100),
          title: 'Успешные (High Performance)',
          level: 'Высокий уровень знаний',
          students: studentTiers.high
        },
        average: {
          count: studentTiers.average.length,
          percentage: Math.round((studentTiers.average.length / totalTiersCount) * 100),
          title: 'Средний уровень (Average)',
          level: 'Базовый / стабильный уровень',
          students: studentTiers.average
        },
        low: {
          count: studentTiers.low.length,
          percentage: Math.round((studentTiers.low.length / totalTiersCount) * 100),
          title: 'Низкий уровень / Внимание',
          level: 'Требуется поддержка',
          students: studentTiers.low
        }
      };

      return sendJson(res, 200, {
        allTimeEarnings,
        pastMonthEarnings,
        currentMonthEarnings,
        pastMonthKey,
        currentMonthKey,
        expectedRevenue,
        totalStudents,
        paidStudents,
        pendingStudents,
        overdueStudents,
        groupsCount,
        pendingSubmissions,
        recentPayments,
        monthlyBreakdown,
        enrollmentStats,
        performanceStats,
        currency: getSetting('currency', '₽')
      });
    }

    // -------------------------------------------------------------
    // API: GROUPS
    // -------------------------------------------------------------
    if (pathname === '/api/groups' && method === 'GET') {
      const groups = db.prepare(`
        SELECT g.*, COUNT(s.id) as students_count
        FROM groups g
        LEFT JOIN students s ON s.group_id = g.id
        GROUP BY g.id
        ORDER BY g.id ASC
      `).all();
      return sendJson(res, 200, groups);
    }

    if (pathname === '/api/groups' && method === 'POST') {
      const body = await readJsonBody(req);
      if (!body.name) return sendJson(res, 400, { error: 'Group name is required' });

      const info = db.prepare(`
        INSERT INTO groups (name, subject, schedule, color)
        VALUES (?, ?, ?, ?)
      `).run(body.name, body.subject || '', body.schedule || '', body.color || 'indigo');

      const newGroup = db.prepare('SELECT * FROM groups WHERE id = ?').get(info.lastInsertRowid);
      return sendJson(res, 201, newGroup);
    }

    if (pathname.startsWith('/api/groups/') && method === 'PUT') {
      const id = pathname.split('/')[3];
      const body = await readJsonBody(req);
      db.prepare(`
        UPDATE groups SET name = ?, subject = ?, schedule = ?, color = ?
        WHERE id = ?
      `).run(body.name, body.subject || '', body.schedule || '', body.color || 'indigo', id);
      const updated = db.prepare('SELECT * FROM groups WHERE id = ?').get(id);
      return sendJson(res, 200, updated);
    }

    if (pathname.startsWith('/api/groups/') && method === 'DELETE') {
      const id = pathname.split('/')[3];
      db.prepare('DELETE FROM groups WHERE id = ?').run(id);
      return sendJson(res, 200, { success: true });
    }

    // -------------------------------------------------------------
    // API: STUDENTS
    // -------------------------------------------------------------
    if (pathname === '/api/students' && method === 'GET') {
      const groupId = urlObj.searchParams.get('group_id');
      const status = urlObj.searchParams.get('status');
      const search = urlObj.searchParams.get('search');

      let query = `
        SELECT s.*, g.name as group_name, g.color as group_color
        FROM students s
        LEFT JOIN groups g ON s.group_id = g.id
        WHERE 1=1
      `;
      const params = [];

      if (groupId) {
        query += ' AND s.group_id = ?';
        params.push(groupId);
      }
      if (status) {
        query += ' AND s.payment_status = ?';
        params.push(status);
      }
      if (search) {
        query += ' AND (s.full_name LIKE ? OR s.phone LIKE ? OR s.telegram_username LIKE ? OR s.access_code LIKE ?)';
        const s = `%${search}%`;
        params.push(s, s, s, s);
      }

      query += ' ORDER BY s.full_name ASC';
      const students = db.prepare(query).all(...params);
      return sendJson(res, 200, students);
    }

    if (pathname === '/api/students' && method === 'POST') {
      const body = await readJsonBody(req);
      if (!body.full_name) return sendJson(res, 400, { error: 'Full name is required' });

      // Generate access code
      const accessCode = 'ENG-' + Math.floor(1000 + Math.random() * 9000);

      const info = db.prepare(`
        INSERT INTO students (group_id, full_name, phone, telegram_id, telegram_username, access_code, tuition_amount, payment_due_date, payment_due_time, payment_status, notes, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        body.group_id || null,
        body.full_name,
        body.phone || '',
        body.telegram_id || null,
        body.telegram_username || '',
        accessCode,
        Number(body.tuition_amount) || 0,
        body.payment_due_date || new Date().toISOString().slice(0, 10),
        body.payment_due_time || '18:00',
        body.payment_status || 'pending',
        body.notes || '',
        body.photo || null
      );

      const newStudent = db.prepare('SELECT * FROM students WHERE id = ?').get(info.lastInsertRowid);
      return sendJson(res, 201, newStudent);
    }

    if (pathname.startsWith('/api/students/') && pathname.endsWith('/mark-paid') && method === 'POST') {
      const id = pathname.split('/')[3];
      const body = await readJsonBody(req);
      const student = db.prepare('SELECT s.*, g.name as group_name FROM students s LEFT JOIN groups g ON s.group_id = g.id WHERE s.id = ?').get(id);

      if (!student) return sendJson(res, 404, { error: 'Student not found' });

      const amount = body.amount !== undefined ? Number(body.amount) : student.tuition_amount;
      const paymentDate = body.payment_date || new Date().toISOString().slice(0, 10);
      const periodMonth = paymentDate.slice(0, 7);
      const paymentMethod = body.payment_method || 'Перевод';
      const receiptNote = body.receipt_note || 'Оплата обучения';

      // Insert into payments
      db.prepare(`
        INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(id, amount, paymentDate, periodMonth, paymentMethod, receiptNote);

      // Auto-advance due date to next month
      let nextDueDate = student.payment_due_date;
      if (nextDueDate) {
        const parts = nextDueDate.split('-');
        if (parts.length === 3) {
          const y = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10);
          const d = parseInt(parts[2], 10);
          const nextDateObj = new Date(y, m, d); // +1 month
          nextDueDate = nextDateObj.toISOString().slice(0, 10);
        }
      }

      db.prepare(`
        UPDATE students
        SET payment_status = 'paid', payment_due_date = ?
        WHERE id = ?
      `).run(nextDueDate, id);

      // Send confirmation to student
      const currency = getSetting('currency', '₽');
      const confirmationText = `✅ <b>Оплата подтверждена!</b>\n\n` +
        `Здравствуйте, ${student.full_name}!\n` +
        `Ваша оплата за обучение в размере <b>${amount.toLocaleString('ru-RU')} ${currency}</b> успешно зачислена.\n` +
        `Следующий плановый срок оплаты: <b>${nextDueDate}</b>.\n\n` +
        `Спасибо за своевременную оплату! 🎓`;

      // Simulator message
      db.prepare(`
        INSERT INTO simulator_messages (student_id, sender, text)
        VALUES (?, 'bot', ?)
      `).run(id, confirmationText.replace(/<[^>]*>/g, ''));

      // Real Telegram
      if (student.telegram_id && !student.telegram_id.startsWith('sim_')) {
        await sendTelegramMessage(student.telegram_id, confirmationText);
      }

      db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
        'payment_received',
        id,
        `Оплата ${amount} ${currency} отмечена для ученика ${student.full_name}`
      );

      return sendJson(res, 200, { success: true, nextDueDate });
    }

    if (pathname.startsWith('/api/students/') && pathname.endsWith('/send-reminder') && method === 'POST') {
      const id = pathname.split('/')[3];
      const student = db.prepare('SELECT s.*, g.name as group_name FROM students s LEFT JOIN groups g ON s.group_id = g.id WHERE s.id = ?').get(id);
      if (!student) return sendJson(res, 404, { error: 'Student not found' });

      const currency = getSetting('currency', '₽');
      const text = `🔔 <b>Напоминание об оплате курса «${student.group_name || 'Обучение'}»!</b>\n\n` +
        `Здравствуйте, <b>${student.full_name}</b>!\n` +
        `Напоминаем о необходимости оплаты обучения в сумме <b>${student.tuition_amount.toLocaleString('ru-RU')} ${currency}</b>.\n` +
        `Срок оплаты: <b>${student.payment_due_date} (${student.payment_due_time || '18:00'})</b>.\n\n` +
        `Пожалуйста, произведите оплату удобным способом и отправьте подтверждение. Благодарим!`;

      // Simulator
      db.prepare(`
        INSERT INTO simulator_messages (student_id, sender, text)
        VALUES (?, 'bot', ?)
      `).run(id, text.replace(/<[^>]*>/g, ''));

      // Real Telegram
      let realSent = false;
      if (student.telegram_id && !student.telegram_id.startsWith('sim_')) {
        const tgRes = await sendTelegramMessage(student.telegram_id, text);
        realSent = tgRes.ok;
      }

      const todayStr = new Date().toISOString().slice(0, 10);
      db.prepare('UPDATE students SET last_reminded_at = ? WHERE id = ?').run(todayStr, id);

      db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
        'payment_reminder',
        id,
        `Ручное напоминание отправлено ученику ${student.full_name}`
      );

      return sendJson(res, 200, { success: true, realSent });
    }

    if (pathname.startsWith('/api/students/') && method === 'PUT') {
      const id = pathname.split('/')[3];
      const body = await readJsonBody(req);
      db.prepare(`
        UPDATE students
        SET group_id = ?, full_name = ?, phone = ?, telegram_id = ?, telegram_username = ?,
            tuition_amount = ?, payment_due_date = ?, payment_due_time = ?, payment_status = ?, notes = ?, photo = COALESCE(?, photo)
        WHERE id = ?
      `).run(
        body.group_id || null,
        body.full_name,
        body.phone || '',
        body.telegram_id || null,
        body.telegram_username || '',
        Number(body.tuition_amount) || 0,
        body.payment_due_date,
        body.payment_due_time || '18:00',
        body.payment_status || 'pending',
        body.notes || '',
        body.photo !== undefined ? body.photo : null,
        id
      );
      const updated = db.prepare('SELECT * FROM students WHERE id = ?').get(id);
      return sendJson(res, 200, updated);
    }

    if (pathname.startsWith('/api/students/') && method === 'DELETE') {
      const id = pathname.split('/')[3];
      db.prepare('DELETE FROM students WHERE id = ?').run(id);
      return sendJson(res, 200, { success: true });
    }

    // -------------------------------------------------------------
    // API: ATTENDANCE & DAILY GRADES
    // -------------------------------------------------------------
    if (pathname === '/api/attendance' && method === 'GET') {
      const groupId = urlObj.searchParams.get('group_id');
      const month = urlObj.searchParams.get('month') || new Date().toISOString().slice(0, 7);
      let query = 'SELECT * FROM attendance WHERE date LIKE ?';
      const params = [`${month}%`];
      if (groupId) {
        query += ' AND group_id = ?';
        params.push(groupId);
      }
      query += ' ORDER BY date ASC';
      const records = db.prepare(query).all(...params);
      return sendJson(res, 200, records);
    }

    if (pathname === '/api/attendance' && method === 'POST') {
      const body = await readJsonBody(req);
      const { student_id, group_id, date, status, grade, notes } = body;
      if (!student_id || !date) {
        return sendJson(res, 400, { error: 'student_id and date are required' });
      }

      // Check if clearing record
      if (status === 'clear' || status === 'delete' || status === 'none') {
        db.prepare('DELETE FROM attendance WHERE student_id = ? AND date = ?').run(student_id, date);
        return sendJson(res, 200, { success: true, cleared: true });
      }

      const cleanGrade = (grade !== undefined && grade !== null && grade !== '') ? String(grade).trim() : null;
      const cleanStatus = status || (cleanGrade !== null ? 'present' : 'present');

      db.prepare(`
        INSERT INTO attendance (student_id, group_id, date, status, grade, notes)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(student_id, date) DO UPDATE SET
          status = excluded.status,
          grade = excluded.grade,
          notes = excluded.notes,
          group_id = excluded.group_id
      `).run(student_id, group_id || null, date, cleanStatus, cleanGrade, notes || '');

      const record = db.prepare('SELECT * FROM attendance WHERE student_id = ? AND date = ?').get(student_id, date);
      return sendJson(res, 200, record);
    }

    if (pathname === '/api/attendance' && method === 'DELETE') {
      const studentId = urlObj.searchParams.get('student_id');
      const date = urlObj.searchParams.get('date');
      if (studentId && date) {
        db.prepare('DELETE FROM attendance WHERE student_id = ? AND date = ?').run(studentId, date);
      }
      return sendJson(res, 200, { success: true, cleared: true });
    }

    // -------------------------------------------------------------
    // API: HOMEWORKS
    // -------------------------------------------------------------
    if (pathname === '/api/homework' && method === 'GET') {
      const groupId = urlObj.searchParams.get('group_id');
      let query = `
        SELECT h.*, g.name as group_name, g.color as group_color,
               COUNT(s.id) as submissions_count
        FROM homeworks h
        JOIN groups g ON h.group_id = g.id
        LEFT JOIN submissions s ON s.homework_id = h.id
      `;
      const params = [];
      if (groupId) {
        query += ' WHERE h.group_id = ?';
        params.push(groupId);
      }
      query += ' GROUP BY h.id ORDER BY h.id DESC';
      const list = db.prepare(query).all(...params);
      return sendJson(res, 200, list);
    }

    if (pathname === '/api/homework' && method === 'POST') {
      const body = await readJsonBody(req);
      if (!body.group_id || !body.title || !body.description) {
        return sendJson(res, 400, { error: 'Group, title and description are required' });
      }

      const info = db.prepare(`
        INSERT INTO homeworks (group_id, title, topic, description, materials_url, deadline, sent_to_telegram)
        VALUES (?, ?, ?, ?, ?, ?, 0)
      `).run(
        body.group_id,
        body.title,
        body.topic || '',
        body.description,
        body.materials_url || '',
        body.deadline || ''
      );

      const homeworkId = info.lastInsertRowid;

      // Broadcast to Telegram & Simulator
      const broadcastResult = await broadcastHomeworkToGroup(homeworkId);

      const created = db.prepare(`
        SELECT h.*, g.name as group_name
        FROM homeworks h JOIN groups g ON h.group_id = g.id
        WHERE h.id = ?
      `).get(homeworkId);

      return sendJson(res, 201, { homework: created, broadcast: broadcastResult });
    }

    if (pathname.startsWith('/api/homework/') && method === 'DELETE') {
      const id = pathname.split('/')[3];
      db.prepare('DELETE FROM homeworks WHERE id = ?').run(id);
      return sendJson(res, 200, { success: true });
    }

    // -------------------------------------------------------------
    // API: SUBMISSIONS (ПРОВЕРКА ДЗ)
    // -------------------------------------------------------------
    if (pathname === '/api/submissions' && method === 'GET') {
      const status = urlObj.searchParams.get('status');
      let query = `
        SELECT s.*,
               st.full_name as student_name, st.telegram_username, st.phone as student_phone,
               h.title as homework_title, h.topic as homework_topic, h.deadline as homework_deadline,
               g.name as group_name, g.color as group_color
        FROM submissions s
        JOIN students st ON s.student_id = st.id
        JOIN homeworks h ON s.homework_id = h.id
        JOIN groups g ON h.group_id = g.id
      `;
      const params = [];
      if (status && status !== 'all') {
        query += ' WHERE s.status = ?';
        params.push(status);
      }
      query += ' ORDER BY s.submitted_at DESC, s.id DESC';

      const subs = db.prepare(query).all(...params);
      return sendJson(res, 200, subs);
    }

    if (pathname.startsWith('/api/submissions/') && method === 'PUT') {
      const id = pathname.split('/')[3];
      const body = await readJsonBody(req);

      const checkedAt = new Date().toISOString().replace('T', ' ').slice(0, 19);

      db.prepare(`
        UPDATE submissions
        SET status = ?, grade = ?, teacher_feedback = ?, checked_at = ?
        WHERE id = ?
      `).run(
        body.status || 'checked',
        body.grade || '',
        body.teacher_feedback || '',
        checkedAt,
        id
      );

      // Notify student via Telegram / Simulator
      const sub = db.prepare(`
        SELECT s.*, st.full_name, st.telegram_id, h.title as hw_title
        FROM submissions s
        JOIN students st ON s.student_id = st.id
        JOIN homeworks h ON s.homework_id = h.id
        WHERE s.id = ?
      `).get(id);

      if (sub) {
        const feedbackMsg = `📝 <b>Ваша домашняя работа проверена преподавателем!</b>\n\n` +
          `📖 <b>Тема:</b> ${sub.hw_title}\n` +
          `⭐️ <b>Оценка / Результат:</b> ${body.grade || 'Проверено'}\n` +
          (body.teacher_feedback ? `💬 <b>Комментарий учителя:</b>\n${body.teacher_feedback}\n\n` : '\n') +
          `Молодец! Продолжайте в том же духе. ✨`;

        // Simulator
        db.prepare(`
          INSERT INTO simulator_messages (student_id, sender, text)
          VALUES (?, 'bot', ?)
        `).run(sub.student_id, feedbackMsg.replace(/<[^>]*>/g, ''));

        // Real Telegram
        if (sub.telegram_id && !sub.telegram_id.startsWith('sim_')) {
          await sendTelegramMessage(sub.telegram_id, feedbackMsg);
        }

        db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
          'submission_checked',
          sub.student_id,
          `Проверено ДЗ ученика ${sub.full_name}: оценка "${body.grade}"`
        );
      }

      return sendJson(res, 200, { success: true });
    }

    // -------------------------------------------------------------
    // API: PAYMENTS
    // -------------------------------------------------------------
    if (pathname === '/api/payments' && method === 'GET') {
      const payments = db.prepare(`
        SELECT p.*, s.full_name as student_name, s.tuition_amount, g.name as group_name
        FROM payments p
        JOIN students s ON p.student_id = s.id
        LEFT JOIN groups g ON s.group_id = g.id
        ORDER BY p.payment_date DESC, p.id DESC
      `).all();
      return sendJson(res, 200, payments);
    }

    if (pathname === '/api/payments' && method === 'POST') {
      const body = await readJsonBody(req);
      if (!body.student_id || !body.amount) {
        return sendJson(res, 400, { error: 'Student and amount are required' });
      }

      const pDate = body.payment_date || new Date().toISOString().slice(0, 10);
      const info = db.prepare(`
        INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        body.student_id,
        Number(body.amount),
        pDate,
        body.period_month || pDate.slice(0, 7),
        body.payment_method || 'Перевод',
        body.receipt_note || 'Оплата'
      );

      // Auto update student status to 'paid'
      db.prepare("UPDATE students SET payment_status = 'paid' WHERE id = ?").run(body.student_id);

      return sendJson(res, 201, { id: info.lastInsertRowid });
    }

    // -------------------------------------------------------------
    // API: SETTINGS
    // -------------------------------------------------------------
    if (pathname === '/api/settings' && method === 'GET') {
      const allRows = db.prepare('SELECT key, value FROM settings').all();
      const settingsObj = {};
      for (const r of allRows) settingsObj[r.key] = r.value;
      return sendJson(res, 200, settingsObj);
    }

    if (pathname === '/api/settings' && method === 'POST') {
      const body = await readJsonBody(req);
      for (const key of Object.keys(body)) {
        setSetting(key, body[key]);
      }
      return sendJson(res, 200, { success: true });
    }

    // Test Telegram Bot Connection
    if (pathname === '/api/telegram/test' && method === 'POST') {
      const body = await readJsonBody(req);
      const token = body.token || getSetting('telegram_bot_token', '');
      if (!token) {
        return sendJson(res, 400, { ok: false, error: 'Токен бота не указан' });
      }

      try {
        const testRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
        const data = await testRes.json();
        if (data.ok) {
          setSetting('telegram_bot_token', token);
          setSetting('bot_username', data.result.username);
          return sendJson(res, 200, { ok: true, bot: data.result });
        } else {
          return sendJson(res, 400, { ok: false, error: data.description || 'Ошибка проверки токена' });
        }
      } catch (err) {
        return sendJson(res, 500, { ok: false, error: err.message });
      }
    }

    // Manual Trigger: Check and Send Reminders for Students due tomorrow
    if (pathname === '/api/telegram/check-reminders' && method === 'POST') {
      const result = await checkAndSendReminders(true);
      return sendJson(res, 200, result);
    }

    // -------------------------------------------------------------
    // API: SIMULATOR (STUDENT TELEGRAM CONSOLE)
    // -------------------------------------------------------------
    if (pathname === '/api/simulator/messages' && method === 'GET') {
      const studentId = urlObj.searchParams.get('student_id');
      if (!studentId) return sendJson(res, 400, { error: 'student_id required' });

      const messages = db.prepare(`
        SELECT * FROM simulator_messages
        WHERE student_id = ?
        ORDER BY id ASC
      `).all(studentId);

      const student = db.prepare(`
        SELECT s.*, g.name as group_name
        FROM students s
        LEFT JOIN groups g ON s.group_id = g.id
        WHERE s.id = ?
      `).get(studentId);

      const activeHw = db.prepare(`
        SELECT * FROM homeworks
        WHERE group_id = ?
        ORDER BY id DESC LIMIT 1
      `).get(student ? student.group_id : 0);

      return sendJson(res, 200, { messages, student, activeHomework: activeHw });
    }

    if (pathname === '/api/simulator/send' && method === 'POST') {
      const body = await readJsonBody(req);
      const { student_id, text, attachment_name } = body;
      if (!student_id || (!text && !attachment_name)) {
        return sendJson(res, 400, { error: 'Message content is required' });
      }

      // Record student message in simulator
      db.prepare(`
        INSERT INTO simulator_messages (student_id, sender, text, attachment_name)
        VALUES (?, 'student', ?, ?)
      `).run(student_id, text || '', attachment_name || null);

      const student = db.prepare('SELECT * FROM students WHERE id = ?').get(student_id);
      const activeHw = db.prepare(`
        SELECT * FROM homeworks
        WHERE group_id = ?
        ORDER BY id DESC LIMIT 1
      `).get(student ? student.group_id : 0);

      let botReply = '';
      if (activeHw) {
        // Create submission in database
        db.prepare(`
          INSERT INTO submissions (homework_id, student_id, submission_text, file_name, status)
          VALUES (?, ?, ?, ?, 'pending')
        `).run(
          activeHw.id,
          student_id,
          text || '(Файл с решением)',
          attachment_name || null
        );

        botReply = `✅ <b>Ваша домашняя работа принята!</b>\n` +
          `Тема: «${activeHw.title}»\n` +
          `Преподаватель проверит её и пришлет вам оценку и комментарий в этот чат.`;

        db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
          'submission',
          student_id,
          `Ученик ${student.full_name} сдал ДЗ через Telegram к теме "${activeHw.title}"`
        );
      } else {
        botReply = '👍 Ваше сообщение получено преподавателем.';
      }

      // Record bot reply
      db.prepare(`
        INSERT INTO simulator_messages (student_id, sender, text)
        VALUES (?, 'bot', ?)
      `).run(student_id, botReply.replace(/<[^>]*>/g, ''));

      return sendJson(res, 200, { success: true, botReply });
    }

    // -------------------------------------------------------------
    // API: BOT LOGS
    // -------------------------------------------------------------
    if (pathname === '/api/logs' && method === 'GET') {
      const logs = db.prepare(`
        SELECT l.*, s.full_name as student_name
        FROM bot_logs l
        LEFT JOIN students s ON l.student_id = s.id
        ORDER BY l.id DESC LIMIT 50
      `).all();
      return sendJson(res, 200, logs);
    }

    // -------------------------------------------------------------
    // STATIC FILE SERVING
    // -------------------------------------------------------------
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

    // Security check to avoid directory traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403);
      return res.end('Forbidden');
    }

    if (!fs.existsSync(filePath)) {
      // Fallback to index.html for client-side routing
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      return fs.createReadStream(filePath).pipe(res);
    }

    res.writeHead(404);
    res.end('Not Found');
  } catch (err) {
    console.error('Server error on route:', pathname, err);
    sendJson(res, 500, { error: err.message });
  }
});

module.exports = server;

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`🚀 Сервер успешно запущен на http://localhost:${PORT}`);
    console.log(`📁 База данных: ${DB_PATH}`);
    console.log(`=======================================================`);
  });
}
