// storage.js - работа с localStorage

// Ключи для хранения
const STORAGE_KEYS = {
    NEWS: 'teacherSpace_news',
    COMMENTS: 'teacherSpace_comments',
    FILES: 'teacherSpace_files',
    LANGUAGE: 'teacherSpace_language'
};

// Начальные данные
const defaultNews = [
    { id: 1, title: '🎉 Отличная новость!', content: 'Уже тепло! Весна наступила, и мы начинаем новый набор на курсы.', date: new Date().toISOString() },
    { id: 2, title: '🚀 Новый курс по React', content: 'Старт занятий 1 июня. Успейте записаться! Скидка 20% до 20 мая.', date: new Date().toISOString() }
];

// ===== GETTERS =====
function getNews() {
    const data = localStorage.getItem(STORAGE_KEYS.NEWS);
    if (data) return JSON.parse(data);
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(defaultNews));
    return defaultNews;
}

function getComments() {
    const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    return data ? JSON.parse(data) : [];
}

function getFiles() {
    const data = localStorage.getItem(STORAGE_KEYS.FILES);
    return data ? JSON.parse(data) : [];
}

function getLanguage() {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';
}

// ===== SETTERS =====
function saveNews(news) {
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(news));
}

function saveComments(comments) {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
}

function saveFiles(files) {
    localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(files));
}

function saveLanguage(lang) {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
}

// ===== ДОБАВЛЕНИЕ/УДАЛЕНИЕ =====
function addNewsItem(title, content) {
    const news = getNews();
    news.unshift({
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toISOString()
    });
    saveNews(news);
}

function deleteNewsItem(id) {
    const news = getNews();
    saveNews(news.filter(item => item.id !== id));
}

function addComment(name, text) {
    const comments = getComments();
    comments.unshift({
        id: Date.now(),
        name: name || 'Аноним',
        text: text,
        date: new Date().toISOString()
    });
    saveComments(comments);
}

function addFile(fileName, fileSize) {
    const files = getFiles();
    files.unshift({
        id: Date.now(),
        name: fileName,
        size: fileSize,
        date: new Date().toISOString()
    });
    saveFiles(files);
}

// Для отладки
console.log('✅ storage.js загружен');