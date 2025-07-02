import Layout from "./pages/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicePage from "./pages/ServicePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import HelpPage from "./pages/HelpPage.jsx";

import ResultPage from "./pages/ResultPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ElibraryPage from "./pages/ElibraryPage.jsx";
import AdmHome from './pages/Admin/AdmHome.jsx';
import AdmLayout from "./pages/Admin/AdmLayout.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";
import AdmTopBar from "./components/AdmTopBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AdmAbout from "./pages/Admin/AdmAbout.jsx";
import AdmDashboard from "./pages/Admin/AdmDashboard.jsx";
import AdmServices from "./pages/Admin/AdmServices.jsx";
import AdmElibrary from "./pages/Admin/AdmElibrary.jsx";
import AdmSearchPage from "./pages/Admin/AdmSearchPage.jsx";
import AdmAddBook from "./pages/Admin/AdmAddBook.jsx";
import AdmPreviewPage from "./pages/Admin/AdmPreviewPage.jsx";
import AdmDeletePage from "./pages/Admin/AdmDeleteBook.jsx";
import AdmDeletePreview from "./pages/Admin/AdmDeletePreview.jsx";
import AdmSearchPreview from "./pages/Admin/AdmSearchPreview.jsx";
import AdmNotificationPreview from './pages/Admin/AdmNotificationPreview.jsx';
import AdmReturnBook from "./pages/Admin/AdmReturnBook.jsx";
import ReturnServicePage from "./pages/ReturnServicePage.jsx";
import ReturnPreviewPage from "./pages/ReturnPreviewPage.jsx";
import AdmReturnPreview from "./pages/Admin/AdmReturnPreview.jsx";
import AdmBorrowBook from "./pages/Admin/AdmBorrowBook.jsx";
import AdmBorrowPreview from "./pages/Admin/AdmBorrowPreiview.jsx";
import AdmEditPreview from "./pages/Admin/AdmEditPreview.jsx";
import AdmEditPage from "./pages/Admin/AdmEditBook.jsx";
import AdmAddQuestions from "./pages/Admin/AdmAddQuestion.jsx";
import AdmSearchBookOnline from "./pages/Admin/AdmSearchBookOnline.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/Search" element={<SearchPage />} />
          <Route path="/Services" element={<ServicePage />} />
          <Route path="/ReturnServices" element={<ReturnServicePage />} />
          <Route path="/Dashboard" element={<DashboardPage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Help" element={<HelpPage />} />
          <Route path="/ResultPage" element={<ResultPage />} />
          <Route path="/PreviewPage" element={<PreviewPage />} />
          <Route path="/ReturnPreviewPage" element={<ReturnPreviewPage/>} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/Elibrary" element={<ElibraryPage />} />
          <Route path="/AdmTopBar" element={<AdmTopBar />} />
        </Route>
        <Route path="/" element={<ProtectedRoute><AdmLayout /></ProtectedRoute>}>
          <Route index path="/AdmHome" element={<ProtectedRoute><AdmHome /></ProtectedRoute>} />
          <Route index path="/AdmServices" element={<ProtectedRoute><AdmServices /></ProtectedRoute>} />
          <Route index path="/AdmAbout" element={<ProtectedRoute><AdmAbout /></ProtectedRoute>} />
          <Route index path="/AdmElibrary" element={<ProtectedRoute><AdmElibrary /></ProtectedRoute>} />
          <Route index path="/AdmDashboard" element={<ProtectedRoute><AdmDashboard /></ProtectedRoute>} />
          <Route index path="/AdmSearchPage" element={<ProtectedRoute><AdmSearchPage /></ProtectedRoute>} />
          <Route index path="/AdmAddBook" element={<ProtectedRoute><AdmAddBook /></ProtectedRoute>} />
          <Route index path="/AdmPreviewPage" element={<ProtectedRoute><AdmPreviewPage /></ProtectedRoute>} />
          <Route index path="/AdmDeleteBook" element={<ProtectedRoute><AdmDeletePage /></ProtectedRoute>} />
          <Route index path="/AdmDeletePreview" element={<ProtectedRoute><AdmDeletePreview /></ProtectedRoute>} />
          <Route index path="/AdmSearchPreview" element={<ProtectedRoute><AdmSearchPreview /></ProtectedRoute>} />
          <Route index path="/notification/:id" element={<ProtectedRoute><AdmNotificationPreview /></ProtectedRoute>} />
          <Route index path="/AdmReturnBook" element={<ProtectedRoute><AdmReturnBook /></ProtectedRoute>} />
          <Route index path="/AdmReturnPreview" element={<ProtectedRoute><AdmReturnPreview/></ProtectedRoute>} />
          <Route index path="/AdmBorrowBook" element={<ProtectedRoute><AdmBorrowBook/></ProtectedRoute>} />
          <Route index path="/AdmBorrowPreview" element={<ProtectedRoute><AdmBorrowPreview/></ProtectedRoute>} />
          <Route index path="/AdmEditPreview" element={<ProtectedRoute><AdmEditPreview/></ProtectedRoute>} />
          <Route index path="/AdmEditPage" element={<ProtectedRoute><AdmEditPage /></ProtectedRoute>} />
          <Route index path="/AdmAddQuestion" element={<ProtectedRoute><AdmAddQuestions/></ProtectedRoute>} />
          <Route index path="/AdmSearchOnline" element={<ProtectedRoute><AdmSearchBookOnline/></ProtectedRoute>} />
          {/* <Route path="/AdmServices" element={<AdmServices/>}/> */}
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
