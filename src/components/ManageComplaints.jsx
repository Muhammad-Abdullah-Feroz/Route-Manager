import React, { useState } from 'react';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BiEdit, BiEditAlt } from 'react-icons/bi';
import { CiFilter } from "react-icons/ci";
import { FaEdit, FaSearch, FaUserEdit } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";
import { FcDeleteRow } from 'react-icons/fc';
import { MdDelete, MdDeleteOutline, MdPendingActions } from 'react-icons/md';
import { RxDot } from 'react-icons/rx';
const ManageComplaint = () => {
	const [complaints, setComplaints] = useState([
		{ id: 1, studentName: 'John Doe', description: 'Bus not arriving on time.', status: 'Pending', date: '2024-11-20' },
		{ id: 2, studentName: 'Jane Smith', description: 'Driver behavior was unprofessional.', status: 'Resolved', date: '2024-11-22' },
		{ id: 3, studentName: 'Ali Khan', description: 'Seats were not clean.', status: 'Pending', date: '2024-11-23' },
		{ id: 4, studentName: 'Sarah Ahmed', description: 'Bus was overcrowded.', status: 'Pending', date: '2024-11-24' },
		{ id: 5, studentName: 'David Lee', description: 'Route was changed without notice.', status: 'Resolved', date: '2024-11-25' },
		{ id: 6, studentName: 'Fatima Iqbal', description: 'Bus driver skipped my stop.', status: 'Pending', date: '2024-11-26' },
		{ id: 7, studentName: 'Sana Khan', description: 'No proper air conditioning in the bus.', status: 'Resolved', date: '2024-11-27' },
		{ id: 8, studentName: 'Usman Tariq', description: 'Late arrival at destination.', status: 'Pending', date: '2024-11-28' },
		{ id: 9, studentName: 'Ayesha Noor', description: 'Unavailability of seats in the bus.', status: 'Resolved', date: '2024-11-29' },
		{ id: 10, studentName: 'Hassan Raza', description: 'Bus was too noisy due to loud music.', status: 'Pending', date: '2024-11-30' }
	  ]
	  );

	const [selectedComplaint, setSelectedComplaint] = useState(null);
	const [filter, setFilter] = useState('All');
	const [search, setSearch] = useState('');

	const handleEdit = (id) => {
		const complaint = complaints.find((complaint) => complaint.id === id);
		setSelectedComplaint(complaint);
	};

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this complaint?')) {
			setComplaints(complaints.filter((complaint) => complaint.id !== id));
		}
	};

	const handleSave = (updatedComplaint) => {
		setComplaints(complaints.map((complaint) =>
			complaint.id === updatedComplaint.id ? updatedComplaint : complaint
		));
		setSelectedComplaint(null);
	};

	const handleBack = () => {
		setSelectedComplaint(null);
	};

	const filteredComplaints = complaints
		.filter((complaint) => (filter === 'All' || complaint.status === filter))
		.filter((complaint) => complaint.description.toLowerCase().includes(search.toLowerCase()));

	return (
		<div className="p-8 bg-gray-100">
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Manage Complaints</h2>

				{selectedComplaint ? (
					<EditComplaint complaint={selectedComplaint} onSave={handleSave} onBack={handleBack} />
				) : (
					<div>
						<div className=" flex justify-between mb-4">
							<div className='relative w-1/3'>

							<input
								type="text"
								placeholder="Search complaints..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="p-2 border outline-none font-semibold text-gray-500 border-gray-300 focus:ring-2 focus:ring-gray-100 rounded w-full"
								/>
								<span className='absolute right-[11px] top-[11px]'> <FaSearch className='text-gray-300 h-5 w-5 '/></span>
								</div>
							<div className='flex items-center gap-2'>
							<p className='text-md font-semibold flex items-center gap-1'><CiFilter/>filter </p>
							
							<select
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
								className="p-2 border border-gray-300 focus:ring-2 focus:ring-gray-100 cursor-pointer outline-none rounded"
								>
								<option value="All">All</option>
								<option value="Pending">Pending</option>
								<option value="Resolved">Resolved</option>
							</select>
								</div>
						</div>
						<table className="w-full table-auto border-collapse">
							<thead className="text-lg">
								<tr className="bg-blue-600 text-white">
									<th className="py-3 px-4 text-center">Complaint ID</th>
									<th className="py-3 px-4 text-center">Student Name</th>
									<th className="py-3 px-4 text-center">Description</th>
									<th className="py-3 px-4 text-center">Status</th>
									<th className="py-3 px-4 text-center">Date</th>
									<th className="py-3 px-4 text-center">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredComplaints.map((complaint, index) => (
									<tr
										key={complaint.id}
										className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}
									>
										<td className="py-3 px-4 text-center">{complaint.id}</td>
										<td className="py-3 px-4 ">{complaint.studentName}</td>
										<td className="py-3 px-4 ">{complaint.description}</td>
										<td className="py-3 px-4 text-center">{complaint.status.toLowerCase()=='pending'?
											<span class="bg-red-100 text-red-900 text-xs font-medium me-2 px-2  py-0.5 rounded  border border-red-800 flex gap-1 items-center"><MdPendingActions     />pending</span>:<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2 py-0.5 rounded border border-blue-800 flex gap-1 items-center"><AiOutlineFileDone />resolved</span>}</td>
										<td className="py-3 px-4 text-center">{complaint.date}</td>
										<td className="py-3 px-4 text-center flex justify-center space-x-2">
											<button
												onClick={() => handleEdit(complaint.id)}
												className="bg-yellow-500 flex gap-1 items-center text-white py-2 px-4 rounded hover:bg-yellow-400 transition duration-300"
											>
												Edit <BiEditAlt className='text-white'/>
											</button>
											<button
												onClick={() => handleDelete(complaint.id)}
												className="bg-red-500 flex gap-1 items-center text-white py-2 px-4 rounded hover:bg-red-400 transition duration-300"
											>
												Delete <MdDeleteOutline className='text-white'/>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>

					</div>
				)}
			</div>
		</div>
	);
};

const EditComplaint = ({ complaint, onSave, onBack }) => {
	const [updatedComplaint, setUpdatedComplaint] = useState({ ...complaint });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedComplaint((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(updatedComplaint);
	};

	return (
		<div>
			<h3 className="text-xl font-semibold mb-4">Edit Complaint</h3>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block mb-2 font-medium">Description</label>
					<textarea
						name="description"
						value={updatedComplaint.description}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2 font-medium">Status</label>
					<select
						name="status"
						value={updatedComplaint.status}
						onChange={handleChange}
						className="w-full p-2 border border-gray-300 rounded"
					>
						<option value="Pending">Pending</option>
						<option value="Resolved">Resolved</option>
					</select>
				</div>
				<div className="flex justify-between space-x-4">
					<button
						type="button"
						onClick={onBack}
						className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
					>
						Back
					</button>
					<button
						type="submit"
						className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default ManageComplaint;
