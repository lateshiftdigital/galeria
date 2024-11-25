import { createContext } from 'react';
export const GaleriaContext = createContext({
    initialIndex: 0,
    open: false,
    urls: [],
    /**
     * @deprecated
     */
    ids: undefined,
    setOpen: (info) => { },
    theme: 'dark',
    src: '',
});
//# sourceMappingURL=context.jsx.map