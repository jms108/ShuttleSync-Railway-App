const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Request failed');
    }
    return data;
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return handleResponse(response);
};

export const loginUser = async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return handleResponse(response);
};

// export const searchTrains = async (searchParams) => {
//     const query = new URLSearchParams(searchParams).toString();
//     const response = await fetch(`${API_BASE_URL}/trains/search?${query}`);
//     return handleResponse(response);
// };

export const searchTrains = async (searchParams) => {
    const query = new URLSearchParams(searchParams).toString();
    const response = await fetch(`${API_BASE_URL}/trains/search?${query}`);
    return handleResponse(response);
};



export const getTrainDetails = async (trainId) => {
    const response = await fetch(`${API_BASE_URL}/trains/${trainId}`);
    return handleResponse(response);
};

export const createBooking = async (bookingData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
    });
    return handleResponse(response);
};

export const getBookings = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/bookings`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return handleResponse(response);
};

export const initPayment = async (paymentData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/payments/init`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    });
    return handleResponse(response);
};


export const validatePayment = async (bookingId, validationData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/payments/validate/${bookingId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(validationData)
    });
    return handleResponse(response);
};