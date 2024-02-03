function switchTheme() {
    const currentTheme = localStorage.getItem('theme') || 'old';
    const newTheme = currentTheme === 'old' ? 'new' : 'old';
    localStorage.setItem('theme', newTheme);

    updateStylesheets(newTheme);
}

function updateStylesheets(theme) {
    document.querySelectorAll("link[rel='stylesheet']").forEach(link => {
        const originalHref = link.getAttribute('href');
        let newHref = theme === 'new' ? originalHref.replace('.css', '1.css') : originalHref.replace('1.css', '.css');

        // Only attempt to switch if going to 'new' theme or if currently on 'new' theme (to switch back to 'old')
        if (theme === 'new' || originalHref.includes('1')) {
            fetch(newHref, { method: 'HEAD' })
            .then(response => {
                if (response.ok || theme === 'old') {
                    link.href = newHref;
                }
            }).catch(() => {
                // If the fetch fails (e.g., due to CORS policies or file not found), don't change the href for this link element
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const currentTheme = localStorage.getItem('theme') || 'old';
    updateStylesheets(currentTheme);

    const toggleButton = document.getElementById('toggleTheme');
    if (toggleButton) {
        toggleButton.addEventListener('click', switchTheme);
    }
});
