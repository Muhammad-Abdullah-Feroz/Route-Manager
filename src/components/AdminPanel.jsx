import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import ManageRoutes from './ManageRoutes'; // Your ManageRoutes component
import ManageDrivers from './ManageDrivers'; // Your ManageDrivers component
import ManageStops from './ManageStops'; // Your ManageStops component
import ManageComplaints from './ManageComplaints'; // Your ManageComplaints component

const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const [selectedView, setSelectedView] = useState(''); // state to track selected view
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const adminCredentials = { username: 'admin', password: 'password' };

    const onSubmit = (data) => {
        if (data.username === adminCredentials.username && data.password === adminCredentials.password) {
            setIsAuthenticated(true);
            setShowModal(false);
        } else {
            setErrorMessage('Invalid username or password. Please try again.');
            reset();
        }
    };

    // Function to handle sidebar item click and change selected view
    const handleSidebarClick = (view) => {
        setSelectedView(view);
    };

    return (
        <div className="admin-panel">
            {/* Login Modal */}
            {showModal && (
                <div className="popup-modal fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="modal-content bg-white p-6 rounded-md shadow-lg w-96">
                        <h2 className="text-2xl mb-4 font-semibold text-center">Admin Login</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    {...register("username", { required: "Username is required" })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", { required: "Password is required" })}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                            <div className="flex justify-center">
                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Admin Panel */}
            {isAuthenticated && (
                <div className="h-screen flex flex-col bg-gray-100">
                    {/* Navbar */}
                    <header className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">Admin Panel</h1>
                        <nav className="flex space-x-4">
                            <button
                                className="bg-white font-bold text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105" 
                                onClick={() => navigate("/")}
                            >
                                Logout
                            </button>
                        </nav>
                    </header>

                    {/* Main Content */}
                    <div className="flex flex-1">
                        {/* Sidebar */}
                        <aside className="w-64 bg-gradient-to-b from-blue-800 via-blue-600 to-blue-600 text-white h-full">
                            <nav className="mt-4">
                                <ul>
                                    <li onClick={() => handleSidebarClick('manage-routes')} className="cursor-pointer p-3 hover:bg-blue-700 border-b-2 border-gray-500">
                                        <button className="block">
                                            Manage Routes
                                        </button>
                                    </li>
                                    <li onClick={() => handleSidebarClick('manage-drivers')} className="cursor-pointer p-3 hover:bg-blue-700 border-b-2 border-gray-500">
                                        <button className="block">
                                            Manage Drivers
                                        </button>
                                    </li>
                                    <li onClick={() => handleSidebarClick('manage-stops')} className="cursor-pointer p-3 hover:bg-blue-700 border-b-2 border-gray-500">
                                        <button className="block">
                                            Manage Stops
                                        </button>
                                    </li>
                                    <li onClick={() => handleSidebarClick('manage-complaints')} className="cursor-pointer p-3 hover:bg-blue-700 border-b-2 border-gray-500">
                                        <button className="block">
                                            Manage Complaints
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </aside>

                        {/* Dashboard Content */}
                        <main className="flex-1 p-6 overflow-y-auto">
                            {/* Conditionally render content based on selected view */}
                            {selectedView === 'manage-routes' && <ManageRoutes />}
                            {selectedView === 'manage-drivers' && <ManageDrivers />}
                            {selectedView === 'manage-stops' && <ManageStops />}
                            {selectedView === 'manage-complaints' && <ManageComplaints />}
                        </main>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
