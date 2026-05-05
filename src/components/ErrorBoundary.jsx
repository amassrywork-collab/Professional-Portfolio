import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error("Portfolio render error:", error);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="grid min-h-screen place-items-center bg-night px-5 font-body text-white">
          <div className="max-w-xl rounded-[2rem] border border-coral/30 bg-white/[0.06] p-7 text-center backdrop-blur-xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-coral">Render Error</p>
            <h1 className="mt-4 font-heading text-3xl font-bold">The portfolio could not start.</h1>
            <p className="mt-4 text-sm leading-7 text-white/62">
              Open the browser console for details, then restart the Vite server. The app is showing this instead of a silent black screen.
            </p>
            <pre className="mt-5 overflow-auto rounded-2xl border border-white/10 bg-night/70 p-4 text-left text-xs leading-6 text-white/70">
              {this.state.error?.message}
            </pre>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
