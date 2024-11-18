import React, { useState } from 'react'
import BusHandle from './BusHandle'

let importedRoutes = [
    { title: "Route 1", number: "aa 123", driver: "Sean Hoover", contact: "+92 030-1234567", status: "parked" },
    { title: "Route 2", number: "bb 234", driver: "Braeden Walls", contact: "+92 030-2345671", status: "parked" },
    { title: "Route 3", number: "cc 345", driver: "Keyla Colon", contact: "+92 030-3456712", status: "parked" },
    { title: "Route 4", number: "dd 456", driver: "Amaya Bean", contact: "+92 030-4567123", status: "parked" },
    { title: "Route 5", number: "ee 567", driver: "Pamela Lara", contact: "+92 030-5671234", status: "parked" },
    { title: "Route 6", number: "ff 678", driver: "Drew Harper", contact: "+92 030-6712345", status: "parked" },
    { title: "Route 7", number: "gg 890", driver: "Zane Stuart", contact: "+92 030-7123456", status: "parked" }
]

const Main = () => {
    const [routes, setRoutes] = useState(importedRoutes)
    
    const handleStatusChange = (title) => {
    
        for (const route of importedRoutes) {
            if (route.title == title) {
                if (route.status == "parked") {
                    route.status = "enroute"
                } else {
                    route.status = "parked"
                }
                setRoutes(importedRoutes)
            }
        }
    }
    // setRoutes(importedRoutes)
    return (
        <div>
            <div className="routes fixed flex flex-col gap-1 w-[30vw] bg-green-600 h-[90vh] overflow-y-scroll">
                {
                    routes.map((route, index) => {
                        return (
                            <BusHandle key={index} route={route} onClick={()=>handleStatusChange(route.title)} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Main
