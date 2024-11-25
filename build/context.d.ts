import { ContextType } from 'react';
import type { Image } from 'react-native';
type ImageSource = string | Parameters<typeof Image.resolveAssetSource>[0];
export declare const GaleriaContext: import("react").Context<{
    initialIndex: number;
    open: boolean;
    urls: undefined | ImageSource[];
    /**
     * @deprecated
     */
    ids: string[] | undefined;
    setOpen: (info: {
        open: true;
        src: string;
        initialIndex: number;
        id?: string;
    } | {
        open: false;
    }) => void;
    theme: "dark" | "light";
    src: string;
}>;
export type GaleriaContext = ContextType<typeof GaleriaContext>;
export {};
//# sourceMappingURL=context.d.ts.map