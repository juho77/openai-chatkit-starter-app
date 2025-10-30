'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <main className="mx-auto max-w-2xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Tchatkit Hody</h1>

      <div className="space-y-2 min-h-64 border rounded-2xl p-4">
        {messages.map((m) => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className="inline-block rounded-2xl px-4 py-2 border">
              <strong>{m.role === 'user' ? 'Vous' : 'Assistant'}</strong>
              <br />
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && <div className="italic opacity-70">Réponse en cours…</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border rounded-xl px-4 py-2"
          value={input}
          onChange={handleInputChange}
          placeholder="Pose ta question…"
          disabled={isLoading}
        />
        <button className="border rounded-xl px-4 py-2" disabled={isLoading}>
          Envoyer
        </button>
      </form>
    </main>
  );
}
