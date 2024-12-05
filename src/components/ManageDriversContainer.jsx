import React, { useEffect, useState } from 'react';
import ManageDrivers from './ManageDrivers';
import AddDriver from './AddDriver';
import EditDriver from './EditDriver';
import axios from 'axios';

const ManageDriversContainer = () => {
    const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'edit'
    const [editingDriver, setEditingDriver] = useState(null); // Holds driver data for editing
    const [drivers, setDrivers] = useState([]); // Holds list of drivers
    const [isLoading, setIsLoading] = useState(false);

    const fetchData=async()=>{
        setIsLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/driver`);
            console.log(response);
            
            if(response.data.success){
                
                setDrivers(response.data.data);
            }
            setIsLoading(false);
            // setDrivers(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {   
      fetchData();
    }, []);

    const handleAddDriver = () => {
        setCurrentView('add');
    };

    const handleEditDriver = (driver) => {
        setEditingDriver(driver);
        setCurrentView('edit');
    };

    const handleBackToList = () => {
        setCurrentView('list');
        fetchData()
        setEditingDriver(null); // Clear editing data
    };

    return (
        <div className="py-8 bg-gray-100">
            {currentView === 'list' && (
                <ManageDrivers isLoading={isLoading} drivers={drivers} onAddDriver={handleAddDriver} onEditDriver={handleEditDriver}  FetchData={fetchData}/>
            )}
            {currentView === 'add' && <AddDriver onBack={handleBackToList} />}
            {currentView === 'edit' && editingDriver && (
                <EditDriver driver={editingDriver} onBack={handleBackToList} />
            )}
        </div>
    );
};

export default ManageDriversContainer;
