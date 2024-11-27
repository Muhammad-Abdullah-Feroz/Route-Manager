import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminPanelWithLogin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const adminCredentials = { username: 'admin', password: 'admin123' };

    // Sample route data (could be dynamic from an API)
    const routes = [
        {
            id: 1,
            route_no: 'Route 1',
            vehicle_no: '123',
            driver: 'John Doe', // Driver's name
            stops: [
                { name: 'Stop 1', latitude: 33.6844, longitude: 73.0479 },
                { name: 'Stop 2', latitude: 33.6845, longitude: 73.0480 },
            ],
        },
        {
            id: 2,
            route_no: 'Route 2',
            vehicle_no: '456',
            driver: 'Jane Smith',
            stops: [
                { name: 'Stop A', latitude: 33.6850, longitude: 73.0490 },
                { name: 'Stop B', latitude: 33.6851, longitude: 73.0491 },
            ],
        },
        {
            id: 3,
            route_no: 'Route 3',
            vehicle_no: '789',
            driver: 'Mike Johnson',
            stops: [
                { name: 'Stop X', latitude: 33.6860, longitude: 73.0500 },
                { name: 'Stop Y', latitude: 33.6861, longitude: 73.0501 },
            ],
        },
        {
            id: 4,
            route_no: 'Route 4',
            vehicle_no: '1011',
            driver: 'Sarah Lee',
            stops: [
                { name: 'Stop Alpha', latitude: 33.6870, longitude: 73.0510 },
                { name: 'Stop Beta', latitude: 33.6871, longitude: 73.0511 },
            ],
        },
        {
            id: 5,
            route_no: 'Route 5',
            vehicle_no: '1213',
            driver: 'Chris Brown',
            stops: [
                { name: 'Stop 1A', latitude: 33.6880, longitude: 73.0520 },
                { name: 'Stop 2A', latitude: 33.6881, longitude: 73.0521 },
            ],
        },
        {
            id: 6,
            route_no: 'Route 6',
            vehicle_no: '1415',
            driver: 'Emma Wilson',
            stops: [
                { name: 'Stop Z', latitude: 33.6890, longitude: 73.0530 },
                { name: 'Stop W', latitude: 33.6891, longitude: 73.0531 },
            ],
        },
        {
            id: 7,
            route_no: 'Route 7',
            vehicle_no: '1617',
            driver: 'Lucas Green',
            stops: [
                { name: 'Stop 1B', latitude: 33.6900, longitude: 73.0540 },
                { name: 'Stop 2B', latitude: 33.6901, longitude: 73.0541 },
            ],
        },
        {
            id: 8,
            route_no: 'Route 8',
            vehicle_no: '1819',
            driver: 'Olivia Black',
            stops: [
                { name: 'Stop 1C', latitude: 33.6910, longitude: 73.0550 },
                { name: 'Stop 2C', latitude: 33.6911, longitude: 73.0551 },
            ],
        },
        {
            id: 9,
            route_no: 'Route 9',
            vehicle_no: '2021',
            driver: 'Ethan Davis',
            stops: [
                { name: 'Stop 3', latitude: 33.6920, longitude: 73.0560 },
                { name: 'Stop 4', latitude: 33.6921, longitude: 73.0561 },
            ],
        },
        {
            id: 10,
            route_no: 'Route 10',
            vehicle_no: '2223',
            driver: 'Sophia Taylor',
            stops: [
                { name: 'Stop 5', latitude: 33.6930, longitude: 73.0570 },
                { name: 'Stop 6', latitude: 33.6931, longitude: 73.0571 },
            ],
        },
    ];
    

    const onSubmit = (data) => {
        if (data.username === adminCredentials.username && data.password === adminCredentials.password) {
            setIsAuthenticated(true);
            setShowModal(false);
            // navigate('/admin/dashboard'); // Navigate to the admin dashboard after successful login
        } else {
            setErrorMessage('Invalid username or password. Please try again.');
            reset(); // Reset form fields after incorrect login attempt
        }
    };

    return (
        <div className="admin-container">
            {/* Popup Modal */}
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

            {/* Admin Panel Content */}
            {isAuthenticated && (
                <div className="p-8 bg-gray-100 h-screen overflow-y-scroll">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Route Management</h2>
                        <NavLink to="/admin/add-route">
                            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 mb-6">
                                Add New Route
                            </button>
                        </NavLink>
                        <table className="w-full table-auto">
                            <thead className="text-lg">
                                <tr className="bg-blue-600 text-white">
                                    <th className="py-3 px-4 text-center">Route #</th>
                                    <th className="py-3 px-4 text-center">Driver Name</th>
                                    <th className="py-3 px-4 text-center">Bus #</th>
                                    <th className="py-3 px-4 text-center">Stops</th>
                                    <th className="py-3 px-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {routes.map((route, index) => (
                                    <tr
                                        key={route.id}
                                        className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
                                    >
                                        <td className="py-3 px-4 text-center mx-auto">{route.route_no}</td>
                                        <td className="py-3 px-4 text-center">{route.driver}</td>
                                        <td className="py-3 px-4 text-center">{route.vehicle_no}</td>
                                        <td className="py-3 px-4 text-center">
                                            {route.stops.length > 0
                                                ? `${route.stops[0].name} - ${route.stops[route.stops.length - 1].name}`
                                                : 'No stops available'}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <NavLink
                                                to={`/admin/edit/${route.id}`}
                                                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
                                            >
                                                Edit
                                            </NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanelWithLogin;
