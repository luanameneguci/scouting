//Função para dar margin top dinâmico aos wrapper de acordo com a altura da navbar
export function setupContentNavbarMargin(targetClass) {
    const setMargin = () => {
        const navbar = document.querySelector('.navbar-back');
        const contentWrapper = document.querySelector('.' + targetClass);

        if (navbar && contentWrapper) {
            const navbarHeight = navbar.offsetHeight;
            contentWrapper.style.marginTop = `${navbarHeight}px`;
        }
    };

    window.addEventListener('resize', setMargin);
    setMargin(); // Margin inicial
}