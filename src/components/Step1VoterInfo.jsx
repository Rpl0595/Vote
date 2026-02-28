import React, { useEffect } from 'react';

const Step1VoterInfo = ({ employees, votedNames = [], voter, setVoter, onNext }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoter(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const selectedEmp = employees.find(emp => emp.nama.toLowerCase() === voter.name.toLowerCase());
    setVoter(prev => ({
      ...prev,
      dept: selectedEmp ? selectedEmp.departemen : '',
    }));
  }, [voter.name, employees, setVoter]);

  const isVoted = (name) => votedNames.includes(name);
  const canProceed = voter.name.trim() !== '' && voter.email.trim() !== '' && !isVoted(voter.name);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">Identitas Voter</h2>
        <p className="text-sm text-slate-500 mt-1">Silakan masukkan identitas Anda untuk melanjutkan.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="voterName" className="block text-sm font-semibold text-slate-700 mb-2">
            Nama Lengkap
          </label>
          <input
            id="voterName"
            name="name"
            type="text"
            value={voter.name}
            onChange={handleInputChange}
            placeholder="Masukkan nama lengkap Anda"
            className={`w-full appearance-none bg-slate-50 border text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-all hover:bg-white ${
              isVoted(voter.name) ? 'border-amber-200 bg-amber-50' : 'border-slate-200'
            }`}
            disabled={isVoted(voter.name)}
          />
          {isVoted(voter.name) && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-100 rounded-lg flex items-center space-x-2 text-amber-700">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-xs font-medium">Anda sudah melakukan voting sebelumnya. Tidak dapat mengisi kembali.</p>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="voterEmail" className="block text-sm font-semibold text-slate-700 mb-2">
            Email
          </label>
          <input
            id="voterEmail"
            name="email"
            type="email"
            value={voter.email}
            onChange={handleInputChange}
            placeholder="Masukkan alamat email Anda"
            className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-all hover:bg-white"
          />
        </div>

        {/* Departemen dan Jabatan tidak lagi otomatis terisi dari dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Departemen
            </label>
            <input
              type="text"
              value={voter.dept}
              readOnly
              className="w-full bg-slate-50 border border-slate-100 text-slate-500 text-sm rounded-xl p-3.5 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Jabatan
            </label>
            <input
              type="text"
              value={employees.find(e => e.nama === voter.name)?.designation || '-'}
              readOnly
              className="w-full bg-slate-50 border border-slate-100 text-slate-500 text-sm rounded-xl p-3.5 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 flex justify-end">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
        >
          Lanjut ke Pemilihan
        </button>
      </div>
    </div>
  );
};

export default Step1VoterInfo;