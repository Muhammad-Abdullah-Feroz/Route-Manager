
import PropTypes from "prop-types";
import { GiPathDistance } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { motion } from "framer-motion";

const RouteModal = ({ showModal, onClose, routes }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
      {/* Modal Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 transform overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Route Information</h2>
          <button onClick={onClose}>
            <AiOutlineClose className="text-gray-600 text-2xl" />
          </button>
        </div>

        {/* Route Information */}
        <div className="space-y-4">
          {routes && routes.length > 0 ? (
            routes.map((route,index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center bg-gray-100 rounded-lg p-4 shadow"
              >
                <GiPathDistance className="text-blue-500 text-3xl mr-4" />
                <p className="text-gray-700 font-medium">{route.name}</p>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center text-center bg-gray-100 rounded-lg p-6"
            >
              <BiErrorCircle className="text-red-500 text-4xl mb-3" />
              <p className="text-gray-700 font-medium text-lg">No Data Found</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
RouteModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RouteModal;

