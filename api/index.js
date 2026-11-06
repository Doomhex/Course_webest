const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

// Safe SQLite loader with in-memory JSON fallback for older Node versions on Vercel
let db;
let useFallbackDb = false;

try {
  const { DatabaseSync } = require('node:sqlite');
  const IS_VERCEL = !!process.env.VERCEL;
  const DATA_DIR = IS_VERCEL ? '/tmp' : path.join(process.cwd(), 'data');
  const DB_PATH = path.join(DATA_DIR, 'database.sqlite');
  if (!fs.existsSync(DATA_DIR)) {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
  }
  db = new DatabaseSync(DB_PATH);
} catch (err) {
  console.warn('node:sqlite not available in this Node runtime, using resilient in-memory store:', err.message);
  useFallbackDb = true;
}

// In-Memory Store if node:sqlite is not supported in the serverless environment
let memData = {
  settings: {
    school_name: 'Course Center',
    teacher_name: 'Преподаватель',
    currency: '₽',
    telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN || '9098873102:AAGeZJ9kP-wjAIGK1bkznRtdGpuDfeOhJbI',
    bot_username: process.env.TELEGRAM_BOT_USERNAME || 'doomhex23_bot',
    reminder_days_before: '1'
  },
  groups: [
    { id: 1, name: 'General English B1 (Pre-Intermediate)', subject: 'Английский язык', schedule: 'Пн, Ср, Пт 10:00 - 11:30', color: 'indigo' },
    { id: 2, name: 'IELTS Academic Intensive', subject: 'Подготовка к IELTS', schedule: 'Вт, Чт 18:30 - 20:30', color: 'emerald' },
    { id: 3, name: 'English for Teens (A2)', subject: 'Английский язык', schedule: 'Сб, Вс 14:00 - 15:30', color: 'amber' }
  ],
  students: [
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
  ],
  payments: [
    { id: 1, student_id: 1, amount: 6500, payment_date: '2026-10-06', period_month: '2026-10', payment_method: 'Перевод Сбербанк', receipt_note: 'Оплата за октябрь' },
    { id: 2, student_id: 2, amount: 6500, payment_date: '2026-10-05', period_month: '2026-10', payment_method: 'Банковская карта', receipt_note: 'Оплата за октябрь' },
    { id: 3, student_id: 3, amount: 9000, payment_date: '2026-10-04', period_month: '2026-10', payment_method: 'Перевод Т-Банк', receipt_note: 'Оплата за октябрь' },
    { id: 4, student_id: 4, amount: 9000, payment_date: '2026-10-02', period_month: '2026-10', payment_method: 'Наличные', receipt_note: 'Оплата за октябрь' },
    { id: 5, student_id: 5, amount: 5500, payment_date: '2026-10-07', period_month: '2026-10', payment_method: 'Перевод Сбербанк', receipt_note: 'Оплата за октябрь' },
    { id: 6, student_id: 2, amount: 6500, payment_date: '2026-11-05', period_month: '2026-11', payment_method: 'Банковская карта', receipt_note: 'Оплата за ноябрь' },
    { id: 7, student_id: 4, amount: 9000, payment_date: '2026-11-02', period_month: '2026-11', payment_method: 'Наличные', receipt_note: 'Оплата за ноябрь' }
  ],
  homeworks: [
    {
      id: 1, group_id: 1, title: 'Unit 5: Conditionals & Future Time Clauses', topic: 'Grammar Practice',
      description: '1. Выполните упражнения 2, 3 и 4 письменно.\n2. Составьте 5 своих предложений с First Conditional.\n3. Пришлите ответы в бот.',
      materials_url: 'https://example.com/materials/unit5.pdf', deadline: '2026-11-08 21:00', sent_to_telegram: 1
    }
  ],
  submissions: [
    {
      id: 1, homework_id: 1, student_id: 1,
      submission_text: '1. If it rains tomorrow, we will stay at home.\n2. I will call you as soon as I arrive.',
      file_name: 'unit5_alex.txt', status: 'checked', grade: '5/5',
      teacher_feedback: 'Отличная работа, Алексей! Времена согласованы верно.',
      submitted_at: '2026-11-06 14:20:00', checked_at: '2026-11-06 16:00:00'
    }
  ],
  simulator_messages: [],
  bot_logs: []
};

// Initialize SQLite Schema if SQLite is available
if (!useFallbackDb) {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT);
      CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, subject TEXT, schedule TEXT, color TEXT DEFAULT 'indigo', created_at TEXT DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER, full_name TEXT NOT NULL, phone TEXT, telegram_id TEXT, telegram_username TEXT, access_code TEXT UNIQUE, tuition_amount REAL DEFAULT 0, payment_due_date TEXT, payment_due_time TEXT DEFAULT '18:00', payment_status TEXT DEFAULT 'pending', last_reminded_at TEXT, notes TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS payments (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER NOT NULL, amount REAL NOT NULL, payment_date TEXT NOT NULL, period_month TEXT NOT NULL, payment_method TEXT DEFAULT 'Перевод', receipt_note TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS homeworks (id INTEGER PRIMARY KEY AUTOINCREMENT, group_id INTEGER NOT NULL, title TEXT NOT NULL, topic TEXT, description TEXT, materials_url TEXT, deadline TEXT, sent_to_telegram INTEGER DEFAULT 0, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS submissions (id INTEGER PRIMARY KEY AUTOINCREMENT, homework_id INTEGER NOT NULL, student_id INTEGER NOT NULL, submission_text TEXT, file_url TEXT, file_name TEXT, status TEXT DEFAULT 'pending', grade TEXT, teacher_feedback TEXT, submitted_at TEXT DEFAULT CURRENT_TIMESTAMP, checked_at TEXT);
      CREATE TABLE IF NOT EXISTS bot_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, student_id INTEGER, details TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
      CREATE TABLE IF NOT EXISTS simulator_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, student_id INTEGER NOT NULL, sender TEXT NOT NULL, text TEXT, attachment_name TEXT, attachment_type TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
    `);

    const gCount = db.prepare('SELECT COUNT(*) as count FROM groups').get().count;
    if (gCount === 0) {
      // Seed SQLite from memData
      for (const k of Object.keys(memData.settings)) {
        db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)').run(k, String(memData.settings[k]));
      }
      for (const g of memData.groups) {
        db.prepare('INSERT INTO groups (id, name, subject, schedule, color) VALUES (?, ?, ?, ?, ?)').run(g.id, g.name, g.subject, g.schedule, g.color);
      }
      for (const s of memData.students) {
        db.prepare('INSERT INTO students (id, group_id, full_name, phone, telegram_id, telegram_username, access_code, tuition_amount, payment_due_date, payment_due_time, payment_status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
          s.id, s.group_id, s.full_name, s.phone, s.telegram_id, s.telegram_username, s.access_code, s.tuition_amount, s.payment_due_date, s.payment_due_time, s.payment_status, s.notes
        );
      }
      for (const p of memData.payments) {
        db.prepare('INSERT INTO payments (id, student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
          p.id, p.student_id, p.amount, p.payment_date, p.period_month, p.payment_method, p.receipt_note
        );
      }
      for (const h of memData.homeworks) {
        db.prepare('INSERT INTO homeworks (id, group_id, title, topic, description, materials_url, deadline, sent_to_telegram) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').run(
          h.id, h.group_id, h.title, h.topic, h.description, h.materials_url, h.deadline, h.sent_to_telegram
        );
      }
      for (const sub of memData.submissions) {
        db.prepare('INSERT INTO submissions (id, homework_id, student_id, submission_text, file_name, status, grade, teacher_feedback, submitted_at, checked_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)').run(
          sub.id, sub.homework_id, sub.student_id, sub.submission_text, sub.file_name, sub.status, sub.grade, sub.teacher_feedback, sub.submitted_at, sub.checked_at
        );
      }
    }
  } catch (err) {
    console.warn('SQLite init warning, using memory:', err.message);
    useFallbackDb = true;
  }
}

const DEFAULT_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '9098873102:AAGeZJ9kP-wjAIGK1bkznRtdGpuDfeOhJbI';

function getSetting(key, defVal = '') {
  if (useFallbackDb) return memData.settings[key] !== undefined ? memData.settings[key] : defVal;
  try {
    const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
    return row ? row.value : defVal;
  } catch (e) { return defVal; }
}

function setSetting(key, val) {
  if (useFallbackDb) { memData.settings[key] = String(val); return; }
  try {
    db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(key, String(val));
  } catch (e) {}
}

async function sendTelegramMessage(chatId, text, options = {}) {
  const token = getSetting('telegram_bot_token', DEFAULT_BOT_TOKEN);
  if (!token) return { ok: false, message: 'Bot token not set' };
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML', ...options })
    });
    return await res.json();
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// Telegram Webhook Update Handler
async function handleTelegramWebhook(update) {
  if (!update || !update.message) return { ok: true };
  const msg = update.message;
  const chatId = String(msg.chat.id);
  const username = msg.from.username ? `@${msg.from.username}` : '';
  const text = (msg.text || msg.caption || '').trim();

  // /start
  if (text.startsWith('/start')) {
    const parts = text.split(/\s+/);
    const code = parts[1] ? parts[1].trim() : '';
    if (code) {
      let student = null;
      if (useFallbackDb) {
        student = memData.students.find(s => s.access_code === code);
        if (student) { student.telegram_id = chatId; student.telegram_username = username; }
      } else {
        student = db.prepare('SELECT * FROM students WHERE access_code = ?').get(code);
        if (student) {
          db.prepare('UPDATE students SET telegram_id = ?, telegram_username = ? WHERE id = ?').run(chatId, username, student.id);
        }
      }
      if (student) {
        const reply = `👋 Здравствуйте, <b>${student.full_name}</b>!\n` +
          `Вы успешно подключились к системе курса.\n` +
          `Здесь вы будете получать домашние задания, темы уроков и напоминания об оплате. Чтобы отправить ДЗ — просто пришлите текст или фото в этот чат!`;
        await sendTelegramMessage(chatId, reply);
        return { ok: true };
      }
    }

    const reply = `👋 Здравствуйте!\nЭто бот для учеников учебного центра.\n\n` +
      `Чтобы привязать ваш аккаунт к курсу, отправьте ваш персональный код доступа (например, <code>ENG-4819</code>).`;
    await sendTelegramMessage(chatId, reply);
    return { ok: true };
  }

  // Code match
  let studentByCode = null;
  if (useFallbackDb) {
    studentByCode = memData.students.find(s => s.access_code === text.toUpperCase());
    if (studentByCode) { studentByCode.telegram_id = chatId; studentByCode.telegram_username = username; }
  } else {
    studentByCode = db.prepare('SELECT * FROM students WHERE access_code = ?').get(text.toUpperCase());
    if (studentByCode) {
      db.prepare('UPDATE students SET telegram_id = ?, telegram_username = ? WHERE id = ?').run(chatId, username, studentByCode.id);
    }
  }
  if (studentByCode) {
    await sendTelegramMessage(chatId, `✅ Код принят! Добро пожаловать, <b>${studentByCode.full_name}</b>!\nВы успешно подключены.`);
    return { ok: true };
  }

  // Connected Student Submitting Homework
  let student = null;
  if (useFallbackDb) student = memData.students.find(s => s.telegram_id === chatId);
  else student = db.prepare('SELECT * FROM students WHERE telegram_id = ?').get(chatId);

  if (student) {
    let activeHw = null;
    if (useFallbackDb) activeHw = memData.homeworks.filter(h => h.group_id === student.group_id).slice(-1)[0];
    else activeHw = db.prepare('SELECT * FROM homeworks WHERE group_id = ? ORDER BY id DESC LIMIT 1').get(student.group_id);

    if (activeHw) {
      const fileName = msg.photo ? 'photo.jpg' : (msg.document ? (msg.document.file_name || 'doc.pdf') : null);
      if (useFallbackDb) {
        memData.submissions.unshift({
          id: memData.submissions.length + 1, homework_id: activeHw.id, student_id: student.id,
          submission_text: text || '(Файл)', file_name: fileName, status: 'pending', grade: null,
          teacher_feedback: null, submitted_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
      } else {
        db.prepare('INSERT INTO submissions (homework_id, student_id, submission_text, file_name, status) VALUES (?, ?, ?, ?, \'pending\')').run(
          activeHw.id, student.id, text || '(Файл)', fileName
        );
      }
      await sendTelegramMessage(chatId, `✅ <b>Ваша работа принята!</b>\nТема: «${activeHw.title}»\nПреподаватель проверит её в ближайшее время.`);
      return { ok: true };
    } else {
      await sendTelegramMessage(chatId, '👍 Ваше сообщение получено преподавателем.');
      return { ok: true };
    }
  }

  await sendTelegramMessage(chatId, 'Для привязки аккаунта отправьте ваш код доступа (например, <code>ENG-4819</code>).');
  return { ok: true };
}

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body);
  return new Promise(resolve => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch (e) { resolve({}); }
    });
    req.on('error', () => resolve({}));
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

// Main Request Handler
async function handler(req, res) {
  const host = req.headers.host || 'localhost:3000';
  let rawUrl = req.url || '/';
  if (req.headers['x-matched-path']) rawUrl = req.headers['x-matched-path'];
  const urlObj = new URL(rawUrl, `http://${host}`);
  let pathname = urlObj.pathname;
  if (pathname.endsWith('/') && pathname.length > 1) pathname = pathname.slice(0, -1);
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
    // 1. Webhook Endpoint
    if (pathname === '/api/webhook' && method === 'POST') {
      const body = await readJsonBody(req);
      await handleTelegramWebhook(body);
      return sendJson(res, 200, { ok: true });
    }

    // 2. Setup Webhook Helper
    if (pathname === '/api/setup-webhook') {
      const token = getSetting('telegram_bot_token', DEFAULT_BOT_TOKEN);
      const proto = req.headers['x-forwarded-proto'] || 'https';
      const webhookUrl = `${proto}://${host}/api/webhook`;
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(webhookUrl)}`);
      const data = await tgRes.json();
      return sendJson(res, 200, { webhookUrl, telegramResponse: data });
    }

    // 3. Stats & Financial Analytics
    if (pathname === '/api/stats' && method === 'GET') {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonthKey = `${currentYear}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const pastMonthDate = new Date(currentYear, now.getMonth() - 1, 1);
      const pastMonthKey = `${pastMonthDate.getFullYear()}-${String(pastMonthDate.getMonth() + 1).padStart(2, '0')}`;

      let allPayments = [];
      let allStudents = [];
      let allGroups = [];
      let allSubs = [];

      if (useFallbackDb) {
        allPayments = memData.payments;
        allStudents = memData.students;
        allGroups = memData.groups;
        allSubs = memData.submissions;
      } else {
        allPayments = db.prepare('SELECT * FROM payments').all();
        allStudents = db.prepare('SELECT * FROM students').all();
        allGroups = db.prepare('SELECT * FROM groups').all();
        allSubs = db.prepare('SELECT * FROM submissions').all();
      }

      const allTimeEarnings = allPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
      const pastMonthEarnings = allPayments
        .filter(p => p.period_month === pastMonthKey || (p.payment_date && p.payment_date.startsWith(pastMonthKey)))
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      const currentMonthEarnings = allPayments
        .filter(p => p.period_month === currentMonthKey || (p.payment_date && p.payment_date.startsWith(currentMonthKey)))
        .reduce((sum, p) => sum + (p.amount || 0), 0);
      const expectedRevenue = allStudents.reduce((sum, s) => sum + (s.tuition_amount || 0), 0);

      const monthlyBreakdown = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(currentYear, now.getMonth() - i, 1);
        const mKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const mName = d.toLocaleString('ru-RU', { month: 'short', year: 'numeric' });
        const mAmount = allPayments
          .filter(p => p.period_month === mKey || (p.payment_date && p.payment_date.startsWith(mKey)))
          .reduce((sum, p) => sum + (p.amount || 0), 0);
        monthlyBreakdown.push({ monthKey: mKey, label: mName, amount: mAmount });
      }

      return sendJson(res, 200, {
        allTimeEarnings,
        pastMonthEarnings,
        currentMonthEarnings,
        pastMonthKey,
        currentMonthKey,
        expectedRevenue,
        totalStudents: allStudents.length,
        paidStudents: allStudents.filter(s => s.payment_status === 'paid').length,
        pendingStudents: allStudents.filter(s => s.payment_status === 'pending').length,
        overdueStudents: allStudents.filter(s => s.payment_status === 'overdue').length,
        groupsCount: allGroups.length,
        pendingSubmissions: allSubs.filter(s => s.status === 'pending').length,
        monthlyBreakdown,
        currency: getSetting('currency', '₽')
      });
    }

    // 4. Groups
    if (pathname === '/api/groups' && method === 'GET') {
      if (useFallbackDb) {
        const list = memData.groups.map(g => ({
          ...g, students_count: memData.students.filter(s => s.group_id === g.id).length
        }));
        return sendJson(res, 200, list);
      }
      const groups = db.prepare('SELECT g.*, COUNT(s.id) as students_count FROM groups g LEFT JOIN students s ON s.group_id = g.id GROUP BY g.id ORDER BY g.id ASC').all();
      return sendJson(res, 200, groups);
    }
    if (pathname === '/api/groups' && method === 'POST') {
      const body = await readJsonBody(req);
      if (useFallbackDb) {
        const newG = { id: memData.groups.length + 1, name: body.name, subject: body.subject || '', schedule: body.schedule || '', color: body.color || 'indigo' };
        memData.groups.push(newG);
        return sendJson(res, 201, newG);
      }
      const info = db.prepare('INSERT INTO groups (name, subject, schedule, color) VALUES (?, ?, ?, ?)').run(body.name, body.subject || '', body.schedule || '', body.color || 'indigo');
      return sendJson(res, 201, db.prepare('SELECT * FROM groups WHERE id = ?').get(info.lastInsertRowid));
    }

    // 5. Students
    if (pathname === '/api/students' && method === 'GET') {
      const groupId = urlObj.searchParams.get('group_id');
      const status = urlObj.searchParams.get('status');
      const search = (urlObj.searchParams.get('search') || '').toLowerCase();

      if (useFallbackDb) {
        let list = memData.students.map(s => {
          const g = memData.groups.find(grp => grp.id === s.group_id);
          return { ...s, group_name: g ? g.name : '', group_color: g ? g.color : 'indigo' };
        });
        if (groupId) list = list.filter(s => String(s.group_id) === String(groupId));
        if (status) list = list.filter(s => s.payment_status === status);
        if (search) list = list.filter(s => (s.full_name || '').toLowerCase().includes(search) || (s.access_code || '').toLowerCase().includes(search));
        return sendJson(res, 200, list);
      }

      let query = 'SELECT s.*, g.name as group_name, g.color as group_color FROM students s LEFT JOIN groups g ON s.group_id = g.id WHERE 1=1';
      const params = [];
      if (groupId) { query += ' AND s.group_id = ?'; params.push(groupId); }
      if (status) { query += ' AND s.payment_status = ?'; params.push(status); }
      if (search) {
        query += ' AND (s.full_name LIKE ? OR s.phone LIKE ? OR s.telegram_username LIKE ? OR s.access_code LIKE ?)';
        const sParam = `%${search}%`; params.push(sParam, sParam, sParam, sParam);
      }
      query += ' ORDER BY s.full_name ASC';
      return sendJson(res, 200, db.prepare(query).all(...params));
    }

    if (pathname === '/api/students' && method === 'POST') {
      const body = await readJsonBody(req);
      const accessCode = 'ENG-' + Math.floor(1000 + Math.random() * 9000);
      if (useFallbackDb) {
        const newS = {
          id: memData.students.length + 1, group_id: Number(body.group_id) || null,
          full_name: body.full_name, phone: body.phone || '', telegram_id: body.telegram_id || null,
          telegram_username: body.telegram_username || '', access_code: accessCode,
          tuition_amount: Number(body.tuition_amount) || 0,
          payment_due_date: body.payment_due_date || new Date().toISOString().slice(0, 10),
          payment_due_time: body.payment_due_time || '18:00',
          payment_status: body.payment_status || 'pending', notes: body.notes || ''
        };
        memData.students.push(newS);
        return sendJson(res, 201, newS);
      }
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

    // Mark Paid
    if (pathname.startsWith('/api/students/') && pathname.endsWith('/mark-paid') && method === 'POST') {
      const id = Number(pathname.split('/')[3]);
      const body = await readJsonBody(req);
      let student = null;

      if (useFallbackDb) student = memData.students.find(s => s.id === id);
      else student = db.prepare('SELECT * FROM students WHERE id = ?').get(id);

      if (!student) return sendJson(res, 404, { error: 'Student not found' });
      const amount = body.amount !== undefined ? Number(body.amount) : student.tuition_amount;
      const paymentDate = body.payment_date || new Date().toISOString().slice(0, 10);
      const periodMonth = paymentDate.slice(0, 7);

      let nextDueDate = student.payment_due_date;
      if (nextDueDate) {
        const parts = nextDueDate.split('-');
        if (parts.length === 3) {
          nextDueDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10)).toISOString().slice(0, 10);
        }
      }

      if (useFallbackDb) {
        student.payment_status = 'paid';
        student.payment_due_date = nextDueDate;
        memData.payments.push({
          id: memData.payments.length + 1, student_id: id, amount, payment_date: paymentDate,
          period_month: periodMonth, payment_method: body.payment_method || 'Перевод', receipt_note: body.receipt_note || 'Оплата'
        });
      } else {
        db.prepare('INSERT INTO payments (student_id, amount, payment_date, period_month, payment_method, receipt_note) VALUES (?, ?, ?, ?, ?, ?)').run(
          id, amount, paymentDate, periodMonth, body.payment_method || 'Перевод', body.receipt_note || 'Оплата'
        );
        db.prepare("UPDATE students SET payment_status = 'paid', payment_due_date = ? WHERE id = ?").run(nextDueDate, id);
      }

      const currency = getSetting('currency', '₽');
      if (student.telegram_id && !student.telegram_id.startsWith('sim_')) {
        await sendTelegramMessage(student.telegram_id, `✅ <b>Оплата подтверждена!</b>\nСумма: <b>${amount} ${currency}</b>.\nСледующий срок: <b>${nextDueDate}</b>. Спасибо! 🎓`);
      }
      return sendJson(res, 200, { success: true, nextDueDate });
    }

    // Reminder
    if (pathname.startsWith('/api/students/') && pathname.endsWith('/send-reminder') && method === 'POST') {
      const id = Number(pathname.split('/')[3]);
      let student = null;
      if (useFallbackDb) student = memData.students.find(s => s.id === id);
      else student = db.prepare('SELECT * FROM students WHERE id = ?').get(id);

      if (student && student.telegram_id && !student.telegram_id.startsWith('sim_')) {
        const currency = getSetting('currency', '₽');
        await sendTelegramMessage(student.telegram_id, `🔔 <b>Напоминание об оплате обучения!</b>\nСумма: <b>${student.tuition_amount} ${currency}</b>.\nСрок: <b>${student.payment_due_date} (${student.payment_due_time || '18:00'})</b>.`);
      }
      return sendJson(res, 200, { success: true });
    }

    // Homeworks
    if (pathname === '/api/homework' && method === 'GET') {
      if (useFallbackDb) {
        const list = memData.homeworks.map(h => {
          const g = memData.groups.find(grp => grp.id === h.group_id);
          return { ...h, group_name: g ? g.name : '', submissions_count: memData.submissions.filter(s => s.homework_id === h.id).length };
        });
        return sendJson(res, 200, list);
      }
      const list = db.prepare('SELECT h.*, g.name as group_name, g.color as group_color, COUNT(s.id) as submissions_count FROM homeworks h JOIN groups g ON h.group_id = g.id LEFT JOIN submissions s ON s.homework_id = h.id GROUP BY h.id ORDER BY h.id DESC').all();
      return sendJson(res, 200, list);
    }

    if (pathname === '/api/homework' && method === 'POST') {
      const body = await readJsonBody(req);
      const newHw = {
        id: (useFallbackDb ? memData.homeworks.length : 0) + 1,
        group_id: Number(body.group_id), title: body.title, topic: body.topic || '',
        description: body.description, materials_url: body.materials_url || '',
        deadline: body.deadline || '', sent_to_telegram: 1
      };

      if (useFallbackDb) {
        memData.homeworks.unshift(newHw);
      } else {
        const info = db.prepare('INSERT INTO homeworks (group_id, title, topic, description, materials_url, deadline, sent_to_telegram) VALUES (?, ?, ?, ?, ?, ?, 1)').run(
          newHw.group_id, newHw.title, newHw.topic, newHw.description, newHw.materials_url, newHw.deadline
        );
        newHw.id = info.lastInsertRowid;
      }

      // Broadcast to Telegram
      const groupStudents = (useFallbackDb ? memData.students : db.prepare('SELECT * FROM students WHERE group_id = ?').all(newHw.group_id))
        .filter(s => s.group_id === newHw.group_id);

      const hwText = `📚 <b>Новое домашнее задание / тема урока!</b>\n` +
        `📖 <b>Тема:</b> ${newHw.title}\n` +
        (newHw.deadline ? `⏰ <b>Дедлайн:</b> ${newHw.deadline}\n\n` : '\n') +
        `📝 <b>Задание:</b>\n${newHw.description}\n\n` +
        `💡 <i>Отправьте выполненное задание ответным сообщением прямо в этот бот.</i>`;

      for (const st of groupStudents) {
        if (st.telegram_id && !st.telegram_id.startsWith('sim_')) {
          sendTelegramMessage(st.telegram_id, hwText).catch(() => {});
        }
      }

      return sendJson(res, 201, { homework: newHw, broadcast: { count: groupStudents.length } });
    }

    // Submissions
    if (pathname === '/api/submissions' && method === 'GET') {
      if (useFallbackDb) {
        const list = memData.submissions.map(sub => {
          const st = memData.students.find(s => s.id === sub.student_id);
          const hw = memData.homeworks.find(h => h.id === sub.homework_id);
          const grp = st ? memData.groups.find(g => g.id === st.group_id) : null;
          return {
            ...sub,
            student_name: st ? st.full_name : 'Ученик',
            homework_title: hw ? hw.title : 'ДЗ',
            group_name: grp ? grp.name : 'Группа'
          };
        });
        return sendJson(res, 200, list);
      }
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
      const id = Number(pathname.split('/')[3]);
      const body = await readJsonBody(req);
      let sub = null;
      if (useFallbackDb) {
        sub = memData.submissions.find(s => s.id === id);
        if (sub) {
          sub.status = body.status || 'checked';
          sub.grade = body.grade || '';
          sub.teacher_feedback = body.teacher_feedback || '';
        }
      } else {
        db.prepare('UPDATE submissions SET status = ?, grade = ?, teacher_feedback = ?, checked_at = ? WHERE id = ?').run(
          body.status || 'checked', body.grade || '', body.teacher_feedback || '', new Date().toISOString().slice(0, 19).replace('T', ' '), id
        );
        sub = db.prepare('SELECT s.*, st.telegram_id, h.title as hw_title FROM submissions s JOIN students st ON s.student_id = st.id JOIN homeworks h ON s.homework_id = h.id WHERE s.id = ?').get(id);
      }

      if (sub && sub.telegram_id && !sub.telegram_id.startsWith('sim_')) {
        await sendTelegramMessage(sub.telegram_id, `📝 <b>Ваша работа проверена!</b>\n⭐️ Оценка: <b>${body.grade}</b>\nКомментарий: ${body.teacher_feedback || 'Отлично!'}`);
      }
      return sendJson(res, 200, { success: true });
    }

    // Payments
    if (pathname === '/api/payments' && method === 'GET') {
      if (useFallbackDb) {
        const list = memData.payments.map(p => {
          const st = memData.students.find(s => s.id === p.student_id);
          const grp = st ? memData.groups.find(g => g.id === st.group_id) : null;
          return { ...p, student_name: st ? st.full_name : 'Ученик', group_name: grp ? grp.name : '—' };
        }).reverse();
        return sendJson(res, 200, list);
      }
      const payments = db.prepare('SELECT p.*, s.full_name as student_name, g.name as group_name FROM payments p JOIN students s ON p.student_id = s.id LEFT JOIN groups g ON s.group_id = g.id ORDER BY p.payment_date DESC, p.id DESC').all();
      return sendJson(res, 200, payments);
    }

    // Settings
    if (pathname === '/api/settings' && method === 'GET') {
      return sendJson(res, 200, {
        school_name: getSetting('school_name', 'Course Center'),
        teacher_name: getSetting('teacher_name', 'Преподаватель'),
        currency: getSetting('currency', '₽'),
        telegram_bot_token: getSetting('telegram_bot_token', DEFAULT_BOT_TOKEN),
        bot_username: getSetting('bot_username', 'doomhex23_bot')
      });
    }

    // Simulator
    if (pathname === '/api/simulator/messages' && method === 'GET') {
      const studentId = Number(urlObj.searchParams.get('student_id')) || 1;
      let student = null;
      let activeHw = null;
      let messages = [];

      if (useFallbackDb) {
        student = memData.students.find(s => s.id === studentId);
        activeHw = student ? memData.homeworks.filter(h => h.group_id === student.group_id).slice(-1)[0] : null;
        messages = memData.simulator_messages.filter(m => m.student_id === studentId);
      } else {
        student = db.prepare('SELECT s.*, g.name as group_name FROM students s LEFT JOIN groups g ON s.group_id = g.id WHERE s.id = ?').get(studentId);
        activeHw = db.prepare('SELECT * FROM homeworks WHERE group_id = ? ORDER BY id DESC LIMIT 1').get(student ? student.group_id : 0);
        messages = db.prepare('SELECT * FROM simulator_messages WHERE student_id = ? ORDER BY id ASC').all(studentId);
      }
      return sendJson(res, 200, { messages, student, activeHomework: activeHw });
    }

    if (pathname === '/api/simulator/send' && method === 'POST') {
      const body = await readJsonBody(req);
      const { student_id, text, attachment_name } = body;
      const sId = Number(student_id);

      let student = null;
      let activeHw = null;
      if (useFallbackDb) {
        student = memData.students.find(s => s.id === sId);
        activeHw = student ? memData.homeworks.filter(h => h.group_id === student.group_id).slice(-1)[0] : null;
        memData.simulator_messages.push({ id: memData.simulator_messages.length + 1, student_id: sId, sender: 'student', text: text || '', attachment_name: attachment_name || null });
        if (activeHw) {
          memData.submissions.unshift({
            id: memData.submissions.length + 1, homework_id: activeHw.id, student_id: sId,
            submission_text: text || '(Решение)', file_name: attachment_name || null, status: 'pending',
            submitted_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
          });
        }
        memData.simulator_messages.push({ id: memData.simulator_messages.length + 1, student_id: sId, sender: 'bot', text: '✅ Ваша домашняя работа принята!' });
      } else {
        student = db.prepare('SELECT * FROM students WHERE id = ?').get(sId);
        activeHw = db.prepare('SELECT * FROM homeworks WHERE group_id = ? ORDER BY id DESC LIMIT 1').get(student ? student.group_id : 0);
        db.prepare('INSERT INTO simulator_messages (student_id, sender, text, attachment_name) VALUES (?, \'student\', ?, ?)').run(sId, text || '', attachment_name || null);
        if (activeHw) {
          db.prepare('INSERT INTO submissions (homework_id, student_id, submission_text, file_name, status) VALUES (?, ?, ?, ?, \'pending\')').run(activeHw.id, sId, text || '(Решение)', attachment_name || null);
        }
        db.prepare('INSERT INTO simulator_messages (student_id, sender, text) VALUES (?, \'bot\', ?)').run(sId, '✅ Ваша домашняя работа принята!');
      }

      return sendJson(res, 200, { success: true });
    }

    // Cron Reminders
    if (pathname === '/api/cron-reminders' || (pathname === '/api/telegram/check-reminders' && method === 'POST')) {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const stList = useFallbackDb ? memData.students : db.prepare('SELECT * FROM students').all();
      const dueStudents = stList.filter(s => s.payment_status !== 'paid' && s.payment_due_date === tomorrow);
      const currency = getSetting('currency', '₽');

      for (const s of dueStudents) {
        if (s.telegram_id && !s.telegram_id.startsWith('sim_')) {
          sendTelegramMessage(s.telegram_id, `🔔 <b>Напоминание об оплате обучения!</b>\nСумма: <b>${s.tuition_amount} ${currency}</b>.\nСрок: завтра (<b>${s.payment_due_date}</b>). Пожалуйста, подтвердите оплату.`).catch(() => {});
        }
      }
      return sendJson(res, 200, { remindersSent: dueStudents.length });
    }

    // Logs
    if (pathname === '/api/logs' && method === 'GET') {
      return sendJson(res, 200, useFallbackDb ? memData.bot_logs : db.prepare('SELECT * FROM bot_logs ORDER BY id DESC LIMIT 50').all());
    }

    // Local static files fallback
    const PUBLIC_DIR = path.join(process.cwd(), 'public');
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
    if (!fs.existsSync(filePath)) filePath = path.join(PUBLIC_DIR, 'index.html');
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimes = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
      res.writeHead(200, { 'Content-Type': mimes[ext] || 'text/plain' });
      return fs.createReadStream(filePath).pipe(res);
    }

    res.writeHead(404);
    res.end('Not Found');
  } catch (err) {
    console.error('API Error:', err);
    sendJson(res, 500, { error: err.message });
  }
}

module.exports = handler;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  http.createServer(handler).listen(PORT, '0.0.0.0', () => {
    console.log(`EduFlow running on http://localhost:${PORT}`);
  });
}
