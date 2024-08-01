export function LoadingSpinner() {
  return (
    <div
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-e-transparent border-solid align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Chargement...
      </span>
    </div>
  )
}
