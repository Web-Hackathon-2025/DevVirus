const appState = {
    currentUser: {
        id: 'user_001',
        name: 'John Doe',
        role: 'customer',
        email: 'john@example.com'
    },
    
    providers: [
        {
            id: 'p001',
            name: 'Rajesh Kumar',
            category: 'Plumbing',
            rating: 4.8,
            reviews: 156,
            price: 299,
            distance: 1.2,
            image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=300&fit=crop',
            verified: true,
            description: 'Expert plumber with 10+ years experience'
        },
        {
            id: 'p002',
            name: 'Amit Sharma',
            category: 'Electrical',
            rating: 4.9,
            reviews: 203,
            price: 349,
            distance: 0.8,
            image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=400&h=300&fit=crop',
            verified: true,
            description: 'Licensed electrician, 24/7 emergency service'
        },
        {
            id: 'p003',
            name: 'Suresh Patel',
            category: 'Carpentry',
            rating: 4.7,
            reviews: 142,
            price: 399,
            distance: 2.1,
            image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
            verified: true,
            description: 'Custom furniture and repair specialist'
        },
        {
            id: 'p004',
            name: 'Priya Singh',
            category: 'Cleaning',
            rating: 4.6,
            reviews: 98,
            price: 249,
            distance: 1.5,
            image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
            verified: true,
            description: 'Professional home and office cleaning'
        },
        {
            id: 'p005',
            name: 'Vikram Reddy',
            category: 'Painting',
            rating: 4.5,
            reviews: 87,
            price: 449,
            distance: 3.0,
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop',
            verified: true,
            description: 'Interior and exterior painting expert'
        },
        {
            id: 'p006',
            name: 'Mohan Das',
            category: 'Plumbing',
            rating: 4.4,
            reviews: 76,
            price: 279,
            distance: 2.5,
            image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop',
            verified: true,
            description: 'Affordable plumbing solutions'
        },
        {
            id: 'p007',
            name: 'Anil Verma',
            category: 'Electrical',
            rating: 4.3,
            reviews: 65,
            price: 329,
            distance: 1.8,
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
            verified: false,
            description: 'Residential electrical services'
        },
        {
            id: 'p008',
            name: 'Deepak Joshi',
            category: 'Carpentry',
            rating: 4.7,
            reviews: 112,
            price: 379,
            distance: 1.3,
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop',
            verified: true,
            description: 'Modular kitchen and wardrobe specialist'
        }
    ],
    
    bookings: [
        {
            id: 'b001',
            customerId: 'user_001',
            providerId: 'p001',
            providerName: 'Rajesh Kumar',
            category: 'Plumbing',
            date: '2024-12-25',
            time: '10:00',
            status: 'requested',
            notes: 'Kitchen sink leaking',
            price: 299,
            createdAt: new Date('2024-12-19T09:00:00'),
            updatedAt: new Date('2024-12-19T09:00:00')
        }
    ],
    
    filters: {
        category: 'all',
        searchQuery: '',
        sortBy: 'distance',
        priceRange: 'all',
        rating: 'all',
        verified: 'all'
    },
    
    tempBooking: null,
    tempRescheduleId: null,
    
    users: [
        { email: 'customer@test.com', password: 'password', name: 'Test Customer', role: 'customer' },
        { email: 'provider@test.com', password: 'password', name: 'Test Provider', role: 'provider' },
        { email: 'admin@test.com', password: 'password', name: 'Admin User', role: 'admin' }
    ],
    
    map: null,
    markers: [],
    userLocation: { lat: 28.6139, lng: 77.2090 }
};

function showSignupForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;
    
    const user = appState.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        appState.currentUser = {
            id: 'user_' + Date.now(),
            name: user.name,
            email: user.email,
            role: role
        };
        
        document.getElementById('authView').style.display = 'none';
        document.getElementById('mainApp').style.display = 'block';
        
        switchRole(role);
        
        showNotification(`Welcome back, ${user.name}!`, 'success');
    } else {
        alert('Invalid credentials! Try:\ncustomer@test.com / password\nprovider@test.com / password\nadmin@test.com / password');
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const role = document.getElementById('signupRole').value;
    const category = document.getElementById('signupCategory').value;
    
    if (appState.users.find(u => u.email === email)) {
        alert('Email already registered!');
        return;
    }
    
    const newUser = { email, password, name, role, phone, category };
    appState.users.push(newUser);
    
    appState.currentUser = {
        id: 'user_' + Date.now(),
        name: name,
        email: email,
        role: role
    };
    
    document.getElementById('authView').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    
    switchRole(role);
    
    showNotification(`Account created successfully! Welcome, ${name}!`, 'success');
}

document.addEventListener('DOMContentLoaded', function() {
    const signupRoleSelect = document.getElementById('signupRole');
    if (signupRoleSelect) {
        signupRoleSelect.addEventListener('change', function() {
            const categoryDiv = document.getElementById('categorySelection');
            if (this.value === 'provider') {
                categoryDiv.style.display = 'block';
            } else {
                categoryDiv.style.display = 'none';
            }
        });
    }
});

function switchRole(role) {
    appState.currentUser.role = role;
    
    document.getElementById('customerView').style.display = 'none';
    document.getElementById('providerView').style.display = 'none';
    document.getElementById('adminView').style.display = 'none';
    
    switch(role) {
        case 'customer':
            document.getElementById('customerView').style.display = 'block';
            document.getElementById('currentRoleDisplay').textContent = 'Customer';
            renderMarketplace();
            renderCustomerBookings();
            break;
        case 'provider':
            document.getElementById('providerView').style.display = 'block';
            document.getElementById('currentRoleDisplay').textContent = 'Provider';
            renderProviderDashboard();
            break;
        case 'admin':
            document.getElementById('adminView').style.display = 'block';
            document.getElementById('currentRoleDisplay').textContent = 'Admin';
            renderAdminDashboard();
            break;
    }
    
    showNotification(`Switched to ${role.charAt(0).toUpperCase() + role.slice(1)} view`);
}

function renderMarketplace() {
    const container = document.getElementById('serviceCardsContainer');
    const emptyState = document.getElementById('emptyStateMarketplace');
    
    let filteredProviders = [...appState.providers];
    
    if (appState.filters.category !== 'all') {
        filteredProviders = filteredProviders.filter(p => p.category === appState.filters.category);
    }
    
    if (appState.filters.searchQuery) {
        const query = appState.filters.searchQuery.toLowerCase();
        filteredProviders = filteredProviders.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }
    
    if (appState.filters.priceRange !== 'all') {
        if (appState.filters.priceRange === '0-300') {
            filteredProviders = filteredProviders.filter(p => p.price <= 300);
        } else if (appState.filters.priceRange === '300-500') {
            filteredProviders = filteredProviders.filter(p => p.price > 300 && p.price <= 500);
        } else if (appState.filters.priceRange === '500+') {
            filteredProviders = filteredProviders.filter(p => p.price > 500);
        }
    }
    
    if (appState.filters.rating !== 'all') {
        const minRating = parseFloat(appState.filters.rating);
        filteredProviders = filteredProviders.filter(p => p.rating >= minRating);
    }
    
    if (appState.filters.verified === 'verified') {
        filteredProviders = filteredProviders.filter(p => p.verified);
    }
    
    applySortingToProviders(filteredProviders);
    
    if (filteredProviders.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    document.getElementById('providerCount').textContent = filteredProviders.length;
    
    container.innerHTML = filteredProviders.map(provider => `
        <div class="col-md-6 col-lg-4 mb-4 fade-in">
            <div class="card service-card" style="cursor: pointer;" onclick="showProviderDetails('${provider.id}')">
                <img src="${provider.image}" class="card-img-top" alt="${provider.name}">
                <div class="card-body">
                    <h5 class="card-title">${provider.name}</h5>
                    <span class="category-badge bg-primary text-white">
                        ${getCategoryIcon(provider.category)} ${provider.category}
                    </span>
                    <div class="rating">
                        <i class="bi bi-star-fill"></i> ${provider.rating} 
                        <span class="text-muted">(${provider.reviews} reviews)</span>
                    </div>
                    <p class="text-muted small mb-2">${provider.description}</p>
                    <div class="distance">
                        <i class="bi bi-geo-alt-fill"></i> ${provider.distance} km away
                    </div>
                    <div class="price">₹${provider.price}/hr</div>
                    <div class="d-flex gap-2 align-items-center">
                        <button class="btn btn-primary btn-book flex-grow-1" onclick="event.stopPropagation(); openBookingModal('${provider.id}')">
                            <i class="bi bi-calendar-plus"></i> Book Now
                        </button>
                        ${provider.verified ? '<span class="badge bg-success"><i class="bi bi-patch-check-fill"></i> Verified</span>' : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        'Plumbing': '<i class="bi bi-droplet"></i>',
        'Electrical': '<i class="bi bi-lightning"></i>',
        'Carpentry': '<i class="bi bi-hammer"></i>',
        'Cleaning': '<i class="bi bi-brush"></i>',
        'Painting': '<i class="bi bi-paint-bucket"></i>'
    };
    return icons[category] || '<i class="bi bi-tools"></i>';
}

function showProviderDetails(providerId) {
    const provider = appState.providers.find(p => p.id === providerId);
    if (!provider) return;
    
    const content = document.getElementById('providerDetailsContent');
    content.innerHTML = `
        <div class="provider-detail-header">
            <img src="${provider.image}" alt="${provider.name}" class="provider-detail-img">
            <div class="provider-detail-info">
                <h3>${provider.name}</h3>
                <p class="text-muted mb-2">
                    <i class="bi bi-tag"></i> ${provider.category}
                    ${provider.verified ? '<span class="badge bg-success ms-2"><i class="bi bi-patch-check-fill"></i> Verified</span>' : ''}
                </p>
                <p class="mb-2"><i class="bi bi-geo-alt-fill text-danger"></i> ${provider.distance} km away</p>
                <p class="mb-0">${provider.description}</p>
            </div>
        </div>
        
        <div class="provider-stats">
            <div class="stat-item">
                <div class="stat-value"><i class="bi bi-star-fill text-warning"></i> ${provider.rating}</div>
                <div class="stat-label">Rating</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${provider.reviews}</div>
                <div class="stat-label">Reviews</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">₹${provider.price}</div>
                <div class="stat-label">Per Hour</div>
            </div>
        </div>
        
        <div class="mb-3">
            <h5>Services Offered</h5>
            <ul>
                <li>Professional ${provider.category.toLowerCase()} services</li>
                <li>Emergency support available</li>
                <li>Quality guaranteed work</li>
                <li>Affordable pricing</li>
            </ul>
        </div>
        
        <div class="text-center">
            <button class="btn btn-primary btn-lg" onclick="closeProviderDetailsAndBook('${provider.id}')">
                <i class="bi bi-calendar-plus"></i> Book This Provider
            </button>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('providerDetailsModal'));
    modal.show();
}

function closeProviderDetailsAndBook(providerId) {
    const modal = bootstrap.Modal.getInstance(document.getElementById('providerDetailsModal'));
    modal.hide();
    setTimeout(() => openBookingModal(providerId), 300);
}

function filterByCategory(category) {
    appState.filters.category = category;
    
    document.querySelectorAll('.category-slide').forEach(slide => {
        slide.classList.remove('active');
    });
    event.target.closest('.category-slide').classList.add('active');
    
    renderMarketplace();
}

function slideCategories(direction) {
    const slider = document.getElementById('categorySlider');
    const scrollAmount = 200;
    
    if (direction === 'left') {
        slider.scrollLeft -= scrollAmount;
    } else {
        slider.scrollLeft += scrollAmount;
    }
}

function toggleFilters() {
    const panel = document.getElementById('filtersPanel');
    if (panel.style.display === 'none' || !panel.style.display) {
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}

function applyFilters() {
    appState.filters.priceRange = document.getElementById('priceFilter').value;
    appState.filters.rating = document.getElementById('ratingFilter').value;
    appState.filters.verified = document.getElementById('verifiedFilter').value;
    renderMarketplace();
}

function applySorting() {
    appState.filters.sortBy = document.getElementById('sortFilter').value;
    renderMarketplace();
}

function applySortingToProviders(providers) {
    switch(appState.filters.sortBy) {
        case 'distance':
            providers.sort((a, b) => a.distance - b.distance);
            break;
        case 'rating':
            providers.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            providers.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            providers.sort((a, b) => b.price - a.price);
            break;
        case 'reviews':
            providers.sort((a, b) => b.reviews - a.reviews);
            break;
    }
}

function findNearby() {
    appState.filters.sortBy = 'distance';
    document.getElementById('sortFilter').value = 'distance';
    renderMarketplace();
    showNotification('Showing nearest providers first', 'info');
    scrollToMarketplace();
}

function scrollToMarketplace() {
    document.getElementById('marketplace').scrollIntoView({ behavior: 'smooth' });
}

function toggleMap() {
    const mapSection = document.getElementById('mapSection');
    const toggleText = document.getElementById('mapToggleText');
    
    if (mapSection.style.display === 'none' || !mapSection.style.display) {
        mapSection.style.display = 'block';
        toggleText.textContent = 'Hide Map';
        if (!appState.map) {
            initMap();
        }
    } else {
        mapSection.style.display = 'none'
                toggleText.textContent = 'Show Map';
    }
}

function initMap() {
    if (typeof google === 'undefined') {
        console.log('Google Maps not loaded');
        return;
    }
    
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    appState.map = new google.maps.Map(mapElement, {
        center: appState.userLocation,
        zoom: 13
    });
    
    new google.maps.Marker({
        position: appState.userLocation,
        map: appState.map,
        title: 'Your Location',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
    
    appState.providers.forEach(provider => {
        const lat = appState.userLocation.lat + (Math.random() - 0.5) * 0.05;
        const lng = appState.userLocation.lng + (Math.random() - 0.5) * 0.05;
        
        const marker = new google.maps.Marker({
            position: { lat, lng },
            map: appState.map,
            title: provider.name
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px;">
                    <h6>${provider.name}</h6>
                    <p class="mb-1">${provider.category}</p>
                    <p class="mb-1"><i class="bi bi-star-fill text-warning"></i> ${provider.rating}</p>
                    <p class="mb-0"><strong>₹${provider.price}/hr</strong></p>
                </div>
            `
        });
        
        marker.addListener('click', () => {
            infoWindow.open(appState.map, marker);
        });
        
        appState.markers.push(marker);
    });
}

function searchServices() {
    const query = document.getElementById('searchInput').value;
    appState.filters.searchQuery = query;
    renderMarketplace();
    
    if (query) {
        showNotification(`Searching for "${query}"...`);
    }
}

function openBookingModal(providerId) {
    const provider = appState.providers.find(p => p.id === providerId);
    if (!provider) return;
    
    appState.tempBooking = provider;
    
    document.getElementById('bookingProviderInfo').innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <img src="${provider.image}" alt="${provider.name}" 
                 style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
            <div>
                <h6 class="mb-0">${provider.name}</h6>
                <small class="text-muted">${provider.category} • ₹${provider.price}/hr</small>
            </div>
        </div>
    `;
    
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').setAttribute('min', today);
    document.getElementById('bookingDate').value = '';
    document.getElementById('bookingTime').value = '';
    document.getElementById('bookingNotes').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();
}

function confirmBooking() {
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const notes = document.getElementById('bookingNotes').value;
    
    if (!date || !time) {
        alert('Please select both date and time');
        return;
    }
    
    const bookingId = 'b' + Date.now();
    
    const booking = {
        id: bookingId,
        customerId: appState.currentUser.id,
        providerId: appState.tempBooking.id,
        providerName: appState.tempBooking.name,
        category: appState.tempBooking.category,
        date: date,
        time: time,
        status: 'requested',
        notes: notes,
        price: appState.tempBooking.price,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    appState.bookings.push(booking);
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    modal.hide();
    
    appState.tempBooking = null;
    
    renderCustomerBookings();
    if (appState.currentUser.role === 'provider') {
        renderProviderDashboard();
    }
    if (appState.currentUser.role === 'admin') {
        renderAdminDashboard();
    }
    
    showNotification(`Booking request sent to ${booking.providerName}!`, 'success');
}

function renderCustomerBookings() {
    const container = document.getElementById('bookingsContainer');
    const emptyState = document.getElementById('emptyStateBookings');
    
    if (!container) return;
    
    const customerBookings = appState.bookings.filter(b => b.customerId === appState.currentUser.id);
    
    const badge = document.getElementById('bookingCountBadge');
    if (badge) {
        badge.textContent = customerBookings.length;
    }
    
    if (customerBookings.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    customerBookings.sort((a, b) => b.createdAt - a.createdAt);
    
    container.innerHTML = customerBookings.map(booking => `
        <div class="card booking-card slide-in">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span>
                    <i class="bi bi-person-circle"></i> ${booking.providerName}
                </span>
                <span class="status-badge status-${booking.status}">
                    ${getStatusIcon(booking.status)} ${booking.status.toUpperCase()}
                </span>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <div class="booking-info">
                            <div class="info-item">
                                <i class="bi bi-tag-fill text-primary"></i>
                                <span><strong>Service:</strong> ${booking.category}</span>
                            </div>
                            <div class="info-item">
                                <i class="bi bi-calendar-event text-success"></i>
                                <span><strong>Date:</strong> ${formatDateCorrectly(booking.date)}</span>
                            </div>
                            <div class="info-item">
                                <i class="bi bi-clock text-info"></i>
                                <span><strong>Time:</strong> ${formatTime(booking.time)}</span>
                            </div>
                            <div class="info-item">
                                <i class="bi bi-currency-rupee text-warning"></i>
                                <span><strong>Price:</strong> ₹${booking.price}/hr</span>
                            </div>
                            ${booking.notes ? `
                            <div class="info-item">
                                <i class="bi bi-chat-left-text text-secondary"></i>
                                <span><strong>Notes:</strong> ${booking.notes}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="col-md-4 text-end">
                        ${getBookingActions(booking)}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function getStatusIcon(status) {
    const icons = {
        'requested': '<i class="bi bi-hourglass-split"></i>',
        'confirmed': '<i class="bi bi-check-circle-fill"></i>',
        'completed': '<i class="bi bi-star-fill"></i>',
        'rejected': '<i class="bi bi-x-circle-fill"></i>',
        'rescheduled': '<i class="bi bi-calendar-event"></i>'
    };
    return icons[status] || '';
}

function getBookingActions(booking) {
    if (booking.status === 'confirmed') {
        return `
            <button class="btn btn-success btn-sm mb-2 w-100" onclick="completeBooking('${booking.id}')">
                <i class="bi bi-check-circle"></i> Mark Complete
            </button>
            <small class="text-muted">Booking confirmed!</small>
        `;
    } else if (booking.status === 'requested') {
        return `<small class="text-muted">Waiting for provider response...</small>`;
    } else if (booking.status === 'completed') {
        return `
            <button class="btn btn-outline-primary btn-sm w-100" onclick="rateProvider('${booking.id}')">
                <i class="bi bi-star"></i> Rate Service
            </button>
        `;
    }
    return '';
}

function completeBooking(bookingId) {
    const booking = appState.bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = 'completed';
        booking.updatedAt = new Date();
        renderCustomerBookings();
        showNotification('Booking marked as completed!', 'success');
    }
}

function rateProvider(bookingId) {
    showNotification('Rating feature coming soon!', 'info');
}

function renderProviderDashboard() {
    const providerBookings = appState.bookings.filter(b => 
        ['p001', 'p002', 'p003'].includes(b.providerId)
    );
    
    const pendingCount = providerBookings.filter(b => b.status === 'requested').length;
    const confirmedCount = providerBookings.filter(b => b.status === 'confirmed').length;
    const completedCount = providerBookings.filter(b => b.status === 'completed').length;
    
    document.getElementById('providerPendingCount').textContent = pendingCount;
    document.getElementById('providerConfirmedCount').textContent = confirmedCount;
    document.getElementById('providerCompletedCount').textContent = completedCount;
    
    renderProviderRequests(providerBookings);
}

function renderProviderRequests(bookings) {
    const container = document.getElementById('providerRequestsContainer');
    const emptyState = document.getElementById('emptyStateProvider');
    
    const pendingRequests = bookings.filter(b => b.status === 'requested');
    
    if (pendingRequests.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = pendingRequests.map(booking => `
        <div class="card request-card">
            <div class="card-header">
                <i class="bi bi-person-circle"></i> New Request from Customer
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-7">
                        <h6 class="mb-3">${booking.category} Service</h6>
                        <div class="booking-info">
                            <div class="info-item">
                                <i class="bi bi-calendar-event"></i>
                                <span><strong>Date:</strong> ${formatDate(booking.date)}</span>
                            </div>
                            <div class="info-item">
                                <i class="bi bi-clock"></i>
                                <span><strong>Time:</strong> ${booking.time}</span>
                            </div>
                            <div class="info-item">
                                <i class="bi bi-currency-rupee"></i>
                                <span><strong>Price:</strong> ₹${booking.price}/hr</span>
                            </div>
                            ${booking.notes ? `
                            <div class="info-item">
                                <i class="bi bi-chat-left-text"></i>
                                <span><strong>Notes:</strong> ${booking.notes}</span>
                            </div>
                            ` : ''}
                            <div class="info-item">
                                <i class="bi bi-clock-history"></i>
                                <span><strong>Requested:</strong> ${formatDateTime(booking.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="action-buttons">
                            <button class="btn btn-success" onclick="acceptBooking('${booking.id}')">
                                <i class="bi bi-check-circle"></i> Accept
                            </button>
                            <button class="btn btn-warning" onclick="openRescheduleModal('${booking.id}')">
                                <i class="bi bi-calendar-event"></i> Reschedule
                            </button>
                            <button class="btn btn-danger" onclick="rejectBooking('${booking.id}')">
                                <i class="bi bi-x-circle"></i> Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function acceptBooking(bookingId) {
    const booking = appState.bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = 'confirmed';
        booking.updatedAt = new Date();
        
        renderProviderDashboard();
        renderCustomerBookings();
        if (appState.currentUser.role === 'admin') {
            renderAdminDashboard();
        }
        
        showNotification(`Booking accepted! Customer will be notified.`, 'success');
    }
}

function rejectBooking(bookingId) {
    if (confirm('Are you sure you want to reject this booking?')) {
        const booking = appState.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'rejected';
            booking.updatedAt = new Date();
            renderProviderDashboard();
            showNotification('Booking rejected', 'warning');
        }
    }
}

function openRescheduleModal(bookingId) {
    appState.tempRescheduleId = bookingId;
    
    const booking = appState.bookings.find(b => b.id === bookingId);
    if (booking) {
        document.getElementById('rescheduleDate').value = booking.date;
        document.getElementById('rescheduleTime').value = booking.time;
        document.getElementById('rescheduleReason').value = '';
        
        const modal = new bootstrap.Modal(document.getElementById('rescheduleModal'));
        modal.show();
    }
}

function confirmReschedule() {
    const newDate = document.getElementById('rescheduleDate').value;
    const newTime = document.getElementById('rescheduleTime').value;
    const reason = document.getElementById('rescheduleReason').value;
    
    if (!newDate || !newTime || !reason) {
        alert('Please fill all fields');
        return;
    }
    
    const booking = appState.bookings.find(b => b.id === appState.tempRescheduleId);
    if (booking) {
        booking.date = newDate;
        booking.time = newTime;
        booking.status = 'rescheduled';
        booking.updatedAt = new Date();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('rescheduleModal'));
        modal.hide();
        
        appState.tempRescheduleId = null;
        
        renderProviderDashboard();
        
        showNotification('Booking rescheduled successfully!', 'success');
    }
}

function renderAdminDashboard() {
    const totalBookings = appState.bookings.length;
    const revenue = appState.bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + b.price, 0);
    const activeUsers = new Set(appState.bookings.map(b => b.customerId)).size;
    const activeProviders = appState.providers.filter(p => p.verified).length;
    
    document.getElementById('adminTotalBookings').textContent = totalBookings;
    document.getElementById('adminRevenue').textContent = `₹${revenue.toLocaleString()}`;
    document.getElementById('adminActiveUsers').textContent = activeUsers;
    document.getElementById('adminActiveProviders').textContent = activeProviders;
    
    const requestedCount = appState.bookings.filter(b => b.status === 'requested').length;
    const confirmedCount = appState.bookings.filter(b => b.status === 'confirmed').length;
    const completedCount = appState.bookings.filter(b => b.status === 'completed').length;
    
    document.getElementById('adminRequestedCount').textContent = requestedCount;
    document.getElementById('adminConfirmedCount').textContent = confirmedCount;
    document.getElementById('adminCompletedCount').textContent = completedCount;
    
    renderModerationTable();
}

function renderModerationTable() {
    const tbody = document.getElementById('moderationTableBody');
    
    tbody.innerHTML = appState.providers.map(provider => `
        <tr>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <img src="${provider.image}" alt="${provider.name}" 
                         style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                    <span>${provider.name}</span>
                </div>
            </td>
            <td>${provider.category}</td>
            <td>
                <i class="bi bi-star-fill text-warning"></i> ${provider.rating}
                <small class="text-muted">(${provider.reviews})</small>
            </td>
            <td>
                <span class="badge ${provider.verified ? 'bg-verified' : 'bg-suspended'}">
                    ${provider.verified ? '<i class="bi bi-check-circle"></i> Verified' : '<i class="bi bi-x-circle"></i> Suspended'}
                </span>
            </td>
            <td>
                ${provider.verified ? 
                    `<button class="btn btn-sm btn-danger" onclick="suspendProvider('${provider.id}')">
                        <i class="bi bi-ban"></i> Suspend
                    </button>` :
                    `<button class="btn btn-sm btn-success" onclick="verifyProvider('${provider.id}')">
                        <i class="bi bi-check-circle"></i> Verify
                    </button>`
                }
            </td>
        </tr>
    `).join('');
}

function suspendProvider(providerId) {
    if (confirm('Are you sure you want to suspend this provider?')) {
        const provider = appState.providers.find(p => p.id === providerId);
        if (provider) {
            provider.verified = false;
            renderModerationTable();
            showNotification(`${provider.name} has been suspended`, 'warning');
        }
    }
}

function verifyProvider(providerId) {
    const provider = appState.providers.find(p => p.id === providerId);
    if (provider) {
        provider.verified = true;
        renderModerationTable();
        showNotification(`${provider.name} has been verified`, 'success');
    }
}

function showNotification(message, type = 'info') {
    const toastEl = document.getElementById('notificationToast');
    const toastBody = document.getElementById('toastMessage');
    
    toastBody.textContent = message;
    
    toastEl.className = 'toast';
    if (type === 'success') {
        toastEl.classList.add('bg-success', 'text-white');
    } else if (type === 'warning') {
        toastEl.classList.add('bg-warning');
    } else if (type === 'danger') {
        toastEl.classList.add('bg-danger', 'text-white');
    }
    
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatDateCorrectly(dateString) {
    const parts = dateString.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function formatDateTime(date) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Karigar Application Initialized');
    console.log('📊 System Architecture: Centralized State Management with RBAC');
    
    document.getElementById('authView').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
    
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchServices();
                }
            });
        }
    }, 1000);
    
    console.log('Initial App State:', {
        providers: appState.providers.length,
        bookings: appState.bookings.length,
        users: appState.users.length
    });
    
    console.log('✅ Application ready - Please login to continue');
    console.log('Test credentials: customer@test.com / password');
});