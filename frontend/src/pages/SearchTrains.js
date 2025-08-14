

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { searchTrains } from '../utils/api';

// function SearchTrains() {
//     const [searchParams, setSearchParams] = useState({
//         from: '',
//         to: '',
//         date: '',
//         class: ''
//     });
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     // Station options based on seed data
//     const stationOptions = [
//         'BotToli',
//         'Sholoshahar',
//         'Chittagong University'
//     ];

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSearchParams(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { from, to, date, class: trainClass } = searchParams;
        
//         if (!from || !to || !date || !trainClass) {
//             return toast.error('Please fill all fields');
//         }

//         setLoading(true);
//         try {
//             const response = await searchTrains({ from, to, date, class: trainClass });
            
//             if (response.success) {
//                 const filteredResults = response.data 
//                     ? response.data.filter(train => train.class === trainClass)
//                     : [];
                
//                 setResults(filteredResults);
                
//                 if (filteredResults.length === 0) {
//                     toast.info('No trains found for this route/date/class combination');
//                 }
//             } else {
//                 toast.error(response.message || 'Search failed');
//                 setResults([]);
//             }
//         } catch (err) {
//             console.error('Search error:', err);
//             toast.error('Search failed. Please try again.');
//             setResults([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="search-container">
//             <h1>Search Trains</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>From</label>
//                     <select
//                         name="from"
//                         value={searchParams.from}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select Station</option>
//                         {stationOptions.map(station => (
//                             <option key={`from-${station}`} value={station}>
//                                 {station}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label>To</label>
//                     <select
//                         name="to"
//                         value={searchParams.to}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select Station</option>
//                         {stationOptions.map(station => (
//                             <option key={`to-${station}`} value={station}>
//                                 {station}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className="form-group">
//                     <label>Class</label>
//                     <select
//                         name="class"
//                         value={searchParams.class}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select Class</option>
//                         <option value="AC">AC</option>
//                         <option value="Shovan">Shovan</option>
//                         <option value="Shulov">Shulov</option>
//                         <option value="AC Chair">AC Chair</option>
//                     </select>
//                 </div>

//                 <div className="form-group">
//                     <label>Date</label>
//                     <input
//                         type="date"
//                         name="date"
//                         value={searchParams.date}
//                         onChange={handleChange}
//                         min={new Date().toISOString().split('T')[0]}
//                         required
//                     />
//                 </div>
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Searching...' : 'Search Trains'}
//                 </button>
//             </form>
            
//             {results.length > 0 && (
//                 <div className="results-container">
//                     <h2>Available Trains</h2>
//                     <div className="trains-list">
//                         {results.map(train => (
//                             <div key={train._id} className="train-card">
//                                 <h3>{train.name} ({train.trainNumber}) - {train.class}</h3>
//                                 <p><strong>Route:</strong> {train.from} to {train.to}</p>
//                                 <p><strong>Departure:</strong> {new Date(train.departure).toLocaleString()}</p>
//                                 <p><strong>Arrival:</strong> {new Date(train.arrival).toLocaleString()}</p>
//                                 <p><strong>Available Seats:</strong> {train.seatsAvailable}</p>
//                                 <p><strong>Fare:</strong> ৳{train.fare}</p>
//                                 <button 
//                                     onClick={() => navigate(`/book/${train._id}`)}
//                                     disabled={train.seatsAvailable === 0}
//                                 >
//                                     {train.seatsAvailable === 0 ? 'No Seats Available' : 'Book Now'}
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SearchTrains;














import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { searchTrains } from '../utils/api';

function SearchTrains() {
    const [searchParams, setSearchParams] = useState({
        from: '',
        to: '',
        class: ''
    });
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const stationOptions = [
        'BotToli',
        'Sholoshahar',
        'Chittagong University',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { from, to, class: trainClass } = searchParams;
        
        if (!from || !to || !trainClass) {
            return toast.error('Please fill all fields');
        }

        setLoading(true);
        try {
            const response = await searchTrains({ from, to, class: trainClass });
            
            if (response.success) {
                const filteredResults = response.data 
                    ? response.data.filter(train => train.class === trainClass)
                    : [];
                
                setResults(filteredResults);
                
                if (filteredResults.length === 0) {
                    toast.info('No trains found for this route/class combination');
                }
            } else {
                toast.error(response.message || 'Search failed');
                setResults([]);
            }
        } catch (err) {
            console.error('Search error:', err);
            toast.error('Search failed. Please try again.');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h1> Search Trains</h1>
            
            <div className="search-content">
                <div className="search-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label> From Station</label>
                            <select
                                name="from"
                                value={searchParams.from}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Departure Station</option>
                                {stationOptions.map(station => (
                                    <option key={`from-${station}`} value={station}>
                                        {station}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label> To Station</label>
                            <select
                                name="to"
                                value={searchParams.to}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Destination Station</option>
                                {stationOptions.map(station => (
                                    <option key={`to-${station}`} value={station}>
                                        {station}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label> Travel Class</label>
                            <select
                                name="class"
                                value={searchParams.class}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Travel Class</option>
                                <option value="AC">AC</option>
                                <option value="Shovan">Shovan</option>
                                <option value="Shulov">Shulov</option>
                                <option value="AC Chair">AC Chair</option>
                            </select>
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? ' Searching...' : ' Search Trains'}
                        </button>
                    </form>
                </div>
                
                <div className="search-image-container">
                    {/* Image will be displayed via CSS background */}
                </div>
            </div>
            
            {results.length > 0 && (
                <div className="results-container">
                    <h2> Available Trains</h2>
                    <div className="trains-list">
                        {results.map(train => (
                            <div key={train._id} className="train-card">
                                <h3> {train.name} ({train.trainNumber}) - {train.class}</h3>
                                <p><strong> Route:</strong> {train.from} ➡️ {train.to}</p>
                                <p><strong> Departure:</strong> {train.departure}</p>
                                <p><strong> Arrival:</strong> {train.arrival}</p>
                                <p><strong> Available Seats:</strong> {train.seatsAvailable}</p>
                                <p><strong> Fare:</strong> ৳{train.fare}</p>
                                <button 
                                    onClick={() => navigate(`/book/${train._id}`)}
                                    disabled={train.seatsAvailable === 0}
                                >
                                    {train.seatsAvailable === 0 ? '❌ No Seats Available' : ' Book Now'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchTrains;