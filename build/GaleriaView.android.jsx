import { requireNativeViewManager } from 'expo-modules-core';
import { useContext } from 'react';
import { GaleriaContext } from './context';
import { Image } from 'react-native';
const NativeImage = requireNativeViewManager('Galeria');
const array = [];
const noop = () => { };
const Galeria = Object.assign(function Galeria({ children, urls, theme = 'dark', ids, }) {
    return (<GaleriaContext.Provider value={{
            urls,
            theme,
            initialIndex: 0,
            open: false,
            src: '',
            setOpen: noop,
            ids,
        }}>
        {children}
      </GaleriaContext.Provider>);
}, {
    Image(props) {
        const { theme, urls } = useContext(GaleriaContext);
        return (<NativeImage theme={theme} urls={urls?.map((url) => {
                if (typeof url === 'string') {
                    return url;
                }
                return Image.resolveAssetSource(url).uri;
            })} {...props}/>);
    },
    Popup: (() => null),
});
export default Galeria;
//# sourceMappingURL=GaleriaView.android.jsx.map