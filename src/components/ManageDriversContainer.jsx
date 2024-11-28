import React, { useState } from 'react';
import ManageDrivers from './ManageDrivers';
import AddDriver from './AddDriver';
import EditDriver from './EditDriver';

const ManageDriversContainer = () => {
    const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit'
    const [editingDriver, setEditingDriver] = useState(null); // Holds driver data for editing

    const handleAddDriver = () => {
        setCurrentView('add');
    };

    const handleEditDriver = (driver) => {
        setEditingDriver(driver);
        setCurrentView('edit');
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setEditingDriver(null); // Clear editing data
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {currentView === 'list' && (
                <ManageDrivers onAddDriver={handleAddDriver} onEditDriver={handleEditDriver} />
            )}
            {currentView === 'add' && <AddDriver onBack={handleBackToList} />}
            {currentView === 'edit' && editingDriver && (
                <EditDriver driver={editingDriver} onBack={handleBackToList} />
            )}
        </div>
    );
};

export default ManageDriversContainer;
