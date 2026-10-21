import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastNotification = () => {
  const { toast } = useCart();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} color="#10b981" />,
    error: <AlertCircle size={18} color="#ef4444" />,
    warning: <AlertCircle size={18} color="#f59e0b" />,
    info: <Info size={18} color="#6366f1" />
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast toast-${toast.type || 'success'}`}>
        {icons[toast.type] || icons.success}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export default ToastNotification;
