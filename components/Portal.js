import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, id }) => {
  const [isClient, setIsClient] = useState(false);
  const mount = isClient ? document.getElementById(id) : null;
  const el = isClient ? document.createElement('div') : null;

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    mount?.appendChild(el);
    return () => mount?.removeChild(el);
  }, [el, mount]);

  return isClient ? createPortal(children, el) : null;
};

export default Portal;
