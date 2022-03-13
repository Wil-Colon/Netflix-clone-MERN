const ArrowRight = (props) => (
    <button {...props} className={'next'}>
        <i className="fas fa-chevron-right"></i>
    </button>
);

const ArrowLeft = (props) => (
    <button {...props} className={'prev'}>
        <i className="fas fa-chevron-left"></i>
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
