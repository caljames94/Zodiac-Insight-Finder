// Data structures for zodiac signs and horoscopes
const zodiacSigns = [
    { name: 'Aries', startDate: { month: 3, day: 21 }, endDate: { month: 4, day: 19 } },
    { name: 'Taurus', startDate: { month: 4, day: 20 }, endDate: { month: 5, day: 20 } },
    { name: 'Gemini', startDate: { month: 5, day: 21 }, endDate: { month: 6, day: 20 } },
    { name: 'Cancer', startDate: { month: 6, day: 21 }, endDate: { month: 7, day: 22 } },
    { name: 'Leo', startDate: { month: 7, day: 23 }, endDate: { month: 8, day: 22 } },
    { name: 'Virgo', startDate: { month: 8, day: 23 }, endDate: { month: 9, day: 22 } },
    { name: 'Libra', startDate: { month: 9, day: 23 }, endDate: { month: 10, day: 22 } },
    { name: 'Scorpio', startDate: { month: 10, day: 23 }, endDate: { month: 11, day: 21 } },
    { name: 'Sagittarius', startDate: { month: 11, day: 22 }, endDate: { month: 12, day: 21 } },
    { name: 'Capricorn', startDate: { month: 12, day: 22 }, endDate: { month: 1, day: 19 } },
    { name: 'Aquarius', startDate: { month: 1, day: 20 }, endDate: { month: 2, day: 18 } },
    { name: 'Pisces', startDate: { month: 2, day: 19 }, endDate: { month: 3, day: 20 } }
];
const horoscopes = {
    Aries: "Today is your lucky day! You'll find opportunity in unexpected places.",
    Taurus: "Your perseverance will pay off. Stay focused on your goals.",
    Gemini: "Communication is key today. Express yourself clearly and listen to others.",
    Cancer: "Trust your intuition. It will guide you through any challenges.",
    Leo: "Your creativity is at its peak. Use it to solve a long-standing problem.",
    Virgo: "Pay attention to details, but don't lose sight of the big picture.",
    Libra: "Balance is crucial. Take time for both work and relaxation.",
    Scorpio: "Your determination is your strength. Use it wisely to achieve your goals.",
    Sagittarius: "Adventure calls! Be open to new experiences and opportunities.",
    Capricorn: "Your hard work is about to pay off. Stay the course and remain patient.",
    Aquarius: "Your innovative ideas will shine today. Don't be afraid to share them.",
    Pisces: "Trust your instincts and follow your heart. It knows the way."
};
// Validation function
function validateInput(day, month) {
    day = parseInt(day);
    month = parseInt(month);
    
    if (isNaN(day) || isNaN(month)) {
        return false;
    }
    
    if (month < 1 || month > 12) {
        return false;
    }
    
    const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }
    
    return true;
}
// Get zodiac sign based on date
function getZodiacSign(day, month) {
    const date = new Date(new Date().getFullYear(), month - 1, day);
    
    for (let sign of zodiacSigns) {
        const start = new Date(date.getFullYear(), sign.startDate.month - 1, sign.startDate.day);
        const end = new Date(date.getFullYear(), sign.endDate.month - 1, sign.endDate.day);
        
        // Adjust for Capricorn which spans across years
        if (sign.name === 'Capricorn') {
            if (date >= start || date <= end) {
                return sign.name;
            }
        } else if (date >= start && date <= end) {
            return sign.name;
        }
    }
}
// Get horoscope for a sign
function getHoroscope(sign) {
    return horoscopes[sign] || "Horoscope not available.";
}
// Display horoscope in modal
function displayHoroscope(sign, horoscope) {
    const modalTitle = document.getElementById('horoscopeModalLabel');
    const modalBody = document.getElementById('horoscopeModalBody');
    
    modalTitle.textContent = `Your Zodiac Sign: ${sign}`;
    modalBody.textContent = horoscope;
    // Manually show the modal
    const modalElement = document.getElementById('horoscopeModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}
// Local storage functions
function saveToLocalStorage(day, month) {
    localStorage.setItem('horoscopeBirthday', JSON.stringify({ day, month }));
}
function loadFromLocalStorage() {
    const savedDate = localStorage.getItem('horoscopeBirthday');
    return savedDate ? JSON.parse(savedDate) : null;
}
// Initialize app
function initializeApp() {
    // Set up event listeners
    document.getElementById('dateForm').addEventListener('submit', handleSubmit);
    
    // Load saved date from localStorage
    const savedDate = loadFromLocalStorage();
    if (savedDate) {
        document.getElementById('dayInput').value = savedDate.day;
        document.getElementById('monthInput').value = savedDate.month;
    }
}
// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    const day = document.getElementById('dayInput').value;
    const month = document.getElementById('monthInput').value;
    
    if (validateInput(day, month)) {
        const sign = getZodiacSign(parseInt(day), parseInt(month));
        const horoscope = getHoroscope(sign);
        displayHoroscope(sign, horoscope);
        saveToLocalStorage(day, month);
    } else {
        alert('Please enter a valid date.');
    }
}
// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);