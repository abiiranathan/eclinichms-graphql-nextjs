import React from "react";

interface AlertProps {
  title: string;
  message: string | string[];
}

export default function AlertDanger({ title, message }: AlertProps) {
  return (
    <div role="alert">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">{title}</div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        {Array.isArray(message) ? (
          <div>
            {message.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </div>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
}
