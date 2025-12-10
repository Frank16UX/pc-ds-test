/// <reference types="vite/client" />

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

// Declare dotlottie-player web component
declare namespace JSX {
    interface IntrinsicElements {
        'dotlottie-player': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                src?: string;
                autoplay?: boolean;
                loop?: boolean;
                style?: React.CSSProperties;
            },
            HTMLElement
        >;
    }
}
