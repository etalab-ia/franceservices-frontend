export const    GlobalParagraph = ({ children, extraClass }) => {
    return <p className={`text-justify fr-my-1w ${extraClass}`}>
       {children}
    </p>
}