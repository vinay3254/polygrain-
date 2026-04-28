// frontend/src/pages/Room.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import etherxLogo from '../assets/etherx_transparent.png';
import { fadeIn } from '../utils/animationVariants';
import ChainHUD from '../components/web3/ChainHUD';
import MeetingReceiptModal from '../components/web3/MeetingReceiptModal';
import { ROUTES } from '../utils/constants';
import '../styles/room.css';

export default function Room() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    document.title = `Meeting · ${code}`;
  }, [code]);

  return (
    <div className="etherx-room-wrap">
      <motion.div
        className="etherx-room-logo"
        role="img"
        aria-label="EtherX Meet logo"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <img src={etherxLogo} alt="EtherX Meet" />
      </motion.div>

      <ChainHUD />

      <MeetingReceiptModal
        isOpen={!!receipt}
        onClose={() => setReceipt(null)}
        meetingId={code}
        txHash={receipt?.txHash}
        ipfsCid={receipt?.ipfsCid}
        blockNumber={receipt?.blockNumber}
        durationMin={receipt?.durationMin}
        participantCount={receipt?.participantCount}
        onDashboard={() => navigate(ROUTES.DASHBOARD)}
      />

      <iframe
        src={`https://8x8.vc/vpaas-magic-cookie-a390c03ef55e457ebeb88a41bdb4af08/${code}`}
        style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
        allow="camera; microphone; fullscreen; display-capture; autoplay"
        allowFullScreen
      />
    </div>
  );
}
