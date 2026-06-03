import Link from "next/link";

interface ButtonProps {
    href?: string;
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "success" | "careful";
    disabled?: boolean;
    icon?: React.ReactNode;
    width?: string;
    type?: "button" | "submit" | "reset";
    onclick?: () => void;
}

export default function Button({ href, children, variant, disabled, icon, width, type, onclick }: ButtonProps) {
    const baseClasses = "inline-flex items-center px-4 py-2 rounded-md justify-center transition-colors duration-300";
    const variantClasses = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-800 text-white text-sm font-semibold hover:bg-gray-600",
        danger: "bg-red-500 text-white font-semibold hover:bg-red-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        careful: "bg-yellow-500 text-black font-semibold hover:bg-yellow-600",
    };
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    const iconElement = icon ? <span className="mr-2">{icon}</span> : null;
    const widthClass = width ? `w-${width}` : "";
    const typeAttribute = type ? type : "button";

    const classes = `${baseClasses} ${variant ? variantClasses[variant] : variantClasses.primary} ${disabledClasses} ${widthClass}`;
    return (
        <>
            {href ? (
                <Link href={disabled ? "#" : href} className={classes} aria-disabled={disabled} onClick={onclick}>
                    {iconElement}
                    {children}
                </Link>
            ) : (
                <button className={classes} aria-disabled={disabled} type={typeAttribute} onClick={onclick}>
                    {iconElement}
                    {children}
                </button>
            )}
        </>
    );
}
