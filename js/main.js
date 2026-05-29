// main.js - главная логика сайта (с админкой и замочком)

let currentPage = 'home';
let currentLang = getLanguage();
let showAdmin = false;
let adminLoggedIn = false;

// ===== ОТРИСОВКА ГЛАВНОГО САЙТА =====
function renderMainSite() {
    const app = document.getElementById('app');
    if (!app) return;
    
    const t = translations[currentLang];
    
    let pageContent = '';
    switch(currentPage) {
        case 'news': pageContent = renderNewsPage(t); break;
        case 'about': pageContent = renderAboutPage(t); break;
        case 'contact': pageContent = renderContactPage(t); break;
        case 'products': pageContent = renderProductsPage(t); break;
        default: pageContent = renderHomePage(t);
    }
    
    app.innerHTML = `
        <header class="header">
            <div class="header-container">
                <div class="logo">Teacher <span>Space</span></div>
                <nav class="nav">
                    <button onclick="window.navigate('news')">${t.news}</button>
                    <button onclick="window.navigate('about')">${t.about}</button>
                    <button onclick="window.navigate('contact')">${t.contact}</button>
                    <button onclick="window.navigate('products')">${t.products}</button>
                </nav>
                <button class="lang-btn" onclick="window.toggleLanguage()">${currentLang === 'ru' ? 'English' : 'Русский'}</button>
            </div>
        </header>
        
        <div class="main-content">
            <div class="sidebar">
                <h3>📚 ${t.menu}</h3>
                <button onclick="window.navigate('news')">${t.news}</button>
                <button onclick="window.navigate('about')">${t.about}</button>
                <button onclick="window.navigate('contact')">${t.contact}</button>
                <button onclick="window.navigate('products')">${t.products}</button>
                <div class="banner-item">🎓 Скидка 20% на первый курс!</div>
                <div class="banner-item">🔥 Новый набор стартует 1 июня</div>
            </div>
            
            <div class="article">
                ${pageContent}
            </div>
            
            <div class="aside">
                <h3>🏷️ Популярные теги</h3>
                <div class="tags">
                    <span class="tag">#React</span>
                    <span class="tag">#JavaScript</span>
                    <span class="tag">#HTML</span>
                    <span class="tag">#CSS</span>
                    <span class="tag">#Node.js</span>
                    <span class="tag">#Python</span>
                </div>
                <div class="banner-item">⭐ Как выучить React за месяц</div>
                <div class="banner-item">⭐ Топ-10 ошибок JavaScript</div>
                <div class="banner-item">⭐ Карьера в IT: с чего начать</div>
            </div>
        </div>
        
        <footer class="footer">
            <div class="footer-container">
                <p>© 2026 Teacher Space | Создано с ❤️ для преподавателей</p>
                <p><a href="tel:+79085175043">📞 +7 908 517 50 43</a> | <a href="mailto:teacher@space.ru">✉️ teacher@space.ru</a></p>
            </div>
        </footer>
        
        <div class="lock-btn" onclick="window.openAdminModal()">🔒</div>
    `;
}

// ===== ОТРИСОВКА АДМИНКИ (МОДАЛЬНОЕ ОКНО) =====
function renderAdminModal() {
    const t = translations[currentLang];
    const modalContent = document.getElementById('adminModal');
    if (!modalContent) return;
    
    if (!adminLoggedIn) {
        modalContent.innerHTML = `
            <div class="admin-login">
                <h2>🔐 ${t.login}</h2>
                <input type="password" id="adminPassword" placeholder="${t.password}" />
                <button onclick="window.checkAdminPassword()">${t.login}</button>
                <br/><br/>
                <button onclick="window.closeAdminModal()">✕ Закрыть</button>
            </div>
        `;
        return;
    }
    
    const news = getNews();
    let newsHtml = '';
    news.forEach(item => {
        newsHtml += `
            <div class="admin-news-item">
                <div>
                    <strong>${escapeHtml(item.title)}</strong>
                    <br/>
                    <small>${new Date(item.date).toLocaleDateString()}</small>
                </div>
                <button onclick="window.deleteAdminNews(${item.id})" style="background:#dc3545">🗑️</button>
            </div>
        `;
    });
    
    modalContent.innerHTML = `
        <div class="admin-panel">
            <div class="admin-header">
                <h2>👨‍💼 ${t.admin}</h2>
                <button onclick="window.closeAdminModal()" style="background:#888">✕ Закрыть</button>
            </div>
            <div style="background:#f5f7fa; padding:1rem; border-radius:10px; margin-bottom:1rem">
                <h3>➕ ${t.addNews}</h3>
                <input type="text" id="adminNewsTitle" placeholder="${t.title}" />
                <textarea id="adminNewsContent" rows="3" placeholder="${t.content}"></textarea>
                <button onclick="window.addAdminNews()">✅ ${t.addNews}</button>
            </div>
            <div>
                <h3>📰 Управление новостями (${news.length})</h3>
                ${newsHtml || '<p>Нет новостей</p>'}
            </div>
            <div style="margin-top:1rem; text-align:center">
                <button onclick="window.logoutAdmin()" style="background:#dc3545">🚪 Выйти из админки</button>
            </div>
        </div>
    `;
}

// ===== ФУНКЦИИ АДМИНКИ =====
function openAdminModal() {
    showAdmin = true;
    const overlay = document.getElementById('adminOverlay');
    if (overlay) overlay.classList.remove('hidden');
    renderAdminModal();
}

function closeAdminModal() {
    showAdmin = false;
    adminLoggedIn = false;
    const overlay = document.getElementById('adminOverlay');
    if (overlay) overlay.classList.add('hidden');
}

function checkAdminPassword() {
    const pwd = document.getElementById('adminPassword');
    if (pwd && pwd.value === 'teacher2024') {
        adminLoggedIn = true;
        renderAdminModal();
    } else {
        alert('Неверный пароль! Попробуйте: teacher2024');
    }
}

function addAdminNews() {
    const title = document.getElementById('adminNewsTitle');
    const content = document.getElementById('adminNewsContent');
    if (title && content && title.value && content.value) {
        addNewsItem(title.value, content.value);
        title.value = '';
        content.value = '';
        renderAdminModal();
        renderMainSite();
        alert('✅ Новость добавлена!');
    } else {
        alert('Заполните все поля!');
    }
}

function deleteAdminNews(id) {
    if (confirm('Удалить новость?')) {
        deleteNewsItem(id);
        renderAdminModal();
        renderMainSite();
    }
}

function logoutAdmin() {
    adminLoggedIn = false;
    renderAdminModal();
}

// ===== ОБЩИЕ ФУНКЦИИ =====
function navigate(page) {
    currentPage = page;
    renderMainSite();
}

function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    saveLanguage(currentLang);
    renderMainSite();
    if (showAdmin) renderAdminModal();
}

function addCommentHandler(e) {
    e.preventDefault();
    const name = document.getElementById('commentName');
    const text = document.getElementById('commentText');
    if (text && text.value.trim()) {
        addComment(name ? name.value : '', text.value);
        renderMainSite();
    }
}

function uploadFileHandler(e) {
    const file = e.target.files[0];
    if (file) {
        addFile(file.name, (file.size / 1024).toFixed(2) + ' KB');
        renderMainSite();
    }
}

function sendMessageHandler(e) {
    e.preventDefault();
    const success = document.getElementById('msgSuccess');
    if (success) {
        success.style.display = 'block';
        setTimeout(() => success.style.display = 'none', 3000);
    }
    const msgName = document.getElementById('msgName');
    const msgEmail = document.getElementById('msgEmail');
    const msgText = document.getElementById('msgText');
    if (msgName) msgName.value = '';
    if (msgEmail) msgEmail.value = '';
    if (msgText) msgText.value = '';
}

// ===== СОЗДАНИЕ HTML ДЛЯ АДМИНКИ =====
function setupAdminOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'adminOverlay';
    overlay.className = 'admin-overlay hidden';
    overlay.innerHTML = '<div class="admin-modal" id="adminModal"></div>';
    document.body.appendChild(overlay);
}

// ===== ЗАПУСК =====
window.navigate = navigate;
window.toggleLanguage = toggleLanguage;
window.openAdminModal = openAdminModal;
window.closeAdminModal = closeAdminModal;
window.checkAdminPassword = checkAdminPassword;
window.addAdminNews = addAdminNews;
window.deleteAdminNews = deleteAdminNews;
window.logoutAdmin = logoutAdmin;
window.addCommentHandler = addCommentHandler;
window.uploadFileHandler = uploadFileHandler;
window.sendMessageHandler = sendMessageHandler;

// Запускаем всё после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    setupAdminOverlay();
    renderMainSite();
});

console.log('✅ main.js загружен');