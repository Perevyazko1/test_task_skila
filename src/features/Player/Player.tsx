import React, {memo, useEffect, useRef} from 'react';
import axios from 'axios';
import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from "./Player.module.scss"

interface AudioPlayerProps {
  id_record: string;
  partnership_id: string;
  className?: string
}

export const AudioPlayer = memo((props: AudioPlayerProps) => {
    const {
        className,
        id_record,
        partnership_id,
    } = props
  const mods: Mods = {

    };


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
            "Content-Disposition": "filename='record.mp3'"
          }
        });
        const audioBlobUrl = URL.createObjectURL(response.data);
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


  return (
    <div className={classNames(cls.Player, mods,[className])}>
      <audio className={cls.ButtonPlayer} ref={audioRef} controls></audio>
    </div>
  );
})