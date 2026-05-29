// pages.js - содержимое страниц

const translations = {
    ru: {
        news: '📰 Новости',
        about: '👨‍🏫 Об авторе',
        contact: '📞 Контакты',
        products: '📦 Услуги',
        menu: 'Меню',
        welcome: 'Добро пожаловать в Teacher Space',
        send: 'Отправить',
        name: 'Имя',
        email: 'Email',
        message: 'Сообщение',
        comments: 'Комментарии',
        leaveComment: 'Оставить комментарий',
        uploadFile: 'Загрузить файл',
        admin: 'Админ-панель',
        login: 'Вход',
        password: 'Пароль',
        addNews: 'Добавить новость',
        title: 'Заголовок',
        content: 'Содержание'
    },
    en: {
        news: '📰 News',
        about: '👨‍🏫 About',
        contact: '📞 Contact',
        products: '📦 Services',
        menu: 'Menu',
        welcome: 'Welcome to Teacher Space',
        send: 'Send',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        comments: 'Comments',
        leaveComment: 'Leave a comment',
        uploadFile: 'Upload file',
        admin: 'Admin Panel',
        login: 'Login',
        password: 'Password',
        addNews: 'Add News',
        title: 'Title',
        content: 'Content'
    }
};

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderHomePage(t) {
    return `
        <h1>🏠 ${t.welcome}</h1>
        <p>Teacher Space - обучение веб-разработке</p>
        <div class="features">
            <div class="feature-card">
                <div class="feature-icon">📚</div>
                <h3>Обучение</h3>
                <p>Курсы для всех уровней</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">💡</div>
                <h3>Консультации</h3>
                <p>Индивидуальные занятия</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎓</div>
                <h3>Сертификаты</h3>
                <p>Подтверждение знаний</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3>Проекты</h3>
                <p>Реальные задачи</p>
            </div>
        </div>
    `;
}

function renderNewsPage(t) {
    const news = getNews();
    let newsHtml = '';
    news.forEach(item => {
        newsHtml += `
            <div class="news-card">
                <h2>${escapeHtml(item.title)}</h2>
                <small>📅 ${new Date(item.date).toLocaleDateString()}</small>
                <p>${escapeHtml(item.content)}</p>
            </div>
        `;
    });
    
    const comments = getComments();
    let commentsHtml = '';
    comments.forEach(c => {
        commentsHtml += `
            <div class="comment-item">
                <strong>👤 ${escapeHtml(c.name)}</strong>
                <small style="margin-left:1rem">${new Date(c.date).toLocaleDateString()}</small>
                <p>${escapeHtml(c.text)}</p>
            </div>
        `;
    });
    
    return `
        <h1>${t.news}</h1>
        ${newsHtml || '<p>Нет новостей</p>'}
        <div class="comments-section">
            <h3>💬 ${t.comments} (${comments.length})</h3>
            <form onsubmit="window.addCommentHandler(event)">
                <input type="text" id="commentName" placeholder="${t.name}" />
                <textarea id="commentText" rows="3" placeholder="${t.leaveComment}" required></textarea>
                <button type="submit">${t.send}</button>
            </form>
            ${commentsHtml}
        </div>
    `;
}

function renderAboutPage(t) {
    const files = getFiles();
    let filesHtml = '';
    files.forEach(f => {
        filesHtml += `
            <div style="display:flex; justify-content:space-between; padding:0.5rem; border-bottom:1px solid #eee">
                <span>📄 ${escapeHtml(f.name)}</span>
                <small>${f.size}</small>
            </div>
        `;
    });
    
    return `
        <h1>${t.about}</h1>
        <div class="news-card">
            <h2>📖 Биография</h2>
            <p>Опытный преподаватель с 10-летним стажем. Специализация: веб-разработка, React, JavaScript.</p>
        </div>
        <div class="news-card">
            <h2>🎓 Образование</h2>
            <p><strong>Южный федеральный университет</strong> - Факультет компьютерных наук</p>
        </div>
        <div class="news-card">
            <h2>🏆 Достижения</h2>
            <ul>
                <li>Победитель конкурса "Лучший преподаватель года" (2023)</li>
                <li>Автор 25 научных публикаций</li>
                <li>Создатель онлайн-курсов с 10,000+ учеников</li>
            </ul>
        </div>
        <div class="news-card">
            <h2>📁 ${t.uploadFile}</h2>
            <div class="upload-area">
                <input type="file" id="fileInput" style="display:none" onchange="window.uploadFileHandler(event)" />
                <label for="fileInput" class="upload-label">📤 Выбрать файл</label>
            </div>
            <div style="margin-top:1rem">
                <h4>Загруженные файлы (${files.length})</h4>
                ${filesHtml || '<p>Нет файлов</p>'}
            </div>
        </div>
    `;
}

function renderContactPage(t) {
    return `
        <h1>${t.contact}</h1>
        <div class="contact-grid">
            <div class="news-card">
                <h2>📞 Свяжитесь со мной</h2>
                <p>📱 <a href="tel:+79085175043">+7 908 517 50 43</a></p>
                <p>💬 <a href="https://t.me/teacher_space">@teacher_space</a></p>
                <p>✉️ <a href="mailto:teacher@space.ru">teacher@space.ru</a></p>
                <hr style="margin:1rem 0">
                <p><strong>Часы работы:</strong></p>
                <p>Пн-Пт: 10:00 - 19:00</p>
                <p>Сб: 11:00 - 15:00</p>
                <p>Вс: выходной</p>
            </div>
            <div class="news-card">
                <h2>✉️ Написать сообщение</h2>
                <form onsubmit="window.sendMessageHandler(event)">
                    <input type="text" id="msgName" placeholder="${t.name}" required />
                    <input type="email" id="msgEmail" placeholder="${t.email}" required />
                    <textarea id="msgText" rows="4" placeholder="${t.message}" required></textarea>
                    <button type="submit">${t.send}</button>
                </form>
                <div id="msgSuccess" style="display:none" class="success-message">✅ Сообщение отправлено!</div>
            </div>
        </div>
    `;
}

function renderProductsPage(t) {
    return `
        <h1>${t.products}</h1>
        <table class="products-table">
            <thead>
                <tr><th>Услуга/Продукт</th><th>Цена</th><th>Длительность</th><th>Формат</th></tr>
            </thead>
            <tbody>
                <tr><td><strong>Индивидуальная консультация</strong></td><td class="price">3,000 ₽</td><td>1 час</td><td>Online</td></tr>
                <tr><td><strong>Курс "HTML/CSS с нуля"</strong></td><td class="price">15,000 ₽</td><td>8 занятий</td><td>Online/Офлайн</td></tr>
                <tr><td><strong>Курс "JavaScript Advanced"</strong></td><td class="price">20,000 ₽</td><td>10 занятий</td><td>Online</td></tr>
                <tr><td><strong>Курс "React для профи"</strong></td><td class="price">25,000 ₽</td><td>12 занятий</td><td>Online</td></tr>
                <tr><td><strong>Проверка дипломных работ</strong></td><td class="price">5,000 ₽</td><td>за проект</td><td>Offline</td></tr>
            </tbody>
        </table>
        <div class="discount-info">
            <div style="font-size:1.2rem; font-weight:bold">🎓 Скидка 10% для студентов!</div>
            <p>📞 Для записи на курсы звоните: <a href="tel:+79085175043">+7 908 517 50 43</a></p>
        </div>
    `;
}

console.log('✅ pages.js загружен');