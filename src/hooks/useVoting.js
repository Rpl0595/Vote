import { useState } from 'react';

export const useVoting = () => {
  const [step, setStep] = useState(1);
  const [voter, setVoter] = useState({ name: '', dept: '' });
  const [votes, setVotes] = useState({
    muaTerfavorit: '',
    wardrobeTerfavorit: '',
    fotograferTerfavorit: '',
    editorTerfavorit: '',
    adminTerfavorit: '',
    baristaTerfavorit: '',
    karyawanTerlucu: '',
    karyawanTerfavorit: '',
    karyawanTerrajin: '',
  });

  const updateVote = (category, value) => {
    setVotes(prev => ({ ...prev, [category]: value }));
  };

  const resetVotes = () => {
    setVotes({
      muaTerfavorit: '',
      wardrobeTerfavorit: '',
      fotograferTerfavorit: '',
      editorTerfavorit: '',
      adminTerfavorit: '',
      baristaTerfavorit: '',
      karyawanTerlucu: '',
      karyawanTerfavorit: '',
      karyawanTerrajin: '',
    });
  };

  return { step, setStep, voter, setVoter, votes, updateVote, resetVotes };
};