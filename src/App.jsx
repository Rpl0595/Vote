import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useVoting } from './hooks/useVoting';
import Step1VoterInfo from './components/Step1VoterInfo';
import Step2Voting from './components/Step2Voting';
import Step3Review from './components/Step3Review';
import SuccessPage from './components/SuccessPage';

function App() {
  const [employees, setEmployees] = useState([]);
  const [votedNames, setVotedNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { step, setStep, voter, setVoter, votes, updateVote, resetVotes } = useVoting();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      // Prioritas: .env -> URL Langsung (untuk GitHub Pages)
      const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwYl9cr1DGiBVjTG2aK8OWGjyKFMzpHuVpEP2fPgUi_DI-3nNVffHaHv5Qq__FcIBck9g/exec';
      
      if (!url) {
        setError('URL Google Script belum diatur');
        setLoading(false);
        return;
      }

      const response = await axios.get(url);
      console.log('API Response:', response.data);
      if (response.data && response.data.status === 'success') {
        setEmployees(response.data.data);
        setVotedNames(response.data.votedNames || []);
      } else {
        setError('Format data API tidak sesuai. Pastikan Sheet "Karyawan" sudah ada.');
      }
    } catch (err) {
      console.error('Fetch error details:', err);
      setError('Gagal memuat data. Pastikan Script sudah di-deploy sebagai "Anyone" dan URL sudah benar.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwYl9cr1DGiBVjTG2aK8OWGjyKFMzpHuVpEP2fPgUi_DI-3nNVffHaHv5Qq__FcIBck9g/exec';
      // Mengirim sebagai text/plain untuk menghindari CORS preflight dengan Google Apps Script
      const response = await axios.post(url, JSON.stringify({
        namaVoter: voter.name,
        ...votes,
      }), {
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      });

      if (response.data && response.data.status === 'success') {
        setSubmitted(true);
        resetVotes();
        // Segarkan daftar votedNames setelah submit
        fetchEmployees();
      } else {
        setError('Gagal menyimpan voting: ' + (response.data?.message || 'Format tidak sesuai'));
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('Gagal mengirim voting ke server. Pastikan Script sudah di-deploy sebagai "Anyone".');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <SuccessPage onReset={() => {
    setSubmitted(false);
    setStep(1);
    setVoter({ name: '', dept: '' });
  }} />;

  if (loading && employees.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-slate-500 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-red-100 max-w-sm w-full text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 font-bold mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-2 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 sm:py-12 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Vote karyawan</h1>
          <p className="text-slate-600 text-sm sm:text-base">Berikan apresiasi terbaik untuk rekan kerja Anda</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex items-center justify-between max-w-md mx-auto relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>

            {[1, 2, 3].map((s) => (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                    step >= s 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {step > s ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="font-semibold">{s}</span>
                  )}
                </div>
                <span className={`text-[10px] sm:text-xs font-medium mt-2 uppercase tracking-wider ${
                  step >= s ? 'text-blue-600' : 'text-slate-400'
                }`}>
                  {s === 1 ? 'Identitas' : s === 2 ? 'Voting' : 'Review'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-8 transition-all duration-500">
          {step === 1 && (
            <Step1VoterInfo
              employees={employees}
              votedNames={votedNames}
              voter={voter}
              setVoter={setVoter}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <Step2Voting
              employees={employees}
              voter={voter}
              votes={votes}
              updateVote={updateVote}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <Step3Review
              voter={voter}
              votes={votes}
              onBack={() => setStep(2)}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-xs">
          © 2026 SIp Group. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;