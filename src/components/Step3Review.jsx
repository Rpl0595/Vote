import React from 'react';

const Step3Review = ({ voter, votes, onSubmit, onBack, loading }) => {
  const categoryLabels = {
    karyawanTertampan: 'Karyawan Tertampan',
    karyawanTercantik: 'Karyawan Tercantik',
    karyawanTerKalcer: 'Karyawan Ter Kalcer',
    karyawanTersoftSpoken: 'Karyawan Tersoft Spoken',
    mascotOfTim: 'Mascot Of Tim',
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">Review Pilihan Anda</h2>
        <p className="text-sm text-slate-500 mt-1">Pastikan semua pilihan Anda sudah benar sebelum mengirim.</p>
      </div>

      <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-blue-200">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-blue-100 font-medium uppercase tracking-wider">Voter</p>
            <h3 className="text-lg font-bold">{voter.name}</h3>
            <p className="text-xs text-blue-100">{voter.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {Object.entries(votes)
          .filter(([key]) => key !== 'komentar')
          .map(([key, value]) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:bg-white hover:border-blue-200 transition-all">
              <span className="text-sm font-semibold text-slate-500 mb-1 sm:mb-0 uppercase tracking-tight">{categoryLabels[key]}</span>
              <span className="text-base font-bold text-slate-900 group-hover:text-blue-600">{value || '-'}</span>
            </div>
          ))}
      </div>

      {votes.komentar && (
        <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 italic">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">Pesan Anda:</p>
          <p className="text-sm text-slate-700 leading-relaxed">"{votes.komentar}"</p>
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 border-t border-slate-100">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 active:scale-95 transition-all"
        >
          Kembali
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full sm:w-auto px-10 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-green-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengirim...
            </>
          ) : 'Kirim Voting'}
        </button>
      </div>
    </div>
  );
};

export default Step3Review;