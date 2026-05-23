const sampleData = [
    { id: 1, title: "Database Sync Engine", description: "Asynchronous background workflow pipeline configured for scaling distributed document layers cleanly.", category: "Infrastructure", metric: "$240/mo" },
    { id: 2, title: "Tailwind UI Layout Kit", description: "Pre-compiled system component variables adhering structurally to responsive typography guidelines.", category: "Design", metric: "Free" },
    { id: 3, title: "OAuth JWT Authenticator", description: "Secure state management configuration handling token assertions, expiry controls, and route guards.", category: "Security", metric: "$15/mo" },
    { id: 4, title: "Analytics Realtime Tracker", description: "Client telemetry pipeline optimizing high-throughput events down into actionable data charts.", category: "Analytics", metric: "$89/mo" },
    { id: 5, title: "Cloud Edge Deploy CDN", description: "Automated distribution configurations managing globally edge-cached static application footprints.", category: "Infrastructure", metric: "$40/mo" },
    { id: 6, title: "Form Constraint Checker", description: "Inline validation system applying dynamic regular expression matches across critical structural text fields.", category: "Security", metric: "Free" }
];

const elements = {
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    searchBar: document.getElementById('search-bar'),
    itemGrid: document.getElementById('item-grid'),
    loadingSpinner: document.getElementById('loading-spinner'),
    noResults: document.getElementById('no-results'),
    itemCount: document.getElementById('item-count'),
    modal: document.getElementById('detail-modal'),
    modalContent: document.querySelector('#detail-modal > div'),
    closeModal: document.getElementById('close-modal'),
    modalTitle: document.getElementById('modal-title'),
    modalCategory: document.getElementById('modal-category'),
    modalDescription: document.getElementById('modal-description'),
    modalMetric: document.getElementById('modal-metric'),
};

let currentItems = [...sampleData];

function renderGrid(items) {
    elements.itemGrid.innerHTML = '';
    elements.itemCount.textContent = items.length;

    if (items.length === 0) {
        elements.itemGrid.classList.add('hidden');
        elements.noResults.classList.remove('hidden');
        return;
    }

    elements.noResults.classList.add('hidden');
    elements.itemGrid.classList.remove('hidden');

    items.forEach(item => {
        const card = document.createElement('article');
        card.className = "bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-sky-500/50 dark:hover:border-sky-400/50 transition duration-300 cursor-pointer flex flex-col justify-between group";
        card.innerHTML = `
            <div>
                <span class="text-xs font-semibold tracking-wider uppercase text-sky-600 dark:text-sky-400">${item.category}</span>
                <h4 class="text-lg font-bold mt-1 text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">${item.title}</h4>
                <p class="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">${item.description}</p>
            </div>
            <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <span class="text-sm font-bold text-slate-700 dark:text-slate-300">${item.metric}</span>
                <span class="text-xs text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">Inspect &rarr;</span>
            </div>
        `;
        card.addEventListener('click', () => openModal(item));
        elements.itemGrid.appendChild(card);
    });
}

function openModal(item) {
    elements.modalTitle.textContent = item.title;
    elements.modalCategory.textContent = item.category;
    elements.modalDescription.textContent = item.description;
    elements.modalMetric.textContent = item.metric;

    elements.modal.classList.remove('opacity-0', 'pointer-events-none');
    elements.modalContent.classList.remove('scale-95');
    elements.modalContent.classList.add('scale-100');
}

function closeModal() {
    elements.modal.classList.add('opacity-0', 'pointer-events-none');
    elements.modalContent.classList.remove('scale-100');
    elements.modalContent.classList.add('scale-95');
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    currentItems = sampleData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    renderGrid(currentItems);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
        elements.themeIcon.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        elements.themeIcon.textContent = '🌙';
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    elements.themeIcon.textContent = isDark ? '☀️' : '🌙';
}

function initApp() {
    initTheme();
    
    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.searchBar.addEventListener('input', handleSearch);
    elements.closeModal.addEventListener('click', closeModal);
    
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) closeModal();
    });

    setTimeout(() => {
        elements.loadingSpinner.classList.add('hidden');
        renderGrid(currentItems);
    }, 1200);
}

document.addEventListener('DOMContentLoaded', initApp);