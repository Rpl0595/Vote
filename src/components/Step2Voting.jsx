import React from 'react';

// Fungsi untuk mendapatkan kandidat berdasarkan kategori
const getCandidates = (employees, categoryKey, excludeName) => {
  // Kategori yang mengizinkan voter memilih diri sendiri
  const categoriesAllowingSelfVote = [
    'karyawanTertampan',
    'karyawanTercantik',
    'karyawanTerKalcer',
    'karyawanTersoftSpoken',
    'mascotOfTim'
  ];
  const allowsSelfVote = categoriesAllowingSelfVote.includes(categoryKey);

  let filtered = allowsSelfVote
    ? employees
    : employees.filter(emp => emp.nama.toLowerCase() !== excludeName.toLowerCase());

  switch (categoryKey) {
    case 'karyawanTertampan':
      return filtered.filter(emp => emp.gender?.toLowerCase() === 'l');
    case 'karyawanTercantik':
      return filtered.filter(emp => emp.gender?.toLowerCase() === 'p');
    default: // kategori lainnya
      return filtered;
  }
};

const Step2Voting = ({ employees, voter, votes, updateVote, onNext, onBack }) => {
  const categories = [
    { key: 'karyawanTertampan', label: 'Karyawan Tertampan', type: 'umum' },
    { key: 'karyawanTercantik', label: 'Karyawan Tercantik', type: 'umum' },
    { key: 'karyawanTerKalcer', label: 'Karyawan Ter Kalcer', type: 'umum' },
    { key: 'karyawanTersoftSpoken', label: 'Karyawan Tersoft Spoken', type: 'umum' },
    { key: 'mascotOfTim', label: 'Mascot Of Tim', type: 'umum' },
  ];

  const allFilled = categories.every(cat => votes[cat.key] !== '');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">Pilih Karyawan Favorit</h2>
        <p className="text-sm text-slate-500 mt-1">Berikan suara Anda untuk setiap kategori di bawah ini.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {categories.map((cat, idx) => {
          const candidates = getCandidates(employees, cat.key, voter.name);
          const isSelected = votes[cat.key] !== '';
          
          return (
            <div 
              key={cat.key} 
              className={`group p-5 rounded-2xl border transition-all duration-300 ${
                isSelected 
                  ? 'bg-blue-50/50 border-blue-200 ring-1 ring-blue-100' 
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                  {cat.label}
                </label>
                {isSelected && (
                  <span className="flex items-center text-blue-600 text-[10px] font-bold uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded-full">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Terpilih
                  </span>
                )}
              </div>
              
              <div className="relative">
                <select
                  value={votes[cat.key]}
                  onChange={(e) => updateVote(cat.key, e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10 transition-all cursor-pointer shadow-sm"
                >
                  <option value="">-- Pilih Kandidat --</option>
                  {candidates.map(emp => (
                    <option key={`${cat.key}-${emp.id}`} value={emp.nama}>
                      {emp.nama}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-slate-400 italic">
                {votes[cat.key] ? `Anda memilih ${votes[cat.key]}` : `Kandidat: ${candidates.length} orang`}
              </p>
            </div>
          );
        })}
      </div>

      {/* Input Komentar */}
      <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-200">
        <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Pesan / Komentar (Opsional)
        </label>
        <textarea
          value={votes.komentar || ''}
          onChange={(e) => updateVote('komentar', e.target.value)}
          placeholder="Tuliskan pesan atau alasan Anda memilih..."
          className="w-full h-32 p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
        />
        <p className="mt-2 text-[11px] text-slate-400 italic text-right">
          {votes.komentar?.length || 0} karakter
        </p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 border-t border-slate-100">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-8 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 active:scale-95 transition-all"
        >
          Kembali
        </button>
        <button
          onClick={onNext}
          disabled={!allFilled}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
        >
          Tinjau Pilihan
        </button>
      </div>
    </div>
  );
};

export default Step2Voting;