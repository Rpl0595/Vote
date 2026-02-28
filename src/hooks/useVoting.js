import { useState } from 'react';

export const useVoting = () => {
  const [step, setStep] = useState(1);
  const [voter, setVoter] = useState({ name: '', email: '', dept: '' });
  const [votes, setVotes] = useState({
    karyawanTertampan: '',
    karyawanTercantik: '',
    karyawanTerKalcer: '',
    karyawanTersoftSpoken: '',
    mascotOfTim: '',
    komentar: '',
  });

  const updateVote = (category, value) => {
    setVotes(prev => ({ ...prev, [category]: value }));
  };

  const resetVotes = () => {
    setVotes({
      karyawanTertampan: '',
      karyawanTercantik: '',
      karyawanTerKalcer: '',
      karyawanTersoftSpoken: '',
      mascotOfTim: '',
      komentar: '',
    });
  };

  return { step, setStep, voter, setVoter, votes, updateVote, resetVotes };
};