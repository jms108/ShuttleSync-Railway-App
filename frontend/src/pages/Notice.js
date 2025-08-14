import React, { useState } from 'react';

function Notice() {
    // Sample notices - in a real app, these would come from an API
    const [notices] = useState([
        {
            id: 1,
            type: 'emergency',
            title: 'Emergency Maintenance Notice',
            content: 'Due to urgent track maintenance work, Train No. 1234 (Dhaka Express) will be delayed by approximately 2 hours on August 15, 2025. Passengers are requested to plan accordingly.',
            date: '2025-08-13',
            priority: 'high',
            validUntil: '2025-08-16'
        },
        {
            id: 2,
            type: 'service',
            title: 'New Route Announcement',
            content: 'We are pleased to announce the introduction of a new express service between Chattogram and Sylhet starting from August 20, 2025. The train will run daily with stops at major stations.',
            date: '2025-08-10',
            priority: 'medium',
            validUntil: '2025-08-25'
        },
        {
            id: 3,
            type: 'general',
            title: 'Festival Season Special Booking',
            content: 'Special advance booking for Eid festival season is now open. Passengers can book tickets up to 60 days in advance for all routes. Early booking is recommended due to high demand.',
            date: '2025-08-05',
            priority: 'medium',
            validUntil: '2025-08-30'
        },
        {
            id: 4,
            type: 'emergency',
            title: 'Weather Alert - Service Disruption',
            content: 'Due to heavy rainfall forecast in the Sylhet region, some trains may experience delays or cancellations from August 14-16, 2025. Passengers are advised to check train status before traveling.',
            date: '2025-08-12',
            priority: 'high',
            validUntil: '2025-08-17'
        },
        {
            id: 5,
            type: 'general',
            title: 'Digital Ticket Validation System',
            content: 'New digital ticket validation system has been implemented across all major stations. Passengers can now show QR codes on mobile devices for faster entry and validation.',
            date: '2025-08-01',
            priority: 'low',
            validUntil: '2025-09-01'
        }
    ]);

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high':
                return '🚨';
            case 'medium':
                return '⚠️';
            default:
                return 'ℹ️';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'emergency':
                return '🚨';
            case 'service':
                return '🚆';
            default:
                return '📢';
        }
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Asia/Dhaka'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const isNoticeActive = (validUntil) => {
        const today = new Date();
        const expiryDate = new Date(validUntil);
        return today <= expiryDate;
    };

    const activeNotices = notices.filter(notice => isNoticeActive(notice.validUntil));
    const sortedNotices = activeNotices.sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(b.date) - new Date(a.date);
    });

    return (
        <div className="notice-container">
            <div className="notice-header">
                <h1>Official Notices & Announcements</h1>
                <p className="notice-subtitle">
                    Stay updated with the latest railway service information and announcements
                </p>
            </div>

            {sortedNotices.length === 0 ? (
                <div className="no-notices">
                    <div className="no-notices-content">
                        <span className="no-notices-icon">📋</span>
                        <h3>No Active Notices</h3>
                        <p>There are currently no active notices or announcements.</p>
                    </div>
                </div>
            ) : (
                <div className="notices-list">
                    {sortedNotices.map(notice => (
                        <div key={notice.id} className={`notice-card priority-${notice.priority}`}>
                            <div className="notice-card-header">
                                <div className="notice-meta">
                                    <span className="notice-type">
                                        {getTypeIcon(notice.type)} {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                                    </span>
                                    <span className="notice-priority">
                                        {getPriorityIcon(notice.priority)} {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} Priority
                                    </span>
                                </div>
                                <div className="notice-date">
                                    Published: {formatDate(notice.date)}
                                </div>
                            </div>
                            
                            <div className="notice-content">
                                <h3 className="notice-title">{notice.title}</h3>
                                <p className="notice-text">{notice.content}</p>
                            </div>

                            <div className="notice-footer">
                                <span className="notice-validity">
                                    Valid until: {formatDate(notice.validUntil)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="notice-info">
                <div className="notice-info-content">
                    <h4>💡 Important Information</h4>
                    <ul>
                        <li>High priority notices require immediate attention</li>
                        <li>Check notices regularly for service updates</li>
                        <li>Contact customer service for any clarifications</li>
                        <li>Emergency notices may affect your travel plans</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Notice;