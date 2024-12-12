import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Page404 from './pages/Page404'
import LogIn from './pages/Account/LogIn'
import Dashboard from './pages/Dashboard/Dashboard'

import React, { useEffect, useState } from 'react'
import Edit from './pages/Dashboard/Survey/SurveyEditor'
import Preview from './pages/Dashboard/Survey/Preview'
import Register from './pages/Account/Register'
import Publish from './pages/Dashboard/Survey/Publish'
import Users from './pages/Users'
import { Toaster } from 'react-hot-toast'
import Results from './pages/Dashboard/Survey/Results'
import VerifyAccount from './pages/Account/VerifyAccount'
import FillData from './pages/Account/FillData'
import Contribution from './pages/Dashboard/Contribution'
import MyPoin from './pages/Dashboard/MyPoin'
import Profile from './pages/Account/Profile'
import Login from './pages/TestingLoginSession'
import UserProfile from './pages/TestingUserSession'
import Home from './pages/Dashboard/Home'
import QRCode from './pages/QRMFA'
import Survey from './pages/Dashboard/MySurvey'
import FileUpload from './pages/TestingUploadImage'

const App = () => {
	return (
		<Router>
			<Content />
		</Router>
	)
}

const Content = () => {
	return (
		<div>
			<Toaster />

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LogIn />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/register/:encodedId/verify-account"
					element={<VerifyAccount />}
				/>
				<Route path="/register/:encodedId/fill-data" element={<FillData />} />

				<Route path="/dashboard" element={<Dashboard />}>
					<Route path="home" element={<Home />} />
					<Route path="survey" element={<Survey />} />
					<Route path="contribution" element={<Contribution />} />
					<Route path="my-poin" element={<MyPoin />} />
					<Route path="profile" element={<Profile />} />
				</Route>

				<Route
					path="/dashboard/survey/edit/:id"
					element={<Edit onEdit={true} />}
				/>
				<Route
					path="/dashboard/survey/preview/:id"
					element={<Edit onEdit={false} />}
				/>
				<Route
					path="/dashboard/survey/publish/:id"
					element={<Edit onEdit={false} />}
				/>
				<Route
					path="/dashboard/survey/results/:id"
					element={<Edit onEdit={false} />}
				/>

				<Route path="/db/users" element={<Users />} />

				<Route path="/testing-login" element={<Login />} />
				<Route path="/testing-user" element={<UserProfile />} />
				<Route path="/testing-mfa" element={<QRCode />} />
				<Route path="/testing-upimage" element={<FileUpload />} />
				<Route path="*" element={<Page404 />} />
			</Routes>
			<style>
				{`
        /* Style untuk scrollbar */
        ::-webkit-scrollbar {
          width: 8px; /* Lebar scrollbar */
        }

        /* Track scrollbar */
        ::-webkit-scrollbar-track {
          border-radius: 10px; /* Border radius untuk track */
        }

        /* Handle scrollbar */
        ::-webkit-scrollbar-thumb {
          background-color: #888; /* Warna handle */
          border-radius: 10px; /* Border radius untuk handle */
        }

        /* Ketika hover pada handle */
        ::-webkit-scrollbar-thumb:hover {
          background-color: #555; /* Warna handle saat hover */
        }
        `}
			</style>
		</div>
	)
}

export default App
