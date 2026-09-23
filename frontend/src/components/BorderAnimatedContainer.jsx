// How to make animated gradient border 👇
// https://cruip-tutorials.vercel.app/animated-gradient-border/
function BorderAnimatedContainer({ children }) {
  return (
    <div
      className="w-full h-full flex overflow-hidden rounded-2xl border border-transparent animate-border
        [background:linear-gradient(45deg,#172033,var(--color-slate-800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),oklch(from_var(--color-slate-600)_l_c_h/0.48)_80%,var(--color-cyan-500)_86%,var(--color-cyan-300)_90%,var(--color-cyan-500)_94%,oklch(from_var(--color-slate-600)_l_c_h/0.48))_border-box]"
    >
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
