export default function Separator({ extraClass }: { extraClass?: string }) {
  return <div className={`w-full bg-slate-200 h-[1px] ${extraClass}`}></div>
}
