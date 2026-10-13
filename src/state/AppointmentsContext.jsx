import { createContext, useContext, useReducer } from 'react'

const AppointmentsContext = createContext(null)

const initialAppointments = [
  { id: 'APT-1048', patient: 'Olivia Martin', initials: 'OM', doctor: 'Dr. Maya Patel', specialty: 'Cardiology', date: '2026-10-13', time: '09:00 AM', status: 'Confirmed', color: 'lavender' },
  { id: 'APT-1049', patient: 'Noah Williams', initials: 'NW', doctor: 'Dr. Ethan Brooks', specialty: 'Dermatology', date: '2026-10-13', time: '09:30 AM', status: 'Checked in', color: 'mint' },
  { id: 'APT-1050', patient: 'Ava Thompson', initials: 'AT', doctor: 'Dr. Sofia Chen', specialty: 'Neurology', date: '2026-10-13', time: '10:15 AM', status: 'Confirmed', color: 'peach' },
  { id: 'APT-1051', patient: 'Liam Johnson', initials: 'LJ', doctor: 'Dr. Maya Patel', specialty: 'Cardiology', date: '2026-10-13', time: '11:00 AM', status: 'Waiting', color: 'blue' },
  { id: 'APT-1052', patient: 'Isabella Davis', initials: 'ID', doctor: 'Dr. Lucas Reed', specialty: 'Orthopedics', date: '2026-10-13', time: '11:30 AM', status: 'Confirmed', color: 'rose' },
  { id: 'APT-1053', patient: 'James Wilson', initials: 'JW', doctor: 'Dr. Sofia Chen', specialty: 'Neurology', date: '2026-10-13', time: '12:00 PM', status: 'Cancelled', color: 'sand' },
  { id: 'APT-1054', patient: 'Mia Garcia', initials: 'MG', doctor: 'Dr. Lucas Reed', specialty: 'Orthopedics', date: '2026-10-13', time: '01:30 PM', status: 'Confirmed', color: 'mint' },
]

function reducer(state, action) {
  switch (action.type) {
    case 'set-status':
      return state.map(item => item.id === action.id ? { ...item, status: action.status } : item)
    case 'add':
      return [action.appointment, ...state]
    default:
      return state
  }
}

export function AppointmentsProvider({ children }) {
  const [appointments, dispatch] = useReducer(reducer, initialAppointments)
  return <AppointmentsContext.Provider value={{ appointments, dispatch }}>
    {children}
  </AppointmentsContext.Provider>
}

export function useAppointments() {
  const context = useContext(AppointmentsContext)
  if (!context) throw new Error('useAppointments must be used inside AppointmentsProvider')
  return context
}
