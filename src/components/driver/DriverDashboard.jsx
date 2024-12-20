
import Chatbox from '../chatbox'
import GPSSharing from '../GPS/GPSSharing'

const DriverDashboard = ({driverData}) => {
  
console.log("Driver Dashboard",driverData);

  return (
    <div>

<div className="w-full h-90vh flex flex-row">
      <GPSSharing/>

</div>
      <div className="z-50">

      <Chatbox userData={driverData} refer={'uet_drivers'}/>
      </div>
    </div>
  )
}

export default DriverDashboard
