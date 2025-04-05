document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const menu = document.querySelector('.menu');

    if (hamburgerBtn && menu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            menu.classList.toggle('show');
        });

        const menuLinks = document.querySelectorAll('.menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('show');
                hamburgerBtn.classList.remove('active');
            });
        });
    } else {
        console.error('Erro: Botão hambúrguer ou menu não encontrados no DOM.');
    }
});

const newsItems = document.querySelectorAll('.news-item');
        const paginationContainer = document.querySelector('.pagination-container');
        const paginationLinks = document.querySelectorAll('.pagination-link');
        const itemsPerPage = 6;
        let currentPage = 1;
        let totalPages = 1;

        function showPage(page) {
            currentPage = page;
            newsItems.forEach((item, index) => {
                if (index >= (page - 1) * itemsPerPage && index < page * itemsPerPage) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            updatePagination();
        }

        function updatePagination() {
            if (newsItems.length > itemsPerPage) {
                totalPages = Math.ceil(newsItems.length / itemsPerPage);
                paginationContainer.classList.remove('hidden');

                paginationLinks.forEach((link, index) => {
                    link.classList.remove('active');
                    if (index === currentPage - 1) {
                        link.classList.add('active');
                    }
                    link.textContent = index + 1;
                });

                // Exibe os pontos de reticência se houver mais páginas
                if (totalPages > 5) {
                    if (currentPage <= 3) {
                        paginationLinks[4].textContent = '...';
                        paginationLinks[4].classList.remove('active');
                        paginationLinks[5].textContent = totalPages;
                    } else if (currentPage >= totalPages - 2) {
                        paginationLinks[0].textContent = '1';
                        paginationLinks[1].textContent = '2';
                        paginationLinks[2].textContent = '...';
                    } else {
                        paginationLinks[0].textContent = '1';
                        paginationLinks[1].textContent = '...';
                        paginationLinks[2].textContent = currentPage - 1;
                        paginationLinks[3].textContent = currentPage;
                        paginationLinks[4].textContent = currentPage + 1;
                        paginationLinks[5].textContent = '...';
                    }
                }
            } else {
                paginationContainer.classList.add('hidden');
            }
        }

        paginationLinks.forEach((link, index) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                showPage(index + 1);
            });
        });

        showPage(1);





