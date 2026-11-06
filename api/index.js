const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');

// Database storage location (supports Vercel /tmp or local data/)
const IS_VERCEL = !!process.env.VERCEL;
const DATA_DIR = IS_VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'database.sqlite');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

if (!fs.existsSync(DATA_DIR)) {
  try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}

// Initialize SQLite
let db;
try {
  db = new DatabaseSync(DB_PATH);
} catch (e) {
  // In-memory fallback if needed
  db = new DatabaseSync(':memory:');
}

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
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(group_id) REFERENCES groups(id) ON DELETE SET NULL
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
    sender TEXT NOT NULL,
    text TEXT,
    attachment_name TEXT,
    attachment_type TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

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

// Default Configuration with user's Bot Token
const DEFAULT_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '9098873102:AAGeZJ9kP-wjAIGK1bkznRtdGpuDfeOhJbI';
const DEFAULT_BOT_USERNAME = process.env.TELEGRAM_BOT_USERNAME || 'doomhex23_bot';

if (!getSetting('school_name')) setSetting('school_name', 'Course Center');
if (!getSetting('teacher_name')) setSetting('teacher_name', 'Преподаватель');
if (!getSetting('currency')) setSetting('currency', '₽');
if (!getSetting('telegram_bot_token')) setSetting('telegram_bot_token', DEFAULT_BOT_TOKEN);
if (!getSetting('bot_username')) setSetting('bot_username', DEFAULT_BOT_USERNAME);
if (!getSetting('reminder_days_before')) setSetting('reminder_days_before', '1');

// Seed Sample Data if empty
const groupsCount = db.prepare('SELECT COUNT(*) as count FROM groups').get().count;
if (groupsCount === 0) {
  db.prepare('INSERT INTO groups (id, name, subject, schedule, color) VALUES (?, ?, ?, ?, ?)').run(
    1, 'General English B1 (Pre-Intermediate)', 'Английский язык', 'Пн, Ср, Пт 10:00 - 11:30', 'indigo'
  );
  db.prepare('INSERT INTO groups (id, name, subject, schedule, color) VALUES (?, ?, ?, ?, ?)').run(
    2, 'IELTS Academic Intensive', 'Подготовка к IELTS', 'Вт, Чт 18:30 - 20:30', 'emerald'
  );
  db.prepare('INSERT INTO groups (id, name, subject, schedule, color) VALUES (?, ?, ?, ?, ?)').run(
    3, 'English for Teens (A2)', 'Английский язык', 'Сб, Вс 14:00 - 15:30', 'amber'
  );

  const initialStudents = [
    {
      id: 1, group_id: 1, full_name: 'Алексей Смирнов', phone: '+7 (999) 123-45-67',
      telegram_id: 'sim_1001', telegram_username: '@alex_smirnov', access_code: 'ENG-4819',
      tuition_amount: 6500, payment_due_date: '2026-11-07', payment_due_time: '18:00',
      payment_status: 'pending', notes: 'Подготовка к B2'
    },
    {
      id: 2, group_id: 1, full_name: 'Мария Иванова', phone: '+7 (999) 234-56-78',
      telegram_id: 'sim_1002', telegram_username: '@maria_iva', access_code: 'ENG-7320',
      tuition_amount: 6500, payment_due_date: '2026-12-05', payment_due_time: '12:00',
      payment_status: 'paid', notes: 'Оплачено за ноябрь'
    },
    {
      id: 3, group_id: 2, full_name: 'Дмитрий Соколов', phone: '+7 (999) 345-67-89',
      telegram_id: 'sim_1003', telegram_username: '@sokolov_d', access_code: 'ENG-5192',
      tuition_amount: 9000, payment_due_date: '2026-11-04', payment_due_time: '19:00',
      payment_status: 'overdue', notes: 'Сдача IELTS в декабре'
    },
    {
      id: 4, group_id: 2, full_name: 'Екатерина Морозова', phone: '+7 (999) 456-78-90',
      telegram_id: 'sim_1004', telegram_username: '@katya_moroz', access_code: 'ENG-8841',
      tuition_amount: 9000, payment_due_date: '2026-12-02', payment_due_time: '15:00',
      payment_status: 'paid', notes: 'Writing focus'
    },
    {
      id: 5, group_id: 3, full_name: 'Артем Васильев', phone: '+7 (999) 567-89-01',
      telegram_id: 'sim_1005', telegram_username: '@artem_v', access_code: 'ENG-3912',
      tuition_amount: 5500, payment_due_date: '2026-11-07', payment_due_time: '14:00',
      payment_status: 'pending', notes: 'Оплата переводом'
    },
    {
      id: 6, group_id: 3, full_name: 'София Кузнецова', phone: '+7 (999) 678-90-12',
      telegram_id: null, telegram_username: '@sofia_kuz', access_code: 'ENG-6045',
      tuition_amount: 5500, payment_due_date: '2026-11-15', payment_due_time: '16:00',
      payment_status: 'pending', notes: 'Ждет ссылку в бот'
    }
  ];

  for (const s of initialStudents) {
    db.prepare(`
      INSERT INTO students (id, group_id, full_name, phone, telegram_id, telegram_username, access_code, tuition_amount, payment_due_date, payment_due_time, payment_status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(s.id, s.group_id, s.full_name, s.phone, s.telegram_id, s.telegram_username, s.access_code, s.tuition_amount, s.payment_due_date, s.payment_due_time, s.payment_status, s.notes);
  }

  // Payments for Past Month (October 2026)
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

  // Payments for Current Month (November 2026)
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    2, 6500, '2026-11-05', '2026-11', 'Банковская карта', 'Оплата за ноябрь'
  );
  db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
    4, 9000, '2026-11-02', '2026-11', 'Наличные', 'Оплата за ноябрь'
  );

  // Sample Homework
  db.prepare(`
    INSERT INTO homeworks (id, group_id, title, topic, description, materials_url, deadline, sent_to_telegram)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    1, 1, 'Unit 5: Conditionals & Future Time Clauses', 'Grammar Practice',
    '1. Выполните упражнения 2, 3 и 4 письменно.\n2. Составьте 5 своих предложений с First Conditional.\n3. Пришлите ответы в бот.',
    'https://example.com/materials/unit5.pdf', '2026-11-08 21:00', 1
  );

  // Sample Submission
  db.prepare(`
    INSERT INTO submissions (id, homework_id, student_id, submission_text, file_name, status, grade, teacher_feedback, submitted_at, checked_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    1, 1, 1,
    '1. If it rains tomorrow, we will stay at home.\n2. I will call you as soon as I arrive.',
    'unit5_alex.txt', 'checked', '5/5',
    'Отличная работа, Алексей! Времена согласованы верно.',
    '2026-11-06 14:20:00', '2026-11-06 16:00:00'
  );
}

// Telegram Helper
async function sendTelegramMessage(chatId, text, options = {}) {
  const token = getSetting('telegram_bot_token', DEFAULT_BOT_TOKEN);
  if (!token) return { ok: false, message: 'Bot token not set' };

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
    return await res.json();
  } catch (err) {
    console.error('Error sending Telegram message:', err.message);
    return { ok: false, error: err.message };
  }
}

// Broadcast Homework to Group
async function broadcastHomeworkToGroup(homeworkId) {
  const hw = db.prepare(`
    SELECT h.*, g.name as group_name
    FROM homeworks h JOIN groups g ON h.group_id = g.id
    WHERE h.id = ?
  `).get(homeworkId);

  if (!hw) return { count: 0 };
  const students = db.prepare('SELECT * FROM students WHERE group_id = ?').all(hw.group_id);
  let sentCount = 0;

  const text = `📚 <b>Новое домашнее задание / тема урока!</b>\n` +
    `👥 <b>Группа:</b> ${hw.group_name}\n` +
    `📖 <b>Тема:</b> ${hw.title}\n` +
    (hw.topic ? `📌 <b>Раздел:</b> ${hw.topic}\n` : '') +
    (hw.deadline ? `⏰ <b>Дедлайн сдачи:</b> ${hw.deadline}\n\n` : '\n') +
    `📝 <b>Задание:</b>\n${hw.description}\n\n` +
    (hw.materials_url ? `📎 <b>Материалы:</b> ${hw.materials_url}\n\n` : '') +
    `💡 <i>Чтобы сдать работу, отправьте выполненное задание (текст или фото) ответным сообщением прямо в этот бот.</i>`;

  for (const student of students) {
    db.prepare('INSERT INTO simulator_messages (student_id, sender, text) VALUES (?, \'bot\', ?)').run(
      student.id, text.replace(/<[^>]*>/g, '')
    );

    if (student.telegram_id && !student.telegram_id.startsWith('sim_')) {
      try {
        await sendTelegramMessage(student.telegram_id, text);
        sentCount++;
      } catch (e) {}
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

// Payment Reminders: Checks 1 day before due date
async function checkAndSendReminders(forceAllDueSoon = false) {
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  const students = db.prepare(`
    SELECT s.*, g.name as group_name
    FROM students s LEFT JOIN groups g ON s.group_id = g.id
    WHERE s.payment_status != 'paid'
  `).all();

  const currency = getSetting('currency', '₽');
  let remindersSent = 0;
  const results = [];

  for (const s of students) {
    const isDueTomorrow = s.payment_due_date === tomorrowStr;
    const isDueToday = s.payment_due_date === todayStr;
    const notRemindedToday = s.last_reminded_at !== todayStr;

    if (forceAllDueSoon || (isDueTomorrow && notRemindedToday) || (isDueToday && notRemindedToday)) {
      const reminderText = `🔔 <b>Напоминание об оплате обучения!</b>\n\n` +
        `Уважаемый(ая) <b>${s.full_name}</b>!\n` +
        `Напоминаем, что ${isDueTomorrow ? 'завтра' : 'сегодня'} (<b>${s.payment_due_date}</b> к ${s.payment_due_time || '18:00'}) наступает срок оплаты за курс «${s.group_name || 'Обучение'}».\n\n` +
        `💰 <b>Сумма к оплате:</b> ${Number(s.tuition_amount).toLocaleString('ru-RU')} ${currency}\n\n` +
        `Пожалуйста, произведите оплату и подтвердите её преподавателю.\nСпасибо, что учитесь с нами! 🎓`;

      db.prepare('INSERT INTO simulator_messages (student_id, sender, text) VALUES (?, \'bot\', ?)').run(
        s.id, reminderText.replace(/<[^>]*>/g, '')
      );

      if (s.telegram_id && !s.telegram_id.startsWith('sim_')) {
        await sendTelegramMessage(s.telegram_id, reminderText);
      }

      db.prepare('UPDATE students SET last_reminded_at = ? WHERE id = ?').run(todayStr, s.id);
      db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
        'payment_reminder', s.id, `Напоминание об оплате (${s.tuition_amount} ${currency}) отправлено ${s.full_name}`
      );

      remindersSent++;
      results.push({ id: s.id, name: s.full_name, dueDate: s.payment_due_date });
    }
  }

  return { remindersSent, results };
}

// Telegram Webhook Handler (Incoming messages from Telegram)
async function handleTelegramWebhook(update) {
  if (!update || !update.message) return { ok: true };
  const msg = update.message;
  const chatId = String(msg.chat.id);
  const username = msg.from.username ? `@${msg.from.username}` : '';
  const text = (msg.text || msg.caption || '').trim();

  // /start command
  if (text.startsWith('/start')) {
    const parts = text.split(/\s+/);
    const code = parts[1] ? parts[1].trim() : '';

    if (code) {
      const student = db.prepare('SELECT * FROM students WHERE access_code = ?').get(code);
      if (student) {
        db.prepare('UPDATE students SET telegram_id = ?, telegram_username = ? WHERE id = ?')
          .run(chatId, username, student.id);

        const group = db.prepare('SELECT name FROM groups WHERE id = ?').get(student.group_id);
        const reply = `👋 Здравствуйте, <b>${student.full_name}</b>!\n` +
          `Вы успешно подключились к группе <b>«${group ? group.name : 'Курс'}»</b>.\n\n` +
          `📌 Теперь вы будете получать сюда домашние задания и напоминания об оплате.\n` +
          `Чтобы отправить выполненное ДЗ — просто отправьте текст или фото в этот чат!`;

        await sendTelegramMessage(chatId, reply);
        return { ok: true };
      }
    }

    const reply = `👋 Здравствуйте!\nЭто бот для учеников учебного центра.\n\n` +
      `Чтобы подключить ваш аккаунт к вашей учебной группе, отправьте ваш персональный код доступа (например, <code>ENG-4819</code>), полученный от преподавателя.`;
    await sendTelegramMessage(chatId, reply);
    return { ok: true };
  }

  // Access code input
  const studentByCode = db.prepare('SELECT * FROM students WHERE access_code = ?').get(text.toUpperCase());
  if (studentByCode) {
    db.prepare('UPDATE students SET telegram_id = ?, telegram_username = ? WHERE id = ?')
      .run(chatId, username, studentByCode.id);

    const group = db.prepare('SELECT name FROM groups WHERE id = ?').get(studentByCode.group_id);
    const reply = `✅ Код принят! Добро пожаловать, <b>${studentByCode.full_name}</b>!\n` +
      `Вы успешно подключены к группе <b>«${group ? group.name : 'Курс'}»</b>.`;
    await sendTelegramMessage(chatId, reply);
    return { ok: true };
  }

  // Connected Student Submitting Homework
  const student = db.prepare('SELECT * FROM students WHERE telegram_id = ?').get(chatId);
  if (student) {
    const activeHw = db.prepare(`
      SELECT * FROM homeworks WHERE group_id = ? ORDER BY id DESC LIMIT 1
    `).get(student.group_id);

    if (activeHw) {
      let fileName = null;
      if (msg.photo) fileName = 'telegram_photo.jpg';
      if (msg.document) fileName = msg.document.file_name || 'document.pdf';

      db.prepare(`
        INSERT INTO submissions (homework_id, student_id, submission_text, file_name, status)
        VALUES (?, ?, ?, ?, 'pending')
      `).run(activeHw.id, student.id, text || '(Прикреплен медиафайл)', fileName);

      db.prepare('INSERT INTO bot_logs (type, student_id, details) VALUES (?, ?, ?)').run(
        'submission', student.id, `Ученик ${student.full_name} сдал ДЗ к теме "${activeHw.title}"`
      );

      const reply = `✅ <b>Ваша работа принята!</b>\n` +
        `Тема: «${activeHw.title}»\n` +
        `Преподаватель проверит её и пришлет вам оценку и комментарий прямо сюда в чат.`;
      await sendTelegramMessage(chatId, reply);
      return { ok: true };
    } else {
      await sendTelegramMessage(chatId, '👍 Ваше сообщение получено преподавателем.');
      return { ok: true };
    }
  }

  await sendTelegramMessage(chatId, 'Для привязки аккаунта отправьте ваш персональный код доступа (например, <code>ENG-4819</code>).');
  return { ok: true };
}

// Helper to read JSON request body
function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body);
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) reject(new Error('Payload too large'));
    });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch (e) { resolve({}); }
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

// Request Handler (Vercel Serverless Function & Standalone HTTP)
async function handler(req, res) {
  const host = req.headers.host || 'localhost:3000';
  const urlObj = new URL(req.url, `http://${host}`);
  const pathname = urlObj.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    });
    return res.end();
  }

  try {
    // 1. Telegram Webhook Endpoint
    if (pathname === '/api/webhook' && method === 'POST') {
      const body = await readJsonBody(req);
      await handleTelegramWebhook(body);
      return sendJson(res, 200, { ok: true });
    }

    // 2. Setup Telegram Webhook URL
    if (pathname === '/api/setup-webhook') {
      const token = getSetting('telegram_bot_token', DEFAULT_BOT_TOKEN);
      const proto = req.headers['x-forwarded-proto'] || 'https';
      const webhookUrl = `${proto}://${host}/api/webhook`;
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
      const data = await tgRes.json();
      return sendJson(res, 200, { webhookUrl, telegramResponse: data });
    }

    // 3. Vercel Cron Reminders (or manual trigger)
    if (pathname === '/api/cron-reminders' || (pathname === '/api/telegram/check-reminders' && method === 'POST')) {
      const result = await checkAndSendReminders(true);
      return sendJson(res, 200, result);
    }

    // 4. Financial & Student Stats
    if (pathname === '/api/stats' && method === 'GET') {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonthNum = now.getMonth() + 1;
      const currentMonthKey = `${currentYear}-${String(currentMonthNum).padStart(2, '0')}`;
      const pastMonthDate = new Date(currentYear, now.getMonth() - 1, 1);
      const pastMonthKey = `${pastMonthDate.getFullYear()}-${String(pastMonthDate.getMonth() + 1).padStart(2, '0')}`;

      const allTimeRow = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM payments').get();
      const pastMonthRow = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE period_month = ? OR payment_date LIKE ?').get(pastMonthKey, `${pastMonthKey}%`);
      const currentMonthRow = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE period_month = ? OR payment_date LIKE ?').get(currentMonthKey, `${currentMonthKey}%`);
      const expectedRow = db.prepare('SELECT COALESCE(SUM(tuition_amount), 0) as total FROM students').get();

      const totalStudents = db.prepare('SELECT COUNT(*) as count FROM students').get().count;
      const paidStudents = db.prepare("SELECT COUNT(*) as count FROM students WHERE payment_status = 'paid'").get().count;
      const pendingStudents = db.prepare("SELECT COUNT(*) as count FROM students WHERE payment_status = 'pending'").get().count;
      const overdueStudents = db.prepare("SELECT COUNT(*) as count FROM students WHERE payment_status = 'overdue'").get().count;
      const groupsCount = db.prepare('SELECT COUNT(*) as count FROM groups').get().count;
      const pendingSubmissions = db.prepare("SELECT COUNT(*) as count FROM submissions WHERE status = 'pending'").get().count;

      const monthlyBreakdown = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(currentYear, now.getMonth() - i, 1);
        const mKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const mName = d.toLocaleString('ru-RU', { month: 'short', year: 'numeric' });
        const mTotalRow = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE period_month = ? OR payment_date LIKE ?').get(mKey, `${mKey}%`);
        monthlyBreakdown.push({ monthKey: mKey, label: mName, amount: mTotalRow ? mTotalRow.total : 0 });
      }

      return sendJson(res, 200, {
        allTimeEarnings: allTimeRow ? allTimeRow.total : 0,
        pastMonthEarnings: pastMonthRow ? pastMonthRow.total : 0,
        currentMonthEarnings: currentMonthRow ? currentMonthRow.total : 0,
        pastMonthKey,
        currentMonthKey,
        expectedRevenue: expectedRow ? expectedRow.total : 0,
        totalStudents,
        paidStudents,
        pendingStudents,
        overdueStudents,
        groupsCount,
        pendingSubmissions,
        monthlyBreakdown,
        currency: getSetting('currency', '₽')
      });
    }

    // Groups
    if (pathname === '/api/groups' && method === 'GET') {
      const groups = db.prepare('SELECT g.*, COUNT(s.id) as students_count FROM groups g LEFT JOIN students s ON s.group_id = g.id GROUP BY g.id ORDER BY g.id ASC').all();
      return sendJson(res, 200, groups);
    }
    if (pathname === '/api/groups' && method === 'POST') {
      const body = await readJsonBody(req);
      const info = db.prepare('INSERT INTO groups (name, subject, schedule, color) VALUES (?, ?, ?, ?)').run(
        body.name, body.subject || '', body.schedule || '', body.color || 'indigo'
      );
      return sendJson(res, 201, db.prepare('SELECT * FROM groups WHERE id = ?').get(info.lastInsertRowid));
    }
    if (pathname.startsWith('/api/groups/') && method === 'DELETE') {
      const id = pathname.split('/')[3];
      db.prepare('DELETE FROM groups WHERE id = ?').run(id);
      return sendJson(res, 200, { success: true });
    }

    // Students
    if (pathname === '/api/students' && method === 'GET') {
      const groupId = urlObj.searchParams.get('group_id');
      const status = urlObj.searchParams.get('status');
      const search = urlObj.searchParams.get('search');
      let query = 'SELECT s.*, g.name as group_name, g.color as group_color FROM students s LEFT JOIN groups g ON s.group_id = g.id WHERE 1=1';
      const params = [];
      if (groupId) { query += ' AND s.group_id = ?'; params.push(groupId); }
      if (status) { query += ' AND s.payment_status = ?'; params.push(status); }
      if (search) {
        query += ' AND (s.full_name LIKE ? OR s.phone LIKE ? OR s.telegram_username LIKE ? OR s.access_code LIKE ?)';
        const s = `%${search}%`; params.push(s, s, s, s);
      }
      query += ' ORDER BY s.full_name ASC';
      return sendJson(res, 200, db.prepare(query).all(...params));
    }
    if (pathname === '/api/students' && method === 'POST') {
      const body = await readJsonBody(req);
      const accessCode = 'ENG-' + Math.floor(1000 + Math.random() * 9000);
      const info = db.prepare(`
        INSERT INTO students (group_id, full_name, phone, telegram_id, telegram_username, access_code, tuition_amount, payment_due_date, payment_due_time, payment_status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        body.group_id || null, body.full_name, body.phone || '', body.telegram_id || null,
        body.telegram_username || '', accessCode, Number(body.tuition_amount) || 0,
        body.payment_due_date || new Date().toISOString().slice(0, 10), body.payment_due_time || '18:00',
        body.payment_status || 'pending', body.notes || ''
      );
      return sendJson(res, 201, db.prepare('SELECT * FROM students WHERE id = ?').get(info.lastInsertRowid));
    }
    if (pathname.startsWith('/api/students/') && pathname.endsWith('/mark-paid') && method === 'POST') {
      const id = pathname.split('/')[3];
      const body = await readJsonBody(req);
      const student = db.prepare('SELECT s.*, g.name as group_name FROM students s LEFT JOIN groups g ON s.group_id = g.id WHERE s.id = ?').get(id);
      if (!student) return sendJson(res, 404, { error: 'Student not found' });

      const amount = body.amount !== undefined ? Number(body.amount) : student.tuition_amount;
      const paymentDate = body.payment_date || new Date().toISOString().slice(0, 10);
      const periodMonth = paymentDate.slice(0, 7);

      db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
        id, amount, paymentDate, periodMonth, body.payment_method || 'Перевод', body.receipt_note || 'Оплата обучения'
      );

      let nextDueDate = student.payment_due_date;
      if (nextDueDate) {
        const parts = nextDueDate.split('-');
        if (parts.length === 3) {
          nextDueDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)).toISOString().slice(0, 10);
        }
      }
      db.prepare("UPDATE students SET payment_status = 'paid', payment_due_date = ? WHERE id = ?").run(nextDueDate, id);

      const currency = getSetting('currency', '₽');
      const confirmationText = `✅ <b>Оплата подтверждена!</b>\n\nЗдравствуйте, ${student.full_name}!\nВаша оплата за обучение в размере <b>${Number(amount).toLocaleString('ru-RU')} ${currency}</b> зачислена.\nСледующий плановый срок оплаты: <b>${nextDueDate}</b>.\n\nСпасибо! 🎓`;

      if (student.telegram_id && !student.telegram_id.startsWith('sim_')) {
        await sendTelegramMessage(student.telegram_id, confirmationText);
      }
      return sendJson(res, 200, { success: true, nextDueDate });
    }
    if (pathname.startsWith('/api/students/') && pathname.endsWith('/send-reminder') && method === 'POST') {
      const id = pathname.split('/')[3];
      const student = db.prepare('SELECT s.*, g.name as group_name FROM students s LEFT JOIN groups g ON s.group_id = g.id WHERE s.id = ?').get(id);
      if (!student) return sendJson(res, 404, { error: 'Student not found' });

      const currency = getSetting('currency', '₽');
      const text = `🔔 <b>Напоминание об оплате курса «${student.group_name || 'Обучение'}»!</b>\n\n` +
        `Здравствуйте, <b>${student.full_name}</b>!\n` +
        `Сумма к оплате: <b>${Number(student.tuition_amount).toLocaleString('ru-RU')} ${currency}</b>.\n` +
        `Срок оплаты: <b>${student.payment_due_date} (${student.payment_due_time || '18:00'})</b>.\n\nСпасибо!`;

      if (student.telegram_id && !student.telegram_id.startsWith('sim_')) {
        await sendTelegramMessage(student.telegram_id, text);
      }
      return sendJson(res, 200, { success: true });
    }
    if (pathname.startsWith('/api/students/') && method === 'DELETE') {
      const id = pathname.split('/')[3];
      db.prepare('DELETE FROM students WHERE id = ?').run(id);
      return sendJson(res, 200, { success: true });
    }

    // Homeworks
    if (pathname === '/api/homework' && method === 'GET') {
      const list = db.prepare(`
        SELECT h.*, g.name as group_name, g.color as group_color, COUNT(s.id) as submissions_count
        FROM homeworks h JOIN groups g ON h.group_id = g.id
        LEFT JOIN submissions s ON s.homework_id = h.id
        GROUP BY h.id ORDER BY h.id DESC
      `).all();
      return sendJson(res, 200, list);
    }
    if (pathname === '/api/homework' && method === 'POST') {
      const body = await readJsonBody(req);
      const info = db.prepare(`
        INSERT INTO homeworks (group_id, title, topic, description, materials_url, deadline, sent_to_telegram)
        VALUES (?, ?, ?, ?, ?, ?, 0)
      `).run(body.group_id, body.title, body.topic || '', body.description, body.materials_url || '', body.deadline || '');
      const hwId = info.lastInsertRowid;
      const broadcastResult = await broadcastHomeworkToGroup(hwId);
      const created = db.prepare('SELECT h.*, g.name as group_name FROM homeworks h JOIN groups g ON h.group_id = g.id WHERE h.id = ?').get(hwId);
      return sendJson(res, 201, { homework: created, broadcast: broadcastResult });
    }

    // Submissions
    if (pathname === '/api/submissions' && method === 'GET') {
      const subs = db.prepare(`
        SELECT s.*, st.full_name as student_name, st.telegram_username, st.phone as student_phone,
               h.title as homework_title, h.topic as homework_topic, h.deadline as homework_deadline,
               g.name as group_name, g.color as group_color
        FROM submissions s
        JOIN students st ON s.student_id = st.id
        JOIN homeworks h ON s.homework_id = h.id
        JOIN groups g ON h.group_id = g.id
        ORDER BY s.submitted_at DESC, s.id DESC
      `).all();
      return sendJson(res, 200, subs);
    }
    if (pathname.startsWith('/api/submissions/') && method === 'PUT') {
      const id = pathname.split('/')[3];
      const body = await readJsonBody(req);
      db.prepare(`
        UPDATE submissions SET status = ?, grade = ?, teacher_feedback = ?, checked_at = ? WHERE id = ?
      `).run(body.status || 'checked', body.grade || '', body.teacher_feedback || '', new Date().toISOString().slice(0, 19).replace('T', ' '), id);

      const sub = db.prepare(`
        SELECT s.*, st.full_name, st.telegram_id, h.title as hw_title
        FROM submissions s JOIN students st ON s.student_id = st.id
        JOIN homeworks h ON s.homework_id = h.id WHERE s.id = ?
      `).get(id);

      if (sub && sub.telegram_id && !sub.telegram_id.startsWith('sim_')) {
        const feedbackMsg = `📝 <b>Ваша домашняя работа проверена!</b>\n\n` +
          `📖 <b>Тема:</b> ${sub.hw_title}\n` +
          `⭐️ <b>Оценка:</b> ${body.grade || 'Проверено'}\n` +
          (body.teacher_feedback ? `💬 <b>Комментарий учителя:</b>\n${body.teacher_feedback}\n\n` : '\n') +
          `Молодец! ✨`;
        await sendTelegramMessage(sub.telegram_id, feedbackMsg);
      }
      return sendJson(res, 200, { success: true });
    }

    // Payments & Settings
    if (pathname === '/api/payments' && method === 'GET') {
      const payments = db.prepare(`
        SELECT p.*, s.full_name as student_name, g.name as group_name
        FROM payments p JOIN students s ON p.student_id = s.id
        LEFT JOIN groups g ON s.group_id = g.id ORDER BY p.payment_date DESC, p.id DESC
      `).all();
      return sendJson(res, 200, payments);
    }
    if (pathname === '/api/settings' && method === 'GET') {
      const allRows = db.prepare('SELECT key, value FROM settings').all();
      const settingsObj = {};
      for (const r of allRows) settingsObj[r.key] = r.value;
      return sendJson(res, 200, settingsObj);
    }
    if (pathname === '/api/settings' && method === 'POST') {
      const body = await readJsonBody(req);
      for (const key of Object.keys(body)) setSetting(key, body[key]);
      return sendJson(res, 200, { success: true });
    }
    if (pathname === '/api/logs' && method === 'GET') {
      const logs = db.prepare('SELECT * FROM bot_logs ORDER BY id DESC LIMIT 50').all();
      return sendJson(res, 200, logs);
    }

    // Simulator
    if (pathname === '/api/simulator/messages' && method === 'GET') {
      const studentId = urlObj.searchParams.get('student_id');
      const messages = db.prepare('SELECT * FROM simulator_messages WHERE student_id = ? ORDER BY id ASC').all(studentId);
      const student = db.prepare('SELECT s.*, g.name as group_name FROM students s LEFT JOIN groups g ON s.group_id = g.id WHERE s.id = ?').get(studentId);
      const activeHw = db.prepare('SELECT * FROM homeworks WHERE group_id = ? ORDER BY id DESC LIMIT 1').get(student ? student.group_id : 0);
      return sendJson(res, 200, { messages, student, activeHomework: activeHw });
    }
    if (pathname === '/api/simulator/send' && method === 'POST') {
      const body = await readJsonBody(req);
      const { student_id, text, attachment_name } = body;
      db.prepare('INSERT INTO simulator_messages (student_id, sender, text, attachment_name) VALUES (?, \'student\', ?, ?)').run(student_id, text || '', attachment_name || null);
      const student = db.prepare('SELECT * FROM students WHERE id = ?').get(student_id);
      const activeHw = db.prepare('SELECT * FROM homeworks WHERE group_id = ? ORDER BY id DESC LIMIT 1').get(student ? student.group_id : 0);
      let botReply = '👍 Ваше сообщение получено.';
      if (activeHw) {
        db.prepare('INSERT INTO submissions (homework_id, student_id, submission_text, file_name, status) VALUES (?, ?, ?, ?, \'pending\')').run(activeHw.id, student_id, text || '(Решение)', attachment_name || null);
        botReply = `✅ <b>Ваша домашняя работа принята!</b>\nТема: «${activeHw.title}»\nПреподаватель проверит её в ближайшее время.`;
      }
      db.prepare('INSERT INTO simulator_messages (student_id, sender, text) VALUES (?, \'bot\', ?)').run(student_id, botReply.replace(/<[^>]*>/g, ''));
      return sendJson(res, 200, { success: true, botReply });
    }

    // Static file serving fallback (for local standalone server)
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
    if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); return res.end('Forbidden'); }
    if (!fs.existsSync(filePath)) filePath = path.join(PUBLIC_DIR, 'index.html');
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimes = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json' };
      res.writeHead(200, { 'Content-Type': mimes[ext] || 'application/octet-stream' });
      return fs.createReadStream(filePath).pipe(res);
    }

    res.writeHead(404);
    res.end('Not Found');
  } catch (err) {
    console.error('API Error:', err);
    sendJson(res, 500, { error: err.message });
  }
}

// Export for Vercel
module.exports = handler;

// If started directly with node:
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  const server = http.createServer(handler);
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`EduFlow running on http://localhost:${PORT}`);
  });
}
