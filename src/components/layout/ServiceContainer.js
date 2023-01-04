import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { services } from '../../utils/constants';

function ServicesContainer() {
    const { t } = useTranslation();

    const serviceContainerRef = useRef();
    const [serviceHover, setServiceHover] = useState(0);

    const [sft, setSft] = useState(true); //scrolled from top
    const serviceRef = useRef();
    const createRef = useRef();
    const growRef = useRef();
    const secRef = useRef();

    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const refBottom = useRef(null);
    const refTop = useRef(null);

    const [maxW, setMaxW] = useState(true);

    const isInViewport1 = useIsInViewport(ref1);

    const isInViewport2 = useIsInViewport(ref2);

    const isInViewPortBottom = useIsInViewport(refBottom);
    const isInViewPortTop = useIsInViewport(refTop);
    const isAbove1 = useIsAboveViewport(ref1);
    const reset = () => {
        isInViewport1 = false;
        isInViewport2 = false;
        isInViewPortBottom = false;
        isInViewPortTop = false;
    };
    const handleTextScroll = () => {
        if (isAbove1) {
            setSft(false);
            serviceRef.current.scroll({
                top: serviceRef.current.scrollHeight,
                behavior: 'smooth',
            });
        } else {
            setSft(true);
            serviceRef.current.scroll({ top: 0, behavior: 'smooth' });
        }
    };
    useEffect(() => {
        handleTextScroll();
    }, []);

    useEffect(() => {
        handleTextScroll();
    }, [isAbove1]);
    useEffect(() => {
        console.log(`
        ref 1 in viewport : ${isInViewport1}
        ref 2 in viewport: ${isInViewport2}
    is bottom text in viewport: ${isInViewPortBottom}
    is top text in viewport: ${isInViewPortTop}
    scrolling from top: ${sft}
        `);
        if (isInViewport1 && isInViewport2 && sft && !isInViewPortBottom) {
            document.querySelector('body').style.overflowY = 'hidden';
        } else if (isInViewport1 && isInViewport2 && !sft && !isInViewPortTop) {
            document.querySelector('body').style.overflowY = 'hidden';
        } else {
            document.querySelector('body').style.overflowY = 'scroll';
            setMaxW(false);
            // if (sft) {
            //     secRef.current.scroll({ top: secRef.current.scroll + 5, behavior: 'smooth' });
            // } else {
            //     secRef.current.scroll({
            //         top: secRef.current.scroll - 5,
            //         behavior: 'smooth',
            //     });
            // }
        }
    }, [isInViewport1, isInViewport2, isInViewPortBottom, isInViewPortTop, sft]);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (!createRef.current || !growRef.current || !serviceRef.current || !serviceContainerRef.current) return;
            const serviceOffset = serviceRef.current.scrollTop + 80;
            const createOffset = createRef.current.offsetTop - serviceRef.current.offsetTop;
            const growOffset = growRef.current.offsetTop - serviceRef.current.offsetTop;
            if (serviceOffset < createOffset) setServiceHover(0);
            else if (serviceOffset < growOffset) setServiceHover(1);
            else setServiceHover(2);
        }, 100);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <>
            <section ref={secRef} className="min-w-screen  ">
                <div>
                    <div
                        className={`relative min-h-[400px] md:pl-[2vw] xlg:pl-[12vw] mx-auto md:grid md:grid-cols-2 md:gap-x-[60px] lg:gap-x-[140px] xlg:gap-x-[25vw]
                        xlg:mt-[1rem] my-[50px] mb-[100px] md:mb-[200px] relative`}
                        ref={serviceContainerRef}
                    >
                        <div className="relative  h-0 pb-[100%] hidden md:block">
                            <div
                                className={`absolute rounded-full w-full h-full border-[2px] transition ${
                                    serviceHover === 2 ? 'border-pink box-shadow-pink' : 'border-gray-500'
                                }`}
                            >
                                <div className="w-full h-[23%] flex items-center justify-center">
                                    <p
                                        className={`text-[20px] transition ${
                                            serviceHover === 2 ? 'text-pink text-shadow-pink' : 'text-gray-500'
                                        }`}
                                    >
                                        {t('home.grow')}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={`absolute rounded-full w-[66.6%] h-[66.6%] bottom-0 left-[16.6%] border-[2px] transition ${
                                    serviceHover === 1 ? 'border-pink box-shadow-pink' : 'border-gray-500'
                                }`}
                            >
                                <div className="w-full h-[50%] flex items-center justify-center">
                                    <p
                                        className={`text-[20px] transition ${
                                            serviceHover === 1 ? 'text-pink text-shadow-pink' : 'text-gray-500'
                                        }`}
                                    >
                                        {t('home.create')}
                                    </p>
                                </div>
                            </div>

                            <div
                                className={`absolute rounded-full w-[33.3%] h-[33.3%] bottom-0 left-[33.3%] border-[2px] transition ${
                                    serviceHover === 0 ? 'border-pink box-shadow-pink' : 'border-gray-500'
                                }`}
                            >
                                <div className="w-full h-full flex items-center justify-center">
                                    <p
                                        className={`text-[20px] transition ${
                                            serviceHover === 0 ? 'text-pink text-shadow-pink' : 'text-gray-500'
                                        }`}
                                    >
                                        {t('home.devise')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`absolute group`}>
                            <div ref={ref1} className="absolute top-[2rem] opacity-0">
                                Hello world
                            </div>
                            <div ref={ref3} className="absolute opacity-0 top-[50%]">
                                Hello world
                            </div>
                            <div
                                ref={serviceRef}
                                className={`overflow-y-scroll px-[1.5rem] md:px-[0rem] h-[70vh] w-screen
                                 mask-vertical-1 custom-scrollbar1 scrollable`}
                            >
                                {/* <div className="hidden h-[100%] w-[6px] rounded-md bg-white absolute bg-[#3e3e3e] right-[5rem]">
                                    <div className="scrollThumb bg-[#ff006c] min-h-[5rem] "></div>
                                </div> */}
                                <div className="flex items-end flex-col py-4 md:py-12 relative md:min-h-[550px] md:pr-[2vw] lg:pr-[4vw] xlg:pr-[12vw] max-w-screen ">
                                    {services.map((item, index) => {
                                        return (
                                            <div
                                                className={`${
                                                    index > 0 ? 'mt-6' : ''
                                                } md:w-[45%] lg:w-[42%] xlg:w-[38%]`}
                                                key={item.label}
                                                ref={
                                                    item.label === 'Branding'
                                                        ? createRef
                                                        : item.label === 'KOL Management'
                                                        ? growRef
                                                        : null
                                                }
                                            >
                                                <div
                                                    ref={
                                                        item.label === 'PPC'
                                                            ? refBottom
                                                            : item.label === 'Strategy'
                                                            ? refTop
                                                            : null
                                                    }
                                                >
                                                    <p className="text-[20px]">{item.label}</p>
                                                    <p className="text-[14px] mt-4">{item.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div ref={ref2} className="absolute bottom-[2rem] opacity-0">
                                Hello world
                            </div>
                        </div>

                        {/* <div className="absolute w-[4px] h-full top-0 right-[2px] bg-[#333333]" />
        <div
            className="absolute w-[8px] h-[8px] top-0 right-0 bg-pink rounded-full transition-all"
            style={{
                top: sliderPos,
            }}
        /> */}
                    </div>
                </div>
            </section>
        </>
    );
}
function useIsInViewport(ref) {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(() => new IntersectionObserver(([entry]) => setIsIntersecting(entry.isIntersecting)), []);

    useEffect(() => {
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isIntersecting;
}
function useIsAboveViewport(ref) {
    const [isAbove, setIsAbove] = useState(false);
    const observer = useMemo(
        () => new IntersectionObserver(([entry]) => setIsAbove(entry.boundingClientRect.top < 0)),
        []
    );

    useEffect(() => {
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref, observer]);

    return isAbove;
}

export default ServicesContainer;
