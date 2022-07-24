const ArrowRight = (props) => (
    <button {...props} className={'next'}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="60"
            viewBox="0 0 24 24"
            width="60"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                fill="white"
            />
        </svg>
    </button>
);

const ArrowLeft = (props) => (
    <button {...props} className={'prev'}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="60"
            viewBox="0 0 24 24"
            width="60"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
                d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
                fill="white"
            />
        </svg>
    </button>
);

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesPerRow: 1,
    slidesToScroll: 3,
    arrows: true,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
    variableWidth: true,
    responsive: [
        {
            breakpoint: 480,
            settings: {
                dots: false,
                slidesPerRow: 1,
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                variableWidth: true,
                arrows: false,
                touchThreshold: 60,
            },
        },
    ],
};

export default settings;
