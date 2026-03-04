"use client";
import React, { useEffect, useState } from "react";
import { Users, User, UsersRound, Download, FileSpreadsheet, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Leaderdashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("/api/admin/dashboard");
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDownloadUsers = () => {
    const url = `/api/admin/export?type=users`;
    const a = document.createElement("a");
    a.href = url;
    a.download = "All_Users.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const handleDownloadEventData = (eventId: string, type: string) => {
    const apiType = type.toLowerCase();
    const url = `/api/admin/export?type=${apiType}&event=${eventId}`;
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${eventId}_${type}_Data.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#1BA0E8]" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 pt-20 font-rajdhani">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-gray-900 text-center">Lead Dashboard</h1>
          <p className="text-gray-500 mt-2 text-center">Overview of all kind of Registartions.</p>
        </div>

      {/* section1 */}
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-[#1BA0E8]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="text-[#1BA0E8] w-6 h-6" />
              <h2 className="text-xl font-bold text-gray-800">Total Overview</h2>
            </div>
            <button 
              onClick={handleDownloadUsers}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-[#1BA0E8]/10 text-[#1BA0E8] rounded-lg hover:bg-[#1BA0E8]/20 transition-colors font-bold text-sm"
            >
              <Download className="w-4 h-4" />
              Master CSV (All Users)
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-4xl font-bold text-gray-900">{data.totalUsers}</p>
            <p className="text-sm text-gray-500 font-medium mt-1">Total registrations</p>
          </div>

          <div className="flex flex-wrap gap-8 border-y border-gray-100 py-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">Registered in atleast one events</p>
              <p className="text-2xl font-bold text-green-600">{data.registeredUsers}</p>
            </div>
            <div className="hidden md:block w-px bg-gray-200"></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Not registered in events</p>
              <p className="text-2xl font-bold text-gray-400">{data.notRegisteredUsers}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 pt-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">From Jadavpur University</p>
              <p className="text-2xl font-bold text-[#1BA0E8]">{data.totalJUUsers}</p>
            </div>
            <div className="hidden md:block w-px bg-gray-200"></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">From Other Colleges</p>
              <p className="text-2xl font-bold text-gray-700">{data.totalOtherUsers}</p>
            </div>
          </div>
        </section>

        {/* section2 */}
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-green-500">
          <div className="flex items-center gap-2 mb-6">
            <User className="text-green-500 w-6 h-6" />
            <h2 className="text-xl font-bold text-gray-800">Solo Event Breakdown</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {data.soloEvents.length === 0 ? (
              <p className="text-gray-500 italic">No solo registrations yet.</p>
            ) : (
              data.soloEvents.map((event: any) => (
                <div 
                  key={event.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-lg hover:border-green-200 hover:bg-green-50/30 transition-colors"
                >
                  <div>
                    <h3 className="font-orbitron font-bold text-lg text-gray-800 tracking-wide">{event.name}</h3>
                    
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2 text-gray-500 font-medium text-sm md:text-base">
                      <p>Total: <span className="text-gray-900 font-bold">{event.totalRegistrations}</span></p>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      <p>JU: <span className="text-[#1BA0E8] font-bold">{event.juCount}</span></p>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      <p>Others: <span className="text-gray-700 font-bold">{event.otherCount}</span></p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDownloadEventData(event.id, 'Solo')}
                    className="cursor-pointer mt-4 sm:mt-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold text-sm w-full sm:w-auto shadow-sm"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Download {event.name} Data
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

       {/* section3 */}
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-purple-500">
          <div className="flex items-center gap-2 mb-6">
            <UsersRound className="text-purple-500 w-6 h-6" />
            <h2 className="text-xl font-bold text-gray-800">Team Event Breakdown</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {data.teamEvents.length === 0 ? (
              <p className="text-gray-500 italic">No team registrations yet.</p>
            ) : (
              data.teamEvents.map((event: any) => (
                <div 
                  key={event.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-gray-50 border border-gray-100 rounded-lg hover:border-purple-200 hover:bg-purple-50/30 transition-colors"
                >
                  <div>
                    <h3 className="font-orbitron font-bold text-lg text-gray-800 tracking-wide">{event.name}</h3>
                    <div className="flex items-center gap-4 mt-1 text-gray-500 font-medium">
                      <p>Total Teams: <span className="text-gray-900 font-bold">{event.totalTeams}</span></p>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                      <p>Total Users: <span className="text-gray-900 font-bold">{event.totalUsers}</span></p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleDownloadEventData(event.id, 'Team')}
                    className="cursor-pointer mt-4 sm:mt-0 flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-semibold text-sm w-full sm:w-auto shadow-sm"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Download {event.name} Data
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}