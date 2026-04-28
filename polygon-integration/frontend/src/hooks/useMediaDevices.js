import { useState, useEffect, useRef } from 'react';

export function useMediaDevices() {
  const [stream, setStream] = useState(null);
  const [devices, setDevices] = useState({ cameras: [], microphones: [] });
  const [selectedDevices, setSelectedDevices] = useState({ video: null, audio: null });
  const [permissions, setPermissions] = useState({ video: null, audio: null });
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const requestPermission = async () => {
    try {
      const constraints = {
        video: selectedDevices.video ? { deviceId: { exact: selectedDevices.video } } : true,
        audio: selectedDevices.audio ? { deviceId: { exact: selectedDevices.audio } } : true
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setPermissions({ video: 'granted', audio: 'granted' });
      setError(null);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing media devices:', err);
      let errorMessage = 'Failed to access media devices';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Permission denied. Please allow camera/microphone access in your browser settings.';
        setPermissions({ video: 'denied', audio: 'denied' });
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera or microphone found.';
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'Device is already in use.';
      }
      
      setError(errorMessage);
      setPermissions({ video: 'error', audio: 'error' });
    }
  };

  const enumerateDevices = async () => {
    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const cameras = allDevices.filter(d => d.kind === 'videoinput');
      const microphones = allDevices.filter(d => d.kind === 'audioinput');
      setDevices({ cameras, microphones });
      
      if (!selectedDevices.video && cameras.length > 0) {
        setSelectedDevices(prev => ({ ...prev, video: cameras[0].deviceId }));
      }
      if (!selectedDevices.audio && microphones.length > 0) {
        setSelectedDevices(prev => ({ ...prev, audio: microphones[0].deviceId }));
      }
    } catch (err) {
      console.error('Error enumerating devices:', err);
    }
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const switchDevice = async (kind, deviceId) => {
    if (kind === 'video') {
      setSelectedDevices(prev => ({ ...prev, video: deviceId }));
    } else {
      setSelectedDevices(prev => ({ ...prev, audio: deviceId }));
    }
  };

  useEffect(() => {
    enumerateDevices();
    
    navigator.mediaDevices?.addEventListener('devicechange', enumerateDevices);
    
    return () => {
      stopStream();
      navigator.mediaDevices?.removeEventListener('devicechange', enumerateDevices);
    };
  }, []);

  useEffect(() => {
    if (stream && (selectedDevices.video || selectedDevices.audio)) {
      stopStream();
      requestPermission();
    }
  }, [selectedDevices.video, selectedDevices.audio]);

  return {
    stream,
    devices,
    permissions,
    error,
    videoRef,
    isVideoEnabled,
    isAudioEnabled,
    requestPermission,
    stopStream,
    toggleVideo,
    toggleAudio,
    switchDevice,
    selectedDevices,
    setSelectedDevices
  };
}
