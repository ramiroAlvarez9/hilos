import React from 'react';

export function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="tactical-toast">
          <span>🚨</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
