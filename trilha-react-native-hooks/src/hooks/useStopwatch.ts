import { useEffect, useState } from 'react';

/** O efeito sincroniza a interface com um relógio externo e remove o intervalo. */
export function useStopwatch() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    // Date.now evita somar apenas um segundo quando uma atualização sofre atraso.
    const startedAt = Date.now();
    const interval = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 250);
    return () => clearInterval(interval);
  }, [running]);
  function start() { if (running) return; setSeconds(0); setRunning(true); }
  function reset() { setRunning(false); setSeconds(0); }
  return { running, seconds, start, reset };
}
