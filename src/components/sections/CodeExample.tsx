'use client';

interface CodeExampleProps {
  code: string;
}

export default function CodeExample({ code }: CodeExampleProps) {
  return (
    <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 overflow-x-auto">
      <pre className="text-green-400 font-mono text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
} 