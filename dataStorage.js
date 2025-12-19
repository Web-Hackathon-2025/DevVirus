const DataStorage = {
    KEYS: {
        USERS: 'karigar_users',
        PROVIDERS: 'karigar_providers',
        BOOKINGS: 'karigar_bookings',
        CURRENT_USER: 'karigar_current_user'
    },

    init() {
        if (!localStorage.getItem(this.KEYS.USERS)) {
            const defaultUsers = [
                { 
                    email: 'customer@test.com', 
                    password: 'Test@123', 
                    name: 'Test Customer', 
                    role: 'customer',
                    phone: '+1-555-123-4567'
                },
                { 
                    email: 'provider@test.com', 
                    password: 'Test@123', 
                    name: 'Test Provider', 
                    role: 'provider',
                    phone: '+44-20-7946-0958',
                    category: 'Plumbing'
                },
                { 
                    email: 'admin@test.com', 
                    password: 'Admin@123', 
                    name: 'Test Admin', 
                    role: 'admin',
                    phone: '+61-2-9876-5432'
                }
            ];
            this.saveUsers(defaultUsers);
        }
    },

    saveUsers(users) {
        try {
            localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
            return true;
        } catch (e) {
            console.error('Error saving users:', e);
            return false;
        }
    },

    getUsers() {
        try {
            const users = localStorage.getItem(this.KEYS.USERS);
            return users ? JSON.parse(users) : [];
        } catch (e) {
            console.error('Error getting users:', e);
            return [];
        }
    },

    addUser(user) {
        const users = this.getUsers();
        users.push(user);
        return this.saveUsers(users);
    },

    findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    },

    updateUserPassword(email, newPassword) {
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            return this.saveUsers(users);
        }
        return false;
    },

    saveProviders(providers) {
        try {
            localStorage.setItem(this.KEYS.PROVIDERS, JSON.stringify(providers));
            return true;
        } catch (e) {
            console.error('Error saving providers:', e);
            return false;
        }
    },

    getProviders() {
        try {
            const providers = localStorage.getItem(this.KEYS.PROVIDERS);
            return providers ? JSON.parse(providers) : [];
        } catch (e) {
            console.error('Error getting providers:', e);
            return [];
        }
    },

    saveBookings(bookings) {
        try {
            localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(bookings));
            return true;
        } catch (e) {
            console.error('Error saving bookings:', e);
            return false;
        }
    },

    getBookings() {
        try {
            const bookings = localStorage.getItem(this.KEYS.BOOKINGS);
            return bookings ? JSON.parse(bookings) : [];
        } catch (e) {
            console.error('Error getting bookings:', e);
            return [];
        }
    },

    saveCurrentUser(user) {
        try {
            localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
            return true;
        } catch (e) {
            console.error('Error saving current user:', e);
            return false;
        }
    },

    getCurrentUser() {
        try {
            const user = localStorage.getItem(this.KEYS.CURRENT_USER);
            return user ? JSON.parse(user) : null;
        } catch (e) {
            console.error('Error getting current user:', e);
            return null;
        }
    },

    clearCurrentUser() {
        try {
            localStorage.removeItem(this.KEYS.CURRENT_USER);
            return true;
        } catch (e) {
            console.error('Error clearing current user:', e);
            return false;
        }
    },

    clearAll() {
        try {
            Object.values(this.KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (e) {
            console.error('Error clearing storage:', e);
            return false;
        }
    }
};

const Validator = {
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errors = [];

        if (!email || email.trim() === '') {
            errors.push('Email is required');
            return { valid: false, errors };
        }

        if (!emailRegex.test(email)) {
            errors.push('Invalid email format');
        }

        if (email.length > 254) {
            errors.push('Email is too long');
        }

        const localPart = email.split('@')[0];
        if (localPart && localPart.length > 64) {
            errors.push('Email local part is too long');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    },

    validatePassword(password) {
        const errors = [];

        if (!password || password.trim() === '') {
            errors.push('Password is required');
            return { valid: false, errors };
        }

        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }

        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }

        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }

        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }

        if (password.length > 128) {
            errors.push('Password is too long (max 128 characters)');
        }

        return {
            valid: errors.length === 0,
            errors,
            strength: this.getPasswordStrength(password)
        };
    },

    getPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
        if (password.length >= 16) strength++;

        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'medium';
        return 'strong';
    },

    validatePhone(phone) {
        const errors = [];
        const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;

        if (!phone || phone.trim() === '') {
            errors.push('Phone number is required');
            return { valid: false, errors };
        }

        const cleanPhone = phone.replace(/\s+/g, '').replace(/[-().]/g, '');

        if (cleanPhone.length < 7 || cleanPhone.length > 15) {
            errors.push('Phone number must be between 7 and 15 digits');
            return { valid: false, errors, cleanPhone };
        }

        if (!phoneRegex.test(phone)) {
            errors.push('Invalid phone number format');
        }

        return {
            valid: errors.length === 0,
            errors,
            cleanPhone
        };
    },

    validateName(name) {
        const errors = [];

        if (!name || name.trim() === '') {
            errors.push('Name is required');
            return { valid: false, errors };
        }

        if (name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        if (name.length > 100) {
            errors.push('Name is too long');
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            errors.push('Name can only contain letters and spaces');
        }

        return {
            valid: errors.length === 0,
            errors
        };
    },

    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .trim()
            .replace(/[<>]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '');
    }
};

DataStorage.init();
