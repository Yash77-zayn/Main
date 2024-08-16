// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,  // Duration of animations
    easing: 'ease-in-out',  // Easing function for animations
    once: true,  // Animation should occur only once
    offset: 100  // Offset from the top of the viewport before the animation starts
});

// Smooth Scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    updateDynamicContent();
});

/**
 * Sets up smooth scrolling for internal anchor links.
 */
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Updates dynamic content for features and testimonials sections.
 */
function updateDynamicContent() {
    const featureData = [
        {
            icon: '🛒',
            title: 'Wide Variety',
            description: 'Choose from a comprehensive selection of products including fresh produce, dairy, and pantry essentials.',
            sticker: 'Best Seller'
        },
        {
            icon: '🌿',
            title: 'Fresh and Local',
            description: 'We source our products from local farms and trusted suppliers to ensure top-notch freshness.',
            sticker: 'Top Quality'
        },
        {
            icon: '🚚',
            title: 'Fast Delivery',
            description: 'Get your groceries delivered within hours, with same-day delivery options available.',
            sticker: 'Fast Shipping'
        }
    ];

    const testimonialData = [
        {
            quote: '“Shopping at ShopSmart is always a pleasure. The site is easy to use, and my orders always arrive on time.”',
            author: 'Iyer Raman, Bangalore'
        },
        {
            quote: '“Great variety of products and fantastic customer service. Highly recommend!”',
            author: 'Babita Sawarkar, Nagpur'
        }
    ];

    populateSection('#features', featureData, createFeatureElement);
    populateSection('#testimonials', testimonialData, createTestimonialElement);
}

/**
 * Populates a section with dynamic content.
 * @param {string} sectionSelector - CSS selector for the section to be populated.
 * @param {Array} data - Array of data to populate the section.
 * @param {Function} createElement - Function to create individual elements from data.
 */
function populateSection(sectionSelector, data, createElement) {
    const container = document.querySelector(`${sectionSelector} .container`);
    if (!container) return;

    container.innerHTML = ''; // Clear existing content

    data.forEach(item => {
        const element = createElement(item);
        container.appendChild(element);
    });
}

/**
 * Creates a feature element.
 * @param {Object} feature - Feature data.
 * @returns {HTMLElement} - The created feature element.
 */
function createFeatureElement(feature) {
    const featureElement = document.createElement('div');
    featureElement.classList.add('feature');
    featureElement.innerHTML = `
        <span class="feature-image" role="img" aria-label="${feature.title}">${feature.icon}</span>
        <div class="feature-content">
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
            <div class="feature-sticker">${feature.sticker || ''}</div>
        </div>
    `;
    return featureElement;
}

/**
 * Creates a testimonial element.
 * @param {Object} testimonial - Testimonial data.
 * @returns {HTMLElement} - The created testimonial element.
 */
function createTestimonialElement(testimonial) {
    const testimonialElement = document.createElement('div');
    testimonialElement.classList.add('testimonial');
    testimonialElement.innerHTML = `
        <p>${testimonial.quote}</p>
        <footer>- ${testimonial.author}</footer>
    `;
    return testimonialElement;
}
