document.addEventListener('DOMContentLoaded', function() {
    // Newsletter Form Handling
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real implementation, you would send this to your backend
                // For now, we'll just simulate success
                emailInput.value = '';
                
                // Show success message
                const formContainer = this.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you! You are now subscribed to our deals newsletter.';
                successMessage.style.marginTop = '20px';
                successMessage.style.padding = '10px';
                successMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                successMessage.style.borderRadius = '4px';
                
                // Remove existing messages if any
                const existingMessage = formContainer.querySelector('.success-message');
                if (existingMessage) {
                    formContainer.removeChild(existingMessage);
                }
                
                formContainer.appendChild(successMessage);
                
                // In a real implementation, you would store this email in your database
                console.log('Subscription email:', email);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    if (formContainer.contains(successMessage)) {
                        formContainer.removeChild(successMessage);
                    }
                }, 5000);
            }
        });
    }
    
    // Track affiliate link clicks
    const trackAffiliateClick = function(productName, affiliateUrl) {
        // In a real implementation, you would send this data to your analytics backend
        console.log('Affiliate link clicked:', {
            product: productName,
            url: affiliateUrl,
            timestamp: new Date().toISOString()
        });
        
        // For demonstration, we'll store in localStorage
        const clickData = JSON.parse(localStorage.getItem('affiliateClicks') || '[]');
        clickData.push({
            product: productName,
            url: affiliateUrl,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('affiliateClicks', JSON.stringify(clickData));
        
        // In a real implementation, you would also have conversion tracking
        // which would require integration with the affiliate program's API
    };
    
    // Add click tracking to all affiliate links
    const affiliateLinks = document.querySelectorAll('.buy-button');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const productCard = this.closest('.product-card');
            const productName = productCard ? productCard.querySelector('h3').textContent : 'Unknown Product';
            const affiliateUrl = this.getAttribute('href');
            
            trackAffiliateClick(productName, affiliateUrl);
            
            // This doesn't prevent the navigation, 
            // so the user still goes to the affiliate link
        });
    });
    
    // Display recently viewed products from localStorage (if available)
    const setupRecentlyViewed = function() {
        const recentProductsData = localStorage.getItem('recentProducts');
        
        if (recentProductsData) {
            try {
                const recentProducts = JSON.parse(recentProductsData);
                
                // If we have recent products data, display it
                if (recentProducts.length > 0) {
                    const featuredSection = document.querySelector('.featured');
                    const recentlyViewedSection = document.createElement('section');
                    recentlyViewedSection.className = 'recently-viewed';
                    recentlyViewedSection.innerHTML = `
                        <div class="container">
                            <h2>Recently Viewed</h2>
                            <div class="product-grid"></div>
                        </div>
                    `;
                    
                    // Insert after featured section
                    if (featuredSection) {
                        featuredSection.parentNode.insertBefore(recentlyViewedSection, featuredSection.nextSibling);
                        
                        // Add recent products to the grid
                        const productGrid = recentlyViewedSection.querySelector('.product-grid');
                        recentProducts.forEach(product => {
                            const productCard = document.createElement('div');
                            productCard.className = 'product-card';
                            productCard.innerHTML = `
                                <div class="product-image">
                                    <img src="${product.image}" alt="${product.name}">
                                </div>
                                <h3>${product.name}</h3>
                                <div class="rating">${product.rating}</div>
                                <p class="price">
                                    <span class="original">${product.originalPrice}</span> 
                                    <span class="discount">${product.discountPrice}</span>
                                </p>
                                <p class="description">${product.description}</p>
                                <a href="${product.affiliateUrl}" class="buy-button" target="_blank">View Deal</a>
                            `;
                            productGrid.appendChild(productCard);
                            
                            // Re-add tracking to the new affiliate link
                            const newAffiliateLink = productCard.querySelector('.buy-button');
                            newAffiliateLink.addEventListener('click', function() {
                                trackAffiliateClick(product.name, product.affiliateUrl);
                            });
                        });
                    }
                }
            } catch (e) {
                console.error('Error parsing recent products:', e);
                localStorage.removeItem('recentProducts');
            }
        }
    };
    
    // Save viewed products when user clicks on product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only proceed if the click wasn't on the buy button (to avoid double counting)
            if (!e.target.classList.contains('buy-button')) {
                const name = card.querySelector('h3').textContent;
                const image = card.querySelector('.product-image img').getAttribute('src');
                const rating = card.querySelector('.rating').textContent;
                const originalPrice = card.querySelector('.original').textContent;
                const discountPrice = card.querySelector('.discount').textContent;
                const description = card.querySelector('.description').textContent;
                const affiliateUrl = card.querySelector('.buy-button').getAttribute('href');
                
                // Get existing recent products or initialize new array
                const recentProducts = JSON.parse(localStorage.getItem('recentProducts') || '[]');
                
                // Check if product already exists in recently viewed
                const existingIndex = recentProducts.findIndex(p => p.name === name);
                if (existingIndex > -1) {
                    // Remove it so we can add it to the top (most recent)
                    recentProducts.splice(existingIndex, 1);
                }
                
                // Add this product to the front of the array
                recentProducts.unshift({
                    name,
                    image,
                    rating,
                    originalPrice,
                    discountPrice,
                    description,
                    affiliateUrl,
                    timestamp: new Date().toISOString()
                });
                
                // Keep only the 3 most recent
                const limitedRecent = recentProducts.slice(0, 3);
                
                // Save back to localStorage
                localStorage.setItem('recentProducts', JSON.stringify(limitedRecent));
            }
        });
    });
    
    // Call function to set up recently viewed section
    setupRecentlyViewed();
    
    // Simple analytics system
    const pageLoadTime = new Date().toISOString();
    const pageUrl = window.location.href;
    const referrer = document.referrer || 'direct';
    
    // Log page view data
    console.log('Page view:', {
        url: pageUrl,
        timestamp: pageLoadTime,
        referrer: referrer
    });
    
    // In a real implementation, you'd send this to your analytics backend
    // along with user agent info, screen size, etc.
    
    // Track time spent on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = (Date.now() - startTime) / 1000; // in seconds
        console.log('Time spent on page:', timeSpent + ' seconds');
        
        // In a real implementation, you'd send this to your analytics backend
        // This helps understand user engagement with your content
    });
});
