'use client';
import { useState, useId, useRef, useEffect, useContext, isValidElement, cloneElement, } from 'react';
import { createPortal } from 'react-dom';
import { LayoutGroup, motion } from 'framer-motion';
import { GaleriaContext } from './context';
function Image({ __web, index = 0, children, style, dynamicAspectRatio = false, }) {
    const [isOpen, setIsOpen] = useState(false);
    const { urls, theme } = useContext(GaleriaContext);
    const url = urls?.[index];
    const parentRef = useRef();
    const [aspectRatio, setAspectRatio] = useState(1);
    const id = useId();
    const getFirstImageChild = (node) => {
        if (node.nodeType === 1 && node.nodeName === 'IMG') {
            return node;
        }
        if (node.childNodes) {
            return getFirstImageChild(node.childNodes[0]);
        }
        return null;
    };
    const getNodeAspectRatio = (node) => {
        const imageNode = getFirstImageChild(node);
        if (imageNode) {
            return (imageNode.getBoundingClientRect().height /
                imageNode.getBoundingClientRect().width);
        }
        return 1;
    };
    const [windowDimensions, setWindowDimensions] = useState();
    const onClick = (e) => {
        const imageNode = getFirstImageChild(e.target);
        if (imageNode) {
            setIsOpen(true);
            const ratio = getNodeAspectRatio(imageNode);
            setAspectRatio(ratio);
            if (typeof process != 'undefined' &&
                typeof process.env != 'undefined' &&
                process?.env?.NODE_ENV === 'development') {
                const nodeAspectRatio = getNodeAspectRatio(imageNode);
                if (nodeAspectRatio !== ratio) {
                    console.error(`[galeria] Galeria.Image does not have the same aspect ratio as its child.
            
This might result in a weird animation. To fix it, pass the "style" prop to Galeria.Image to give it the same height & width as the image.`);
                }
            }
        }
    };
    const isHorizontal = Number(aspectRatio >= 1).toFixed(4);
    return (<>
      <motion.div style={{ zIndex: index, ...style }} 
    // faster than onClick
    onMouseDown={onClick} onTouchStart={onClick} layoutId={id}>
        {isValidElement(children)
            ? cloneElement(children, { draggable: false })
            : children}
      </motion.div>

      <PopupModal visible={isOpen} onClose={() => setIsOpen(false)}>
        {url ? (<motion.img layoutId={id} style={{
                ...(dynamicAspectRatio
                    ? {}
                    : {
                        ...(isHorizontal
                            ? {
                                width: `100%`,
                                aspectRatio,
                            }
                            : {
                                height: '100%',
                                aspectRatio,
                            }),
                    }),
                objectFit: 'cover',
                zIndex: 2000,
            }} src={url}></motion.img>) : null}
      </PopupModal>
    </>);
}
function Root({ children, urls, theme = 'light', ids, }) {
    const [openState, setOpen] = useState({
        open: false,
    });
    return (<GaleriaContext.Provider value={{
            setOpen,
            urls,
            theme,
            ...(openState.open
                ? {
                    open: true,
                    src: openState.src,
                    initialIndex: openState.initialIndex,
                }
                : {
                    open: false,
                    src: '',
                    initialIndex: 0,
                }),
            ids,
        }}>
      <LayoutGroup inherit={false} id={useId()}>
        {children}
      </LayoutGroup>
    </GaleriaContext.Provider>);
}
function PopupModal({ visible, children, onClose, }) {
    const elementRef = useRef(null);
    if (typeof window !== 'undefined' && !elementRef.current) {
        const element = document.createElement('div');
        element.setAttribute('galeria-popup', 'hello-inspector');
        if (element && document.body) {
            document.body.appendChild(element);
            elementRef.current = element;
        }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(function cleanup() {
        return () => {
            if (document.body && elementRef.current) {
                document.body.removeChild(elementRef.current);
                elementRef.current = null;
            }
        };
    }, []);
    // for radix menus, which glitch a lot with regular modals on RNW
    if (!visible)
        return null;
    const node = (<div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
        }} onClick={onClose}>
      {children}
    </div>);
    return elementRef.current ? createPortal(node, elementRef.current) : null;
}
const Galeria = Object.assign(Root, {
    Image,
    Popup: () => null,
});
export default Galeria;
//# sourceMappingURL=GaleriaView.jsx.map