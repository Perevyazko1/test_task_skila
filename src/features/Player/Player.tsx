import React, { useEffect, useRef } from 'react';
import axios from 'axios';

interface AudioPlayerProps {
  id_record: string;
  partnership_id: string;
}

function AudioPlayer({ id_record, partnership_id }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const response = await axios.post(`https://api.skilla.ru/mango/getRecord?record=${id_record}&partnership_id=${partnership_id}`,{} ,{
          responseType: 'blob',
          headers: {
            "Authorization": "Bearer testtoken",
            "Content-type" : "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
            "Content-Transfer-Encoding":"binary",
          }
        });
        const audioBlobUrl = URL.createObjectURL(response.data);
        console.log(response)
        if (audioRef.current) {
          audioRef.current.src = audioBlobUrl;
          audioRef.current.load();
        }
      } catch (error) {
        console.log('Error fetching audio:', error);
      }
    };

    fetchAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [id_record, partnership_id]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div>
      <audio ref={audioRef} controls></audio>
    </div>
  );
}

export default AudioPlayer;